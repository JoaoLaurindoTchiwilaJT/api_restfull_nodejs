const vaga = require('../Model/vaga');
const notificar = require('../Model/notifica');


module.exports = {
    //Banco de dados
    cadastrarvaga: async (req, res) => {
        let  result;
        const {titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd_vaga, idempresa} = req.body;
        let data = new Date();
        const data_envio = new Date(data);
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
        const dia = String(data.getDate()).padStart(2, '0');
        data = `${ano}/${mes}/${dia}`;
        let tipo_notificacao = 'vaga';
            try {   
             if (titulo && descricao && responsabilidades && diferenciais && beneficios && experiencia && tempo_trabalho && salario && qtd_vaga && idempresa) {
                await vaga.cadastrarvaga(titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd_vaga, data, idempresa);
                await notificar.cadastrarnotificacaovaga(data, titulo,idempresa,tipo_notificacao);
                result = 'Vaga cadastrada com sucesso';
                res.status(200).json(result);
             }else{
                res.status(400).json('Verifique os dados a serem enviados');
             }
            } catch (error) {
              res.status(500).json('Erro interno do servidor ' + error.message);
            }   
    }, 

    buscarTodasvagasid: async (req, res) => {
        let  result;
        const id = req.params.id;


        try{
            if (id) {
                let dados = await vaga.buscarTodasVagasporid(id);
                result =  dados;
                res.status(200).json(result);
            }else{
                res.status(400).json('Veriique o id se está sendo enviado como parametro na url');
            }
            
        } catch (error) {
          res.status(500).json('Erro interno do servidor ' + error.message);
        }
    },

    buscarTodasvagas: async (req, res) => {
        let result;
        try{
            let dados = await vaga.buscarTodos();
            result = dados;
            res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error.message);
        }
    },
  
    editarvagaPorId: async (req, res) => {
        let result;
        let codigo = req.params.id;
        const {titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd_vaga}= req.body;
        const data = new Date();
        
        try{              
            if (titulo && descricao && responsabilidades && diferenciais && beneficios && experiencia && tempo_trabalho && salario && qtd_vaga && idempresa){
                await vaga.alterar(codigo,titulo, descricao, responsabilidades, diferenciais, beneficios, experiencia, tempo_trabalho, salario, qtd_vaga, data);                     
                result = 'Vaga actualizada com sucesso';
                res.status(200).json(result); 
            } else{
                res.status(400).json('Verifique os dados a serem actualizados');
            }  
                      
        } catch (error) {
           res.status(500).json('Erro interno no servidor ' + error.message);
        }
       
    },

    excluirvagaporId: async(req, res) => {
        let result;
        let codigo = req.params.id;

        try {
          if (codigo) {
            await vaga.excluir(codigo);
            result = 'Excluido com sucesso';
            res.status(200).json(result);
          }                  
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    
}