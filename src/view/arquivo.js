const arquivo = require('../Model/arquivo');
const fs = require('fs');
const path = require('path');
const ipAddress = require('../private/pegandoIP');
module.exports = {
   //Arquivo   
 
inserir: async (req, res) =>{
 // Dados do req.body
  const idusuario = req.params.id;
  
  let data_envio = new Date();
  const ano = data_envio.getFullYear();
  const mes = String(data_envio.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
  const dia = String(data_envio.getDate()).padStart(2, '0');
  data_envio = `${ano}/${mes}/${dia}`;

  let nome =  `${req.file.filename}`;
  nome = nome.replace(/\s+/g, '_');
  const extensao = path.extname(nome);
  const caminhoCodificado = nome;
 // console.log(`http://localhost:3000/${caminhoCodificado}`);

 
  if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  try {
    if (idusuario &&  req.file.filename) {
        await arquivo.inserir(caminhoCodificado,data_envio,extensao,idusuario);
        // Aqui você pode processar o arquivo  como quiser
      // console.log( `Arquivo de áudio salvo em: ${caminho}` );
      res.status(200).json({ message: `Arquivo recebido com sucesso  ${caminhoCodificado} `});
    }else{
      res.status(400).json('Verifique os dados do arquivo que estão sendo mandados')
    }
   
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor  ao enviar arquivo ' + error.message});
  }
  
},

buscar: async (req, res) =>{
  let json = {error: '', result: {}};

  try {
    
    let usuario = await arquivo.buscarTodos();
    json.result = usuario;

    res.status(200).send(json);
  } catch (error) {
    json.error = error;
    res.status(500).send(error);
  }
},

buscarTodosPorID: async (req, res) =>{
 let  result;
 const {id,tipo} = req.params;
 
  try {
    if (id) {
      let dados = await arquivo.buscarTodosPorID(id);
      for (let i = 0; i < dados.length; i++) {
        const data = new Date(dados[i].data);
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicionando 1 para ajustar o zero-based
        const dia = String(data.getDate()).padStart(2, '0');
        dados[i].data = `${ano}/${mes}/${dia}`;

      // Concatenar tipo e nome usando path.join()
      let junta = path.join(`http://${ipAddress.ipAddress}:3000/upload/${tipo}/${id}/`,dados[i].caminho); 
      // Substituir todas as barras (/) por barras invertidas (\)
      junta = junta.replace(/\\/g, '/');  
       // Acrescentar uma barra após "http:"
      junta = junta.replace('http:/', 'http://');
       dados[i].caminho = junta;     
      }
      //console.log(dados[0].caminho);
      result = dados;
      res.status(200).send(result);
    }else{
      res.status(400).json('Verifique se o id esta sendo bem passando')
    }
      
  } catch (error) {
    res.status(404).send('Erro interno do servidor ' +  error.message);
  }
},

delete: async (req, res) => {

      const {nome,tipo,id} = req.params;
      // Concatenar tipo e nome usando path.join()
      //let junta = path.join(tipo,id,nome);

      // Substituir todas as barras (/) por barras invertidas (\)
      //junta = junta.replace(/\\/g, '/');
  try {

    if (nome && tipo && id) {
        let caminhoDoArquivo = path.resolve(__dirname,'..',`../upload/${tipo}/${id}/${nome}`)
      
        console.log(caminhoDoArquivo);
      // Verifique se o arquivo existe antes de tentar excluir
        // Exclua o arquivo
        fs.unlinkSync(caminhoDoArquivo);
        //console.log(nome);
          await arquivo.excluir(nome);
          result = 'Excluido com sucesso';
          res.status(200).send(`Arquivo ${caminhoDoArquivo} excluído com sucesso.`);
    } else {
      res.status(404).json('Erro ao excluir o arquivo, Verifique os dados que estão sendo passados na url');
    }
  } catch (error) {
    res.status(500).json('Erro do servidor.' + error.message);
  }
 
},

}