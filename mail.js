var nodemailer = require("nodemailer");
var fs = require('fs');

// create reusable transport method (opens pool of SMTP connections)
var smtpOptions = {
    service: "Gmail",
    auth: {
        user: "neuronapue@gmail.com",
        pass: "" 
    }
};

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Recolector de Eventos <neuronapue@gmail.com>", // sender address
    to: "joshuaedi@gmail.com", // list of receivers
    subject: "Evento de Alerta", // Subject line
    text: "EXISTE UNA METRICA FUERA DE RANGO.", // plaintext body
//    html: "<b>EXISTE UNA METRICA FUERA DE RANGO.</b>" // html body
}

// send mail with defined transport object

  
var enviarCorreo = function() {
  var smtpTransport = nodemailer.createTransport("SMTP", smtpOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
        console.log('Error occured');
        console.log(error.message);
        return;
    }else{
        console.log("Message sent: " + response.message);
        console.log(response.message); // response from the server
        console.log(response.messageId); // Message-ID value used
//        response.statusHandler.once("failed", function(data){
//         console.log("Permanently failed delivering message to %s with the following response: %s",data.domain, data.response);
//        });
//        response.statusHandler.once("requeue", function(data){
//          console.log("Temporarily failed delivering message to %s", data.domain);
//        });
//        response.statusHandler.once("sent", function(data){
//          console.log("Message was accepted by %s", data.domain);
//        });
    }
    console.log('Message sent successfully!');
    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
  });
};

var configurationFile;
configurationFile = 'configuracion.json';
var configuration = JSON.parse (fs.readFileSync(__dirname + '\\' + configurationFile));
console.log(configuration.from);
console.log(configuration.to);
console.log(configuration.subject);
console.log(configuration.text);


fs.readFile(__dirname + '\\' + 'passwd.txt', function (err, data) {
  if (err) throw err;
  console.log('El passwd es: ' + data);
  smtpOptions.auth.pass = data;
  console.log('El passwd es 2: ' + smtpOptions.auth.pass);
  console.log('Sending Mail');
  enviarCorreo();
});
console.log('ultima linea');