'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './card.module.css';
import basto from '../../assets/valores/basto.png';
import copa from '../../assets/valores/copas.png';
import espada from '../../assets/valores/espada.png';
import oro from '../../assets/valores/oro.png';

const Cards = ({ jugador, setJugador, valor, palo, ronda, setRonda }) => {
  let imgPalo = {
    oro: oro,
    espada: espada,
    basto: basto,
    copa: copa,
  };

  let filterCard;
  const handlerclick = () => {
    if (ronda?.typeRound === 'ronda' && jugador.myturnR === true) {
      filterCard = jugador.cardPersona.filter(
        e => e.valor !== valor || e.palo !== palo
      );

      setJugador({
        ...jugador,
        cardApostada: [{ valor, palo }],
        cardPersona: filterCard,
      });

      //tiro la card, la saco del mazo propio y la seteo en la apostada
      
    
      if (ronda.turnoJugadorR === 1 || ronda.turnoJugadorR === 2 || ronda.turnoJugadorR === 3) {
        setRonda({
          ...ronda, 
          AnteultimaCardApostada: ronda.ultimaCardApostada, 
          ultimaCardApostada: [{ valor, palo, id: jugador.id }], 
          turnoJugadorR: ronda.turnoJugadorR + 1, 
          cantQueTiraron: ronda.cantQueTiraron + 1,        
        });//setea la card apostada en la ultima y lo que habia en ultima pasa a ser anteultima      
      } else {
        setRonda({ ...ronda, turnoJugadorR: 1, 
          AnteultimaCardApostada: ronda.ultimaCardApostada, 
          ultimaCardApostada: [{ valor, palo, id: jugador.id }], 
          cantQueTiraron: ronda.cantQueTiraron + 1,  
        })
      
      }
    
    }
    //cambio de turno al que me sigue y seteo laultima card con el id y paso la ult a la anteult

  
  };

  return (
    <div className={styles.spanishDeck} onClick={handlerclick}>
      <div className={styles.valueContain} >

        <p style={{ display: 'flex', alignSelf: 'flex-end' }}>{valor}</p>
        <Image
          src={imgPalo[palo]}
          alt="logoCard"
          width={30}
          height={30}
          style={{ display: 'flex', alignSelf: 'center' }}
          />
        <p style={{ display: 'flex', alignSelf: 'flex-start' }}>{valor}</p>
      </div>
    </div>
  );
};

export default Cards;
