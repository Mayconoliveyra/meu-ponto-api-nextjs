const { loadEnvConfig } = require('@next/env')
const dev = process.env.NODE_ENV !== 'production'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = loadEnvConfig('./', dev).combinedEnv

module.exports = {
    client: 'mysql2',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        port: DB_PORT,
        dateStrings: true,
    },
    pool: {
        min: 0,
        max: 7
    },
    migrations: {
        directory: './knex/migrations',
    },
    seeds: {
        directory: './knex/seeds',
    },
}