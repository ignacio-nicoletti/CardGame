import React, { useEffect, useState } from 'react';
import style from './apuesta.module.css';


const Apuesta = ({ setJugador1, jugador1, setJugador2, jugador2, setJugador3, jugador3, setJugador4, jugador4, ronda, setRonda }) => {
  const [apuesta, setApuesta] = useState("")
  console.log(apuesta);
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

  const apuestaGeneral = () => {

    let apuesta1;
    let apuesta2;
    let apuesta3;
    let apuesta4;
    jugador1.apuestaP < 0 ? apuesta1 = 0 : apuesta1 = jugador1.apuestaP
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
    //asigna el turno al siguiente del obligado

  }




  const apostar = (event) => {
    setApuesta(event.target.value)

    if (ronda.typeRound === "apuesta" && ronda.turnoJugador === ronda.obligado) {
      if (
        Number(event.target.value) === 0 &&
        Number(ronda.cardPorRonda) ===
        Number(ronda.ApuestaTotal) + Number(event.target.value)
      ) {
        setEstadoactivo({ estadoactivo, card0: true });
      }
      if (
        Number(event.target.value) === 1 &&
        Number(ronda.cardPorRonda) ===
        Number(ronda.ApuestaTotal) + Number(event.target.value)
      ) {
        setEstadoactivo({ estadoactivo, card1: true });
      }
      if (
        Number(event.target.value) === 2 &&
        Number(ronda.cardPorRonda) ===
        Number(ronda.ApuestaTotal) + Number(event.target.value)
      ) {
        setEstadoactivo({ estadoactivo, card2: true });
      }
      if (
        Number(event.target.value) === 3 &&
        Number(ronda.cardPorRonda) ===
        Number(ronda.ApuestaTotal) + Number(event.target.value)
      ) {
        setEstadoactivo({ estadoactivo, card3: true });
      }
      if (
        Number(event.target.value) === 4 &&
        Number(ronda.cardPorRonda) ===
        Number(ronda.ApuestaTotal) + Number(event.target.value)
      ) {
        setEstadoactivo({ estadoactivo, card4: true });
      }
      if (
        Number(event.target.value) === 5 &&
        Number(ronda.cardPorRonda) ===
        Number(ronda.ApuestaTotal) + Number(event.target.value)
      ) {
        setEstadoactivo({ estadoactivo, card5: true });
      }
      if (
        Number(event.target.value) === 6 &&
        Number(ronda.cardPorRonda) ===
        Number(ronda.ApuestaTotal) + Number(event.target.value)
      ) {
        setEstadoactivo({ estadoactivo, card6: true });
      }
      if (
        Number(event.target.value) === 7 &&
        Number(ronda.cardPorRonda) ===
        Number(ronda.ApuestaTotal) + Number(event.target.value)
      ) {
        setEstadoactivo({ estadoactivo, card7: true });
      }
    }//lo hace bien pero una vez que mande el numero, tiene que hacerlo antes
  }



  useEffect(() => {
    if (ronda.obligado === 1 || ronda.obligado === 2 || ronda.obligado === 3) {
      setRonda({ ...ronda, turnoJugador: ronda.obligado + 1 })
    } else if (ronda.obligado === 4) {
      setRonda({ ...ronda, turnoJugador: 1 })//turnos de apuesta
    }
  }, [])


  useEffect(() => {
    apuestaGeneral()

    //suma las apuestas y si todos apostaron cambia el tipo de ronda
  }, [jugador1.apuestaP, jugador2.apuestaP, jugador3.apuestaP, jugador4.apuestaP])



  const handleSubmit = () => {
    const turnoJugador = ronda.turnoJugador;

    switch (turnoJugador) {
      case 1:
        setJugador1({ ...jugador1, apuestaP: Number(apuesta) });
        setRonda({ ...ronda, turnoJugador: turnoJugador + 1 });
        break;
      case 2:
        setJugador2({ ...jugador2, apuestaP: Number(apuesta) });
        setRonda({ ...ronda, turnoJugador: turnoJugador + 1 });
        break;
      case 3:
        setJugador3({ ...jugador3, apuestaP: Number(apuesta) });
        setRonda({ ...ronda, turnoJugador: turnoJugador + 1 });
        break;
      case 4:
        setJugador4({ ...jugador4, apuestaP: Number(apuesta) });
        setRonda({ ...ronda, turnoJugador: 1 });
        break;
      default:
        break;
    }
  };

  return (<>



    <div className={style.contain}>
      <p>jugador {ronda.turnoJugador}</p>

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

      {/* 
      {ronda.cardPorRonda === 1 ?
        <select name="select" onClick={(event) => apostar(event)}>
          <option value={"Elige tu apuesta"} disabled={true}> Elige tu apuesta </option>
          <option value={0} disabled={estadoactivo.card0}> 0 cartas </option>
          <option value={1} disabled={estadoactivo.card1}> 1 carta </option>
        </select>

        : ronda.cardPorRonda === 3 ?
          <select name="select" onClick={(event) => apostar(event)}>
            <option value={"Elige tu apuesta"} disabled={true}> Elige tu apuesta </option>
            <option value={0} disabled={estadoactivo.card0}> 0 cartas </option>
            <option value={1} disabled={estadoactivo.card1}> 1 carta </option>
            <option value={2} disabled={estadoactivo.card2}> 2 cartas </option>
            <option value={3} disabled={estadoactivo.card3}> 3 cartas </option>
          </select>
          : ronda.cardPorRonda === 5 ?
            <select name="select" onClick={(event) => apostar(event)}>
              <option value={"Elige tu apuesta"} disabled={true}> Elige tu apuesta </option>
              <option value={0} disabled={estadoactivo.card0}> 0 cartas </option>
              <option value={1} disabled={estadoactivo.card1}> 1 carta </option>
              <option value={2} disabled={estadoactivo.card2}> 2 cartas </option>
              <option value={3} disabled={estadoactivo.card3}> 3 cartas </option>
              <option value={4} disabled={estadoactivo.card4}> 4 cartas </option>
              <option value={5} disabled={estadoactivo.card5}> 5 cartas </option>
            // </select>
            : ronda.cardPorRonda === 7 ?
              <select name="select" onClick={(event) => apostar(event)}>
                <option value={"Elige tu apuesta"} disabled={true}> Elige tu apuesta </option>
                <option value={0} disabled={estadoactivo.card0}> 0 cartas </option>
                <option value={1} disabled={estadoactivo.card1}> 1 carta </option>
                <option value={2} disabled={estadoactivo.card2}> 2 cartas </option>
                <option value={3} disabled={estadoactivo.card3}> 3 cartas </option>
                <option value={4} disabled={estadoactivo.card4}> 4 cartas </option>
                <option value={5} disabled={estadoactivo.card5}> 5 cartas </option>
                <option value={6} disabled={estadoactivo.card6}> 6 cartas </option>
                <option value={7} disabled={estadoactivo.card7}> 7 cartas </option>
              </select> : ""



      }


      <button onClick={handleSubmit}>Enviar</button> */}






    </div>
  </>
  );
};

export default Apuesta;
