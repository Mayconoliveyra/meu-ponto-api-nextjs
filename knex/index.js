import knex from 'knex'
import config from '../knexfile.js'

let conexao = null;


const getKnex = () => {
    if (!conexao) {
        console.log("createConnection")
        conexao = knex(config)
        conexao.migrate.latest()
    }

    return conexao
}

export { getKnex }