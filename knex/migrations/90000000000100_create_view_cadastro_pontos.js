exports.up = function (knex) {
        return knex.raw(`
        CREATE VIEW vw_cadastro_pontos 
        AS 
        SELECT 
                id,
                id_usuario,
                cadastro_pontos.data,
                entrada1, 
                saida1,  
                entrada2, 
                saida2,
                IF(acrescentar_hrs IS NULL, cast('00:00:00' as time), acrescentar_hrs) AS acrescentar_hrs,
                msg_acrescentar,
                IF(subtrair_hrs IS NULL, cast('00:00:00' as time), subtrair_hrs) AS subtrair_hrs,
                msg_subtrair,
                msg_alteracao,
                alterado,
                p_folga,
                p_feriado,
                p_falta,
                calendario.folga,
                calendario.feriado,
                calendario.texto,
                SEC_TO_TIME(TIME_TO_SEC(saida1) - TIME_TO_SEC(entrada1)) AS "e1_s1",  # Diferença (entrada1 - saida1) #
                SEC_TO_TIME(TIME_TO_SEC(saida2) - TIME_TO_SEC(entrada2)) AS "e2-s2",  # Diferença (entrada2 - saida2) #
                SEC_TO_TIME( 
                        TIME_TO_SEC(IF(acrescentar_hrs IS NULL, cast('00:00:00' as time), acrescentar_hrs)) 
                        - 
                        TIME_TO_SEC(IF(subtrair_hrs IS NULL, cast('00:00:00' as time), subtrair_hrs)) 
                ) AS "acresc_sub",
                SEC_TO_TIME(
                        ( TIME_TO_SEC(saida1) - TIME_TO_SEC(entrada1) ) 
                        + 
                        ( TIME_TO_SEC(saida2) - TIME_TO_SEC(entrada2) ) 
                        +
                        TIME_TO_SEC( IF(acrescentar_hrs IS NULL, cast('00:00:00' as time), acrescentar_hrs) )
                        -
                        TIME_TO_SEC( IF(subtrair_hrs IS NULL, cast('00:00:00' as time), subtrair_hrs) )
                ) AS dif_total,
                CASE
                        WHEN p_folga = 1 THEN 0
                        WHEN p_feriado = 1 THEN 0
                        WHEN p_falta = 1 THEN 0
                        ELSE 1
                END AS contabilizar,
        updated_at
        FROM cadastro_pontos 
        INNER JOIN calendario 
        ON cadastro_pontos.data = calendario.data
      `);
};

exports.down = function (knex) {
        return knex.raw('DROP VIEW vw_cadastro_pontos');
};

