'use client';
import Image from 'next/image';
import React from 'react';
import styles from './jugadores.module.css';
import person from '../../assets/jugadores/person2.png';
const Jugadores = ({jugador}) => {
  
  console.log({jugador});
  return (
    <div className={styles.contain}>
      <p>Apuesta:{jugador?.apuestaP} </p>
      <div>
        <Image src={person} alt="persona" width={150} height={100} />
      </div>


      <p>name{}</p>
    </div>
  );
};

export default Jugadores;
