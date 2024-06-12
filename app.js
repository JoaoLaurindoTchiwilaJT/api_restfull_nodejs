const {servidorHttp} = require('./servidor');
const socket =  require('./src/view/videochamada');


servidorHttp.listen(process.env.PORT, ()=> {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});