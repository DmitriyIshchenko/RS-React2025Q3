import { Component, type ReactNode } from 'react';
import Card from '../../components/Card';
import type { AppState } from '../../App';
import Spinner from '../../components/Spinner';

import styles from './SearchResultsList.module.css';

export class SearchResultsList extends Component<{ data: AppState }> {
  render(): ReactNode {
    const { searchResults, isLoading, error } = this.props.data;

    if (isLoading) return <Spinner />;
    if (error) return <div className="error">{error}</div>;

    return (
      <section>
        <header>
          <h3 className={styles.title}>Results</h3>

          <div className={styles.legend}>
            <p>Name</p>
            <p>Status</p>
          </div>
        </header>

        <ul>
          {searchResults.map((character) => (
            <Card key={character.id} character={character} />
          ))}
        </ul>

        {!searchResults.length && <div>No characters found!</div>}
      </section>
    );
  }
}
