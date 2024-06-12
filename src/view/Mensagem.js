const mensagem = require('../Model/mensagem');
const notificar = require('../Model/notifica');
const path = require('path');
const Usuario = require('../Model/usuario');
const arquivo = require('../Model/arquivo');
const ipAddress = require('../private/pegandoIP');
const fs = require('fs');
module.exports = {
    //Banco de dados
    cadastrarmensagem: async (req, res) => {
        let result;
        const {conteudo,idemissor,idreceptor} = req.body;
        
        let data = new Date();
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
        const dia = String(data.getDate()).padStart(2, '0');
        data = `${ano}/${mes}/${dia}`;
        let dados = await Usuario.buscarUm(idemissor);
        
        let tipo_notificacao = 'mensagem',tipo = 'texto';
        let descricao = `${dados.nome} enviou uma mensagem`;
            try {  
              if (conteudo && idemissor && idreceptor ) {
                let usercodigo = await mensagem.cadastrarmensagem(data,tipo,idemissor,idreceptor);
               // console.log(usercodigo);
                let usercodigos = await mensagem.cadastrarconteudo(data,conteudo,usercodigo);
                await notificar.cadastrarnotificacaosms(data, descricao, idemissor,idreceptor,tipo_notificacao);
                result =  usercodigo,usercodigos;
                res.status(200).json(result);
              }else{
                res.status(400).json('Verifique se os dados a serem enviados estão corretos ')
              }
              
            } catch (error) {
              res.status(500).json('Erro interno do servidor ' + error.message);
            }   
    }, 

    buscarTodamensagem: async (req, res) => {
      let  result;
      const {emissor,receptor} = req.params;
      
      try{

        if (emissor && receptor && emissor != receptor) {
            let dados = await mensagem.buscarTodos(emissor,receptor);
            //console.log(dados)
            for (let i = 0; i < dados.length; i++) {
              const data = new Date(dados[i].data);
              const ano = data.getFullYear();
              const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
              const dia = String(data.getDate()).padStart(2, '0');
              dados[i].data= `${ano}/${mes}/${dia}`;
             
              if (typeof dados[i].caminho === 'string' && dados[i].caminho !== null) {
                // Concatenar tipo e nome usando path.join()
                if(ipAddress !== null){
                  let junta = path.join(`http://${ipAddress.ipAddress}:3000/upload/mensagem/${emissor}/`, dados[i].caminho); 
                  // Substituir todas as barras (/) por barras invertidas (\)
                  junta = junta.replace(/\\/g, '/');  
                  // Acrescentar uma barra após "http:"
                  junta = junta.replace('http:/', 'http://');
                  dados[i].caminho = junta;  
                }else{
                  let junta = path.join(`http://localhost:3000/upload/mensagem/${emissor}/`, dados[i].caminho); 
                  // Substituir todas as barras (/) por barras invertidas (\)
                  junta = junta.replace(/\\/g, '/');  
                  // Acrescentar uma barra após "http:"
                  junta = junta.replace('http:/', 'http://');
                  dados[i].caminho = junta;  
                }
                
            }
            
            }
           // console.log(dados);
            result = dados;
            res.status(200).json(result);
        }else{
          res.status(400).json("Verifique se os id's estão sendo mandados corretamente e se não são identicos");
        }
      } catch (error) {
        res.status(500).json('Erro interno do servidor ' + error.message);
      }
    },
   
    editarmensagemPorId: async (req, res) => {
        let result;
        const {idmensagem} = req.params;
        
        const {conteudo} = req.body;

        try{                
          if (idmensagem && conteudo) {
          let codigo =  await mensagem.alterar(idmensagem,conteudo);                     
            result = codigo;
            res.status(200).json('Mensagem alterada com sucesso');
          }else{
            res.status(400).json("Verifique se os dados estão sendo enviados corretamente");
          }  
            
        } catch (error) {
          res.status(500).json('Erro interno do servidor ' + error.message);
        }
       
    },

    editarmensagemarquivoPorId: async (req, res) => {
      let result;
      const {idmensagem} = req.params;

        // Excluir o arquivo antigo, se existir
       
      let data_envio = new Date();
      const ano = data_envio.getFullYear();
      const mes = String(data_envio.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
      const dia = String(data_envio.getDate()).padStart(2, '0');
      data_envio = `${ano}/${mes}/${dia}`;

      const nome =  `${req.file.filename}`;
     // console.log(nome)
      const extensao = path.extname(nome);
      //console.log(extensao);
      const caminhoCodificado = encodeURI(nome);

      /*
      if (!['.png', '.jpg', '.jpeg', '.pdf', '.txt', '.mp3', '.wav', '.m4a', '.doc', '.docx'].includes(extensao)) {
        return res.status(400).json({ mensagem: 'Formato de arquivo inválido. Apenas arquivos PNG, JPG, JPEG, PDF, TXT, MP3, WAV, M4A, DOC e DOCX são permitidos' });
      }*/
        // console.log(`http://localhost:3000/${caminhoCodificado}`);

      if (!req.file) {
          return res.status(400).json({ error: 'Nenhum arquivo enviado de audio enviado' });
      }
     
      try { 
        if (idmensagem) {
          await mensagem.alterararquivo(caminhoCodificado,data_envio,extensao);
          // Aqui você pode processar o arquivo  como quiser
        // console.log( `Arquivo foi salvo em qual: ${caminho}` );
          res.status(200).json({ message: `Arquivo  actualizado com sucesso  ${caminhoCodificado} `});
        }else{
          res.status(400).json('Verifique se o id da mensagem esta sendo passado')
        }
        
      } catch (error) {
        res.status(500).json('Erro interno do servidor ao enviar arquivo ' + error.message);
      }
     
  },
 
    excluirmensagemporId: async(req, res) => {
        let  result;
        const {idmensagem} = req.params;
                try {
                    // Exclua o arquivo
                  if (idmensagem) {
                      await mensagem.excluir(idmensagem);
                      result = 'Excluido com sucesso';
                      res.status(200).json(result);
                  } else {
                    res.status(400).json('Verifique se o id está sendo passado corretamente')
                  }
                } catch (error) {
                  res.status(500).json('Erro do servidor.' + error.message);
                }
    },

    //Arquivos
    enviararquivo: async(req,res) =>{
      const {emissor,receptor} = req.params;  
     // console.log(emissor,receptor,idmensagem);

      let data_envio = new Date();
      const ano = data_envio.getFullYear();
      const mes = String(data_envio.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
      const dia = String(data_envio.getDate()).padStart(2, '0');
      data_envio = `${ano}/${mes}/${dia}`;

      const nome =  `${req.file.filename}`;
     // console.log(nome)
      const extensao = path.extname(nome);
      //console.log(extensao);
      let caminhoCodificado = nome;
         // Substituir espaços por underscores
        caminhoCodificado = caminhoCodificado.replace(/\s+/g, '_');

        //console.log(caminhoCodificado); 
      /*
      if (!['.png', '.jpg', '.jpeg', '.pdf', '.txt', '.mp3', '.wav', '.m4a', '.doc', '.docx'].includes(extensao)) {
        return res.status(400).json({ mensagem: 'Formato de arquivo inválido. Apenas arquivos PNG, JPG, JPEG, PDF, TXT, MP3, WAV, M4A, DOC e DOCX são permitidos' });
      }*/
        // console.log(`http://localhost:3000/${caminhoCodificado}`);

      if (!req.file) {
          return res.status(400).json({ error: 'Nenhum arquivo enviado de audio enviado' });
      }
     let conteudo,tipo = 'desconhecido';
      try { 
        if (emissor && receptor) {
            let idmensagem  = await mensagem.cadastrarmensagem(data_envio,conteudo,tipo,emissor,receptor);
          //console.log(idmensagem)
          await mensagem.inserirarquivo(caminhoCodificado,data_envio,extensao,idmensagem,emissor);
          // Aqui você pode processar o arquivo  como quiser
        // console.log( `Arquivo foi salvo em qual: ${caminho}` );
          res.status(200).json({ message: `Arquivo  recebido com sucesso  ${caminhoCodificado} `});
        }else{
          res.status(400).json('Verifique se o id do emissor e do receptor estão sendo passados')
        }
        
      } catch (error) {
        res.status(500).json('Erro interno do servidor ao enviar arquivo ' + error.message);
      }
      
    },
    
    delete: async (req, res) => {

      const {nome,id} = req.params;
      // Concatenar tipo e nome usando path.join()
      //let junta = path.join(tipo,id,nome);
      // Substituir todas as barras (/) por barras invertidas (\)
      //junta = junta.replace(/\\/g, '/');
     
      //console.log(valor)
 
  try {

    if (nome  && id) {
        let caminhoDoArquivo = path.resolve(__dirname,'..',`../upload/mensagem/${id}/${nome}`)
      
      // console.log(caminhoDoArquivo);
      // Verifique se o arquivo existe antes de tentar excluir
        // Exclua o arquivo
        fs.unlinkSync(caminhoDoArquivo);
        //console.log(nome);
          
          await arquivo.excluir(nome);
          await mensagem.excluir(id);
          result = 'Excluido com sucesso';
          res.status(200).send(`Arquivo ${caminhoDoArquivo} excluído com sucesso.`);
    } else {
      res.status(404).json('Erro ao excluir o arquivo, Verifique os dados que estão sendo passados na url');
    }
  } catch (error) {
    res.status(500).json('Erro do servidor arquivo inexistente ou já foi excluido. ');
  }
 
    },

    listaramigos: async (req, res) => {
      const {idusuario} = req.params;
      
      try {
        if (idusuario) {
          
          let amigos = await mensagem.amigos(idusuario);
          //console.log(amigos)
          res.status(200).json(amigos)
        }else{
          res.status(400).json('Verifique o id do usuario que solicitou a mensagem')
        }
      } catch (error) {
        res.status(500).json(' Erro interno do servidor ' + error.message)
      }
    }
    
}