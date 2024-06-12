const express = require('express');
const router = express.Router();
const authenticate =  require("../private/autenticar");
const pesquisarcontroller = require('../view/pesquisar');

 
// Rota para obter uma vaga pelo 
router.post('/', pesquisarcontroller.pesquisar);

module.exports = router;