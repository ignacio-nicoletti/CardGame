'use client';
import Image from 'next/image';
import React from 'react';
import styles from './jugadores.module.css';
import person from '../../assets/jugadores/person2.png';
import backface from '../../assets/valores/backface.png';
const Jugadores = ({jugador}) => {


  let estilo;
  let alinear=styles.align
  let cardalign=styles.cardContain
  let rotate=""
  if (jugador.id === 4) {
    estilo = styles.AcomodarCard4;
    rotate="rotate(270deg)"
  }
  if (jugador.id === 3) {
    estilo = styles.AcomodarCard3;
    alinear = styles.alinearCard3;
    cardalign=styles.card3;
  }
  if (jugador.id === 2) {
    estilo = styles.AcomodarCard2;
    rotate="rotate(90deg)"
  }

  return (
    <div className={estilo}>
      <div >
        <p>Apuesta:{jugador.apuestaP}</p>
        <div >
          <Image src={person} alt="persona" width={150} height={100} />
        </div>
        <p style={{margin:0}}>name{}</p>
      </div>
      <div>

        <div className={alinear}>
          {jugador.cardPersona.map (e => (
            <div className={cardalign} style={{gap:"50"}}>
              <Image src={backface} alt="backface Card" width={30} height={30}  style={{transform:rotate}}/>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Jugadores;
