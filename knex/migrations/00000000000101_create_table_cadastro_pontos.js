exports.up = function (knex) {
    return knex.schema
        .createTable("cadastro_pontos", (table) => {
            table.increments("id").primary();
            table.integer('id_usuario').unsigned().notNull().references('id').inTable('cadastro_usuarios')

            table.date('data').nullable()
            table.time('h_entrada').nullable()
            table.time('h_saida').nullable()

            table.enu("tipo_alteracao", ["Selecione", "Data", "Hora", "Data e Hora", "Outras"]).defaultTo('Selecione')
            table.string("outras_alteracao")

            table.date('data_old').nullable()
            table.time('h_entrada_old').nullable()
            table.time('h_saida_old').nullable()

            table.timestamp("solicitado_em").nullable();

            table.integer('id_user_alt') /* ID do usuario que confirmou a alteração */
            table.string("nome_user_alt").notNull(); /* nome do usuario que confirmou a alteração */

            table.timestamp("updated_at").nullable();
            table.timestamp('created_at').nullable();
            table.timestamp("deleted_at").nullable();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable("cadastro_pontos");
};
