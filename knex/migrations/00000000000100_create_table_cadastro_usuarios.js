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
            table.enu("sexo", ["Selecione", "Masculino", "Feminino"]).notNull().defaultTo('Selecione')

            table.enu("bloqueado", ["Sim", "Não"]).notNull().defaultTo('Não')
            table.string("motivo_bloqueio")

            table.boolean("adm", 1).notNull().defaultTo(0)

            table.timestamp("updated_at").nullable();
            table.timestamp('created_at').nullable();
            table.timestamp("deleted_at").nullable();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_usuarios");
};
