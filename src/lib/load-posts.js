import { getKnex } from "../../knex"
import { dataHoraAtual } from "../../global"

import moment from "moment/moment"

export async function loadPosts() {
    /* formata 'dataHoraAtual', para retornar apenas yyyy-mmm-dd(ano-mes-dia) */
    const dataAtualFormat = moment(dataHoraAtual()).format('YYYY-MM-DD');
    const knex = getKnex()

    const data = await knex("vw_cadastro_pontos")
        .select()
        .where({ id_usuario: 1, data: dataAtualFormat })
        .first()

    return data
}