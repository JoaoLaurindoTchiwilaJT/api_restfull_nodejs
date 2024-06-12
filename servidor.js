require('dotenv').config({path: 'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const http = require('http');
const {Server} = require('socket.io');
 
 
const servidorHttp = http.createServer(app);
const io = new Server(servidorHttp,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }});

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

//Importando Rotas 
const usuarios = require('./src/controller/usuario'); 
const empresa = require('./src/controller/empresa');
const candidato = require('./src/controller/candidato');
const vaga = require('./src/controller/vaga');
const notifica = require('./src/controller/notifica');
const mensagem = require('./src/controller/Mensagem');
const arquivo = require('./src/controller/arquivo'); 
const candidatura = require('./src/controller/candidatura'); 
const pesquisar = require('./src/controller/pesquisar'); 


//Usando as rotas 
app.use('/usuario', usuarios);
app.use('/empresa', empresa);
app.use('/candidato', candidato);
app.use('/vaga', vaga);
app.use('/notificacao', notifica);
app.use('/mensagem', mensagem); 
app.use('/candidatura', candidatura);
app.use('/pesquisar', pesquisar);
app.use('/upload', express.static('upload/'),arquivo);

module.exports = { servidorHttp, io}
