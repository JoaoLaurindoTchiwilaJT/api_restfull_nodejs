const db = require('../private/DB');

module.exports = {
  //Banco de dados 
 
  cadastrarvaga: (titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd, data, idempresa) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO vaga (titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd_vaga, data, idempresa) VALUES (?,?,?,?,?,?,?,?,?,?,?) `,
      [titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd, data, idempresa], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results);
      });
    });
  },
 //buscar vagas de uma determinada empresa por ID
  buscarTodasVagasporid: (id) =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT vaga.*, empresa.* , usuario.nome FROM vaga inner join empresa on vaga.idempresa = empresa.idusuario inner join usuario  on usuario.idusuario = empresa.idusuario where vaga.idempresa = ? order by data `,[id] ,(error, results)=>{
          if (error) { rejeitado(error); return;}
          aceito(results);
      });    
  });
  
  },

  //Procurando uma vaga por id para utilizar em outra parte do projecto
  buscarTodasVagasporidprocura: (id) =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT idusuario FROM vaga inner join empresa on vaga.idempresa = empresa.idempresa where idvaga = ? `,[id] ,(error, results)=>{
          if (error) { rejeitado(error); return;}
          aceito(results[0]);

      });    
  });
  
  },

  buscarTodos: () =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT * FROM vaga order by data ASC` ,(error, results)=>{
          if (error) { rejeitado(error); return;}
          aceito(results);
      });    
  });
  
  },

  alterar: (codigo,titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd_vaga, data) => {
   return new Promise((aceito, rejeitado) => {
    db.query(
      `UPDATE vaga SET titulo = ?, descricao = ?, responsabilidades = ?, diferenciais = ?, beneficios = ?, experiencia = ?, tempo_trabalho = ?, salario = ?, qtd_vaga = ?, data = ?  WHERE idvaga = ?`,
      [titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd_vaga, data, codigo],
      (error, results) => {
        if (error) {
          // Se houve um erro na execução da consulta, retorne o erro
          rejeitado(error);
          return;
        }
    
        if (results.affectedRows === 0) {
          // Se nenhuma linha foi afetada pela atualização, significa que o ID não existe
          rejeitado(new Error('ID da vaga não encontrada'));
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
      db.query(`DELETE FROM candidatura WHERE candidatura.idvaga = ? `,[codigo], (error, results)=>{
        if (error) {  rejeitado(error); return;}
        aceito(results);
    });
    db.query(`DELETE FROM vaga WHERE idvaga = ? `,[codigo], (error, results)=>{
        if (error) {  rejeitado(error); return;}
        aceito(results);
    });
  });
  
  },

  pesquisar: (valor) =>{
    return new Promise((aceito, rejeitado)=> { 
      // Converta a string de valor de pesquisa em um array
    const valorArray = valor.split(' ');

    // Inicialize um array vazio para armazenar as consultas individuais para cada valor
    const valorQueries = [];

    // Percorra o array de valores e crie uma consulta para cada valor
    valorArray.forEach(valor => {
        valorQueries.push(`titulo LIKE '%${valor}%'`);
    });

    // Junte as consultas individuais com operadores lógicos (AND ou OR)
    const query = `SELECT * FROM vaga WHERE ${valorQueries.join(' OR ')}`;

    db.query(query, (error, results) => {
        if (error) {
            rejeitado(error);
            return;
        }
        aceito(results);
    });
    
  });
  
  },

};