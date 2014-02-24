console.log('Iniciando agente');

var os = require('os');

console.log('Memoria libre: ' + parseInt(os.freemem() /1024 / 1024) + 'MB');

var datosCpus = os.cpus();
console.log('Info CPUs:' + JSON.stringify(os.cpus()));

for (var i=0; i< datosCpus.length; i++) {
     var cpuActual = datosCpus[i];
	 console.log('Modelo: ' + cpuActual.model);
};


 // Acumular segundos usador por todas las cpus

var idletime = 0;
for (var i=0; i< datosCpus.length; i++) {
     var cpuActual = datosCpus[i];
	 idletime = idletime+ cpuActual.times.idle;
	 console.log('Tiempo total para el procesador ' + i + 'es: ', + cpuActual.times.user + cpuActual.times.nice + cpuActual.times.sys 
	                + cpuActual.times.idle + cpuActual.times.irq);
};
console.log('Tiempo idle para las cpus es: ', idletime);  


console.log('Fin.');