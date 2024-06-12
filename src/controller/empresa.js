const express = require('express');
const router = express.Router();
const authenticate =  require("../private/autenticar");
const empresacontroller = require('../view/empresa');

 
// Rota para criar uma nova empresa
router.post('/', empresacontroller.cadastrarempresa);

// Rota para obter uma empresa pelo ID
router.get('/:id', empresacontroller.obterempresaPorId);

// Rota para atualizar uma empresa pelo ID
router.put('/:id', empresacontroller.editarempresaPorId);

// Rota para excluir uma empresa pelo ID
router.delete('/:id', empresacontroller.excluirempresaporId);

// Rota para obter todas os empresas
router.get('/', empresacontroller.buscarTodasempresas);
 

module.exports = router;