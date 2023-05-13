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

  const [CardGanadoraRonda, setCardGanadoraRonda] = useState (''); //La carta que gana en la ronda

  const points = 5; //puntos que suma

 
  const [jugador1, setJugador1] = useState ({
    cardPersona: [],
    apuestaP:0,
    cardApostada: [{valor: '', palo: ''}],
    myturn: false, //boolean
    cumplio: '', //boolean
    obligado: '', //boolean
  });
  const [jugador2, setJugador2] = useState ({
    cardPersona: [],
    apuestaP: 0,
    cardApostada: [],
    myturn: '', //boolean
    cumplio: '', //boolean
    obligado: '', //boolean
  });
  const [jugador3, setJugador3] = useState ({
    cardPersona: [],
    apuestaP: 0,
    cardApostada: {},
    myturn: '', //boolean
    cumplio: '', //boolean
    obligado: '', //boolean
  });
  const [jugador4, setJugador4] = useState ({
    cardPersona: [],
    apuestaP: 0,
    cardApostada: [],
    myturn: '', //boolean
    cumplio: '', //boolean
    obligado: '', //boolean
  });

  const [jugadores, setJugadores] = useState ({
    jugador1: '',
    jugador2: '',
    jugador3: '',
    jugador4: '',
  });

  const [ronda, setRonda] = useState ({
    numeroRonda: 1,
    cardPorRonda: 5,
    typeRound: 'apuesta', //apuesta o ronda
    turnoJugador: 1, //1j 2j 3j 4j
    ApuestaTotal: jugador1.apuestaP+jugador2.apuestaP+jugador3.apuestaP+jugador4.apuestaP, //suma de la apuesta de todos
    CardGanadoraxRonda: '',
  });
  useEffect (() => {
    repartir ();
  }, []);

  const repartir = () => {
    function shuffle (array) {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor (Math.random () * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    let cartasMezcladas = shuffle (baraja);
    setJugadores ({
      jugador1: cartasMezcladas.splice (0, ronda.cardPorRonda),
      jugador2: cartasMezcladas.splice (0, ronda.cardPorRonda),
      jugador3: cartasMezcladas.splice (0, ronda.cardPorRonda),
      jugador4: cartasMezcladas.splice (0, ronda.cardPorRonda),
    });
  };

  const gameInit = () => {
    setJugador1 ({...jugador1, cardPersona: jugadores.jugador1, myturn: true});
    setJugador2 ({...jugador2, cardPersona: jugadores.jugador2});
    setJugador3 ({...jugador3, cardPersona: jugadores.jugador3});
    setJugador4 ({...jugador4, cardPersona: jugadores.jugador4});
  };
  console.log (jugador2);
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
            />
          ))}
        </div>
      </div>

      {cantUser === 4
        ? <div className={style.jugadorestres}>
            <div className={style.jugador2}>
              <Jugadores jugador={jugador2} />
              {/* <p>{jugador2.cardPersona}</p> */}
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
              <Jugadores />
            </div>
            <div>
              <Jugadores />
            </div>
          </div>}
      <div />
      <div className={style.infoPartida}>
        <p>Cartas Repartidas: {ronda.cardPorRonda} </p>
        <p>Apuesta General: {ronda.ApuestaTotal}</p>
        <p>Carta Ganadora: {CardGanadoraRonda}</p>
      </div>
      <div className={style.infoPropia}>
        <p>Apuesta propia: {jugador1.apuestaP} </p>
        <p>Cumplio: {jugador1.cumplio === true ? '✔' : '❌'}</p>
      </div>
      <button onClick={gameInit}>Comenzar Juego</button>

      {jugador1.myturn === true
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
