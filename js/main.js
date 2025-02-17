/**
 * Juego
 * Proyecto Final - Simon dice
 */

/**
 * Juego
 * Proyecto Final - Simon dice
 */

(async function() {
  const btn = document.getElementById("btn");
  const $celeste = document.getElementById("celeste");
  const $violeta = document.getElementById("violeta");
  const $naranja = document.getElementById("naranja");
  const $verde = document.getElementById("verde");
  const $btn = document.getElementById("btn");
  /*  const $btnRepeat = document.getElementById("repeat"); */
  const $refres = document.getElementById("ref");

  const $name = document.getElementById("name");
  const $puntos = document.getElementById("pts");
  const $nivel = document.getElementById("lvl");
  const $meta = document.getElementById("meta");
  const $sequence = document.getElementById("sequence");
  const $instructions = document.getElementById("instrucciones");

  const startEffect = document.getElementById("start-effect");
  const pointerEffect = document.getElementById("pointer-effect");
  const loseEffect = document.getElementById("lose-effect");
  const winEffect = document.getElementById("win-effect");




  var ultimo = prompt("Hola Antes que nada, debes saber que este juego se basa en niveles y estos por defecto son 10"
  +", si quieres modificar los niveles puedes escribir aquí, cuantos niveles quieras");
  if (ultimo===""){
    ultimo = 10;
  }

  const ULTIMO_NIVEL = parseInt(ultimo);


  class Juego {
    constructor() {
      this.repeatCont = 0;
      this.puntos = 0;
      this.inicializar();
      this.generarSecuencia();
      setTimeout(this.siguienteNivel, 500);
    }
    inicializar() {
      startEffect.play();
      this.siguienteNivel = this.siguienteNivel.bind(this);
      this.elegirColor = this.elegirColor.bind(this);
      this.repeatSequenceColor = this.repeatSequenceColor.bind(this);
      $btn.removeEventListener("click", inicializarJuego);
      /*  $btn.removeEventListener("click", siguienteNivel); */
      $btn.classList.add("btn--Juego");
      this.nivel = 1;
      this.colores = {
        celeste: $celeste,
        violeta: $violeta,
        naranja: $naranja,
        verde: $verde
      };
    }

    // ReStart
    restart() {
      this.removeEventClicks();
      btn.classList.remove("btn--Juego");
      $refres.addEventListener("click");
      this.restart();
      if (JuegoMusic.paused) {
        JuegoMusic.play();
      }
    }

    reset() {
      $refres.addEventListener("click");
      JuegoMusic.play();
      this.restart();
    }

    addEventClicks() {
      for (const element in this.colores) {
        this.colores[element].addEventListener("click", this.elegirColor);
      }

      /*  $btnRepeat.addEventListener("click", this.repeatSequenceColor); */
    }

    removeEventClicks() {
      for (const element in this.colores) {
        this.colores[element].removeEventListener("click", this.elegirColor);
      }
      /*  $btnRepeat.addEventListener("click", this.repeatSequenceColor); */
    }

    generarSecuencia() {
      this.sequence = new Array(ULTIMO_NIVEL)
        .fill(0)
        .map(numero => Math.floor(Math.random() * 4));
    }

    siguienteNivel() {
      this.subnivel = 0;
      this.iluminarSecuencia();
      this.addEventClicks();
    }

    transformarNumeroAColor(numero) {
      switch (numero) {
        case 0:
          return "celeste";
        case 1:
          return "violeta";
        case 2:
          return "naranja";
        case 3:
          return "verde";
      }
    }

    transformarColorANumero(color) {
      switch (color) {
        case "celeste":
          return 0;
        case "violeta":
          return 1;
        case "naranja":
          return 2;
        case "verde":
          return 3;
      }
    }

    iluminarColor(color) {
      this.colores[color].classList.add("light");
      pointerEffect.play();
      setTimeout(() => {
        this.colores[color].classList.remove("light");
      }, 500);
    }

    iluminarSecuencia() {
      for (let i = 0; i < this.nivel; i++) {
        const color = this.transformarNumeroAColor(this.sequence[i]);
        setTimeout(() => {
          this.iluminarColor(color);
        }, 1200 * i);
      }
    }

    stopMusic() {
      JuegoMusic.currentTime = 0;
      JuegoMusic.pause();
    }

    repeatSequenceColor() {
      this.repeatCont++;
      this.iluminarSecuencia();
      $sequence.textContent = this.repeatCont;
      this.restart();
    }

    smssiguienteNivel() {
      startEffect.play();
      Swal.fire({
        type: "success",
        title: `Nivel ${this.nivel - 1} superado <br> 😀`
      }).then(this.siguienteNivel);

      /* .then(setTimeout(this.siguienteNivel, 2500)) */
    }

    ganoJuego() {
      this.stopMusic();
      winEffect.play();
      Swal.fire({
        title: `Felicidades Ganastes! <br> 🏆👏`,
        text: "¿Deseas jugar de nuevo?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then(result => {
        if (result.value) inicializarJuego();
        else $btn.addEventListener("click", inicializarJuego);
        JuegoMusic.play();
      });
    }

    perdioJuego() {
      this.stopMusic();
      loseEffect.play();
      Swal.fire({
        title: `Lo siento, perdistes! <br> 🙁`,
        text: "¿Deseas jugar de nuevo?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then(result => {
        if (result.value) inicializarJuego();
        else $btn.addEventListener("click", inicializarJuego);
        this.restart();
      });
    }

    elegirColor(event) {
      const nombreColor = event.target.dataset.color;
      const numeroColor = this.transformarColorANumero(nombreColor);
      this.iluminarColor(nombreColor);
      if (numeroColor === this.sequence[this.subnivel]) {
        this.subnivel++;
        if (this.subnivel === this.nivel) {
          this.nivel++;
          if (this.repeatCont > 0) {
            this.puntos += this.subnivel * 2 - this.repeatCont;
          } else this.puntos = this.subnivel * 2;
          this.repeatCont = 0;
          /*  $sequence.textContent = this.repeatCont; */
          $puntos.textContent = this.puntos < 0 ? 0 : this.puntos;
          $nivel.textContent = this.nivel;
          this.removeEventClicks();
          if (this.nivel === ULTIMO_NIVEL + 1) {
            this.ganoJuego();
            /* this.stopMusic(); */
            /* winEffect.play(); */
          } else {
            this.smssiguienteNivel();
          }
        }
      } else {
        this.perdioJuego();
        /* this.restart(); */

        //perdio
      }
    }
  }

  function inicializarJuego() {

    const simonJuego = new Juego();
  }

  $btn.addEventListener("click", inicializarJuego);

  $instructions.addEventListener("click", () => {
    Swal.fire({
      type: "info",
      title: `Hola ${name} para jugar, solo debes seguir las siguientes instrucciones`,
      html: `<div style="text-align: left;"><strong>1.-</strong> debes dar click sobre el color que se ilumine</div>
                 <div style="text-align: left;"><strong>2.-</strong> Debes acertar toda la secuencia de colores(perderas si te equivocas).</div>
                 <div style="text-align: left;"><strong>3.-</strong> podrás activar/desactivar el audio dando click sobre el icono de sonido </div>
                 <div style="text-align: left;"><strong>4.-</strong> Cuando completes cada nivel te dará un aviso.</div>
                 <div style="text-align: left;"><strong>5.-</strong> Completar los ${ULTIMO_NIVEL} Niveles y ganaras.</div>
                 <br>
                 <div style="text-align: right;"><strong>Echo por:</strong> Nilson Escobar @Escnil994 😉</div>
                 `
    });
  });

  const { value: name } = await Swal.fire({
    title: "Hola Bienvenido a tu juego, espero te de diviertas\n Ingrese un nombre para poder reconocerte",
    input: "text",
    inputPlaceholder: "Ingrese un nombre",
    allowEscapeKey: false,
    allowOutsideClick: false,
    inputValidator: value => {
      if (!value) {
        return "Lo siento!!!, pero debes ingresar un nombre para poder reconocerte";
      }
      else{
        
      }
    }
  });
  $name.textContent = name;

})();



const JuegoMusic = document.getElementById("Juego-music");

function controlAudio() {
  JuegoMusic.muted ? (JuegoMusic.muted = false) : (JuegoMusic.muted = true);
}

function music(action) {
  switch (action) {
    case "play":
      JuegoMusic.play(1);
      break;
    case "stop":
      JuegoMusic.pause();
      break;
  }
}
