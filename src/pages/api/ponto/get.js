import { getKnex } from "../../../../knex"
import { passport, dataHoraAtual } from "../../../../global"
import moment from "moment/moment"

export default async function handler(req, res) {
    try {
        const auth = await passport(req)
        const knex = getKnex()

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
    } catch (error) {
        return res.status(400).send(error)
    }
}