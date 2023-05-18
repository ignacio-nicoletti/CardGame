import React, { useEffect, useState } from 'react';
import style from './apuesta.module.css';


const Apuesta = ({ setJugador1, jugador1, setJugador2, jugador2, setJugador3, jugador3, setJugador4, jugador4, ronda, setRonda }) => {
  const [apuesta, setApuesta] = useState("")


  const apuestaGeneral = () => {

    let apuesta1;
    let apuesta2;
    let apuesta3;
    let apuesta4;
    jugador1.apuestaP === -1 ? apuesta1 = 0 : apuesta1 = jugador1.apuestaP
    jugador2.apuestaP === -1 ? apuesta2 = 0 : apuesta2 = jugador2.apuestaP
    jugador3.apuestaP === -1 ? apuesta3 = 0 : apuesta3 = jugador3.apuestaP
    jugador4.apuestaP === -1 ? apuesta4 = 0 : apuesta4 = jugador4.apuestaP

    let apuestafinal = Number(apuesta1) + Number(apuesta2) + Number(apuesta3) + Number(apuesta4)
    setRonda({ ...ronda, ApuestaTotal: Number(apuestafinal) });


    if (
      jugador1.apuestaP > -1 &&
      jugador2.apuestaP > -1 &&
      jugador3.apuestaP > -1 &&
      jugador4.apuestaP > -1
    ) {
      let turno
      if (ronda.obligado === 1) {
        turno = ronda.obligado + 1
      } else if (ronda.obligado === 2) { turno = ronda.obligado + 1 }
      else if (ronda.obligado === 3) { turno = ronda.obligado + 1 }
      else { turno = 1 }

      setRonda({ ...ronda, typeRound: "ronda", ApuestaTotal: Number(apuestafinal), turnoJugador: turno })
    }


  }

  const obligado = () => {
    if (ronda.typeRound === "apuesta" && ronda.turnoJugador === ronda.obligado) {
      console.log("turno del obligado")

      if (ronda.cardPorRonda === ronda.apuesta) {//TERMINAR ESTA FUNCION

      }
    }
  }


  useEffect(() => {
    if (ronda.obligado === 1 || ronda.obligado === 2 || ronda.obligado === 3) {
      setRonda({ ...ronda, turnoJugador: ronda.obligado + 1 })
    } else if (ronda.obligado === 4) {
      setRonda({ ...ronda, turnoJugador: 1 })//turnos de apuesta
    }
  }, [])


  useEffect(() => {
    apuestaGeneral()//suma las apuestas y si todos apostaron cambia el tipo de ronda
  }, [jugador1.apuestaP, jugador2.apuestaP, jugador3.apuestaP, jugador4.apuestaP])


  const handleSubmit = () => {

    if (ronda.turnoJugador === 1) {
      setJugador1({ ...jugador1, apuestaP: Number(apuesta) })
      setRonda({ ...ronda, turnoJugador: ronda.turnoJugador + 1 })
    }
    if (ronda.turnoJugador === 2) {
      setJugador2({ ...jugador2, apuestaP: Number(apuesta) })
      setRonda({ ...ronda, turnoJugador: ronda.turnoJugador + 1 })
    }
    if (ronda.turnoJugador === 3) {
      setJugador3({ ...jugador3, apuestaP: Number(apuesta) })
      setRonda({ ...ronda, turnoJugador: ronda.turnoJugador + 1 })
    }
    if (ronda.turnoJugador === 4) {
      setJugador4({ ...jugador4, apuestaP: Number(apuesta) })
      setRonda({ ...ronda, turnoJugador: 1 })
    }

  };

  return (<>

    <div className={style.contain}>
      <p>jugador {ronda.turnoJugador}</p>
      <select name="select" onChange={(event) => setApuesta(event.target.value)}>
        <option value="⬇️ Select a cant ⬇️" disabled={true}> selecciona carta </option>
        {jugador1.cardPersona.map((x, y) =>
          <option key={y} value={y + 1} disabled={false}>{y + 1} cartas</option>
        )
        }
      </select>
      <button onClick={handleSubmit}>Enviar</button>

    </div>
  </>
  );
};

export default Apuesta;
