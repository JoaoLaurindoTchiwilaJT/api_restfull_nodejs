const db = require('../private/DB');

module.exports = {
  //Banco de dados  
 
  cadastrarcandidatura: (estado,data_envio,idvaga,idcandidato) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO candidatura (estado,data_envio,idvaga,idcandidato) VALUES (?,?,?,?) `,
      [estado,data_envio,idvaga,idcandidato], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },
 
  buscarTodascandidaturascandidato: (id) =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT candidatura.* FROM candidatura inner join candidato on candidatura.idcandidato = candidato.idusuario  where candidatura.idcandidato = ? order by data_envio ASC`,[id] ,(error, results)=>{
          if (error) { rejeitado(error); return;}
          aceito(results);    
      });
  });
  
  },

  buscarTodascandidaturasempresa: (id) =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT * FROM candidatura INNER JOIN vaga ON candidatura.idvaga = vaga.idempresa WHERE candidatura.idvaga = ? ORDER BY data_envio ASC`, [id], (error, results) => {
          if (error) { 
              // Se houver um erro, rejeitar a Promise
              rejeitado(error); 
              return;
          }
          
          // Verificar se o conjunto de resultados está vazio
          if (results.length === 0) {
              // Se não houver resultados, você pode tratar isso como um erro
              const err = new Error('Nenhuma candidatura encontrada para o ID especificado');
              rejeitado(err);
              return;
          }
          
          // Se chegou aqui, os resultados foram encontrados e podem ser aceitos
          aceito(results);
      });
  });
  
  },

  alterar: (estado, data_envio,codigo) => {

    return new Promise((aceito, rejeitado) => {
      db.query(`UPDATE candidatura SET estado = ? data_envio = ? WHERE idcandidatura = ? `,
       [estado, data_envio, codigo], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results);
      });
    });
  },

  excluir: (codigo) =>{
    return new Promise((aceito, rejeitado)=> { 
    db.query(`DELETE FROM candidatura WHERE idcandidatura = ? `,[codigo], (error, results)=>{
        if (error) {  rejeitado(error); return;}
        aceito(results);
    });
  });
  
  },

};