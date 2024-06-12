const db = require('../private/DB');

module.exports = {
  //Banco de dados 
  login: (id) =>{
    return new Promise((aceito, rejeitado) => {
      db.query(`SELECT * FROM usuario WHERE  idusuario = ?`, [id], (error, results) =>{
          if (error) { rejeitado(error); return; }
          if (results.length > 0) {
            aceito(results[0]);
          }else{
            aceito(false);
          }
        });    
  });
  
  },

  cadastrarusuario: (nome, numero, email,senhas,tipoUsuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO usuario (nome, numero, email,senha,tipoUsuario) VALUES (?,?,?,?,?) `,
      [nome, numero, email,senhas,tipoUsuario], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },
 
  buscarTodos: () =>{
    return new Promise((aceito, rejeitado)=> {
        db.query(`SELECT * FROM usuario `, (error, results)=>{
          if (error) { rejeitado(error); return;}
          aceito(results);
      });
  });
  
  },

  buscarUm: (codigo) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT * FROM usuario WHERE  idusuario = ?`, [codigo], (error, results) =>{
          if (error) { rejeitado(error); return; }
          if (results.length > 0) {
            aceito(results[0]);
          }else{
            aceito(false);
          }
        });      
    });
  },

  alterar: (codigo,nome, numero, email, hashedSenha,sobre) => {
  return new Promise((aceito, rejeitado) => {
      db.query(`UPDATE usuario SET nome = ?, numero = ? , email = ?, senha = ? , sobre = ? WHERE idusuario = ? `,
       [nome, numero, email, hashedSenha,sobre, codigo], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results);
          });
    });
  },

  codigo: (email,codigo) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO codigos (email,codigo) VALUES (?,?) `,
      [email,codigo], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },

  buscarTodoscodigos: (codigo,email) =>{
    //console.log(codigo,email);
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT * FROM codigos WHERE codigo = ? AND email = ?`,
          [codigo,email],
          (erro, result) => {
          if (erro) { rejeitado(erro); return; }
          if (result.length > 0) {
            //console.log(result)
            aceito(result[0]);
          }else{
            aceito(false);
          }
        }
        );    
  });
  },

  buscarPorEmailNumeroETipo: (email, numero, tipoUsuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`SELECT * FROM usuario WHERE email = ? AND numero = ? AND tipoUsuario = ?
        `, [email, numero, tipoUsuario], (error, results) =>{
          if (error) { rejeitado(error); return; }
          if (results.length > 0) {
            aceito(results[0]);
          }else{
            aceito(false);
          }
        });      
    });
  },  

};