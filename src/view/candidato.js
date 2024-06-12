const candidato = require('../Model/candidato');
const Usuario = require('../Model/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const credenciais = require('../private/autenticar');
module.exports = {
    //Banco de dados 
   
    cadastrarcandidato: async (req, res) => {
      const { nome, numero, email, senha, localidade,cidade,setor,habilidades,instituicao_formacao,data_nasc} = req.body;
      const tipoUsuario = "candidato";
      
      try { 
        if(nome && numero && email && senha && localidade && cidade && setor && habilidades && instituicao_formacao && data_nasc){
          // Verificar se o usuário já existe
          const usuarioExistente = await Usuario.buscarPorEmailNumeroETipo(email, numero, tipoUsuario);
          
          if (usuarioExistente) {
              return res.status(500).json({ error: 'Usuário já existente' });
          }
      
          // Hash da senha
          const hashedSenha = await bcrypt.hash(senha, 10); 
      
          // Cadastrar o usuário
          const novoUsuario = await Usuario.cadastrarusuario(nome, numero, email, hashedSenha, tipoUsuario);
          
          
          // Cadastrar a candidato
          await candidato.cadastrarcandidato(localidade,cidade,setor,habilidades,instituicao_formacao,data_nasc,novoUsuario);;
      
          const token = jwt.sign({ userID: novoUsuario.usercodigo }, process.env.JWT_KEY, { expiresIn: '5h' });
          credenciais.emailVerification(email);

          return res.status(200).json({
              novoUsuario: novoUsuario,
              tipoUsuario : "candidato",
              token: token,
              sms: `Cadastro realizado com sucesso  ${email}`
          });
        }else{
          res.status(400).json('Verifique os dados a serem inseridos')
        }
      } catch (error) {
          console.error('Erro ao cadastrar usuário:', error);
          return res.status(500).json({ error: 'Erro interino do servidor ao realizar cadastro' });
      }
    },

    buscarTodascandidatos: async (req, res) => {
        let  result;
        try{
          let dados = await candidato.buscarTodos();
          for (let i = 0; i < dados.length; i++) {
            const data = new Date(dados[i].data_nasc);
            const ano = data.getFullYear();
            const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
            const dia = String(data.getDate()).padStart(2, '0');
            dados[i].data_nasc = `${ano}/${mes}/${dia}`;
          }
            result = dados;
            res.status(200).json(result);
        } catch (error) {
          res.status(500).json('Erro interno do servidor' + error.message);
        }
    },
   
    obtercandidatoPorId: async (req, res) => {
        let  result;            
        let codigo = req.params.id;  
                try {
                  if (codigo) {
                    let dados = await candidato.buscarUm(codigo);                    
                    result = dados;
                    res.status(200).json(result);
                  }else{
                    res.status(400).json('Verifique se o id está sendo passado como parametro na url')
                  }
                } catch (error) { 
                  res.status(500).json('Erro interno do servidor' + error.message);
                }
    },

    editarcandidatoPorId: async (req, res) => {
      let  result;
        let codigo = req.params.id;
        const {nome, numero, email, senha, localidade,cidade,setor,habilidades,instituicao_formacao,data_nasc,sobre} = req.body;
          // Hash da senha
          const hashedSenha = await bcrypt.hash(senha, 10); 
      
        try{                
          if (nome && numero && email && senha && localidade && cidade && setor && habilidades && instituicao_formacao && data_nasc && sobre) {
            await candidato.alterar(codigo, habilidades,instituicao_formacao,data_nasc,localidade,cidade,setor);                     
            await Usuario.alterar(codigo,nome, numero, email, hashedSenha,sobre);  
            result = 'Candidato actualizado com sucesso' ;
            res.status(200).json(result);
          } else {
            res.status(400).json('Verifique os dados a serem actualizados');
          }      
          
        } catch (error) {
          res.status(500).json('Erro interno do servidor' + error.message);
        } 
    },

    excluircandidatoporId: async(req, res) => {
        let  result;
        let codigo = req.params.id;

        try {
          if (codigo) {
            await candidato.excluir(codigo);
            result = 'Excluido com sucesso';
            res.status(200).json(result);
          } else {
            res.status(400).json('Verifique se o id está sendo passado como parametro na url');
          }
        } catch (error) {
          res.status(500).json(error.message);
        }
    },
}