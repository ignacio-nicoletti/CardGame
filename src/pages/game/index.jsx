'use client';
import {Inter} from 'next/font/google';
import style from './game.module.css';
import {baraja} from '../../baraja.js';
import Cards from '@/components/cards/card';
import Jugadores from '@/components/jugadores/jugadores';
import {useEffect, useState} from 'react';
import Apuesta from '@/components/apuesta/apuesta';
import {shuffle} from '@/logica/logica';

const inter = Inter ({subsets: ['latin']});

export default function Game () {
  let cantUser = 4; //usuarios conectados

  const [CardGanadoraRonda, setCardGanadoraRonda] = useState (''); //La carta que gana en la ronda

  const [jugador1, setJugador1] = useState ({
    id: 1,
    cardPersona: [],
    apuestaP: 0,
    cardsganadas: '',
    cardApostada: [{valor: '', palo: ''}],
    myturn: false, //boolean
    cumplio: '', //boolean
    obligado: true, //boolean
  });
  const [jugador2, setJugador2] = useState ({
    id: 2,
    cardPersona: [],
    apuestaP: 0,
    cardsganadas: '',
    cardApostada: [{valor: 4, palo: ''}],
    myturn: false, //boolean
    cumplio: '', //boolean
    obligado: false, //boolean
  });
  const [jugador3, setJugador3] = useState ({
    id: 3,
    cardPersona: [],
    apuestaP: 0,
    cardsganadas: '',
    cardApostada: [{valor: 3, palo: ''}],
    myturn: false, //boolean
    cumplio: '', //boolean
    obligado: false, //boolean
  });
  const [jugador4, setJugador4] = useState ({
    id: 4,
    cardPersona: [],
    apuestaP: 0,
    cardsganadas: '',
    cardApostada: [{valor: 2, palo: ''}],
    myturn: false, //boolean
    cumplio: '', //boolean
    obligado: false, //boolean
  });

  const [jugadores, setJugadores] = useState ({
    jugador1: '',
    jugador2: '',
    jugador3: '',
    jugador4: '',
  });

  const [ronda, setRonda] = useState ({
    vuelta: 1,
    numeroRonda: 1,
    cardPorRonda: 1,
    typeRound: 'ronda', //apuesta o ronda
    turnoJugador: 1, //1j 2j 3j 4j
    ApuestaTotal: jugador1.apuestaP +
      jugador2.apuestaP +
      jugador3.apuestaP +
      jugador4.apuestaP, //suma de la apuesta de todos
    CardGanadoraxRonda: [{valor: '', palo: ''}],
    points: 5, //puntos que suma
  });

  const repartir = () => {
    let cartasMezcladas = shuffle (baraja);
    setJugadores ({
      jugador1: cartasMezcladas.splice (0, ronda.cardPorRonda),
      jugador2: cartasMezcladas.splice (0, ronda.cardPorRonda),
      jugador3: cartasMezcladas.splice (0, ronda.cardPorRonda),
      jugador4: cartasMezcladas.splice (0, ronda.cardPorRonda),
    });
  };

  const gameInit = () => {
    setRonda ({...ronda, cardPorRonda: 1});
    setJugador1 ({...jugador1, cardPersona: jugadores.jugador1, myturn: true});
    setJugador2 ({...jugador2, cardPersona: jugadores.jugador2});
    setJugador3 ({...jugador3, cardPersona: jugadores.jugador3});
    setJugador4 ({...jugador4, cardPersona: jugadores.jugador4});
  };
const comprobar=()=>{

  if (
    jugador1.cardApostada[0].valor > jugador2.cardApostada[0].valor &&
    jugador1.cardApostada[0].valor > jugador3.cardApostada[0].valor &&
    jugador1.cardApostada[0].valor > jugador4.cardApostada[0].valor
  ) {
    console.log( " es la mas grande");
    setJugador1({...jugador1,cardsganadas:1})
     setRonda ({...ronda, CardGanadoraxRonda: jugador1.cardApostada});
  }
}

  return (
    <div className={style.contain}>
      <div className={style.containCardPropias}>
        <div className={style.CardPropias}>

          {jugador1.cardPersona.map (card => (
            <Cards
              valor={card.valor}
              palo={card.palo}
              jugador1={jugador1}
              setJugador1={setJugador1}
              typeRound={ronda.typeRound}
            />
          ))}
        </div>
      </div>

      {cantUser === 4
        ? <div className={style.jugadorestres}>
            <div className={style.jugador2}>
              <Jugadores jugador={jugador2} />W
            </div>
            <div className={style.jugador3}>
              <Jugadores jugador={jugador3} />
            </div>
            <div className={style.jugador4}>
              <Jugadores jugador={jugador4} />
            </div>
          </div>
        : <div className={style.jugadoresdos}>
            <div>
              <Jugadores jugador={jugador2} />
            </div>
            <div>
              <Jugadores jugador={jugador3} />
            </div>
          </div>}
      <div />
      <div className={style.infoPartida}>
        <p>Cartas Repartidas: {ronda.cardPorRonda} </p>
        <p>Apuesta General: {ronda.ApuestaTotal}</p>
        <p>Carta Ganadora: {ronda.CardGanadoraxRonda[0].valor} {ronda.CardGanadoraxRonda[0].palo}</p>
        <p>Vuelta: {ronda.vuelta}</p>
        <p>Ronda: {ronda.numeroRonda}</p>
      </div>
      <div className={style.infoPropia}>
        <p>Apuesta propia: {jugador1.apuestaP} </p>
        <p>Ganadas: {jugador1.cardsganadas}</p>
        <p>Cumplio: {jugador1.cumplio === true ? '✔' : '❌'}</p>
      </div>
      <button onClick={repartir}>repartir</button>
      <button onClick={gameInit}>Comenzar Juego</button>
      <button onClick={comprobar}>Comprobar</button>

      {ronda.typeRound === 'apuesta' && jugador1.myturn === true
        ? <Apuesta jugador1={jugador1} setJugador1={setJugador1} />
        : ''}
      <div className={style.CardApostada}>

        {jugador1.cardApostada[0].valor &&
          jugador1.cardApostada.map (card => (
            <Cards valor={card.valor} palo={card.palo} />
          ))}
      </div>
    </div>
  );
}
