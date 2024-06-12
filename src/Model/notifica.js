const db = require('../private/DB');

module.exports = {
  //Banco de dados 
  
   cadastrarnotificacaosms: (data, descricao, id_emissor,id_receptor,tipo_notificacao) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO notificacao (data, descricao, idemissor,idreceptor,tipo_notificacao) VALUES (?,?,?,?,?) `,
      [data, descricao,id_emissor,id_receptor,tipo_notificacao], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },

  cadastrarnotificacaocandidatura: (data, descricao, id_emissor,id_receptor,tipo_notificacao) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO notificacao (data, descricao, id_emissor,id_receptor,tipo_notificacao) VALUES (?,?,?,?,?) `,
      [data, descricao,id_emissor,id_receptor,tipo_notificacao], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },

  cadastrarnotificacaovaga: (data, titulo,idempresa,tipo_notificacao) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO notificacao (data, descricao,idemissor,tipo_notificacao) VALUES (?,?,?,?) `,
      [data, titulo,idempresa,tipo_notificacao], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },
 
  buscarTodasNotificacoescandidatos: (codigo,habilidadesUsuario) =>{
    return new Promise((aceito, rejeitado)=> { 
        // Converta a string de habilidades do usuário em um array
      const habilidadesArray = habilidadesUsuario.split(',');
     // console.log(habilidadesArray);
      // Inicialize um array vazio para armazenar as consultas individuais para cada habilidade
      const habilidadesQueries = [];

      // Percorra o array de habilidades e crie uma consulta para cada habilidade
      habilidadesArray.forEach(habilidade => {
          habilidadesQueries.push(`descricao LIKE '%${habilidade}%'`);
      }); 

      // Junte todas as consultas em uma única string usando o operador OR
      const habilidadesQuery = habilidadesQueries.join(' OR ');
      // Consulta SQL
      db.query(`
        SELECT *
        FROM notificacao
        WHERE 
          (tipo_notificacao = 'vaga' AND (${habilidadesQuery}))
          OR
          (tipo_notificacao = 'mensagem' AND id_receptor = ?)
      `, [codigo], (error, resultados) => {
        if (error) { 
          rejeitado(error); 
          return; 
        }
        aceito(resultados);
      });
    });

  }, 

  buscarTodasNotificacoesempresa: (codigo) =>{ 
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT * FROM notificacao WHERE id_receptor = ?  AND (tipo_notificacao = 'candidatura' or tipo_notificacao = 'mensagem')`
        , [codigo],(error, results)=>{
          if (error) { rejeitado(error); return;}
          aceito(results);
      });    
  });
  
  },

  excluir: (codigo) =>{
    return new Promise((aceito, rejeitado)=> { 
    db.query(`DELETE FROM notificacao WHERE idnotificacao = ? `,[codigo], (error, results)=>{
        if (error) {  rejeitado(error); return;}
        aceito(results);
    });
  });
  
  },

};