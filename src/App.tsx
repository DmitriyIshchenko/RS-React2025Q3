import { Component } from 'react';
import { SearchForm } from './features/search/SearchForm';
import { getSearchResults } from './api/getSearchResults';
import { SearchResults } from './features/search/SearchResults';
import type { Character } from './lib/types';

import styles from './App.module.css';

export interface AppState {
  searchResults: Character[];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<unknown, AppState> {
  state: AppState = {
    searchResults: [],
    isLoading: false,
    error: null,
  };

  handleSearch = async (searchQuery: string) => {
    try {
      this.setState({ isLoading: true, error: null });

      const data = await getSearchResults(searchQuery);

      this.setState({ searchResults: data });
    } catch {
      this.setState({ error: 'Unable to fetch result :( Please try again!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <main className={styles.main}>
        <SearchForm onSearch={this.handleSearch} />
        <SearchResults data={this.state} />
      </main>
    );
  }
}

export default App;
