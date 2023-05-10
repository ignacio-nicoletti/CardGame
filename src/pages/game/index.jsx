import Head from 'next/head';
import Image from 'next/image';
import {Inter} from 'next/font/google';
import style from './game.module.css';
import {baraja} from '../../baraja.js';
import SpanishDeck from '@/components/card';

const inter = Inter ({subsets: ['latin']});

export default function Game () {
  let cantPorRonda = 7;

  const jugador = {
    CardPersona: [],
  };

  for (let i = 0; i < cantPorRonda; i++) {
    const cartaIndex = Math.floor (Math.random () * baraja.length);
    const carta = baraja[cartaIndex];
    jugador.CardPersona.push (carta);
  }

  // function repartirCarta() {
  // }
  console.log (jugador.CardPersona);

  let ApuestaP = 0;
  let ApuestaTotal = 0;
  let cumplio = false;
  const point = 5;

  return (
    <div className={style.contain}>
      <div className={style.containCardPropias}>

        <div className={style.CardPropias}>
          {jugador.CardPersona.map (card => (
            <SpanishDeck value={card.valor} palo={card.tipo} />
          ))}
        </div>
      </div>

      <p>jugadores</p>
      <div />
      <div>
        <p>info partida</p>
      </div>
      <div>
        <p>apuesta propia</p>
      </div>
    </div>
  );
}
