const db = require('../private/DB');


module.exports = {
  //Banco de dados 
  cadastrarempresa: (site,setor,localizacao,idusuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO empresa (site,setor,localizacao,idusuario) VALUES (?,?,?,?) `,
      [site,setor,localizacao,idusuario], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },
 
  buscarTodos: () =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT * FROM empresa inner join usuario on empresa.idusuario = usuario.idusuario order by empresa.idusuario`, (error, results)=>{
          if (error) { rejeitado(error); return;}
          aceito(results);
      });
  });
  
  },

  buscarUm: (codigo) => {
    return new Promise((aceito, rejeitado) => {     
          db.query(
            `SELECT usuario.*, empresa.* FROM usuario LEFT JOIN empresa ON usuario.idusuario = empresa.idusuario
             WHERE usuario.idusuario = ?`,
            [codigo],
            (error, results) => {
              if (error) {
                // Tratar erro se ocorrer
                rejeitado(error);
                return;
              }
          
              if (results.length > 0) {
                // Se houver resultados, verificar se o campo idempresa é null
                if (results[0].idempresa === null) {
                  // Se o idempresa for null, retornar uma mensagem de erro
                  rejeitado(new Error('Empresa não encontrada'));
                  return;
                }
          
                // Se chegou aqui, os dados da empresa foram encontrados e podem ser retornados
                aceito(results[0]);
              } else {
                // Se não houver resultados, retornar false
                aceito(false);
              }
            }
          );      
    });
  },

  buscarUmprocura: (codigo) => {
    return new Promise((aceito, rejeitado) => {      
          db.query(`SELECT idempresa FROM empresa inner join usuario on empresa.idusuario = empresa.idusuario where empresa.idusuario = ? `,
            [codigo],
            (error, results) => {
              if (error) {
                // Tratar erro se ocorrer
                rejeitado(error);
                return;
              }
              
              if (results.length > 0) {
                // Se houver resultados, verificar se o campo idempresa é null
                if (results[0].idempresa === null) {
                  // Se o idempresa for null, retornar uma mensagem de erro
                  rejeitado(new Error('Empresa não encontrada'));
                  return;
                }
          
                // Se chegou aqui, os dados da empresa foram encontrados e podem ser retornados
                aceito(results[0]);
              } else {
                // Se não houver resultados, retornar false
                aceito(false);
              }
            }
          );      
    });
  },

  alterar: (site,setor,localizacao,codigo) => {
    return new Promise((aceito, rejeitado) => {
      db.query(`UPDATE empresa SET site = ? ,setor = ? ,localizacao = ? WHERE empresa.idusuario = ? `,
       [site,setor,localizacao,codigo], 
       (error, results) => {
        if (error) {
          // Se houve um erro na execução da consulta, retorne o erro
          rejeitado(error);
          return;
        }
    
        if (results.affectedRows === 0) {
          // Se nenhuma linha foi afetada pela atualização, significa que o ID não existe
          rejeitado(new Error('ID da empresa não encontrado'));
          return;
        }
    
        // Se chegou aqui, a atualização foi bem-sucedida
        aceito(results);
      });
    });
  },

  excluir: (codigo) =>{
    return new Promise((aceito, rejeitado)=> { 
    db.query(`DELETE FROM candidatura WHERE candidatura.idvaga = ? `,[codigo], (error, results)=>{
        if (error) {  rejeitado(error); return;}
        aceito(results);
    });
    db.query(`DELETE FROM vaga WHERE vaga.idempresa = ? `,[codigo], (error, results)=>{
      if (error) {  rejeitado(error); return;}
      aceito(results);
    });
    db.query(`DELETE FROM empresa WHERE idempresa = ? `,[codigo], (error, results)=>{
        if (error) {  rejeitado(error); return;}
        aceito(results);
    });
  });
  
  },

};