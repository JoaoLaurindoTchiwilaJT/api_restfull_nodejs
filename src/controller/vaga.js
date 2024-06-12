const express = require('express');
const router = express.Router();
const authenticate =  require("../private/autenticar");
const vagacontroller = require('../view/vaga');

 
// Rota para criar uma nova vaga
router.post('/', vagacontroller.cadastrarvaga);

// Rota para excluir uma vaga pelo ID
router.delete('/:id', vagacontroller.excluirvagaporId);

// Rota para obter todas as vagas
router.get('/:id', vagacontroller.buscarTodasvagasid);
 
// Rota para obter uma vaga pelo 
router.get('/', vagacontroller.buscarTodasvagas);

// Rota para actualizar uma vaga
router.put('/:id', vagacontroller.editarvagaPorId);

module.exports = router;