import { Component, type ReactNode } from 'react';
import Card from '../../components/Card';
import type { AppState } from '../../App';
import Spinner from '../../components/Spinner';

import styles from './SearchResults.module.css';

export class SearchResults extends Component<{ data: AppState }> {
  render(): ReactNode {
    const { searchResults, isLoading, error } = this.props.data;

    if (isLoading) return <Spinner />;
    if (error) return <div className="error">{error}</div>;

    return (
      <div>
        <h3 className={styles.title}>Results</h3>

        <ul>
          {searchResults.map((character) => (
            <Card key={character.name} character={character} />
          ))}
        </ul>

        {!searchResults.length && <div>No characters found!</div>}
      </div>
    );
  }
}
