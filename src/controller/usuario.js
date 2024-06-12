const express = require('express');
const router = express.Router();
const authenticate =  require("../private/autenticar");
const Usuariocontroller = require('../view/usuario');

// Rota para criar um novo usuario 
router.post('/login',  Usuariocontroller.login); 
     
//rota para confirmar se o codigo inserido pelo usuario é valido
router.post('/confirmar', Usuariocontroller.confirmarusuario);
module.exports = router;