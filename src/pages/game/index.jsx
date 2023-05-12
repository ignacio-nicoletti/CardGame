'use client';
import {Inter} from 'next/font/google';
import style from './game.module.css';
import {baraja} from '../../baraja.js';
import Cards from '@/components/cards/card';
import Jugadores from '@/components/jugadores/jugadores';
import {useEffect, useState} from 'react';
import Apuesta from '@/components/apuesta/apuesta';

const inter = Inter ({subsets: ['latin']});

export default function Game () {
  let cantUser = 4; //usuarios conectados
  let cantPorRonda = 3; // cant cartas que se reparten
  const [CardGanadoraRonda, setCardGanadoraRonda] = useState (''); //La carta que gana en la ronda
  const [cardPersona, setCardPersona] = useState ([]); //La carta que se tira primero por ronda
  const [cardApostada, setCardApostada] = useState ([]);
  const [apuestaP, setApuestaP] = useState (''); //apuesta del jugador en al ronda
  const [myturn, setMyturn] = useState (true); //su turno true o false
  const ronda = 1;
  let ApuestaTotal = 0; //suma de la apuesta de todos
  let cumplio = false;
  const points = 5; //puntos que suma

  const jugador = {
    CardPersona: [], //guarda las cartas repartidas random
  };

  useEffect (() => {
    for (let i = 0; i < cantPorRonda; i++) {
      const cartaIndex = Math.floor (Math.random () * baraja.length);
      const carta = baraja[cartaIndex];
      jugador.CardPersona.push (carta);
    }
  });

  const repartir = () => {
    setCardPersona (jugador.CardPersona);
  };

  return (
    <div className={style.contain}>

      <div className={style.containCardPropias}>
        <div className={style.CardPropias}>
          {cardPersona.map (card => (
            <Cards
              value={card.valor}
              palo={card.tipo}
              setCardApostada={setCardApostada}
              cardPersona={cardPersona}
              setCardPersona={setCardPersona}
            />
          ))}
        </div>
      </div>

      {cantUser === 4
        ? <div className={style.jugadorestres}>
            <div className={style.jugador2}>
              <Jugadores />
            </div>
            <div className={style.jugador3}>
              <Jugadores />
            </div>
            <div className={style.jugador4}>
              <Jugadores />
            </div>
          </div>
        : <div className={style.jugadoresdos}>
            <div>
              <Jugadores />
            </div>
            <div>
              <Jugadores />
            </div>
          </div>}
      <div />
      <div className={style.infoPartida}>
        <p>Cartas Repartidas: {cantPorRonda} </p>
        <p>Apuesta General: {}</p>
        <p>Carta Ganadora: {CardGanadoraRonda}</p>
      </div>
      <div className={style.infoPropia}>
        <p>Apuesta propia: {apuestaP} </p>
        <p>Cumplio: {cumplio === true ? '✔' : '❌'}</p>
      </div>
      <button onClick={repartir}>repartir</button>

      {myturn === true
        ? <Apuesta
            cant={cantPorRonda}
            setApuestaP={setApuestaP}
            setMyturn={setMyturn}
          />
        : ''}
      <div className={style.CardApostada}>

        {cardApostada.map (card => (
          <Cards
            value={card.value}
            palo={card.tipo}
            setCardApostada={setCardApostada}
          />
        ))}
      </div>
    </div>
  );
}
