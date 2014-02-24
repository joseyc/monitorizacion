

console.log('Iniciando módulo agente.');

var os = require('os');
var http = require('http'),
    url = require('url');
	
var ResumenEstadisticas = function(id,timeStamp,memoLibre,memoriaTotal,UsoCPU60seg){
	this.id = id;
	this.timeStamp = timeStamp;
	this.memoLibre= memoLibre;
	this.memoriaTotal = memoriaTotal;	
    this.UsoCPU60seg = UsoCPU60seg;	
};


var Estadistica = function () {
	var fecha = new Date();
	this.timestamp = fecha.getTime();
	this.memoriaLibre = os.freemem();
	this.tiempoCPU = this._obtenerTiempoCPU();
	this.tiempoCPUIdle = this._obtenerTiempoCPUIdle();
};

Estadistica.prototype._obtenerTiempoCPU = function() {
	var segundosTotales = 0;
	var datosCpus = os.cpus();
	for (var i=0; i < datosCpus.length; i++) {
		var cpuActual = datosCpus[i];
		segundosTotales = segundosTotales +
			cpuActual.times.idle +
			cpuActual.times.user +
			cpuActual.times.nice +
			cpuActual.times.sys +
			cpuActual.times.irq; 
	}
	return segundosTotales;
};

Estadistica.prototype._obtenerTiempoCPUIdle = function() {
	var segundosTotales = 0;
	var datosCpus = os.cpus();
	for (var i=0; i < datosCpus.length; i++) {
		var cpuActual = datosCpus[i];
		segundosTotales = segundosTotales +
			cpuActual.times.idle; 
	}
	return segundosTotales;
};

var Agente = function(id) {
	this.id = id;
	this.memoriaTotal = os.totalmem();
	this.datosEstadisticos = [];
	console.info('Objeto Agente inicializado con el id ' + id + '.');
}

Agente.prototype._agregarEstadistica = function() {
	var estadisticaActual = new Estadistica();
	this.datosEstadisticos.push(estadisticaActual);
	console.log('Nueva estadística registrada: ' 
	           +JSON.stringify(estadisticaActual));
	if (this.datosEstadisticos.length > 60) {
		console.log('Excesivas estadísticas almacenadas, '
		           +' borrando la más antigua.');
		this.datosEstadisticos.shift();
	}
};


Agente.prototype.activar = function() {	
	var self = this;
	var contador = 0;
	console.info('Agente ' + this.id + ' activado.');
	setInterval(function() {
	    contador = contador +1;
		self._agregarEstadistica();
		var cpu = self.obtenerUsoCPUMedioUltimoMinuto();
		var mensaje = (cpu == undefined) ? 'No disponible.' : parseInt(cpu*100) + '%';
		console.log('Uso medio CPU último minuto: ' + mensaje);
		if (contador % 60 ==0) //resto --> multiplo de 60
		     {var resumen = new  ResumenEstadisticas(self.id, new Date().getTime(),os.free_mem(), 
			                                        os.total_totalmem(),cpu);
		     self._enviarResumen(resumen); // _ indica que es privada, es interno, fuera del este codigo no se debe usar
		
		}
	}, 1000);
};


Agente.prototype._enviarResumen = function(resumen){
     var opciones = {host: '127.0.0.1', port:80, path: '/estadistica',method: 'POST',
	                 headers : {'Content-Type' : 'application/json',
			                    'Content-Length' : len}};
	 var peticion = http.request(opciones);
	 peticion.write(serializacionResumen);
	 perticion.end();
}; 

Agente.prototype.obtenerUsoCPUMedioUltimoMinuto = function() {
	if (this.datosEstadisticos.length < 60) {
		return;
	}
	var sumaCPU = 0;
	for (var i=1; i < this.datosEstadisticos.length; i++) {
		var tiempoCPUSegundoActual =
			this.datosEstadisticos[i].tiempoCPU - this.datosEstadisticos[i-1].tiempoCPU;
		var tiempoCPUIdleSegundoActual =
			this.datosEstadisticos[i].tiempoCPUIdle - this.datosEstadisticos[i-1].tiempoCPUIdle;
		var usoMedioSegundoActual = 1.0 - (tiempoCPUIdleSegundoActual / tiempoCPUSegundoActual);
		sumaCPU = sumaCPU + usoMedioSegundoActual;
	}
	
	var media = sumaCPU / this.datosEstadisticos.length;
	return media;
};

if (process.argv.length < 3) {
    console.warn('Numero de argumentos insuficientes');
} else {
      var nombreAgente = process.argv[2];  // cuando creemos nombre con  __algo -> ver libreria ....
      var agente = new Agente(nombreAgente);
      agente.activar();
}


/*
var agente = new Agente('Bond');
agente.activar();
*/










