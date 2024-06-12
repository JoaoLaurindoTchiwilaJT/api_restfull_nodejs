
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer"); 
const usuario = require('../Model/usuario');


/*
admin.initializeApp({
    credential: admin.credential.cert("permissao.json"),
    
});*/


let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'emakajondi@gmail.com', // Seu endereço de e-mail
      pass: 'zngagnpzkhezatxk' // Sua senha de e-mail 
    },
    tls: {
     rejectUnauthorized: false // Ignorar certificado autoassinado (use apenas para desenvolvimento)
    }
  });
  
  let generateOTP = () => {
    const digits = '0123456789'
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  
 

module.exports = {
authenticateUser: async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    if (!idToken) {
      return res.status(401).send({message: "Usúario não autorizado"});
   }
 
   jwt.verify(idToken, process.env.JWT_KEY, (err, decoded) => {
     if(err) return res.status(401).end({message:"Usúario não autorizado"});
     req.user = {
       id:  decoded.userID
     }
   })
   
   next();
  } catch (error) {
    return res.status(401).send({message: "Usúario não autorizado"});
  }
 
},  
  
  // Função de envio de e-mail para verificação com código OTP
emailVerification: async (useremail) => {
        let codigoOTP = generateOTP();
        let message = {
          from: 'procristec@gmail.com',
          to: `${useremail}`, // Altere para o e-mail recebido no corpo da requisição
          subject: "Código de confirmação do JAPP", // Assunto
          html: `<h1 style="font-weight:normal;">Bem vindo ao nosso app de CANDIDATURA, o seu código de confirmação é <strong>${codigoOTP}</strong></h1>`
        };

       //console.log(codigoOTP);
        await usuario.codigo(useremail, codigoOTP);       
        await transport.sendMail(message);
        
},



}
  
  