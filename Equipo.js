var fs=require('fs'); //cargar un modulo, unidad independiente de codigo  en este caso fs, devuelve una funcion 
var js = fs.readFileSync('jugador.js') + '';
eval(js);


var Equipo = function(nombre,anyoFundacion) {
       this.nombre=nombre;
	   this.anyoFundacion=anyoFundacion;
	   this.jugadores=[];
};

Equipo.prototype.ficharJugador = function(jugador) {
        if (this.jugadores.indexOf(jugador) == true){
		   console.log('El jugador ' + jugador.nombre + ' ya existe');
		} else {
		     jugador.equipo=this;
		     this.jugadores.push(jugador);
	    };
}

/* Jugador.prototype.Traspasar = function(jugador) {
        if (this.jugadores.splice(jugador) == []){
		   console.log('Jugador no existe');
		} else {
		     console.log('Jugador ');
	    };
} */

var fcBarcelona = new Equipo('FC barcelona',1899);
var j1 = new Jugador('Messi','Delantero',10);      // crea  la burbuja	
var j2 = new Jugador('Pique','Defensa',3);

/* j1.equipo = fcBarcelona;
fcBarcelona.jugadores.push(j1); */

fcBarcelona.ficharJugador(j1);
console.log(fcBarcelona);

fcBarcelona.ficharJugador(j2);
j2.Traspasar(j2);
console.log(fcBarcelona);
j2.Traspasar(j2);



/* console.log(j1.equipo.nombre);
console.log(fcBarcelona.jugadores[0].nombre); */
console.log(fcBarcelona);