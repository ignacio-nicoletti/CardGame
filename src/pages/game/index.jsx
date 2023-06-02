'use client';
import { Inter } from 'next/font/google';
import style from './game.module.css';
import { barajar } from '../../logica/baraja.js';
import Cards from '@/components/cards/card';
import Jugadores from '@/components/jugadores/jugadores';
import { useEffect, useState } from 'react';
import Apuesta from '@/components/apuesta/apuesta';
import { repartir, shuffle } from '@/logica/logica';
import { getRequestMeta } from 'next/dist/server/request-meta';

const inter = Inter({ subsets: ['latin'] });

export default function Game() {



  const [jugador1, setJugador1] = useState({
    id: 1,
    cardPersona: [],
    apuestaP: null,
    cardsganadas: 0,
    cardApostada: [{ valor: null, palo: '' }],
    myturnA: false, //boolean
    myturnR: false, //boolean
    cumplio: true, //boolean

  });
  const [jugador2, setJugador2] = useState({
    id: 2,
    cardPersona: [],
    apuestaP: null,
    cardsganadas: 0,
    cardApostada: [{ valor: null, palo: '' }],
    myturnA: false, //boolean
    myturnR: false, //booleanA
    cumplio: '', //boolean

  });
  const [jugador3, setJugador3] = useState({
    id: 3,
    cardPersona: [],
    apuestaP: null,
    cardsganadas: 0,
    cardApostada: [{ valor: null, palo: '' }],
    myturnA: false, //boolean
    myturnR: false, //boolean
    cumplio: '', //boolean

  });
  const [jugador4, setJugador4] = useState({
    id: 4,
    cardPersona: [],
    apuestaP: null,
    cardsganadas: 0,
    cardApostada: [{ valor: null, palo: '' }],
    myturnA: false, //boolean
    myturnR: false, //boolean
    cumplio: '', //boolean
  });

  const [ronda, setRonda] = useState({
    cantUser: 4,//usuarios conectados
    vuelta: 1,//num de vuelta (4 rondas =1 vuelta)
    numeroRonda: 1,//num de ronda
    cardPorRonda: null,//cant de cartas que se reparten
    typeRound: '', //apuesta o ronda
    turnoJugadorA: 1, //1j 2j 3j 4j apuesta
    turnoJugadorR: 1, //1j 2j 3j 4j ronda
    obligado: null,//numero de jugador obligado
    ApuestaTotal: 0, //suma de la apuesta de todos
    CardGanadoraxRonda: [{ valor: null, palo: '', id: '' }],
    ultimaCardApostada: [{ valor: null, palo: '', id: '' }],
    AnteultimaCardApostada: [{ valor: null, palo: '', id: '' }],
    points: 5, //puntos que suma
    ganadorRonda: null,
    cantQueTiraron: 0,
  });

  const [activo, setActivo] = useState(true)//modal del resultado

  const mezclar = () => {
    let baraja = barajar()
    let cartasMezcladas = shuffle(baraja);

    setJugador1({ ...jugador1, cardPersona: cartasMezcladas.splice(0, ronda.cardPorRonda) });
    setJugador2({ ...jugador2, cardPersona: cartasMezcladas.splice(0, ronda.cardPorRonda) }),
      setJugador3({ ...jugador3, cardPersona: cartasMezcladas.splice(0, ronda.cardPorRonda) });
    setJugador4({ ...jugador4, cardPersona: cartasMezcladas.splice(0, ronda.cardPorRonda) });

  };
  const generarObligado=()=>{
    let min=1;
    let max=4;
    let obligado=Math.floor((Math.random() * (max - min + 1)) + min);
    return obligado
  } 

  const gameInit = () => {
  
    mezclar()
    setRonda({ ...ronda, typeRound: "apuesta",ApuestaTotal: 0, });
   

  };
  const turno = () => {
    if (ronda.typeRound === "apuesta") {
      if (ronda.turnoJugadorA === 1) {
        setJugador1({ ...jugador1, myturnA: true })
        setJugador2({ ...jugador2, myturnA: false })
        setJugador3({ ...jugador3, myturnA: false })
        setJugador4({ ...jugador4, myturnA: false })
      }
      if (ronda.turnoJugadorA === 2) {
        setJugador2({ ...jugador2, myturnA: true })
        setJugador1({ ...jugador1, myturnA: false })
        setJugador3({ ...jugador3, myturnA: false })
        setJugador4({ ...jugador4, myturnA: false })
      }
      if (ronda.turnoJugadorA === 3) {

        setJugador3({ ...jugador3, myturnA: true })
        setJugador1({ ...jugador1, myturnA: false })
        setJugador2({ ...jugador2, myturnA: false })
        setJugador4({ ...jugador4, myturnA: false })
      }
      if (ronda.turnoJugadorA === 4) {
        setJugador4({ ...jugador4, myturnA: true })
        setJugador1({ ...jugador1, myturnA: false })
        setJugador2({ ...jugador2, myturnA: false })
        setJugador3({ ...jugador3, myturnA: false })
      }
    }
    if (ronda.typeRound === "ronda") {
      if (ronda.turnoJugadorR === 1) {
        setJugador1({ ...jugador1, myturnR: true })
        setJugador2({ ...jugador2, myturnR: false })
        setJugador3({ ...jugador3, myturnR: false })
        setJugador4({ ...jugador4, myturnR: false })
      }
      if (ronda.turnoJugadorR === 2) {
        setJugador2({ ...jugador2, myturnR: true })
        setJugador1({ ...jugador1, myturnR: false })
        setJugador3({ ...jugador3, myturnR: false })
        setJugador4({ ...jugador4, myturnR: false })
      }
      if (ronda.turnoJugadorR === 3) {

        setJugador3({ ...jugador3, myturnR: true })
        setJugador1({ ...jugador1, myturnR: false })
        setJugador2({ ...jugador2, myturnR: false })
        setJugador4({ ...jugador4, myturnR: false })
      }
      if (ronda.turnoJugadorR === 4) {
        setJugador4({ ...jugador4, myturnR: true })
        setJugador1({ ...jugador1, myturnR: false })
        setJugador2({ ...jugador2, myturnR: false })
        setJugador3({ ...jugador3, myturnR: false })
      }
    }
  }

  const comprobarMasGrande = (array) => {
    let mayor;
    if (array[1].valor === null) {
      mayor = array[0]
      return mayor
    }
    else if (array[0].valor !== null && array[1].valor !== null) {
      if (ronda.CardGanadoraxRonda[0].valor < array[0].valor) {
        mayor = array[0]
      }
      else (
        mayor = ronda.CardGanadoraxRonda[0]
      )
      return mayor
    }
  };

  const AsignarMayor = (value1, value2) => {
    let array = [value1, value2]
    let ganador = comprobarMasGrande(array);
    setRonda({ ...ronda, CardGanadoraxRonda: [ganador] })
  }

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

  const setTurnoRound = () => {
    let turno = Number(ronda.CardGanadoraxRonda[0].id)

    switch (turno) {
      case 1: setRonda({
        ...ronda,
        turnoJugadorR: 1,
        ultimaCardApostada: [{ valor: '', palo: '', id: '' }],
        AnteultimaCardApostada: [{ valor: '', palo: '', id: '' }],
      })

        break;
      case 2: setRonda({
        ...ronda,
        turnoJugadorR: 2,
        ultimaCardApostada: [{ valor: '', palo: '', id: '' }],
        AnteultimaCardApostada: [{ valor: '', palo: '', id: '' }]
      })

        break;
      case 3: setRonda({
        ...ronda, turnoJugadorR: 3,
        ultimaCardApostada: [{ valor: '', palo: '', id: '' }],
        AnteultimaCardApostada: [{ valor: '', palo: '', id: '' }]
      })

        break;
      case 4: setRonda({
        ...ronda, turnoJugadorR: 4,
        ultimaCardApostada: [{ valor: '', palo: '', id: '' }],
        AnteultimaCardApostada: [{ valor: '', palo: '', id: '' }]
      })
        break;

      default:
        break;
    }

  }

  const cambioRonda = () => {
    setRonda({
      ...ronda,
      cantQueTiraron: 0,
      numeroRonda: ronda.numeroRonda + 1,
      ultimaCardApostada: [{ valor: '', palo: '', id: '' }]
    })

    // setJugador1({ ...jugador1, cardApostada: [{ valor: '', palo: '' }] });
    // setJugador2({ ...jugador2, cardApostada: [{ valor: '', palo: '' }] });
    // setJugador3({ ...jugador3, cardApostada: [{ valor: '', palo: '' }] });
    // setJugador4({ ...jugador4, cardApostada: [{ valor: '', palo: '' }] });
    // }

  }

  const cambioDeVuelta = () => {
    if(ronda.cardPorRonda===1&&ronda.numeroRonda===2){
      setRonda({
        ...ronda,
        vuelta:ronda.vuelta+1,
        cantQueApostaron: 0,
        cantQueTiraron: 0,
        numeroRonda: 0,
        cardPorRonda:ronda.cardPorRonda+2
      })
    }
    if(ronda.cardPorRonda===3&&ronda.numeroRonda===4){
      setRonda({
        ...ronda,
        vuelta:ronda.vuelta+1,
        cantQueApostaron: 0,
        cantQueTiraron: 0,
        numeroRonda: 0,
        cardPorRonda:ronda.cardPorRonda+2

      })
    }
    if(ronda.cardPorRonda===5&&ronda.numeroRonda===6){
      setRonda({
        ...ronda,
        vuelta:ronda.vuelta+1,
        cantQueApostaron: 0,
        cantQueTiraron: 0,
        numeroRonda: 0,
        cardPorRonda:ronda.cardPorRonda+2
      })
    }
    if(ronda.cardPorRonda===7&&ronda.numeroRonda===8){
      setRonda({
        ...ronda,
        vuelta:ronda.vuelta+1,
        cantQueApostaron: 0,
        cantQueTiraron: 0,
        numeroRonda: 0,
        cardPorRonda:1
      })
    }
  }



  useEffect(() => {
    let numObligado=generarObligado()
    setRonda({ ...ronda, cardPorRonda: 1, obligado: numObligado});//ni bien se monta el componente setea la card
    turno()
  }, [])


  useEffect(() => {
    if (ronda.cantQueTiraron > 0) {
      AsignarMayor(ronda.ultimaCardApostada[0], ronda.AnteultimaCardApostada[0])
    }
    turno()
    
  }, [ronda.cantQueTiraron, ronda.typeRound, ronda.numeroRonda])//setea la card mas grande

  useEffect(() => {
    if (ronda.cantQueTiraron === 4) {
      cambioRonda()
      SumarGanada()
    }
  }, [jugador1.myturnR, jugador2.myturnR, jugador3.myturnR, jugador4.myturnR])

  useEffect(() => {
    if (ronda.numeroRonda > 1) {
      setTurnoRound()
      cambioDeVuelta()
    }
  }, [ronda.numeroRonda])

  useEffect(() => {
    turno()
  }, [ronda.turnoJugadorR])


  useEffect(()=>{
    if(ronda.vuelta>1){
      setJugador1({ ...jugador1, cardApostada: [{ valor: '', palo: '' }] });
      setJugador2({ ...jugador2, cardApostada: [{ valor: '', palo: '' }] });
      setJugador3({ ...jugador3, cardApostada: [{ valor: '', palo: '' }] });
      setJugador4({ ...jugador4, cardApostada: [{ valor: '', palo: '' }] });
      gameInit()

    }
  },[ronda.vuelta])
  return (
    <div className={style.contain}>
      <div className={style.containCardPropias}>
        <div className={style.CardPropias}>

          {jugador1?.cardPersona?.map((card, index) => (


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

      {ronda.cantUser === 4
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
        {/* <button onClick={mezclar}>Mezclar</button> */}
        <button onClick={gameInit}>Comenzar Juego</button>

      </div>
      {/* (ronda.typeRound === 'apuesta') &&  */}
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
      {/* {activo===true?(
<div>


<div>

</div>


</div> 
):""
} */}

    </div>
  );
}
