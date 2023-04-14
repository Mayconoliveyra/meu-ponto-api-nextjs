import { getKnex } from "../../../../knex"
import { existOrError } from "../utilities"
import { passport, dataHoraAtual } from "../../../../global"
import moment from "moment/moment"

export default async function handler(req, res) {
    const auth = await passport(req)
    const knex = getKnex()

    const id = parseInt(req.query._id) ? parseInt(req.query._id) : null;

    if (req.method === 'GET') {
        try {
            const sortColuns = {
                id: "id",
                nome: "nome",
                cpf: "cpf"
            }
            const orderColuns = {
                ASC: "ASC",
                asc: "ASC",
                DESC: "DESC",
                desc: "DESC",
            }
            const page = parseInt(req.query._page) ? parseInt(req.query._page) : 1;
            const limit = parseInt(req.query._limit) ? parseInt(req.query._limit) : 20;
            const sort = sortColuns[req.query._sort] ? sortColuns[req.query._sort] : 'id';
            const order = orderColuns[req.query._order] ? orderColuns[req.query._order] : 'ASC';
            const search = req.query._search ? req.query._search : null

            /* Se 'true' retorna os pontos diario do usuario logado(utilizado na tela dashboard) */
            const getdiario = req.query._diario ? req.query._diario : null
            if (getdiario) {
                /* formata 'dataHoraAtual', para retornar apenas yyyy-mmm-dd(ano-mes-dia) */
                const dataAtualFormat = moment(dataHoraAtual()).format('YYYY-MM-DD');

                await knex("cadastro_pontos")
                    .where({ id_usuario: auth.id })
                    .whereRaw(`DATE(ponto_entrada) = '${dataAtualFormat}'`)
                    .whereNull("deleted_at")
                    .orderBy("id", "ASC")
                    .then((pontos) => res.status(200).json(pontos))
                    .catch((error) => {
                        console.log("######## ponto.get ########")
                        console.log(error)
                        return res.status(500).send()
                    });
            } else {
                /* const { totalPags } = await knex("cadastro_pontos")
                    .count({ totalPags: "*" })
                    .whereNull("deleted_at")
                    .first()

                const pontos = await knex("cadastro_pontos")
                    .whereNull("deleted_at")
                    .limit(limit).offset(page * limit - limit)
                    .orderBy(sort, order)

                return res.status(200).json({ pontos: pontos, totalPags: Math.ceil(totalPags / limit) }) */
            }
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    if (req.method === 'POST') {
        try {
            /* Verifica se tem algum ponto em aberto. (se ponto_saida = null, significa que ta em aberto.) */
            const ponto = await knex("cadastro_pontos")
                .where({ ponto_saida: null })
                .whereNull("deleted_at")
                .first()

            /* Se ponto existir, então o vai ser finalizado */
            if (ponto) {
                await knex("cadastro_pontos")
                    .update({ ponto_saida: dataHoraAtual() })
                    .where({ id: ponto.id })
                    .then(() => res.status(204).send())
                    .catch((error) => {
                        console.log("######## ponto.registrar ########")
                        console.log(error)
                        return res.status(500).send()
                    });
            } else {
                const modelo = {
                    id_usuario: auth.id,
                    ponto_entrada: dataHoraAtual(),
                    ponto_saida: null,
                    created_at: dataHoraAtual(),
                }

                existOrError(modelo.id_usuario, '[id_usuario] não pode ser nulo.')

                await knex("cadastro_pontos")
                    .insert(modelo)
                    .then(() => res.status(204).send())
                    .catch((error) => {
                        console.log("######## ponto.registrar ########")
                        console.log(error)
                        return res.status(500).send()
                    });
            }

        } catch (error) {
            return res.status(400).send(error)
        }
    }
}