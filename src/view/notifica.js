const notificar = require('../Model/notifica');
const Usuario = require('../Model/usuario');
const candidato = require('../Model/candidato');

module.exports = {
    //Banco de dados
    buscarTodanotificacao: async (req, res) => {
      let  result;
      //const  {tipousuario, habilidade} = req.body;//id do usuario que quer as notificações
      let codigo = req.params.id;
      let dados, usuarios;
      
      //Buscando o tipo de usuario 
       usuarios = await Usuario.buscarUm(codigo);
               
      //verificando o tipo de usuario para redirecionar as notificações
      try{
        if (codigo) {
          if(Array.isArray(usuarios)){
            //console.log(usuarios[0].tipoUsuario, 'array');     
            if (usuarios[0].tipoUsuario === "Candidato" || usuarios[0].tipoUsuario === "candidato" ) {
              //buscando a habilidade caso se candidato
              let candidatos = await candidato.buscarUm(codigo); 
              const habilidadesUsuario = candidatos.habilidades;
              
              dados = await notificar.buscarTodasNotificacoescandidatos(codigo,habilidadesUsuario);
            } else if(usuarios[0].tipoUsuario === "empresa" || usuarios[0].tipoUsuario === "Empresa") {
               dados = await notificar.buscarTodasNotificacoesempresa(codigo);
            } 
          }else{
            //  console.log(usuarios.tipoUsuario, 'nada');  
            if (usuarios.tipoUsuario === "Candidato" || usuarios.tipoUsuario === "candidato" ) {
              //buscando a habilidade caso se candidato
              let candidatos = await candidato.buscarUm(codigo); 
              const habilidadesUsuario = candidatos.habilidades;
              
              dados = await notificar.buscarTodasNotificacoescandidatos(codigo,habilidadesUsuario);
            } else if(usuarios.tipoUsuario === "empresa" || usuarios.tipoUsuario === "Empresa") {
               dados = await notificar.buscarTodasNotificacoesempresa(codigo);
            } 
          }
               
            result = dados;
            res.status(200).json(result);
        }else{
          res.status(400).json('Verifique os dados a serem enviados se estão corretos')
        }
        
      } catch (error) {
          res.status(500).json("Erro interno do servido " + error.message);
      }
    },
 
    excluirnotificacaoporId: async(req, res) => {
        let  result;
        let codigo = req.params.id;

      try {
        if (codigo) {
            await notificar.excluir(codigo);
            result = 'Excluido com sucesso';
            res.status(200).json(result);
        }else{
          res.status(400).json('Verifique se o id esta sendo enviado corretamente')
        }
        
      } catch (error) {
        res.status(500).json('Erro interno do servidor ' + error.message);
      }
    },
}