const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const Mensagemcontroller = require('../view/Mensagem');
const path = require('path');

// Configuração do Multer para pegar o audio
const storage = multer.diskStorage({
  limits: { fileSize: 10 * 1024 * 1024 }, // Define o limite de tamanho do arquivo 
  fileFilter: (req, file, cb) => {
      // Verifica se o tipo de arquivo é aceito
      if (!file.originalname.match(/\.(png|jpg|jpeg|pdf|txt|mp3|wave|m4a|doc|docx|mp3)$/)) {
          return cb(new Error('Tipo de arquivo inválido'));
      }
      cb(null, true);
  },
  destination: (req, file, cb) => {
    // Criar o diretório se não existir
    const directory = `./upload/mensagem/${req.params.emissor}`;
    fs.mkdirSync(directory, { recursive: true });
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    file.originalname = file.originalname.replace(/\s+/g, '_');
      cb(null, `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload = multer({ storage });

// Rota para criar uma nova Mensagem
router.post('/', Mensagemcontroller.cadastrarmensagem);

// Rota para atualizar uma Mensagem pelo ID
router.put('/:idmensagem', Mensagemcontroller.editarmensagemPorId);

/* Rota para atualizar uma Mensagem de arquivo pelo ID
router.put('/arquivo/:idmensagem', upload.single("arquivo"), Mensagemcontroller.editarmensagemarquivoPorId);
*/
// Rota para excluir uma Mensagem pelo ID
router.delete('/:emissor/:idmensagem',  Mensagemcontroller.excluirmensagemporId);

// Rota para obter todas as Mensagens do usuario com o emissor
router.get('/:emissor/:receptor', Mensagemcontroller.buscarTodamensagem);


// Rota para obter dados das pessoas que enviaram mensagens com o emissor dos dados
router.get('/:idusuario', Mensagemcontroller.listaramigos);
  
// Rota para criar uma nova Mensagem de audio
router.post('/enviar/:emissor/:receptor', upload.single("arquivo"), Mensagemcontroller.enviararquivo);

//Rota para eliminar arquivo
router.delete('/arquivo/:id/:nome/', Mensagemcontroller.delete);

module.exports = router;