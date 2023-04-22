const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = require("./credentials")
module.exports = {
    client: 'mysql2',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: process.env.DB_DATABASE,
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