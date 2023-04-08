import { getKnex } from "../../../../../knex"
import { passport, dataHoraAtual } from "../../../../../global"
import { notExistOrErrorDB } from "../../utilities"

export default async function handler(req, res) {
    try {
        const auth = await passport(req)
        const knex = getKnex()
        const id = req.params && parseInt(req.params.id) ? parseInt(req.params.id) : null;

        const modelo = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            rg: req.body.rg,
            data_nasc: req.body.data_nasc,
            email: req.body.email,
            contato: req.body.contato,
            sexo: req.body.sexo,
            bloqueado: req.body.bloqueado,
            motivo_bloqueio: req.body.motivo_bloqueio,
        }

        await notExistOrErrorDB({ table: "cadastro_usuarios", column: 'email', data: modelo.email, id: id }, { email: "Já existe cadastro para o e-mail informado." })

        if (id) {
            modelo.updated_at = dataHoraAtual()
            delete modelo.email

            await knex("cadastro_usuarios")
                .update(modelo)
                .where({ id: id })
                .whereNull("deleted_at")
                .then(() => res.status(204).send())
                .catch((error) => {
                    console.log("######## adm.funcionarios.store.update ########")
                    console.log(error)
                    return res.status(500).send()
                });

        } else {
            modelo.created_at = dataHoraAtual()
            await knex("cadastro_usuarios")
                .insert(modelo)
                .then(() => res.status(204).send())
                .catch((error) => {
                    console.log("######## adm.funcionarios.store.insert ########")
                    console.log(error)
                    return res.status(500).send()
                });
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}