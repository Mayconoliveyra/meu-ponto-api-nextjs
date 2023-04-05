import { getKnex } from "../../../../knex"
import { passport, dataHoraAtual } from "../../../../global"
import moment from "moment/moment"

export default async function handler(req, res) {
    try {
        const auth = await passport(req)
        const knex = getKnex()

        const sortColuns = {
            id: "id",
            codigo_interno: "codigo_interno",
            nome: "nome",
            estoque_atual: "estoque_atual",
            preco: "preco",
            preco_promocao: "preco_promocao",
            produto_ativo: "produto_ativo"
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
        const id = req.params && parseInt(req.params.id) ? parseInt(req.params.id) : null;
        const search = req.query._search ? req.query._search : null

 /*        console.log("page: " + page)
        console.log("limit: " + limit)
        console.log("sort: " + sort)
        console.log("order: " + order)
        console.log("id: " + id)
        console.log("search: " + search) */

        /* Se 'true' retorna os pontos diario do usuario logado(utilizado na tela dashboard) */
        const getdiario = req.query._diario ? req.query._diario : null
        if (getdiario) {
            /* formata 'dataHoraAtual', para retornar apenas yyyy-mmm-dd(ano-mes-dia) */
            const dataAtualFormat = moment(dataHoraAtual()).format('YYYY-MM-DD');

            await knex("cadastro_pontos")
                .whereNull("deleted_at")
                .whereRaw(`DATE(created_at) = '${dataAtualFormat}'`)
                .orderBy("id", "ASC")
                .then((pontos) => res.status(200).json(pontos))
                .catch((error) => {
                    console.log("######## ponto.get ########")
                    console.log(error)
                    return res.status(500).send()
                });
        } else {
            const { totalPags } = await knex("cadastro_pontos")
                .count({ totalPags: "*" })
                .whereNull("deleted_at")
                .first()

            const pontos = await knex("cadastro_pontos")
                .whereNull("deleted_at")
                .limit(limit).offset(page * limit - limit)
                .orderBy(sort, order)

            return res.status(200).json({ pontos: pontos, totalPags: Math.ceil(totalPags / limit) })
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}