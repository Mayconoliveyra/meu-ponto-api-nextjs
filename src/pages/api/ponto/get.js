import { getKnex } from "../../../../knex"
import { passport } from "../../../../global"

export default async function handler(req, res) {
    try {
        const auth = await passport(req)
        const knex = getKnex()

        await knex("cadastro_pontos")
            .whereNull("deleted_at")
            .whereRaw(`DATE(created_at) = CURDATE()`)
            .orderBy("id", "ASC")
            .then((pontos) => res.status(200).json(pontos))
            .catch((error) => {
                console.log("######## ponto.get ########")
                console.log(error)
                return res.status(500).send()
            });
    } catch (error) {
        return res.status(400).send(error)
    }
}