import { Component } from 'react';

import styles from './Header.module.css';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <h1>Find a Star Wars character</h1>
      </header>
    );
  }
}
