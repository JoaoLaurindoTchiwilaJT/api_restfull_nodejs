const express = require('express');
const router = express.Router();
const authenticate =  require("../utils/autenticar");
const UserController = require('../controller/usuario');


//Banco de dados
router.get('/login/:tabela/', UserController.login);
router.post('/cadastrar/:tabela', UserController.cadastrar);
router.get('/usuario/:tabela/', authenticate.authenticateUser, UserController.buscarTodos);
router.get('/usuario/:tabela/:codigo', authenticate.authenticateUser, UserController.buscarUm);
router.post('/usuarios/:tabela', authenticate.authenticateUser, UserController.inserir);
router.put('/usuarios/:tabela/:codigo', authenticate.authenticateUser, UserController.alterar);
router.delete('/usuario/:tabela/:codigo', authenticate.authenticateUser, UserController.excluir);
router.get('/enviar', authenticate.authenticateUser, authenticate.emailVerification);
 
//Arquivo
router.post('/arquivo',   UserController.criarpasta);
router.get('/arquivo/:nome',  UserController.lerArquivo);
router.put('/arquivo/:nome',  UserController.escreverArquivo);
router.delete('/arquivo/:nome',  UserController.eliminarArquivo);

module.exports = router;