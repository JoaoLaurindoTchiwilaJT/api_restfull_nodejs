const Usuario = require('../Model/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

 
module.exports = {
    //Banco de dados
    login: async (req, res) => {
      let result;
      const { contacto, senha } = req.body;
      let dados = await Usuario.buscarTodos();
  
      try {
        // console.log('Dados do banco:', dados);
  
          const usuarioEncontrado = dados.find(user => user.email === contacto || user.numero === contacto);
  
          if (usuarioEncontrado) {
             // console.log('Usuário encontrado:', usuarioEncontrado);
  
              if (bcrypt.compareSync(senha, usuarioEncontrado.senha)) {
                  let id = usuarioEncontrado.idusuario;
                  let dado = await Usuario.login(id);
                  const token = jwt.sign({ userID: dado.idusuario }, process.env.JWT_KEY, { expiresIn: 300 });
                  let tipo = dado.tipoUsuario;
                  
                  result = {id,tipo,token};
                  res.status(200).json(result);
              } else {
                
                //  console.log('Senha incorreta');
                res.status(400).send('Email ou senhas incorretos');
              }
          } else {
            
             // console.log('Usuário não encontrado');
             res.status(404).json('Dados não encontrados');
          }
      } catch (error) {
         // console.error('Erro ao realizar login:', error);
         res.status(500).send('Erro interno do servidor ' + error.message);
      }
  
      
    },

    confirmarusuario: async (req,res) =>{
      let  result;
      const {email,codigo} = req.body;
      //console.log(email,codigo);
     let codigoNumero = parseInt(codigo); 
    /* console.log(codigoNumero);
     console.log("Tipo de dados de email:", typeof email);
      console.log("Valor de email:", email);
      console.log("Tipo de dados de codigo:", typeof codigo);
      console.log("Valor de codigo:", codigo);*/

     let verificar = await Usuario.buscarTodoscodigos(codigoNumero,email);
     // console.log(verificar);
      try {
              if(verificar.codigo === codigoNumero && verificar.email === email){ 
                res.status(200).json({message: `Autenticação do usuario  feita com sucesso`});
              }else{
                res.status(400).json('Codigo invalido');
              }      
      } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao autenticar usuario '});
      }
    }
}