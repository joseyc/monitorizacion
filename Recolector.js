var http = require('http');
    url = require('url'); //url direccion de un recurso en internet

var procesador = function(request, response){ //request datos contiene peticion, response respuesta pueden llamarse con cualquier cnombre
    // console.log(request);                     
	response.writeHead(200,{   // 200 es todo ha ido bien . 500 fallo  - 403 No entiendo
		'Content-Type' :  'text/html'
    });
    response.write('<h1>Recolector</h1>');
	
	
	response.write('<h2>Parámetros: </h2>');
	
    var urlParseada = url.parse(request.url,true);
    response.write('<p>URL: ' + request.url + '</p>'); 	
	var parametros = urlParseada.query.instance;
	response.write('<p>Instancia: ' + paranmetros + '</p>'); 	

	if(urlParseada.pathname = '/registrar'){
	 
	   response.writeHead(200,{   
		'Content-Type' :  'text/html'
       });
	   response.write('<p>Instancia: ' + urlParseada.query.instancia + 'registrada</p>'); )
	} else {
	   response.writeHead(405);
	} else {
	  response.writeHead(404);
	}
	response.end();

}



var server = http.createServer(procesador);  // dentro de esta funcion hay un var w = new htppServer() ...
server.listen(80);                 // son funciones fabricas que crean un objeto
                                   // con esto se ha creado un servidor http

								   // para responder podemos usar una funcion y callbacks
						 

