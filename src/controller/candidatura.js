const express = require('express');
const router = express.Router();
const authenticate =  require("../private/autenticar");
const candidaturacontroller = require('../view/candidatura');

 
// Rota para criar uma nova candidatura
router.post('/', candidaturacontroller.cadastrarcandidatura);

// Rota para excluir uma candidatura pelo ID
router.delete('/:id', candidaturacontroller.excluircandidaturaporId);

// Rota para obter todas as candidaturas
router.get('/:id', candidaturacontroller.buscarTodascandidaturasporid);
 
// Rota para actualizar a candidatura
router.put('/:id', candidaturacontroller.editarcandidaturaPorId);

module.exports = router;