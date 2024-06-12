const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const arquivocontroller = require('../view/arquivo');

// Configuração do Multer para pegar um ficheiro apenas
const storage = multer.diskStorage({
    limits: { fileSize: 10 * 1024 * 1024 }, // Define o limite de tamanho do arquivo 
    fileFilter: (req, file, cb) => {
        // Verifica se o tipo de arquivo é aceito
        if (!file.originalname.match(/\.(png|jpg|jpeg|pdf|txt|mp3|wave|m4a|doc|docx)$/)) {
            return cb(new Error('Tipo de arquivo inválido'));
        }
        cb(null, true);
    },
    destination: (req, file, cb) => {
        // Criar o diretório se não existir
        const directory = `./upload/${req.params.tipo}/${req.params.id}`;
        fs.mkdirSync(directory, { recursive: true });
        cb(null, directory);
      },
    filename: (req, file, cb) => {
        file.originalname = file.originalname.replace(/\s+/g, '_');
        cb(null, `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage });

// Rota para criar um novo arquivo
router.post('/:tipo/:id', upload.single("file"), arquivocontroller.inserir);

//Rota para buscar arquivo por id
router.get('/:tipo/:id', arquivocontroller.buscarTodosPorID);

//Rota para buscar arquivo
router.get('/', arquivocontroller.buscar);

//Rota para eliminar arquivo
router.delete('/:tipo/:id/:nome/', arquivocontroller.delete);


module.exports = router;
