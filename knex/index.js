import knex from 'knex'
import config from '../knexfile.js'

let conexao = global.pg
if (!conexao) conexao = global.pg = {}

const getKnex = () => {
    if (!conexao.instance) {
        console.log("createConnection")
        conexao.instance = knex(config)
        conexao.instance.migrate.latest()
    }

    return conexao.instance
}

export { getKnex }