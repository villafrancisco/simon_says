const start = document.getElementById('start');
const player = document.getElementById('player');
const comenzar = document.getElementById('comenzar');
const name = document.getElementById('name');
const ok = document.getElementById('ok');
const rojo = document.getElementById('rojo');
const azul = document.getElementById('azul');
const amarillo = document.getElementById('amarillo');
const verde = document.getElementById('verde');
const root = document.documentElement;
const colours = document.getElementById('simonplay');

let nameplayer = '';
let secuenciacoloresmaquina = [];
let secuenciacoloresjugador = [];
let nivel = 1;

const jugador = {
	nombre: '',
	puntuacion: ''
};
//Como parametro se le pasa la secuencia de colores
const cambiarBrillo = (colores) => {
	console.log(colores);
	for (const color of colores) {
		console.log(color);
		let num = 1;
		let c = setInterval(() => {
			if (num == 2) {
			}
			document.getElementById(color).classList.toggle('brillo' + color);
			num++;
		}, 1000);
	}
};

const turnoJugador = () => {
	if (secuenciacoloresmaquina.length != secuenciacoloresjugador.length) {
	}

	if (JSON.stringify(secuenciacoloresjugador) === JSON.stringify(secuenciacoloresmaquina)) {
		console.log('mas colores');
		jugar();
	} else {
		// console.log(secuenciacoloresjugador);
		// console.log(secuenciacoloresmaquina);
		console.log('has perdido');
	}
};
const colorAleatorio = () => {
	let colormaquina;
	colormaquina = Math.floor(Math.random() * 4) + 1;
	switch (colormaquina) {
		case 1:
			return 'rojo';
			break;
		case 2:
			return 'azul';
			break;
		case 3:
			return 'amarillo';
			break;
		case 4:
			return 'verde';
			break;
		default:
			break;
	}
};

const jugar = () => {
	secuenciacoloresjugador = [];
	color = colorAleatorio();
	secuenciacoloresmaquina.push(color);
	cambiarBrillo(secuenciacoloresmaquina);
};

const empezarJuego = () => {
	//secuencia de colores
	nivel = 1;
	secuenciacoloresmaquina = ['rojo', 'verde'];
	jugar();
};

colours.addEventListener('click', (e) => {
	const color = colours.getElementsByClassName('cuadrado');
	for (const element of color) {
		element.classList.remove('brillorojo');
		element.classList.remove('brilloazul');
		element.classList.remove('brilloamarillo');
		element.classList.remove('brilloverde');
	}
	if (e.target.id == 'rojo' || e.target.id == 'azul' || e.target.id == 'amarillo' || e.target.id == 'verde') {
		secuenciacoloresjugador.push(e.target.id);
		document.getElementById(e.target.id).classList.toggle('brillo' + e.target.id);
	}
});
start.addEventListener('click', (e) => {
	player.classList.add('modal--show');
});

ok.addEventListener('click', (e) => {
	if (name.value == '') {
		name.placeholder = 'Debe introducir un jugador';
	} else {
		jugador.nombre = name.value;
		player.classList.remove('modal--show');
		comenzar.innerHTML = jugador.nombre;
		localStorage.setItem(jugador.nombre, jugador.puntuacion);
		empezarJuego();
	}
});
