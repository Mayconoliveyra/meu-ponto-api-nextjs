exports.up = function (knex) {
    return knex.schema
        .createTable("cadastro_pontos", (table) => {
            table.increments("id").primary();
            table.integer('id_usuario').unsigned().notNull().references('id').inTable('cadastro_usuarios')

            table.timestamp('ponto_entrada').nullable()
            table.timestamp('ponto_saida').nullable()

            table.timestamp("updated_at").defaultTo(knex.raw("NULL ON UPDATE CURRENT_TIMESTAMP")).nullable();
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp("deleted_at").nullable();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_pontos");
};
