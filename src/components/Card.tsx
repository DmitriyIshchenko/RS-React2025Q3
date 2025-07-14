import { Component } from 'react';
import type { Character } from '../lib/types';

import styles from './Card.module.css';

export default class Card extends Component<{ character: Character }> {
  render() {
    const { name, status } = this.props.character;
    return (
      <li className={styles.card}>
        <p className={styles.title}>{name}</p>
        <p className={styles.info}>{status}</p>
      </li>
    );
  }
}
