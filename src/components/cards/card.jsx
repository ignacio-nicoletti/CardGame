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


  // const[id,setId]=useState("")
  // console.log(id);

  let filterCard;
  const handlerclick = () => {

    if (ronda?.typeRound === 'ronda' && jugador.myturn === true) {
      filterCard = jugador.cardPersona.filter(
        e => e.valor !== valor || e.palo !== palo
      );

      setJugador({
        ...jugador,
        cardApostada: [{ valor, palo }],
        cardPersona: filterCard,
      });

      //tiro la card, la saco del mazo propio y la seteo en la apostada

      if (ronda.turnoJugador === 1 || ronda.turnoJugador === 2 || ronda.turnoJugador === 3) {

        let id = jugador.id

        setRonda({
          ...ronda, turnoJugador: ronda.turnoJugador + 1, ultimaCardApostada: [{ valor, palo, id: id }]
        });
      } else {
        let id = jugador.id

        setRonda({ ...ronda, turnoJugador: 1, ultimaCardApostada: [{ valor, palo, id: id }] })
      }
    }
    //cambio de turno al que me sigue 
  };


  return (
    <div className={styles.spanishDeck}>
      <div className={styles.valueContain} onClick={handlerclick}>

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
