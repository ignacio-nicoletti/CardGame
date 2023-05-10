import Head from 'next/head';
import Image from 'next/image';
import {Inter} from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const inter = Inter ({subsets: ['latin']});

export default function Home () {
  return (
    <div className={styles.contain}>
      <div className={styles.containOption}>

        <h1>Bienvenido al Berenjena</h1>
        <div className={styles.option}>

        <Link href="/gameIa" className={styles.link}>• Jugar contra la IA 👤</Link>
        <Link href="/game" className={styles.link}>• Jugar con un amigo 👥</Link>
        <Link href="/rules" className={styles.link}>• Reglas 📜</Link>
        </div>

      </div>
    </div>
  );
}
