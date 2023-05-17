import React, { useState } from 'react';
import style from './apuesta.module.css';


const Apuesta = ({ setJugador1, jugador1,setJugador2, jugador2,setJugador3, jugador3,setJugador4, jugador4,ronda,setRonda }) => {
  const [apuesta, setApuesta] = useState("")

if (ronda.obligado===1||ronda.obligado===2||ronda.obligado===3){
  setRonda( {...ronda,turnoJugador:ronda.obligado+1})
}else if(ronda.obligado===4){
  setRonda( {...ronda,turnoJugador:1})
}


  const handleSubmit = () => {
if(ronda.turnoJugador===1){
  setJugador1({ ...jugador1, apuestaP: apuesta })
  setRonda( {...ronda,turnoJugador:ronda.turnoJugador+1})
}
if(ronda.turnoJugador===2){
  setJugador2({ ...jugador2, apuestaP: apuesta})
  setRonda( {...ronda,turnoJugador:ronda.turnoJugador+1})
}
if(ronda.turnoJugador===3){
  setJugador3({ ...jugador3, apuestaP: apuesta})
  setRonda( {...ronda,turnoJugador:ronda.turnoJugador+1})
}
if(ronda.turnoJugador===4){
  setJugador4({ ...jugador4, apuestaP: apuesta})
  setRonda( {...ronda,turnoJugador:1})
}
if(jugador1.apuestaP&&jugador2.apuestaP&&jugador3.apuestaP&&jugador4.apuestaP){
  setRonda( {...ronda,typeRound:"ronda"})
}

  };

  return (<>

    <div className={style.contain}>
        <p>jugador {ronda.turnoJugador}</p>
      <select name="select" onChange={(event) => setApuesta(event.target.value)}>
        <option value="⬇️ Select a cant ⬇️" disabled={true}> selecciona carta </option>
        {jugador1.cardPersona.map((x, y) =>
          <option key={y} value={y+1}>{y + 1} cartas</option>
          )
        }
      </select>
      <button onClick={handleSubmit}>Enviar</button>

    </div>
  </>
  );
};

export default Apuesta;
