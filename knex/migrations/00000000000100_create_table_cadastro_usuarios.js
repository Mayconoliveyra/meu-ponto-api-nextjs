exports.up = function (knex) {
    return knex.schema
        .createTable("cadastro_usuarios", (table) => {
            table.increments("id").primary();

            table.string("nome").notNull()
            table.string("cpf", 14)
            table.string("rg", 12)
            table.string("data_nasc", 10)

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

            table.boolean("adm", 1).notNull().defaultTo(0) /* Acesso ao gestão */

            table.timestamp("updated_at").nullable();
            table.timestamp('created_at').nullable();
            table.timestamp("deleted_at").nullable();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_usuarios");
};
