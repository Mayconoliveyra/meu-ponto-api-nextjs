import { getKnex } from "../../../../knex"
import { existOrError } from "../utilities"
import { passport, dataHoraAtual } from "../../../../global"

export default async function handler(req, res) {
    try {
        const auth = await passport(req)
        const knex = getKnex()

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