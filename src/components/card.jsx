'use client';
import Image from 'next/image';
import React from 'react';
import styles from './card.module.css';
import basto from '../assets/valores/basto.png';
import copa from '../assets/valores/copas.png';
import espada from '../assets/valores/espada.png';
import oro from '../assets/valores/oro.png';

const SpanishDeck = ({value, palo}) => {
  console.log (value, palo);
  let imgPalo;
  palo === 'oro'
    ? (imgPalo = oro)
    : palo === 'espada'
        ? (imgPalo = espada)
        : palo === 'basto'
            ? (imgPalo = basto)
            : palo === 'copa' ? (imgPalo = copa) : '';

  return (
    <div className={styles.spanishDeck}>
      <div className={styles.valueContain}>

        <p style={{display: 'flex', alignSelf: 'flex-end'}}>{value}</p>
        <Image
          src={imgPalo}
          alt="logoCard"
          width={30}
          height={30}
          style={{display: 'flex', alignSelf: 'center'}}
        />
        <p style={{display: 'flex', alignSelf: 'flex-start'}}>{value}</p>
      </div>
    </div>
  );
};

export default SpanishDeck;
