'use client';
import Image from 'next/image';
import React from 'react';
import styles from './jugadores.module.css';
import person from '../../assets/jugadores/person2.png';
import backface from '../../assets/valores/backface.png';
import Cards from '../cards/card';
const Jugadores = ({ jugador, setJugador, ronda, setRonda }) => {


  let estilo;
  let alinear = styles.align
  let cardalign = styles.cardContain
  let cardApost
  let rotate = ""
  if (jugador.id === 4) {
    estilo = styles.AcomodarCard4;
    rotate = "rotate(270deg)"
    cardApost=styles.cardApost4
  }
  if (jugador.id === 3) {
    estilo = styles.AcomodarCard3;
    alinear = styles.alinearCard3;
    cardalign = styles.card3;
    cardApost=styles.cardApost3
  }
  if (jugador.id === 2) {
    estilo = styles.AcomodarCard2;
    rotate = "rotate(90deg)"
    cardApost=styles.cardApost2
  }

  return (
    
    
    
    <div className={estilo}>
      <div >
      <p>Apuesta: {jugador.apuestaP === -1 ? "-" : jugador.apuestaP}</p>
      <div >
      <Image src={person} alt="persona" width={150} height={100} />
      </div>
      <p style={{ margin: 0 }}>name{ }</p>
      </div>
      <div>

        <div className={alinear}>
          {jugador.cardPersona.map ((e ,index)=> (
            <div className={cardalign} style={{gap:"50"}} key={index}>
            <Image src={backface} alt="backface Card" width={30} height={30}  style={{transform:rotate}}/>
            </div>
            ))}
          </div>
        {/* <div className={alinear}>
          {jugador.cardPersona.map((card, index) => (
            <Cards
            key={index}
            valor={card.valor}
            palo={card.palo}
            jugador={jugador}
            setJugador={setJugador}
            setRonda={setRonda}
            ronda={ronda}
            
            />
            ))}
        </div>
*/}
        <div className={cardApost} >

          {jugador.cardApostada[0].valor &&
            jugador.cardApostada.map((card,index) => (
              <Cards 
              key={index}
              valor={card.valor} 
              palo={card.palo} 
              border={"3px solid yellow"}/>
              ))}
        </div> 

      </div>


</div>
);
};

export default Jugadores;
