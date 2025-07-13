import { Component, type ReactNode } from 'react';
import Card from '../../components/Card';
import type { AppState } from '../../App';
import Spinner from '../../components/Spinner';

import styles from './SearchResults.module.css';

type SearchResultsProps = AppState;

export class SearchResults extends Component<SearchResultsProps> {
  render(): ReactNode {
    const { searchResults: results, isLoading, error } = this.props;

    if (isLoading) return <Spinner />;
    if (error) return <div className="error">{error}</div>;
    if (!results) return <div>Enter a search term to find recipes</div>;

    if (!results.length) return <div>No recipes found</div>;

    return (
      <div>
        <h3 className={styles.title}>Results</h3>

        <ul>
          {results.map((item) => (
            <Card key={item.id} name={item.name} cuisine={item.cuisine} />
          ))}
        </ul>
      </div>
    );
  }
}
