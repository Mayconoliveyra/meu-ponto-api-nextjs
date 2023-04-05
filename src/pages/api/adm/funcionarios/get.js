import { getKnex } from "../../../../../knex"
import { passport } from "../../../../../global"

export default async function handler(req, res) {
    try {
        const auth = await passport(req)
        const knex = getKnex()

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
        const id = req.params && parseInt(req.params.id) ? parseInt(req.params.id) : null;
        const search = req.query._search ? req.query._search : null

        const { totalPags } = await knex("cadastro_usuarios")
            .count({ totalPags: "*" })
            .whereNull("deleted_at")
            .first()

        const funcionarios = await knex("cadastro_usuarios")
            .whereNull("deleted_at")
            .limit(limit).offset(page * limit - limit)
            .orderBy(sort, order)

        return res.status(200).json({ datas: funcionarios, totalPags: Math.ceil(totalPags / limit) })

    } catch (error) {
        return res.status(400).send(error)
    }
}