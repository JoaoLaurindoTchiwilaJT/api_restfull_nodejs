const empresa = require('../Model/empresa');
const Usuario = require('../Model/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const credenciais = require('../private/autenticar');
module.exports = {
    //Banco de dados
   
    cadastrarempresa: async (req, res) => {
        const { nome, numero, email, senha, site, setor, localizacao } = req.body;
        const tipoUsuario = "empresa";
        
        try { 
          if (nome && numero && email && senha && site && setor && localizacao ) {
            // Verificar se o usuário já existe
            const usuarioExistente = await Usuario.buscarPorEmailNumeroETipo(email, numero, tipoUsuario);
        
            if (usuarioExistente) {
                return res.status(500).json({ error: 'Usuário já existente' });
            }
        
            // Hash da senha
            const hashedSenha = await bcrypt.hash(senha, 10); 
        
            // Cadastrar o usuário
            const novoUsuario = await Usuario.cadastrarusuario(nome, numero, email, hashedSenha, tipoUsuario);
            
            // Cadastrar a empresa
            const novaEmpresa = await empresa.cadastrarempresa(site, setor, localizacao, novoUsuario);
        
            const token = jwt.sign({ userID: novoUsuario.usercodigo }, process.env.JWT_KEY, { expiresIn: '5h' });
            credenciais.emailVerification(email);
            return res.status(200).json({
              novoUsuario: novoUsuario,
              tipoUsuario : "empresa",
              token: token,
              sms: `Cadastro realizado com sucesso  ${email}`
            });
          }else{
            res.status(400).json('Verifique os dados a serem enviados')
          }
        
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            return res.status(500).json({ error: 'Erro ao realizar cadastro' });
        }
    },    

    buscarTodasempresas: async (req, res) => {
        let  result;
        try{
            let dados = await empresa.buscarTodos();
            result = dados;
            res.status(200).json(result);
        } catch (error) {
          res.status(500).json('Erro interno do servidor' + error.message);
        }
    },
   
    obterempresaPorId: async (req, res) => {
        let  result;            
        let codigo = req.params.id;  
        
        try {
          if (codigo) {
            let dados = await empresa.buscarUm(codigo);             
            result = dados;
            res.status(200).json(result);
          }else{
            res.status(400).json('Verifique se o id está sendo passado como parametro na url');
          }
          
        } catch (error) {  
          res.status(500).json(error.message);
        }
    },

    editarempresaPorId: async (req, res) => {
        let  result;
        let codigo = req.params.id;
        const { nome, numero, email, senha, site, setor, localizacao } = req.body;

        // Hash da senha
        const hashedSenha = await bcrypt.hash(senha, 10); 
      
        try{                
          if (nome && numero && email && senha && site && setor && localizacao ) {            
              await empresa.alterar(site,setor,localizacao,codigo);         
              await Usuario.alterar(codigo,nome, numero, email, hashedSenha);                     
              result = 'Empresa actualizada com sucesso';
              res.status(200).json(result);
          }else{
            res.status(400).json('Verifiue os dados a serem actualizados')
          }
        } catch (error) {
          res.status(500).json('Erro interno do servidor ' + error.message);
        }
       
    },

    excluirempresaporId: async(req, res) => {
        let  result;
        let codigo = req.params.id;

                    try {
                      if (codigo) {
                        await empresa.excluir(codigo);
                        result = 'Excluido com sucesso';
                        res.status(200).json(result);
                      }else{
                        res.status(400).json('Verifique se o id está sendo passado como parametro na url')
                      }
                        
                    } catch (error) {
                      res.status(500).json(error.message);
                    }
    },
}