'use client';
import { Inter } from 'next/font/google';
import style from './game.module.css';
import { baraja } from '../../logica/baraja.js';
import Cards from '@/components/cards/card';
import Jugadores from '@/components/jugadores/jugadores';
import { useEffect, useState } from 'react';
import Apuesta from '@/components/apuesta/apuesta';
import { repartir, shuffle } from '@/logica/logica';

const inter = Inter({ subsets: ['latin'] });

export default function Game() {
  let cantUser = 4; //usuarios conectados


  const [jugador1, setJugador1] = useState({
    id: 1,
    cardPersona: [],
    apuestaP: 0, //ponerlo en -1
    cardsganadas: 0,
    cardApostada: [{ valor: '', palo: '' }],
    myturn: false, //boolean
    cumplio: true, //boolean
    
  });
  const [jugador2, setJugador2] = useState({
    id: 2,
    cardPersona: [],
    apuestaP: 0, //ponerlo en -1
    cardsganadas: 0,
    cardApostada: [{ valor: 4, palo: '' }],
    myturn: false, //boolean
    cumplio: '', //boolean
   
  });
  const [jugador3, setJugador3] = useState({
    id: 3,
    cardPersona: [],
    apuestaP: 0, //ponerlo en -1
    cardsganadas: 0,
    cardApostada: [{ valor: 3, palo: '' }],
    myturn: false, //boolean
    cumplio: '', //boolean
   
  });
  const [jugador4, setJugador4] = useState({
    id: 4,
    cardPersona: [],
    apuestaP: 0, //ponerlo en -1
    cardsganadas: 0,
    cardApostada: [{ valor: 3, palo: '' }],
    myturn: false, //boolean
    cumplio: '', //boolean
  });

  const [jugadores, setJugadores] = useState({
    jugador1: "",
    jugador2: "",
    jugador3: "",
    jugador4: "",
  });

  const [ronda, setRonda] = useState({
    vuelta: 1,//num de vuelta (4 rondas =1 vuelta)
    numeroRonda: 1,//num de ronda
    cardPorRonda: "",//cant de cartas que se reparten
    typeRound: '', //apuesta o ronda
    turnoJugador: 1, //1j 2j 3j 4j
    obligado:2,//numero de jugador obligado
    ApuestaTotal: 0, //suma de la apuesta de todos
    CardGanadoraxRonda: [{ valor: ' ', palo: ' ' }],
    points: 5, //puntos que suma
  });



  const mezclar = () => {
    let cartasMezcladas = shuffle(baraja);
    setJugadores({
      jugador1: cartasMezcladas.splice(0, ronda.cardPorRonda),
      jugador2: cartasMezcladas.splice(0, ronda.cardPorRonda),
      jugador3: cartasMezcladas.splice(0, ronda.cardPorRonda),
      jugador4: cartasMezcladas.splice(0, ronda.cardPorRonda),
    });

  };


  
  const repartir=()=>{
    setJugador1({ ...jugador1, cardPersona: jugadores.jugador1});
    setJugador2({ ...jugador2, cardPersona: jugadores.jugador2 });
    setJugador3({ ...jugador3, cardPersona: jugadores.jugador3 });
    setJugador4({ ...jugador4, cardPersona: jugadores.jugador4 });
    
  }
  
  const gameInit = () => {
   
    repartir()
    setRonda({ ...ronda,typeRound:"apuesta"});


  };
  const comprobarApuesta = () => {
    if (
      jugador1.apuestaP > -1 &&
      jugador2.apuestaP > -1 &&
      jugador3.apuestaP > -1 &&
      jugador4.apuestaP > -1
    ) {
      let apuestafinal = Number(jugador1.apuestaP) + Number(jugador2.apuestaP) + Number(jugador3.apuestaP) + Number(jugador4.apuestaP);
      setRonda({ ...ronda, typeRound: 'ronda', ApuestaTotal: apuestafinal });
    }

  };
  const comprobarMasGrande = () => {
    if (
      jugador1.cardApostada[0].valor > jugador2.cardApostada[0].valor &&
      jugador1.cardApostada[0].valor > jugador3.cardApostada[0].valor &&
      jugador1.cardApostada[0].valor > jugador4.cardApostada[0].valor
    ) {
      setJugador1({ ...jugador1, cardsganadas: Number(jugador1.cardsganadas) + 1 });
      setRonda({ ...ronda, CardGanadoraxRonda: jugador1.cardApostada });
    } else { setJugador1({ ...jugador1, cardsganadas: jugador1.cardsganadas }); }
    if (jugador2.cardApostada[0].valor > jugador1.cardApostada[0].valor &&
      jugador2.cardApostada[0].valor > jugador3.cardApostada[0].valor &&
      jugador2.cardApostada[0].valor > jugador4.cardApostada[0].valor) {
      setJugador2({ ...jugador2, cardsganadas: Number(jugador2.cardsganadas) + 1 });
      setRonda({ ...ronda, CardGanadoraxRonda: jugador2.cardApostada });
    } else { setJugador2({ ...jugador2, cardsganadas: jugador2.cardsganadas }); }
    if (jugador3.cardApostada[0].valor > jugador1.cardApostada[0].valor &&
      jugador3.cardApostada[0].valor > jugador2.cardApostada[0].valor &&
      jugador3.cardApostada[0].valor > jugador4.cardApostada[0].valor) {
      setJugador3({ ...jugador3, cardsganadas: Number(jugador3.cardsganadas) + 1 });
      setRonda({ ...ronda, CardGanadoraxRonda: jugador3.cardApostada });
    } else { setJugador3({ ...jugador3, cardsganadas: jugador3.cardsganadas }); }
    if (jugador4.cardApostada[0].valor > jugador1.cardApostada[0].valor &&
      jugador4.cardApostada[0].valor > jugador2.cardApostada[0].valor &&
      jugador4.cardApostada[0].valor > jugador3.cardApostada[0].valor) {
      setJugador3({ ...jugador4, cardsganadas: Number(jugador4.cardsganadas) + 1 });
      setRonda({ ...ronda, CardGanadoraxRonda: jugador4.cardApostada });
    } else { setJugador4({ ...jugador4, cardsganadas: jugador4.cardsganadas }); }
  };


  const cumplio = () => {
    if (Number(jugador1.apuestaP) === Number(jugador1.cardsganadas)) {
      setJugador1({ ...jugador1, cumplio: true })
    } else setJugador1({ ...jugador1, cumplio: false })

  }


  
  useEffect(()=>{
    comprobarApuesta()
  },[jugador1.apuestaP,jugador2.apuestaP,jugador3.apuestaP,jugador4.apuestaP])
  
  useEffect(()=>{
    setRonda({ ...ronda, cardPorRonda: 1,obligado:1});//ni bien se monta el componente setea la card
  },[])//ya que nunca cambia

console.log(ronda);

  return (
    <div className={style.contain}>
      <div className={style.containCardPropias}>
        <div className={style.CardPropias}>

          {jugador1.cardPersona.map((card, index) => (


            <Cards
              key={index}
              valor={card.valor}
              palo={card.palo}
              jugador1={jugador1}
              setJugador1={setJugador1}
              setRonda={setRonda}
              ronda={ronda}
            />

          ))}
        </div>
      </div>

      {cantUser === 4
        ? <div className={style.jugadorestres}>
          <div className={style.jugador2}>
            <Jugadores jugador={jugador2} />
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
        <p>
          Carta Ganadora:

          {" " + ronda?.CardGanadoraxRonda[0]?.valor + " "}

          {ronda?.CardGanadoraxRonda[0]?.palo}
        </p>
        <p>Vuelta: {ronda.vuelta}</p>
        <p>Ronda: {ronda.numeroRonda}</p>
      </div>
      <div className={style.infoPropia}>
        <p>Apuesta propia: {jugador1.apuestaP} carta/s </p>
        <p>Ganadas: {jugador1.cardsganadas}</p>
        <p>Obligado: jugador{ronda.obligado}</p>
        <p>Cumplio: {jugador1.cumplio === true ? '✔' : '❌'}</p>
        <button onClick={mezclar}>Mezclar</button>
        <button onClick={gameInit}>Comenzar Juego</button>
        <button onClick={comprobarMasGrande}>ComprobarMasGrande</button>
        <button onClick={cumplio}>Cumplio?</button>
      </div>

      {ronda.typeRound === 'apuesta' && ronda.turnoJugador === 1 || ronda.turnoJugador === 2 || ronda.turnoJugador === 3 || ronda.turnoJugador === 4
        ? <Apuesta
          jugador1={jugador1}
          setJugador1={setJugador1}
          jugador2={jugador2}
          setJugador2={setJugador2}
          jugador3={jugador3}
          setJugador3={setJugador3}
          jugador4={jugador4}
          setJugador4={setJugador4}
          ronda={ronda}
          setRonda={setRonda}
        />
        : ''}
      <div className={style.CardApostada}>

        {jugador1.cardApostada[0].valor &&
          jugador1.cardApostada.map(card => (
            <Cards valor={card.valor} palo={card.palo} />
          ))}
      </div>
    </div>
  );
}
