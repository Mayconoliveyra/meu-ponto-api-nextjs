exports.up = function (knex) {
    return knex.schema
        .createTable("cadastro_funcionarios", (table) => {
            table.increments("id").primary();

            table.string("nome").defaultTo("Não informado").notNull()
            table.string("cpf", 14)
            table.string("email").notNull().unique()
            table.string("senha")
            table.string("contato", 15)

            table.string("cep", 9)
            table.string("logradouro")
            table.string("complemento")
            table.string("bairro")
            table.string("localidade")
            table.string("uf")
            table.string("numero")

            table.boolean("bloqueado", 1).notNull().defaultTo(0)
            table.string("motivo_bloqueio")

            table.double("distancia_km", 8, 1).notNull().defaultTo(0)
            table.double("tempo", 8, 1).notNull().defaultTo(0)

            table.boolean("email_auth", 1).notNull().defaultTo(0) /* Quando ta true, significa que o email foi autenticado, quando utiliza facebook e google seta como true tambem. */
            table.boolean("adm", 1).notNull().defaultTo(0) /* Acesso ao gestão */

            table.timestamp("updated_at").defaultTo(knex.raw("'0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP"));
            table.timestamp('created_at').defaultTo(knex.fn.now())
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_funcionarios");
};
