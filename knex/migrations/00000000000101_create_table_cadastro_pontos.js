exports.up = function (knex) {
    return knex.schema
        .createTable("cadastro_pontos", (table) => {
            table.increments("id").primary();
            table.integer('id_usuario').unsigned().notNull().references('id').inTable('cadastro_usuarios')

            table.timestamp('ponto_entrada').nullable()
            table.timestamp('ponto_saida').nullable()

            table.timestamp('ponto_entrada_old').nullable()
            table.timestamp('ponto_saida_old').nullable()

            table.timestamp("updated_at").nullable();
            table.timestamp('created_at').nullable();
            table.timestamp("deleted_at").nullable();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_pontos");
};
