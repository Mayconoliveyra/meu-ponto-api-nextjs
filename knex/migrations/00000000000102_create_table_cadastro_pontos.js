exports.up = function (knex) {
    return knex.schema
        .createTable("cadastro_pontos", (table) => {
            table.increments("id").primary();
            table.integer('id_usuario').unsigned().notNull().references('id').inTable('cadastro_usuarios')

            table.date('data').notNull().references('data').inTable('calendario')
            table.time('entrada1').nullable()
            table.time('saida1').nullable()
            table.time('entrada2').nullable()
            table.time('saida2').nullable()

            table.time('acrescentar_hrs').nullable()
            table.string("msg_acrescentar")

            table.time('subtrair_hrs').nullable()
            table.string("msg_subtrair")

            table.string("msg_alteracao")
            table.boolean("alterado", 1).notNull().defaultTo(0)

            table.boolean("p_folga", 1).notNull().defaultTo(0)
            table.boolean("p_feriado", 1).notNull().defaultTo(0)
            table.boolean("p_falta", 1).notNull().defaultTo(0)

            table.timestamp("updated_at").defaultTo(knex.raw("NULL ON UPDATE CURRENT_TIMESTAMP"));
        })
};

/* table.date('data_old').nullable() */
/* table.time('h_entrada').nullable()
table.time('h_saida').nullable() */
/* table.time('h_entrada').nullable()
table.time('h_saida').nullable() */
/* table.enu("tipo_alteracao", ["Selecione", "Data", "Hora", "Data e Hora", "Outras"]).defaultTo('Selecione') */
/* table.timestamp("solicitado_em").nullable(); */
/* table.integer('id_user_alt')  */
/* table.string("nome_user_alt")  */
/* table.timestamp('created_at').nullable();
table.timestamp("deleted_at").nullable(); */

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_pontos");
};
