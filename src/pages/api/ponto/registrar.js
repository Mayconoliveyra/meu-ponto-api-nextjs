import { getKnex } from "../../../../knex"
import { existOrError } from "../utilities"

export default async function handler(req, res) {
    console.log(req.body)
    const knex = getKnex()
    const modelo = {
        id_usuario: req.body.id,
        ponto_entrada: knex.fn.now(),
        ponto_saida: knex.fn.now()
    }

    await knex("cadastro_pontos")
        .insert(modelo)
        .then(() => res.status(204).send())
        .catch(() => res.status(500).send());
}