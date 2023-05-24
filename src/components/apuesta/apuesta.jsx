import React, { useEffect, useState } from 'react';
import style from './apuesta.module.css';


const Apuesta = ({ setJugador1, jugador1, setJugador2, jugador2, setJugador3, jugador3, setJugador4, jugador4, ronda, setRonda }) => {
  const [apuesta, setApuesta] = useState(0)

  const [estadoactivo, setEstadoactivo] = useState({
    card0: false,
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false,
    card6: false,
    card7: false,
  })

  const ComienzoTurnoApuesta = () => {
    const turnoJ = ronda.obligado;
    switch (turnoJ) {
      case 1:
        setRonda({ ...ronda, turnoJugadorA: 2 });
        break;
      case 2:
        setRonda({ ...ronda, turnoJugadorA: 3 });
        break;
      case 3:
        setRonda({ ...ronda, turnoJugadorA: 4 });
        break;
      case 4:
        setRonda({ ...ronda, turnoJugadorA: 1 });
        break;
      default:
        break;
    }
  }
  const cambiotypeRound = () => {
    if (ronda.cantQueApostaron === 4) {
      setRonda({ ...ronda, typeRound: "ronda" ,cantQueApostaron:0})   // cambio de ronda
    }


 
  }
  const apuestaGeneral = () => {
    let apuestafinal = Number(jugador1.apuestaP) + Number(jugador2.apuestaP) + Number(jugador3.apuestaP) + Number(jugador4.apuestaP)
    setRonda({ ...ronda, ApuestaTotal: Number(apuestafinal) });
  }



  const apostar = (event) => {

    setApuesta(event.target.value)
    // if (ronda.typeRound === "apuesta" && ronda.turnoJugador === ronda.obligado) {
    //   if (
    //     Number(event.target.value) === 0 &&
    //     Number(ronda.cardPorRonda) ===
    //     Number(ronda.ApuestaTotal) + Number(event.target.value)
    //   ) {
    //     setEstadoactivo({ estadoactivo, card0: true });
    //   }
    //   if (
    //     Number(event.target.value) === 1 &&
    //     Number(ronda.cardPorRonda) ===
    //     Number(ronda.ApuestaTotal) + Number(event.target.value)
    //   ) {
    //     setEstadoactivo({ estadoactivo, card1: true });
    //   }
    //   if (
    //     Number(event.target.value) === 2 &&
    //     Number(ronda.cardPorRonda) ===
    //     Number(ronda.ApuestaTotal) + Number(event.target.value)
    //   ) {
    //     setEstadoactivo({ estadoactivo, card2: true });
    //   }
    //   if (
    //     Number(event.target.value) === 3 &&
    //     Number(ronda.cardPorRonda) ===
    //     Number(ronda.ApuestaTotal) + Number(event.target.value)
    //   ) {
    //     setEstadoactivo({ estadoactivo, card3: true });
    //   }
    //   if (
    //     Number(event.target.value) === 4 &&
    //     Number(ronda.cardPorRonda) ===
    //     Number(ronda.ApuestaTotal) + Number(event.target.value)
    //   ) {
    //     setEstadoactivo({ estadoactivo, card4: true });
    //   }
    //   if (
    //     Number(event.target.value) === 5 &&
    //     Number(ronda.cardPorRonda) ===
    //     Number(ronda.ApuestaTotal) + Number(event.target.value)
    //   ) {
    //     setEstadoactivo({ estadoactivo, card5: true });
    //   }
    //   if (
    //     Number(event.target.value) === 6 &&
    //     Number(ronda.cardPorRonda) ===
    //     Number(ronda.ApuestaTotal) + Number(event.target.value)
    //   ) {
    //     setEstadoactivo({ estadoactivo, card6: true });
    //   }
    //   if (
    //     Number(event.target.value) === 7 &&
    //     Number(ronda.cardPorRonda) ===
    //     Number(ronda.ApuestaTotal) + Number(event.target.value)
    //   ) {
    //     setEstadoactivo({ estadoactivo, card7: true });
    //   }
    // }//lo hace bien pero una vez que mande el numero, tiene que hacerlo antes
  }


  useEffect(() => {
    apuestaGeneral()//suma las apuestas
    cambiotypeRound()

  }, [ronda.cantQueApostaron])
  // jugador1.apuestaP,jugador2.apuestaP,jugador3.apuestaP,jugador4.apuestaP


  useEffect(() => {
    ComienzoTurnoApuesta()//cuando se monta el componente determina quien arranca
  }, [])
  // jugador1.apuestaP,jugador2.apuestaP,jugador3.apuestaP,jugador4.apuestaP



  const handleSubmit = () => {
    const turnoJugador = ronda.turnoJugadorA;

    switch (turnoJugador) {
      case 1:
        setJugador1({ ...jugador1, apuestaP: Number(apuesta) });
        setRonda({ ...ronda, turnoJugadorA: 2, cantQueApostaron: ronda.cantQueApostaron + 1 });
        break;
      case 2:
        setJugador2({ ...jugador2, apuestaP: Number(apuesta) });
        setRonda({ ...ronda, turnoJugadorA: 3, cantQueApostaron: ronda.cantQueApostaron + 1 });
        break;
      case 3:
        setJugador3({ ...jugador3, apuestaP: Number(apuesta) });
        setRonda({ ...ronda, turnoJugadorA: 4, cantQueApostaron: ronda.cantQueApostaron + 1 });
        break;
      case 4:
        setJugador4({ ...jugador4, apuestaP: Number(apuesta) });
        setRonda({ ...ronda, turnoJugadorA: 1, cantQueApostaron: ronda.cantQueApostaron + 1 });
        break;
      default:
        break;
    }
  };

  return (<>

    <div className={style.contain}>
      <p>jugador {ronda.turnoJugadorA}</p>

      <select name="select" onClick={(event) => apostar(event)}>
        <option value={"Elige tu apuesta"} disabled={true}> Elige tu apuesta </option>
        {[...Array(ronda.cardPorRonda + 1)].map((_, index) => (
          <option
            key={index}
            value={index}
            disabled={index === 0 ? estadoactivo.card0 : estadoactivo[`card${index}`]}
          >
            {index} cartas
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Enviar</button>

    </div>
  </>
  );
};

export default Apuesta;
