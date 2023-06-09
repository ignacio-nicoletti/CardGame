export function shuffle (array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor (Math.random () * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


  const generarObligado = () => {
    let min = 1;
    let max = 4;
    let obligado = Math.floor (Math.random () * (max - min + 1) + min);
    return obligado;
  };

  export const gameInit = (setRonda,mezclar,setLoader,ronda,jugador1) => {
    // let numObligado = generarObligado ();
    if (ronda.vuelta === 1 && jugador1.username !== '') {
      setRonda ({...ronda, typeRound: 'apuesta', obligado: 4});
      mezclar ();
      setLoader(false)
    }
  };


  export const turno = (ronda,jugador1,jugador2,jugador3,jugador4,setJugador1,setJugador2,setJugador3,setJugador4) => {
    if (ronda.typeRound === 'apuesta') {
      if (ronda.turnoJugadorA === 1) {
        setJugador1 ({...jugador1, myturnA: true});
        setJugador2 ({...jugador2, myturnA: false});
        setJugador3 ({...jugador3, myturnA: false});
        setJugador4 ({...jugador4, myturnA: false});
      }
      if (ronda.turnoJugadorA === 2) {
        setJugador2 ({...jugador2, myturnA: true});
        setJugador1 ({...jugador1, myturnA: false});
        setJugador3 ({...jugador3, myturnA: false});
        setJugador4 ({...jugador4, myturnA: false});
      }
      if (ronda.turnoJugadorA === 3) {
        setJugador3 ({...jugador3, myturnA: true});
        setJugador1 ({...jugador1, myturnA: false});
        setJugador2 ({...jugador2, myturnA: false});
        setJugador4 ({...jugador4, myturnA: false});
      }
      if (ronda.turnoJugadorA === 4) {
        setJugador4 ({...jugador4, myturnA: true});
        setJugador1 ({...jugador1, myturnA: false});
        setJugador2 ({...jugador2, myturnA: false});
        setJugador3 ({...jugador3, myturnA: false});
      }
    }
    if (ronda.typeRound === 'ronda') {
      if (ronda.turnoJugadorR === 1) {
        setJugador1 ({...jugador1, myturnR: true});
        setJugador2 ({...jugador2, myturnR: false});
        setJugador3 ({...jugador3, myturnR: false});
        setJugador4 ({...jugador4, myturnR: false});
      }
      if (ronda.turnoJugadorR === 2) {
        setJugador2 ({...jugador2, myturnR: true});
        setJugador1 ({...jugador1, myturnR: false});
        setJugador3 ({...jugador3, myturnR: false});
        setJugador4 ({...jugador4, myturnR: false});
      }
      if (ronda.turnoJugadorR === 3) {
        setJugador3 ({...jugador3, myturnR: true});
        setJugador1 ({...jugador1, myturnR: false});
        setJugador2 ({...jugador2, myturnR: false});
        setJugador4 ({...jugador4, myturnR: false});
      }
      if (ronda.turnoJugadorR === 4) {
        setJugador4 ({...jugador4, myturnR: true});
        setJugador1 ({...jugador1, myturnR: false});
        setJugador2 ({...jugador2, myturnR: false});
        setJugador3 ({...jugador3, myturnR: false});
      }
    }
  };



  const comprobarMasGrande = (array,ronda) => {
    let mayor;
    if (array[1].valor === null) {
      mayor = array[0];
      return mayor;
    } else if (array[0].valor !== null && array[1].valor !== null) {
      if (ronda.CardGanadoraxRonda[0].valor < array[0].valor) {
        mayor = array[0];
      } else mayor = ronda.CardGanadoraxRonda[0];
      return mayor;
    }
  };


  export const AsignarMayor = (value1, value2,ronda,setRonda) => {
    let array = [value1, value2];
    let ganador = comprobarMasGrande (array,ronda);
    setRonda ({...ronda, CardGanadoraxRonda: [ganador]});
  };