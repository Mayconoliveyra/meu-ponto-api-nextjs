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
                data: "data",
                h_entrada: "h_entrada",
                h_saida: "h_saida",
                tipo_alteracao: "tipo_alteracao",
                dif_hora: "dif_hora",
                dif_seg: "dif_seg",
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

            const dinicial = req.query._dinicial ? req.query._dinicial : null
            const dfinal = req.query._dfinal ? req.query._dfinal : null

            /* Se 'getdiario' tiver setado com algum valor retornar os pontos diario.(utilizado na tela dashboard) */
            const getdiario = req.query._diario ? req.query._diario : null
            if (getdiario) {
                /* formata 'dataHoraAtual', para retornar apenas yyyy-mmm-dd(ano-mes-dia) */
                const dataAtualFormat = moment(dataHoraAtual()).format('YYYY-MM-DD');

                await knex("vw_cadastro_pontos")
                    .select("id", "data", "h_entrada", "h_saida", "tipo_alteracao", "outras_alteracao", "data_old", "h_entrada_old", "h_saida_old", "solicitado_em", "id_user_alt", "nome_user_alt", "dif_hora", "dif_seg", "created_at", "updated_at")
                    .where({ id_usuario: auth.id })
                    .whereRaw(`DATE(data) = '${dataAtualFormat}'`)
                    .whereNull("deleted_at")
                    .orderBy("id", "ASC")
                    .then((pontos) => res.status(200).json(pontos))
                    .catch((error) => {
                        console.log("######## ponto.get.diario ########")
                        console.log(error)
                        return res.status(500).send()
                    });
            } else {
                if (id) {
                    await knex("vw_cadastro_pontos")
                        .select("id", "data", "h_entrada", "h_saida", "tipo_alteracao", "outras_alteracao", "data_old", "h_entrada_old", "h_saida_old", "solicitado_em", "id_user_alt", "nome_user_alt", "dif_hora", "dif_seg", "created_at", "updated_at")
                        .where({ id_usuario: auth.id, id: id })
                        .whereNull("deleted_at")
                        .first()
                        .then((pontos) => res.status(200).json(pontos))
                        .catch((error) => {
                            console.log("######## ponto.GET.id ########")
                            console.log(error)
                            return res.status(500).send()
                        });

                } else {
                    existOrError(dinicial, "Data inical deve ser informada.")
                    existOrError(dfinal, "Data final deve ser informada.")

                    const { totalPags } = await knex("vw_cadastro_pontos")
                        .where({ id_usuario: auth.id })
                        .count({ totalPags: "*" })
                        .whereRaw(`DATE(data) BETWEEN '${dinicial}' AND '${dfinal}'`)
                        .whereNull("deleted_at")
                        .first()

                    const pontos = await knex("vw_cadastro_pontos")
                        .select("id", "data", "h_entrada", "h_saida", "tipo_alteracao", "outras_alteracao", "data_old", "h_entrada_old", "h_saida_old", "solicitado_em", "id_user_alt", "nome_user_alt", "dif_hora", "dif_seg", "created_at", "updated_at")
                        .where({ id_usuario: auth.id })
                        .whereRaw(`DATE(data) BETWEEN '${dinicial}' AND '${dfinal}'`)
                        .whereNull("deleted_at")
                        .limit(limit).offset(page * limit - limit)
                        .orderBy(sort, order)

                    return res.status(200).json({ data: pontos, totalPags: Math.ceil(totalPags / limit) })
                }
            }
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    if (req.method === 'POST') {
        try {
            /* Verifica se tem algum ponto em aberto. (se ponto_saida = null, significa que ta em aberto.) */
            const ponto = await knex("cadastro_pontos")
                .where({ h_saida: null })
                .whereNull("deleted_at")
                .first()

            /* Se ponto existir, então o vai ser finalizado */
            if (ponto) {
                await knex("cadastro_pontos")
                    .update({ h_saida: dataHoraAtual() })
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
                    data: dataHoraAtual(),
                    h_entrada: dataHoraAtual(),
                    h_saida: null,
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