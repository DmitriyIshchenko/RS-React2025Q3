import { Component } from 'react';
import { SearchForm } from './features/search/SearchForm';
import { getSearchResults } from './api/getSearchResults';
import type { Character } from './lib/types';

import styles from './App.module.css';
import Header from './components/Header';
import { SearchResultsList } from './features/search/SearchResultsList';

export interface AppState {
  searchResults: Character[];
  isLoading: boolean;
  error: string | null;
  isErrorBoundaryFaked: boolean;
}

class App extends Component<unknown, AppState> {
  state: AppState = {
    searchResults: [],
    isLoading: false,
    error: null,
    isErrorBoundaryFaked: false,
  };

  handleSearch = async (searchQuery: string) => {
    try {
      this.setState({ isLoading: true, error: null });

      const data = await getSearchResults(searchQuery);

      this.setState({ searchResults: data });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          error: `Something went wrong: ${error.message}. Please try again!`,
        });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    if (this.state.isErrorBoundaryFaked)
      throw new Error('Fake error boundary has been triggered!');

    return (
      <main className={styles.main}>
        <Header />
        <SearchForm onSearch={this.handleSearch} />
        <SearchResultsList data={this.state} />
        <button onClick={() => this.setState({ isErrorBoundaryFaked: true })}>
          Trigger error boundary
        </button>
      </main>
    );
  }
}

export default App;
