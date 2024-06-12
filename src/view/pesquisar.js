const vaga = require('../Model/vaga');
 
module.exports = {
    //Banco de dados    
  pesquisar: async (req, res) => {
      let result;
      let valor = req.body.valor;
      try{
        if (valor) {
          let dados = await vaga.pesquisar(valor);
          result = dados;
          res.status(200).json(result);
        }else{
          res.status(400).json('Verifique os dados a serem enviados')
        }    
      } catch (error) {
        res.status(500).json('Erro interno do servidor ' + error.message);
      }
  },   
}