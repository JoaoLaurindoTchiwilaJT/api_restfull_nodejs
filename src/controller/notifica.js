const express = require('express');
const router = express.Router();
const authenticate =  require("../private/autenticar");
const notificacaocontroller = require('../view/notifica');


// Rota para excluir uma notificacao pelo ID
router.delete('/:id', notificacaocontroller.excluirnotificacaoporId);

// Rota para obter todas as notificacões
router.get('/:id', notificacaocontroller.buscarTodanotificacao);
 

module.exports = router;