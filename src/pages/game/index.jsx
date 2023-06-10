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
    cumplio: false, //boolean
    puntos: 0

  });
  const [jugador2, setJugador2] = useState({
    id: 2,
    cardPersona: [],
    apuestaP: null,
    cardsganadas: 0,
    cardApostada: [{ valor: null, palo: '' }],
    myturnA: false, //boolean
    myturnR: false, //booleanA
    cumplio: false, //boolean
    puntos: 0
  });
  const [jugador3, setJugador3] = useState({
    id: 3,
    cardPersona: [],
    apuestaP: null,
    cardsganadas: 0,
    cardApostada: [{ valor: null, palo: '' }],
    myturnA: false, //boolean
    myturnR: false, //boolean
    cumplio: false, //boolean
    puntos: 0
  });
  const [jugador4, setJugador4] = useState({
    id: 4,
    cardPersona: [],
    apuestaP: null,
    cardsganadas: 0,
    cardApostada: [{ valor: null, palo: '' }],
    myturnA: false, //boolean
    myturnR: false, //boolean
    cumplio: false, //boolean
    puntos: 0
  });

  const [ronda, setRonda] = useState({
    cantUser: 4,//usuarios conectados
    vuelta: 1,//num de vuelta (4 rondas =1 vuelta)
    numeroRonda: 1,//num de ronda
    cardPorRonda: 1,//cant de cartas que se reparten
    typeRound: "", //apuesta o ronda
    turnoJugadorA: 1, //1j 2j 3j 4j apuesta
    turnoJugadorR: 1, //1j 2j 3j 4j ronda
    obligado: null,//numero de jugador obligado
    ApuestaTotal: 0, //suma de la apuesta de todos
    CardGanadoraxRonda: [{ valor: null, palo: '', id: '' }],
    ultimaCardApostada: [{ valor: null, palo: '', id: '' }],
    AnteultimaCardApostada: [{ valor: null, palo: '', id: '' }],
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

  const generarObligado = () => {
    let min = 1;
    let max = 4;
    let obligado = Math.floor((Math.random() * (max - min + 1)) + min);
    return obligado
  }

  const gameInit = () => {
    let numObligado = generarObligado()

    if (ronda.vuelta === 1) {
      setRonda({ ...ronda, typeRound: "apuesta", obligado: 4 });
      mezclar()
    }
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
    let turno = ronda.CardGanadoraxRonda[0].id

    switch (turno) {
      case 1: setRonda({
        ...ronda,
        turnoJugadorR: 1,
      })
        break;
      case 2: setRonda({
        ...ronda,
        turnoJugadorR: 2,
      })

        break;
      case 3: setRonda({
        ...ronda,
        turnoJugadorR: 3,
      })
        break;
      case 4: setRonda({
        ...ronda,
        turnoJugadorR: 4,
      })
        break;

      default:
        break;
    }

  }

  const cambioRonda = () => {
    setRonda({
      ...ronda,
      turnoJugadorR: ronda.CardGanadoraxRonda[0].id,
      cantQueTiraron: 0,
      numeroRonda: ronda.numeroRonda + 1,
      ultimaCardApostada: [{ valor: '', palo: '', id: '' }],
      CardGanadoraxRonda: [{ valor: '', palo: '', id: '' }]
    })
  }

  const Cumplio = () => {
    if (jugador1.apuestaP === jugador1.cardsganadas) {
      setJugador1({ ...jugador1, cumplio: true })
    }
    if (jugador2.apuestaP === jugador2.cardsganadas) {
      setJugador2({ ...jugador2, cumplio: true })
    }
    if (jugador3.apuestaP === jugador3.cardsganadas) {
      setJugador3({ ...jugador3, cumplio: true })
    }
    if (jugador4.apuestaP === jugador4.cardsganadas) {
      setJugador4({ ...jugador4, cumplio: true })
    }
  }

  const puntos = () => {
    if (jugador1.cumplio === true) {
      setJugador1({ ...jugador1, puntos: jugador1.puntos + 5 + jugador1.cardsganadas })
    } else {setJugador1({ ...jugador1, puntos: jugador1.puntos }) }
    
    if (jugador2.cumplio === true) {
      setJugador2({ ...jugador2, puntos: jugador2.puntos + 5 + jugador2.cardsganadas })
    } else { setJugador2({ ...jugador2, puntos: jugador2.puntos }) }
    
    if (jugador3.cumplio === true) {
      setJugador3({ ...jugador3, puntos: jugador3.puntos + 5 + jugador3.cardsganadas })
    } else { setJugador3({ ...jugador3, puntos: jugador3.puntos }) }
    
    if (jugador4.cumplio === true) {
      setJugador4({ ...jugador4, puntos: jugador4.puntos + 5 + jugador4.cardsganadas })
    } else { setJugador4({ ...jugador4, puntos: jugador4.puntos }) }

  }

  const cambioDeVuelta = () => {
    if (ronda.cardPorRonda === 1 && ronda.numeroRonda === 2) {
      setRonda({
        ...ronda,
        vuelta: ronda.vuelta + 1,
        cantQueApostaron: 0,
        cantQueTiraron: 0,
        numeroRonda: 1,
        cardPorRonda: ronda.cardPorRonda + 2
      })
    }
    if (ronda.cardPorRonda === 3 && ronda.numeroRonda === 4) {
      setRonda({
        ...ronda,
        vuelta: ronda.vuelta + 1,
        cantQueApostaron: 0,
        cantQueTiraron: 0,
        numeroRonda: 1,
        cardPorRonda: ronda.cardPorRonda + 2

      })
    }
    if (ronda.cardPorRonda === 5 && ronda.numeroRonda === 6) {
      setRonda({
        ...ronda,
        vuelta: ronda.vuelta + 1,
        cantQueApostaron: 0,
        cantQueTiraron: 0,
        numeroRonda: 1,
        cardPorRonda: ronda.cardPorRonda + 2
      })
    }
    if (ronda.cardPorRonda === 7 && ronda.numeroRonda === 8) {
      setRonda({
        ...ronda,
        cardPorRonda: 1,
        vuelta: ronda.vuelta + 1,
        cantQueApostaron: 0,
        cantQueTiraron: 0,
        numeroRonda: 1,
      })
    }
  }

  const resetPlayers = () => {

    setJugador1({
      ...jugador1,
      cardApostada: [{ valor: null, palo: '' }],
      apuestaP: null,
      cumplio: false,
      cardsganadas:0
    })
    setJugador2({
      ...jugador2,
      cardApostada: [{ valor: null, palo: '' }],
      apuestaP: null,
      cumplio: false,
      cardsganadas:0
    })
    setJugador3({
      ...jugador3,
      cardApostada: [{ valor: null, palo: '' }],
      apuestaP: null,
      cumplio: false,
      cardsganadas:0
    })
    setJugador4({
      ...jugador4,
      cardApostada: [{ valor: null, palo: '' }],
      apuestaP: null,
      cumplio: false,
      cardsganadas:0
    })

  }

  const resetRound = () => {

    if (ronda.obligado === 1 || ronda.obligado === 2 || ronda.obligado === 3) {
      setRonda({
        ...ronda,
        typeRound: "apuesta",
        ApuestaTotal: 0,
        obligado: ronda.obligado + 1,
        CardGanadoraxRonda: [{ valor: null, palo: '', id: '' }],
        cantQueApostaron: 0,
      });
    }
    else {
      setRonda({
        ...ronda,
        typeRound: "apuesta",
        ApuestaTotal: 0,
        obligado: 1,
        CardGanadoraxRonda: [{ valor: null, palo: '', id: '' }],
        cantQueApostaron: 0,
      });
    }


  }


  useEffect(() => {
    // if (ronda.cantQueTiraron > 0) {
    AsignarMayor(ronda.ultimaCardApostada[0], ronda.AnteultimaCardApostada[0])
    // }//setea la card mas grande
    turno()//no borrar turno
  }, [ronda.cantQueTiraron, ronda.typeRound, ronda.numeroRonda])

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
    turno()
  }, [ronda.numeroRonda])

  useEffect(() => {
    turno()
  }, [ronda.turnoJugadorR, ronda.vuelta, ronda.typeRound])

  useEffect(() => {
    if (ronda.vuelta >= 1) {
      Cumplio()
    }
  }, [ronda.vuelta])

  useEffect(() => {
    if (ronda.vuelta >= 1) {
      puntos()
    }
  }, [jugador1.cumplio, jugador2.cumplio, jugador3.cumplio, jugador4.cumplio])

  useEffect(() => {
    if (ronda.vuelta > 1) {
      setTimeout(() => {
        resetPlayers()
        resetRound()
      }, 1000);
    }
    turno()
  }, [jugador1.puntos, jugador2.puntos, jugador3.puntos, jugador4.puntos])

  useEffect(() => {
    if (ronda.vuelta > 1) {

      if (ronda.typeRound === 'apuesta') {

        mezclar()
      }
    }
  }, [ronda.typeRound])

  return (
    <div className={style.contain}>

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
      <div className={style.infoPartida}>
        <p>tipo: {ronda.typeRound} </p>
        <p>Cartas Repartidas: {ronda.cardPorRonda} </p>
        <p>Apuesta total: {ronda.ApuestaTotal}</p>
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
      {(ronda.typeRound === 'apuesta') ?

        <Apuesta
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
