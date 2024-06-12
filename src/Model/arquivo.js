const db = require('../private/DB');

module.exports = {
  //Banco de dados 

  inserir: (caminho,data,extensao,idusuario) => {
    return new Promise((aceito, rejeitado) => {
        db.query(`INSERT INTO arquivo (caminho,data,extensao,idusuario) VALUES (?,?,?,?) `,
      [caminho,data,extensao,idusuario], 
       (error, results) =>{
          if (error) { rejeitado(error); return; }
              aceito(results.insertId);
      });
    });
  },
 
  buscarTodos: () =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT arquivo.* FROM arquivo inner join usuario on arquivo.idusuario = usuario.idusuario order by data ASC`, (error, results)=>{
          if (error) { rejeitado(error); return;}
          aceito(results);
      });    
  });
  
  },
 
  buscarTodosPorID: (id) =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT arquivo.* FROM arquivo inner join usuario on arquivo.idusuario = usuario.idusuario where arquivo.idusuario = ?  ORDER BY data`,[id], (error, results)=>{
          if (error) { rejeitado(error); return;}
          //console.log(results);
           // Verificar se o conjunto de resultados está vazio
           if (results.length === 0) {
            // Se não houver resultados, você pode tratar isso como um erro
            const err = new Error('Arquivo inexistente');
            rejeitado(err);
            
        }
          aceito(results);
      });
 });
  
  },

  procurarporID: (id) =>{
    return new Promise((aceito, rejeitado)=> { 
        db.query(`SELECT arquivo.* FROM arquivo inner join mensagem on arquivo.idmensagem = mensagem.idmensagem where arquivo.idmensagem = ? ORDER BY data`,[id], (error, results)=>{
          if (error) { rejeitado(error); return;}
          //console.log(results);
           // Verificar se o conjunto de resultados está vazio
           if (results.length === 0) {
            // Se não houver resultados, você pode tratar isso como um erro
            const err = new Error('Arquivo inexistente');
            rejeitado(err);
            
        }
          aceito(results[0]);
          mycache.set(`/arquivo/`, results);
      });
  });
  
  },

  excluir: (nome) =>{
    return new Promise((aceito, rejeitado)=> { 
      db.query(
        `DELETE FROM arquivo WHERE caminho = ?`,
        [nome],
        (error, results) => {
            if (error) {
                // Se houver um erro durante a exclusão
                console.error('Erro ao excluir o arquivo:', error);
                rejeitado(error);
            } else {
                // Se a exclusão for bem-sucedida
                if (results.affectedRows > 0) {
                    // A exclusão afetou pelo menos uma linha
                   // console.log('Arquivo excluído com sucesso!');
                    aceito(results);
                } else {
                    // A exclusão não afetou nenhuma linha (possivelmente porque o arquivo não foi encontrado)
                   // console.log(' Nenhum arquivo foi excluído. Verifique o nome do arquivo.');
                    rejeitado(new Error(' Nenhum arquivo foi excluído.'));
                }
            }
        }
    );
  });
  
  },
};