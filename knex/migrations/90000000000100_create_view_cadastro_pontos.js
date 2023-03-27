exports.up = function (knex) {
        return knex.raw(`
        CREATE VIEW vw_cadastro_pontos 
        AS 
        SELECT 
                id,
                id_usuario,
                ponto_entrada, 
                ponto_saida,  
                SEC_TO_TIME(TIME_TO_SEC(ponto_saida) - TIME_TO_SEC(ponto_entrada)) AS "dif_hora",
                TIME_TO_SEC(ponto_saida) - TIME_TO_SEC(ponto_entrada) AS "dif_seg",
                updated_at,
                created_at,
                deleted_at
        FROM cadastro_pontos
      `);
};

exports.down = function (knex) {
        return knex.raw('DROP VIEW vw_cadastro_pontos');
};

