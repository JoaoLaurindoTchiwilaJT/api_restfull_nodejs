const candidatura = require('../Model/candidatura');
const Usuario = require('../Model/usuario');
const Candidato = require('../Model/candidato');
const Empresa = require('../Model/Empresa');
const Vaga = require('../Model/vaga');
const notificar = require('../Model/notifica');
module.exports = {
    //Banco de dados
    cadastrarcandidatura: async (req, res) => {
        let  result;
        const {idvaga,idcandidato} = req.body;
        let data_envio = new Date();
        const data = new Date(data_envio);
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
        const dia = String(data.getDate()).padStart(2, '0');
        data_envio = `${ano}/${mes}/${dia}`;
        
        const estado = "Enviado";
        let dados = await Usuario.buscarUm(idcandidato);
        let empresa = await Vaga.buscarTodasVagasporidprocura(idvaga);
        
        let id_receptor = empresa.idusuario;
       // console.log(id_receptor);
        let tipo_notificacao = 'candidatura'; 
        let descricao = `${dados.nome} enviou uma candidatura`;
            try {
                if (idcandidato && idvaga) {
                    await candidatura.cadastrarcandidatura(estado,data_envio,idvaga,idcandidato);
                    await notificar.cadastrarnotificacaocandidatura(data, descricao,idcandidato,id_receptor,tipo_notificacao);
                    result = 'Candidatura realizada com sucesso';
                    res.status(200).json(result);
                }else{
                    res.status(400).json("Verifique se os id's estão sendo passados");
                }
            } catch (error) {
              res.status(500).json('Erro interno do servidor '+ error.message);
            }   
    },

    buscarTodascandidaturasporid: async (req, res) => {
      let result;
      let codigo = req.params.id;
      let usuarios, dados;
      // Buscando o tipo de usuário
      usuarios = await Usuario.buscarUm(codigo);
      
      // Verificando o tipo de usuário para redirecionar as candidaturas
      try {
        if(codigo){
          if (Array.isArray(usuarios)) {
              if (usuarios[0].tipoUsuario === "Candidato" || usuarios[0].tipoUsuario === "candidato") {
                  let candidato = await Candidato.buscarUm(codigo);
                  dados = await candidatura.buscarTodascandidaturascandidato(candidato.idusuario);
              } else if (usuarios[0].tipoUsuario === "empresa" || usuarios[0].tipoUsuario === "Empresa") {
                  let empresa = await Empresa.buscarUm(codigo);
                  let vaga = await Vaga.buscarTodasVagasporid(empresa[0].idempresa);
                  const idsEmpresas = vaga.map(item => item.idempresa);
                  dados = await candidatura.buscarTodascandidaturasempresa(idsEmpresas[0]);
              }
          } else {
              if (usuarios.tipoUsuario === "Candidato" || usuarios.tipoUsuario === "candidato") {
                  let candidato = await Candidato.buscarUm(codigo);
                  dados = await candidatura.buscarTodascandidaturascandidato(candidato.idusuario);
              }
          }
          
          // Verificar se há dados antes de enviar a resposta
          if (dados && dados.length > 0) {
              result = dados;
              res.status(200).json(result);
          } else {
              // Se não houver dados, enviar uma resposta vazia com status 404
              res.status(404).json("Nenhuma candidatura encontrada");
          }
        }else{
            res.status(400).json("Verifique se o id está sendo enviado corretamente")
        }
      } catch (error) {
          res.status(500).json('Erro interno do servidor' + error.message);
      }
      
    },
   
    editarcandidaturaPorId: async (req, res) => {
        let  result;
        let codigo = req.params.id; 
        const {estado} = req.body;
        let data_envio = new Date();
        const data = new Date(data_envio);
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
        const dia = String(data.getDate()).padStart(2, '0');
        data_envio = `${ano}/${mes}/${dia}`;
        try{   
            if (codigo && estado) {
                await candidatura.alterar(estado, data_envio,codigo);                     
                result = 'Candidatura actualizada';
                res.status(200).json(result);
            }else{
                res.status(400).json('Verifique se os dados estão sendo enviados corretamente')
            }                 
            
        } catch (error) {
          res.status(500).json('Erro interno do servidor' + error.message);
        }
       
    },
 
    excluircandidaturaporId: async(req, res) => {
        let result;
        let codigo = req.params;

        try {
            if (codigo) {
                await candidatura.excluir(codigo);
                result = 'Excluido com sucesso';
                res.status(200).json(result);
            }else{
                res.status(400).json('Verifique o id se esta sendo enviado');
            }
            
        } catch (error) {
            res.status(500).json('Erro interno do servidor ' + error.message);
        }
    },
    
}