import { getKnex } from "../../../../../knex"
import { passport } from "../../../../../global"
import { existOrError } from "../../utilities"

export default async function handler(req, res) {
    try {
        const auth = await passport(req)
        const knex = getKnex()
        existOrError(auth.adm, { 500: "Usuário logado não é ADM." })

        const id = parseInt(req.query._id) ? parseInt(req.query._id) : null;
        const modelo = {
            entrada1: req.body.entrada1 ? req.body.entrada1 : null,
            saida1: req.body.saida1 ? req.body.saida1 : null,
            entrada2: req.body.entrada2 ? req.body.entrada2 : null,
            saida2: req.body.saida2 ? req.body.saida2 : null,
            acrescentar_hrs: req.body.acrescentar_hrs ? req.body.acrescentar_hrs : null,
            subtrair_hrs: req.body.subtrair_hrs ? req.body.subtrair_hrs : null,
            obs: req.body.obs ? req.body.obs : null
        }

        if (req.method === 'GET') {
            const sortColuns = {
                id: "id",
                data: "data",
                entrada1: "entrada1",
                saida1: "saida1",
                entrada2: "entrada2",
                saida2: "saida2",
                dif_total: "dif_total",
                nome: "nome",
                e1_s1: "e1_s1",
                e2_s2: "e2_s2",
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

            const dinicial = req.query._dinicial ? req.query._dinicial : null;
            const dfinal = req.query._dfinal ? req.query._dfinal : null;
            const funcionario = req.query._funcionario && req.query._funcionario != 'Selecione' ? `AND id_usuario = ${req.query._funcionario}` : "";

            existOrError(dinicial, "Data inical deve ser informada.")
            existOrError(dfinal, "Data final deve ser informada.")

            const { totalPags } = await knex("vw_cadastro_pontos")
                .count({ totalPags: "*" })
                .whereRaw(`DATE(data) BETWEEN '${dinicial}' AND '${dfinal}' ${funcionario}`)
                .first()

            const pontos = await knex("vw_cadastro_pontos")
                .select("vw_cadastro_pontos.*", "cadastro_usuarios.nome")
                .join('cadastro_usuarios', 'vw_cadastro_pontos.id_usuario', '=', 'cadastro_usuarios.id')
                .whereRaw(`DATE(data) BETWEEN '${dinicial}' AND '${dfinal}' ${funcionario}`)
                .limit(limit).offset(page * limit - limit)
                .orderBy(sort, order)

            return res.status(200).json({ data: pontos, totalPags: Math.ceil(totalPags / limit) })
        }

        if (req.method === 'PUT') {
            existOrError(id, { 500: "[id] deve ser informado." })

            const ponto = await knex("vw_cadastro_pontos")
                .select("vw_cadastro_pontos.*", "cadastro_usuarios.nome")
                .join('cadastro_usuarios', 'vw_cadastro_pontos.id_usuario', '=', 'cadastro_usuarios.id')
                .where({ "vw_cadastro_pontos.id": id })
                .first()

            existOrError(ponto, { 500: "Registro não existe ou já foi excluído." })

            const modelo_edit = {
                id_ponto: id,
                entrada1_new: req.body.entrada1,
                saida1_new: req.body.saida1,
                entrada2_new: req.body.entrada2,
                saida2_new: req.body.saida2,
                acrescentar_hrs_new: req.body.acrescentar_hrs,
                subtrair_hrs_new: req.body.subtrair_hrs,
                obs_new: req.body.obs,

                entrada1_old: ponto.entrada1,
                saida1_old: ponto.saida1,
                entrada2_old: ponto.entrada2,
                saida2_old: ponto.saida2,
                acrescentar_hrs_old: ponto.acrescentar_hrs,
                subtrair_hrs_old: ponto.subtrair_hrs,
                obs_old: ponto.obs,

                msg_solicitacao: req.body.msg_solicitacao,
                adm_id: auth.id,
                adm_nome: auth.nome,
            }

            await knex("edit_pontos")
                .insert(modelo_edit)

            await knex("cadastro_pontos")
                .update(modelo)
                .where({ id: id })
                .then(() => res.status(204).send())
                .catch((error) => {
                    console.log("######## adm.pontos.PUT ########")
                    console.log(error)
                    return res.status(500).send()
                });
        }

    } catch (error) {
        return res.status(400).send(error)
    }
}