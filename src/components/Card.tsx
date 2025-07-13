import { Component } from 'react';
import type { Recipe } from '../lib/types';

import styles from './Card.module.css';

export default class Card extends Component<Pick<Recipe, 'name' | 'cuisine'>> {
  render() {
    const { name, cuisine } = this.props;
    return (
      <li className={styles.card}>
        <p className={styles.title}>{name}</p>
        <p className={styles.info}>{cuisine}</p>
      </li>
    );
  }
}
