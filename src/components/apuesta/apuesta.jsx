import React, { useState } from 'react';
import style from './apuesta.module.css';


const Apuesta = ({cant,setApuestaP,setMyturn}) => {
const[apuesta,setApuesta]=useState("")


    const handleSubmit = () => {
        setApuestaP(apuesta)
        setMyturn(false)
  };

  return(<>
    

    <div className={style.contain}>
      <select name="select"  onChange={(event) =>setApuesta(event.target.value)}>
        <option value="1">Value 1</option>
        <option value="2">Value 2</option>
        <option value="3">Value 3</option>
      </select>
      <button onClick={handleSubmit}>Enviar</button>

    </div>
    </>
  );
};

export default Apuesta;
