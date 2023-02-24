import knex from 'knex'
import config from '../knexfile.js'

let conexao = null;

export function getKnex() {
    if (!conexao) {
        console.log("createConnection")
        conexao = knex(config)
        conexao.migrate.latest()
    }

    return conexao
}