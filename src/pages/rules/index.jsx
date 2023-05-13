import Link from 'next/link';
import style from './rules.module.css';

export default function Game () {
  return (
    <div className={style.contain}>
      <div className={style.info}>
        <h3>Reglas del juego</h3>
        <ul>
          <li>
            El juego consiste en apostar una cierta cantidad de cartas acorde al número de repartidas y cumplir dicha apuesta.
          </li>
          <p>¿Como gano? </p>
          <li>
            El juego comienza con 1 carta repartida y comienza el de la derecha al <span>Obligado</span> .
          </li>
          <li>
            El valor de las cartas, de mayor a menor son: 1,12,11... 3,2 .
          </li>
          <li>
            Si tu rival de la izquierda tira una carta(ejemplo un 5) debes tirar un 6 o mayor ya que por mano gana la suya.

          </li>

          <li>Quien haya ganado la ronda comienza para la siguiente. </li>
          <li>
          <span>Obligado :</span> Es aquella persona que se ve obligada a romper la igualdad entre la cantidad de apuestas y cartas repartidas. ( ejemplo se reparten 3 cartas y la suma de la apuesta de cada jugador da 3, el obligado se ve "obligado" a apostar 1 o mas cartas, otro caso es si se reparten 3 cartas y la suma de apuestas da 2 entonces el obligado no puede decir 1 ya que igualaria los resultados por ende debe decir 0 o 2).
          </li>
          <li>
            Las apuestas son por turnos comenzando desde la derecha del obligado en sentido antihorario, es decir que el "obligado" es el ultimo en apostar.
          </li>
          <li>
            A la hora del puntaje quien cumpla, es decir, gano las cartas que aposto se le sumara 5 puntos + la cantidad de cartas que gano. ( si cumplió pero fue 0 cartas solo sumaria 5 puntos ).
          </li>

        </ul>

        <Link href="/" className={style.link}>{"⬅ Menu"}</Link>
      </div>
    </div>
  );
}
