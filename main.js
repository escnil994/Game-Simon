const $btnEmpezar = document.getElementById('btn-empezar');
const $lblNivel = document.getElementById('lbl-nivel');
const $lblNombre = document.getElementById('lbl-nombre');
const $selectNivel = document.getElementById('select-nivel');
const $colores = {
    celeste: document.getElementById('celeste'),
    violeta: document.getElementById('violeta'),
    naranja: document.getElementById('naranja'),
    verde: document.getElementById('verde')
};
const sounds = {
    celeste: document.getElementById('sound-1'),
    violeta: document.getElementById('sound-2'),
    naranja: document.getElementById('sound-3'),
    verde: document.getElementById('sound-4'),
    error: document.getElementById('sound-error')
};

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.nivel = 1;
        this.coloresArray = ['celeste', 'violeta', 'naranja', 'verde'];
        this.maxNivel = 10;
        this.pedirNombre();
    }

    async pedirNombre() {
        const { value: nombre } = await Swal.fire({
            title: 'Bienvenido',
            input: 'text',
            inputLabel: 'Ingresa tu nombre para comenzar',
            inputPlaceholder: 'Jugador 1',
            background: '#1a1a2e',
            color: '#fff',
            confirmButtonColor: '#5f27cd',
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (!value) return '¡Necesitas escribir un nombre!';
            }
        });
        this.nombre = nombre;
        $lblNombre.textContent = this.nombre;
        this.toggleBtnEmpezar();
    }

    toggleBtnEmpezar() {
        if ($btnEmpezar.classList.contains('hide')) {
            $btnEmpezar.classList.remove('hide');
            $selectNivel.disabled = false;
        } else {
            $btnEmpezar.onclick = this.inicializar;
        }
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        
        this.maxNivel = parseInt($selectNivel.value);
        $selectNivel.disabled = true;

        this.toggleBtnEmpezar();
        this.nivel = 1;
        this.actualizarStats();
        this.generarSecuencia();
        this.siguienteNivel();
    }

    generarSecuencia() {
        this.secuencia = new Array(1000).fill(0).map(() => Math.floor(Math.random() * 4));
    }

    siguienteNivel() {
        this.subnivel = 0;
        this.actualizarStats();
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    actualizarStats() {
        $lblNivel.textContent = this.nivel;
    }

    transformarNumeroAColor(numero) {
        return this.coloresArray[numero];
    }

    transformarColorANumero(color) {
        return this.coloresArray.indexOf(color);
    }

    iluminarColor(color) {
        $colores[color].classList.add('light');
        this.playSound(color);
        setTimeout(() => $colores[color].classList.remove('light'), 350);
    }

    playSound(color) {
        if (sounds[color]) {
            sounds[color].currentTime = 0;
            sounds[color].play();
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }

    agregarEventosClick() {
        Object.values($colores).forEach(elem => {
            elem.addEventListener('click', this.elegirColor);
        });
    }

    eliminarEventosClick() {
        Object.values($colores).forEach(elem => {
            elem.removeEventListener('click', this.elegirColor);
        });
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);

        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if (this.subnivel === this.nivel) {
                this.nivel++;
                this.eliminarEventosClick();
                
                if (this.nivel === (this.maxNivel + 1)) {
                    this.ganoElJuego();
                } else {
                    setTimeout(this.siguienteNivel, 1500);
                }
            }
        } else {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        Swal.fire({
            icon: 'success',
            title: '¡Ganaste!',
            text: `Has completado los ${this.maxNivel} niveles`,
            background: '#1a1a2e',
            color: '#fff',
            confirmButtonColor: '#10ac84'
        }).then(() => {
            this.inicializarJuegoNuevo();
        });
    }

    perdioElJuego() {
        this.playSound('error');
        this.eliminarEventosClick();
        Swal.fire({
            icon: 'error',
            title: '¡Perdiste!',
            text: `Llegaste hasta el nivel ${this.nivel}`,
            background: '#1a1a2e',
            color: '#fff',
            confirmButtonColor: '#ff9f43',
            confirmButtonText: 'Reintentar'
        }).then(() => {
            this.inicializarJuegoNuevo();
        });
    }

    inicializarJuegoNuevo() {
        this.eliminarEventosClick();
        $btnEmpezar.classList.remove('hide');
        $selectNivel.disabled = false;
        this.toggleBtnEmpezar();
    }
}

const juego = new Juego();

document.getElementById('btn-info').addEventListener('click', () => {
    Swal.fire({
        title: 'Instrucciones',
        html: '<ul style="text-align: left;"><li>Selecciona tu meta de niveles.</li><li>Sigue la secuencia de luces.</li><li>¡Completa la meta para ganar!</li></ul>',
        background: '#1a1a2e',
        color: '#fff'
    });
});

document.getElementById('btn-reset').addEventListener('click', () => {
    location.reload();
});

let deferredPrompt;
const $btnInstall = document.getElementById('btn-install');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    $btnInstall.style.display = 'block';
});

$btnInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            $btnInstall.style.display = 'none';
        }
        deferredPrompt = null;
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('SW Registrado'))
        .catch(err => console.error('SW Error:', err));
}