exports.up = function (knex) {
        return knex.raw(`
        CREATE VIEW vw_cadastro_pontos 
        AS 
        SELECT 
                id,
                id_usuario,
                data,
                h_entrada, 
                h_saida,  
                tipo_alteracao,
                outras_alteracao,
                data_old,
                h_entrada_old,
                h_saida_old,
                solicitado_em,
                id_user_alt,
                nome_user_alt,
                SEC_TO_TIME(TIME_TO_SEC(h_saida) - TIME_TO_SEC(h_entrada)) AS "dif_hora",
                TIME_TO_SEC(h_saida) - TIME_TO_SEC(h_entrada) AS "dif_seg",
                updated_at,
                created_at,
                deleted_at
        FROM cadastro_pontos
      `);
};

exports.down = function (knex) {
        return knex.raw('DROP VIEW vw_cadastro_pontos');
};

