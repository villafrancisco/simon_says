const start = document.getElementById('start');
const player = document.getElementById('player');
const comenzar = document.getElementById('comenzar');
const name = document.getElementById('name');
const ok = document.getElementById('ok');
const colours = document.getElementById('simonplay');
const ranking = document.getElementById('ranking');

let secuenciacoloresmaquina = [];
let colorjugador;
let aciertos;
let nivel = 1;
const sonidos = ['blue.mp3', 'red.mp3,yellow.mp3,green.mp3'];

const jugador = {
	nombre: '',
	puntuacion: ''
};

//Dibujar los 10 primeros del ranking
const dibujarRanking = () => {
	ranking.lastElementChild.innerHTML = '';
	let jugadores = [];

	for (const key of Object.keys(localStorage)) {
		jugadores.push(JSON.parse(localStorage.getItem(key)));
		jugadores.sort((a, b) => b.puntuacion - a.puntuacion);
	}

	const fragment = document.createDocumentFragment();
	for (let i = 0; i < jugadores.length && i < 10; i++) {
		const tr = document.createElement('TR');
		const tdposicion = document.createElement('TD');
		const tdjugador = document.createElement('TD');
		const tdpuntuacion = document.createElement('TD');
		tdposicion.textContent = i + 1;
		tdjugador.textContent = jugadores[i].nombre;
		tdpuntuacion.textContent = jugadores[i].puntuacion;
		tr.append(tdposicion);
		tr.append(tdjugador);
		tr.append(tdpuntuacion);
		fragment.append(tr);
	}
	ranking.lastElementChild.append(fragment);
};
//Establecer un color aleatorio
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

//Preguntar si el jugador a acertado la secuencia de colores
const turnoJugador = () => {
	if (colorjugador == secuenciacoloresmaquina[aciertos]) {
		//Has acertado el color
		aciertos++;
		if (aciertos == secuenciacoloresmaquina.length) {
			//has llegado al final acertando todo  la secuencia vuelve a jugar
			nivel++;
			jugar();
		}
	} else {
		//No has acertado el color
		comenzar.textContent = 'GAME OVER';
		jugador.puntuacion = nivel;
		const id = Math.random().toString(16).substring(2);
		localStorage.setItem(id, JSON.stringify(jugador));
		dibujarRanking();
	}
};

//Cambiar brillo de los colores del juego
const cambiarBrillo = (color) => {
	return new Promise((resolve, reject) => {
		document.getElementById(color).classList.toggle('brillo');
		let a = new Audio('sounds/' + color + '.mp3');
		a.play();
		setTimeout(() => {
			document.getElementById(color).classList.toggle('brillo');
			setTimeout(() => {
				resolve();
			}, 250);
		}, 1000);
	});
};

//Dibujar la secuencia
const dibujarsecuencia = async () => {
	for (const color of secuenciacoloresmaquina) {
		await cambiarBrillo(color);
	}
};

const jugar = () => {
	colorjugador = '';
	aciertos = 0;
	secuenciacoloresmaquina.push(colorAleatorio());
	dibujarsecuencia();
	comenzar.innerHTML = `<p>${jugador.nombre}</p><p>Nivel:${nivel}</p>`;
};

const empezarJuego = () => {
	//secuencia de colores
	nivel = 1;
	secuenciacoloresmaquina = [];
	jugar();
};

colours.addEventListener('click', (e) => {
	if (e.target.id == 'rojo' || e.target.id == 'azul' || e.target.id == 'amarillo' || e.target.id == 'verde') {
		colorjugador = e.target.id;
		turnoJugador();
	}
});

colours.addEventListener('mousedown', (e) => {
	if (e.target.id == 'rojo' || e.target.id == 'azul' || e.target.id == 'amarillo' || e.target.id == 'verde') {
		document.getElementById(e.target.id).classList.add('brillo');
	}
});

colours.addEventListener('mouseup', (e) => {
	if (e.target.id == 'rojo' || e.target.id == 'azul' || e.target.id == 'amarillo' || e.target.id == 'verde') {
		document.getElementById(e.target.id).classList.remove('brillo');
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
		empezarJuego();
	}
});
dibujarRanking();
