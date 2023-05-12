'use client';
import Image from 'next/image';
import React from 'react';
import styles from './card.module.css';
import basto from '../../assets/valores/basto.png';
import copa from '../../assets/valores/copas.png';
import espada from '../../assets/valores/espada.png';
import oro from '../../assets/valores/oro.png';

const Cards = ({value, palo, setCardApostada, cardPersona, setCardPersona}) => {
  let imgPalo;
  palo === 'oro'
    ? (imgPalo = oro)
    : palo === 'espada'
        ? (imgPalo = espada)
        : palo === 'basto' ? (imgPalo = basto) : (imgPalo = copa);

  let filterCard;
  const handlerclick = () => {
    setCardApostada ([{value, palo}]);
    filterCard = cardPersona.filter (e => e.valor !== value && e.palo !==palo);
  
    setCardPersona (filterCard); //revisar esto por que setea y borra (clg)
    console.log (filterCard);
  };

  return (
    <div className={styles.spanishDeck}>
      <div className={styles.valueContain} onClick={handlerclick}>

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

export default Cards;
