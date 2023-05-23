'use client';
import { Inter } from 'next/font/google';
import style from './game.module.css';
import { barajar } from '../../logica/baraja.js';
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
    apuestaP: 0,
    cardsganadas: 0,
    cardApostada: [{ valor: '', palo: '' }],
    myturn: false, //boolean
    cumplio: true, //boolean

  });
  const [jugador2, setJugador2] = useState({
    id: 2,
    cardPersona: [],
    apuestaP: 0,
    cardsganadas: 0,
    cardApostada: [{ valor: '', palo: '' }],
    myturn: false, //boolean
    cumplio: '', //boolean

  });
  const [jugador3, setJugador3] = useState({
    id: 3,
    cardPersona: [],
    apuestaP: 0,
    cardsganadas: 0,
    cardApostada: [{ valor: '', palo: '' }],
    myturn: false, //boolean
    cumplio: '', //boolean

  });
  const [jugador4, setJugador4] = useState({
    id: 4,
    cardPersona: [],
    apuestaP: 0,
    cardsganadas: 0,
    cardApostada: [{ valor: '', palo: '' }],
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
    turnoJugadorA: 1, //1j 2j 3j 4j apuesta
    turnoJugadorR: 1, //1j 2j 3j 4j ronda
    obligado: "",//numero de jugador obligado
    ApuestaTotal: 0, //suma de la apuesta de todos
    CardGanadoraxRonda: [{ valor: '', palo: '', id: '' }],
    ultimaCardApostada: [{ valor: '', palo: '', id: '' }],
    AnteultimaCardApostada: [{ valor: '', palo: '', id: '' }],
    points: 5, //puntos que suma
    ganadorRonda: "",
    cantQueApostaron: 0,
    cantQueTiraron: 0
  });

  const mezclar = () => {
    let baraja = barajar()
    let cartasMezcladas = shuffle(baraja);
    setJugadores({
      jugador1: cartasMezcladas.splice(0, ronda.cardPorRonda),
      jugador2: cartasMezcladas.splice(0, ronda.cardPorRonda),
      jugador3: cartasMezcladas.splice(0, ronda.cardPorRonda),
      jugador4: cartasMezcladas.splice(0, ronda.cardPorRonda),
    });

  };

  const repartir = () => {
    setJugador1({ ...jugador1, cardPersona: jugadores.jugador1 });
    setJugador2({ ...jugador2, cardPersona: jugadores.jugador2 });
    setJugador3({ ...jugador3, cardPersona: jugadores.jugador3 });
    setJugador4({ ...jugador4, cardPersona: jugadores.jugador4 });

  }

  const gameInit = () => {
    repartir()
    setRonda({ ...ronda, typeRound: "apuesta" });

  };


  const turno = () => {
    if (ronda.typeRound === "apuesta") {
      if (ronda.turnoJugadorA === 1) {
        setJugador1({ ...jugador1, myturn: true })
        setJugador2({ ...jugador2, myturn: false })
        setJugador3({ ...jugador3, myturn: false })
        setJugador4({ ...jugador4, myturn: false })
      }
      if (ronda.turnoJugadorA === 2) {
        setJugador2({ ...jugador2, myturn: true })
        setJugador1({ ...jugador1, myturn: false })
        setJugador3({ ...jugador3, myturn: false })
        setJugador4({ ...jugador4, myturn: false })
      }
      if (ronda.turnoJugadorA === 3) {

        setJugador3({ ...jugador3, myturn: true })
        setJugador1({ ...jugador1, myturn: false })
        setJugador2({ ...jugador2, myturn: false })
        setJugador4({ ...jugador4, myturn: false })
      }
      if (ronda.turnoJugadorA === 4) {
        setJugador4({ ...jugador4, myturn: true })
        setJugador1({ ...jugador1, myturn: false })
        setJugador2({ ...jugador2, myturn: false })
        setJugador3({ ...jugador3, myturn: false })
      }
    }
  }

  const comprobarMasGrande = () => {
    if (ronda.ultimaCardApostada[0].valor > ronda.AnteultimaCardApostada[0].valor) {
      let ganador = ronda.CardGanadoraxRonda[0].id
      console.log(ganador);
      setRonda({ ...ronda, CardGanadoraxRonda: ronda.ultimaCardApostada, ganadorRonda: ganador })
    }
  };

  const SumarGanada = () => {
    switch (ronda.CardGanadoraxRonda[0].id) {
      case 1:
        setJugador1({ ...jugador1, cardsganadas: jugador1.cardsganadas + 1 });
        break;
      case 2:
        setJugador2({ ...jugador2, cardsganadas: jugador2.cardsganadas + 1 });
        break;
      case 3:
        setJugador3({ ...jugador3, cardsganadas: jugador3.cardsganadas + 1 });
        break;
      case 4:
        setJugador4({ ...jugador4, cardsganadas: jugador4.cardsganadas + 1 });
        break;

      default:
        break;
    }
  }


  const cambioRonda = () => {
    if (ronda.cantQueTiraron >= 4) {
      setRonda({
        ...ronda,
        numeroRonda: ronda.numeroRonda + 1,
        turnoJugador: ronda.CardGanadoraxRonda[0].id, // el ultimo que gana sigue
        // CardGanadoraxRonda: [{ valor: '', palo: '', id: '' }],
        // ultimaCardApostada: [{ valor: '', palo: '', id: '' }],
        // AnteultimaCardApostada: [{ valor: '', palo: '', id: '' }],
        cantQueTiraron: 0
      })


      setJugador1({ ...jugador1, cardApostada: [{ valor: '', palo: '' }] });
      setJugador2({ ...jugador2, cardApostada: [{ valor: '', palo: '' }] });
      setJugador3({ ...jugador3, cardApostada: [{ valor: '', palo: '' }] });
      setJugador4({ ...jugador4, cardApostada: [{ valor: '', palo: '' }] });

    }
  }

  useEffect(() => {
    setRonda({ ...ronda, cardPorRonda: 3, obligado: 1 });//ni bien se monta el componente setea la card
  }, [])//ya que nunca cambia




  useEffect(() => {
    comprobarMasGrande()
    turno()
    cambioRonda()
  }, [jugador1.cardApostada, jugador2.cardApostada, jugador3.cardApostada, jugador4.cardApostada])//setea la card mas grande

  useEffect(() => {
    turno()
  }, [ronda.typeRound])

  useEffect(() => {
    // cambioRonda()
  }, [ronda.cantQueTiraron])//si todos tiraron cambia la ronda

  console.log(ronda);
  console.log("j1", jugador1);
  console.log("j2", jugador2);
  console.log("j3", jugador3);
  console.log("j4", jugador4);


  return (
    <div className={style.contain}>
      <div className={style.containCardPropias}>
        <div className={style.CardPropias}>

          {jugador1.cardPersona.map((card, index) => (


            <Cards
              key={index}
              valor={card.valor}
              palo={card.palo}
              jugador={jugador1}
              setJugador={setJugador1}
              setRonda={setRonda}
              ronda={ronda}
            />

          ))}
        </div>
      </div>

      {cantUser === 4
        ? <div className={style.jugadorestres}>
          <div className={style.jugador2}>
            <Jugadores
              jugador={jugador2}
              setJugador={setJugador2}
              setRonda={setRonda}
              ronda={ronda}
            />
          </div>
          <div className={style.jugador3}>
            <Jugadores
              jugador={jugador3}
              setJugador={setJugador3}
              setRonda={setRonda}
              ronda={ronda}
            />
          </div>
          <div className={style.jugador4}>
            <Jugadores
              jugador={jugador4}
              setJugador={setJugador4}
              setRonda={setRonda}
              ronda={ronda}
            />
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
        <p>tipo: {ronda.typeRound} </p>
        <p>Cartas Repartidas: {ronda.cardPorRonda} </p>
        <p>Apuesta General: {ronda.ApuestaTotal}</p>
        <p>
          Carta Ganadora:

          {" " + ronda?.CardGanadoraxRonda[0]?.valor + " "}

          {ronda?.CardGanadoraxRonda[0]?.palo}
        </p>
        <p>Vuelta: {ronda.vuelta}</p>
        <p>Ronda: {ronda.numeroRonda}</p>
        <p>turno: jugador{ronda.typeRound === "apuesta" ? ronda.turnoJugadorA : ronda.turnoJugadorR}</p>
      </div>
      <div className={style.infoPropia}>
        <p>Apuesta propia: {jugador1.apuestaP === -1 ? "-" : jugador1.apuestaP} carta/s </p>
        <p>Ganadas: {jugador1.cardsganadas}</p>
        <p>Obligado: jugador{ronda.obligado}</p>
        <p>Cumplio: {jugador1.cumplio === true ? '✔' : '❌'}</p>
        <button onClick={mezclar}>Mezclar</button>
        <button onClick={gameInit}>Comenzar Juego</button>

      </div>

      {(ronda.typeRound === 'apuesta') && (ronda.turnoJugadorA === 1 || ronda.turnoJugadorA === 2 || ronda.turnoJugadorA === 3 || ronda.turnoJugadorA === 4)
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
          jugador1.cardApostada.map((card, index) => (
            <Cards key={index} valor={card.valor} palo={card.palo} />
          ))}
      </div>
    </div>
  );
}
