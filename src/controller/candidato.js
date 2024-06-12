const express = require('express');
const router = express.Router();
const authenticate =  require("../private/autenticar");
const candidatocontroller = require('../view/candidato');

 
// Rota para criar um nova candidato
router.post('/', candidatocontroller.cadastrarcandidato);

// Rota para obter um candidato pelo ID
router.get('/:id', candidatocontroller.obtercandidatoPorId);

// Rota para atualizar um candidato pelo ID
router.put('/:id', candidatocontroller.editarcandidatoPorId);

// Rota para excluir um candidato pelo ID
router.delete('/:id', candidatocontroller.excluircandidatoporId);

// Rota para obter todos os candidatos
router.get('/', candidatocontroller.buscarTodascandidatos);
 

module.exports = router;