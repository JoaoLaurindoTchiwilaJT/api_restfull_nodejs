const db = require('../private/DB');


module.exports = {
  //Banco de dados 
 
  cadastrarmensagem: (data,tipo,idemissor,idreceptor) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO mensagem (data,tipo,idemissor,idreceptor) VALUES (?,?,?,?) `,
      [data,tipo,idemissor,idreceptor], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },

  cadastrarconteudo: (data,conteudo,idMensagem) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO conteudo (data,conteudo,idMensagem) VALUES (?,?,?) `,
      [data,conteudo,idMensagem], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  }, 
 
  buscarTodos: (emissor,receptor) =>{
    return new Promise((aceito, rejeitado)=> { 
        //console.log('emissor ' + emissor, 'receptor ' + receptor)
        db.query(`SELECT DISTINCT u.idusuario, u.nome, m.idmensagem, m.data, m.tipo, m.idemissor, m.idreceptor, a.idarquivo, a.caminho, c.conteudo
        FROM usuario u
        INNER JOIN mensagem m ON (m.idemissor = ${emissor} AND m.idreceptor = ${receptor}) OR (m.idemissor = ${receptor} AND m.idreceptor = ${emissor})
        INNER JOIN conteudo c ON c.idMensagem = m.idMensagem  
        LEFT JOIN arquivo a ON a.idconteudo = c.idconteudo
        WHERE (u.idusuario = ${emissor} OR u.idusuario = ${receptor}) AND u.idusuario = ${emissor} ORDER BY m.idmensagem;
         `,[emissor,receptor], (error, results)=>{
          if (error) { rejeitado(error); return;}
         // console.log(results)
          aceito(results);
      });
  });
  
  },

  buscarTodosid: (idmensagem) =>{
    return new Promise((aceito, rejeitado)=> { 
        //console.log('emissor ' + emissor, 'receptor ' + receptor)
        db.query(`SELECT  tipo from mensagem  WHERE idmensagem = ${idmensagem};
         `,[idmensagem], (error, results)=>{
          if (error) { rejeitado(error); return;}
          //console.log(results)
          aceito(results[0]);
      });
         
  });
  
  },

  alterar: (idmensagem, descricao) => {
   return new Promise((aceito, rejeitado) => {
    db.query(
      `UPDATE mensagem SET conteudo = ? WHERE idmensagem = ?`,
      [descricao, idmensagem],
      (error, results) => {
          if (error) {
              // Se houver um erro durante a atualização
              console.error('Erro ao atualizar a mensagem:', error);
              rejeitado(error);
          } else {
              // Se a atualização for bem-sucedida
              if (results.affectedRows > 0) {
                  // A atualização afetou pelo menos uma linha
                  aceito(results);
              } else {
                  // A atualização não afetou nenhuma linha (possivelmente porque o ID da mensagem não foi encontrado)
                 
                  rejeitado(new Error('Nenhuma mensagem foi atualizada. Possível inexistencia de id'));
              }
          }
      }
  );
  
    });
  },

  alterararquivo: (idmensagem,caminhoCodificado,data_envio,extensao) => {
    return new Promise((aceito, rejeitado) => {
       db.query(`UPDATE arquivo SET caminho = ? , data = ? , extensao = ? WHERE idmensagem = ?  `,
        [caminhoCodificado,data_envio,extensao,idmensagem], 
        (error, results) =>{
           if (error) { rejeitado(error); return; }
               aceito(results);
       });
     });
   },

  excluir: (idmensagem) =>{
    return new Promise((aceito, rejeitado)=> {    
    db.query(
      `DELETE FROM mensagem WHERE idmensagem = ?`,
      [idmensagem],
      (error, results) => {
          if (error) {
              // Se houver um erro durante a exclusão
              console.error('Erro ao excluir a mensagem:', error);
              rejeitado(error);
          } else {
              // Se a exclusão for bem-sucedida
              if (results.affectedRows > 0) {
                  // A exclusão afetou pelo menos uma linha
                  console.log('Mensagem excluída com sucesso!');
                  aceito(results);
              } else {
                  // A exclusão não afetou nenhuma linha
                  console.log('Nenhuma mensagem foi excluída.');
              }
          }
      }
  );    
  });
  
  },

  excluirarquivosms: (idmensagem) =>{
    return new Promise((aceito, rejeitado)=> { 
       
    db.query(
      `DELETE FROM mensagem WHERE idemissor = ?`,
      [idmensagem],
      (error, results) => {
          if (error) {
              // Se houver um erro durante a exclusão
              console.error('Erro ao excluir a mensagem:', error);
              rejeitado(error);
          } else {
              // Se a exclusão for bem-sucedida
              if (results.affectedRows > 0) {
                  // A exclusão afetou pelo menos uma linha
                  //console.log('Mensagem excluída com sucesso!');
                  aceito(results);
              } else {
                  // A exclusão não afetou nenhuma linha
                  //console.log('Nenhuma mensagem foi excluída.');
              }
          }
      }
  );    
  });
  
  },

  inserirarquivo: (caminho,data,extensao,idmensagem,idusuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO arquivo (caminho,data,extensao,idmensagem,idusuario) VALUES (?,?,?,?,?) `,
      [caminho,data,extensao,idmensagem,idusuario], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },   

  amigos: (idusuario) =>{
    return new Promise((aceito, rejeitado)=> { 
       //console.log('emissor ' + emissor, 'receptor ' + receptor)
        db.query(`SELECT idusuario, nome, conteudo
        FROM (
            SELECT 
                u.idusuario, 
                u.nome, 
                c.conteudo,
                ROW_NUMBER() OVER (PARTITION BY u.idusuario ORDER BY m.idMensagem DESC) AS row_num
            FROM usuario u
            INNER JOIN mensagem m ON u.idusuario = CASE
                                                     WHEN m.idreceptor = ${idusuario} THEN m.idemissor
                                                     ELSE m.idreceptor
                                                 END
            INNER JOIN conteudo c ON m.idMensagem = c.idMensagem
            WHERE ${idusuario} IN (m.idreceptor, m.idemissor)
        ) AS sub
        WHERE row_num = 1;
        `,[idusuario], (error, results)=>{
          if (error) { rejeitado(error); return;}
          //console.log(results)
          aceito(results);
       });
  });
    
  },
   
};