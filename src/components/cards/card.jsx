'use client';
import Image from 'next/image';
import React from 'react';
import styles from './card.module.css';
import basto from '../../assets/valores/basto.png';
import copa from '../../assets/valores/copas.png';
import espada from '../../assets/valores/espada.png';
import oro from '../../assets/valores/oro.png';

const Cards = ({jugador1, setJugador1, valor, palo, ronda, setRonda}) => {
  let imgPalo = {
    oro: oro,
    espada: espada,
    basto: basto,
    copa: copa,
  };

  let filterCard;

  const handlerclick = () => {
    if (ronda.typeRound === 'ronda') {
      filterCard = jugador1.cardPersona.filter (
        e => e.valor !== valor || e.palo !== palo
      );
      setJugador1 ({
        ...jugador1,
        cardApostada: [{valor, palo}],
        cardPersona: filterCard,
      });
      // setRonda ({...ronda, CardGanadoraxRonda: [{valor, palo}]});
    }
  };

  return (
    <div className={styles.spanishDeck}>
      <div className={styles.valueContain} onClick={handlerclick}>

        <p style={{display: 'flex', alignSelf: 'flex-end'}}>{valor}</p>
        <Image
          src={imgPalo[palo]}
          alt="logoCard"
          width={30}
          height={30}
          style={{display: 'flex', alignSelf: 'center'}}
        />
        <p style={{display: 'flex', alignSelf: 'flex-start'}}>{valor}</p>
      </div>
    </div>
  );
};

export default Cards;
