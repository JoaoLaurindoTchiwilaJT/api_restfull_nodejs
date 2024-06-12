const db = require('../private/DB');

module.exports = {
  //Banco de dados 
  cadastrarcandidato: (localidade,cidade,setor,habilidades,instituicao_formacao,data_nasc,idusuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO candidato (localidade,cidade,setor,habilidades,instituicao_formacao,data_nasc,idusuario) VALUES (?,?,?,?,?,?,?) `,
      [localidade,cidade,setor,habilidades,instituicao_formacao,data_nasc,idusuario], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },
 
  buscarTodos: () =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT usuario.*, candidato.* FROM usuario  inner JOIN candidato ON usuario.idusuario = candidato.idusuario `,
          (error, results) => {
            if (error) {
              // Tratar erro se ocorrer
              rejeitado(error);
              return;
            }
               
            // Se chegou aqui, os dados do candidato foram encontrados e podem ser retornados
            aceito(results);
            mycache.set(`/candidato/candidato`, results);
          }
        );    
  });
  
  },

  buscarUm: (codigo) => {
    return new Promise((aceito, rejeitado) => {      
          db.query(`SELECT usuario.*, candidato.* FROM usuario LEFT JOIN candidato ON usuario.idusuario = candidato.idusuario WHERE usuario.idusuario = ?`,
            [codigo],
            (error, results) => {
              if (error) {
                // Tratar erro se ocorrer
                rejeitado(error);
                return;
              }
          
              if (results.length === 0) {
                // Se não houver nenhum resultado, retornar uma mensagem de erro
                rejeitado(new Error('Candidato não encontrado'));
                return;
              }
          
              // Verificar se os campos específicos relacionados ao candidato são null
              const candidato = results[0];
              if (candidato.habilidades === null) {
                // Se os dados do candidato estiverem vazios, retornar uma mensagem de erro
                rejeitado(new Error('Candidato não encontrado'));
                return;
              }
          
              // Se chegou aqui, os dados do candidato foram encontrados e podem ser retornados
              aceito(candidato);
            }
          );      
    });
  },

  alterar: (codigo, habilidades,instituicao_formacao,data_nasc,localidade,cidade,setor,sobre) => {    
    return new Promise((aceito, rejeitado) => {
      db.query(
        `UPDATE candidato SET habilidades = ?, instituicao_formacao = ?, data_nasc = ?, localidade = ?, cidade = ?, setor = ?, sobre = ? WHERE candidato.idusuario = ?`,
        [habilidades, instituicao_formacao, data_nasc, localidade, cidade, setor, sobre, codigo],
        (error, results) => {
          if (error) {
            // Se houve um erro na execução da consulta, retorne o erro
            rejeitado(error);
            return;
          }
      
          if (results.affectedRows === 0) {
            // Se nenhuma linha foi afetada pela atualização, significa que o ID não existe
            rejeitado(new Error(' ID do candidato não encontrado'));
            return;
          }
      
          // Se chegou aqui, a atualização foi bem-sucedida
          aceito(results);
        }
      );
      
    });
  },

  excluir: (codigo) =>{
    return new Promise((aceito, rejeitado)=> { 
      db.query(`DELETE FROM candidatura WHERE candidatura.idcandidato = ? `,[codigo], (error, results)=>{
        if (error) {  rejeitado(error); return;}
        aceito(results);
    });
    db.query(`DELETE FROM candidato WHERE idcandidato = ? `,[codigo], (error, results)=>{
        if (error) {  rejeitado(error); return;}
        aceito(results);
        if (results.affectedRows === 0) {
          // Se nenhuma linha foi afetada pela atualização, significa que o ID não existe
          rejeitado(new Error('ID do candidato não encontrado'));
          return;
        }
    
        // Se chegou aqui, a atualização foi bem-sucedida
        aceito(results);
    });


  });
  
  

  },

};