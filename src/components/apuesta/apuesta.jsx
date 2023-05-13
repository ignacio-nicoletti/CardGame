import React, { useState } from 'react';
import style from './apuesta.module.css';


const Apuesta = ({setJugador1, jugador1}) => {
const[apuesta,setApuesta]=useState("")


    const handleSubmit = () => {
     
      setJugador1({...jugador1, apuestaP: apuesta,myturn:false})
     
  };
console.log(apuesta);
  return(<>
    

    <div className={style.contain}>
      <select name="select"  onChange={(event) =>setApuesta(event.target.value)}>
        <option disabled={true}>Opciones</option>
        <option value="0">0 Carta</option>
        <option value="1">1 Cartas</option>
        <option value="2">2 Cartas</option>
        <option value="3">3 Cartas</option>
      </select>
      <button onClick={handleSubmit}>Enviar</button>

    </div>
    </>
  );
};

export default Apuesta;
