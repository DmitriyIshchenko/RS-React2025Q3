import type { Character } from '../lib/types';
import styles from './Card.module.css';

interface CardProps {
  character: Character;
}

export default function Card({ character }: CardProps) {
  const { name, status } = character;

  return (
    <li className={styles.card}>
      <p className={styles.title}>{name}</p>
      <p className={styles.info}>{status}</p>
    </li>
  );
}
