import { useState } from 'react';
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

function App() {
  const [state, setState] = useState<AppState>({
    searchResults: [],
    isLoading: false,
    error: null,
    isErrorBoundaryFaked: false,
  });

  const handleSearch = async (searchQuery: string) => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

      const data = await getSearchResults(searchQuery);

      setState((prevState) => ({ ...prevState, searchResults: data }));
    } catch (error) {
      if (error instanceof Error) {
        setState((prevState) => ({
          ...prevState,
          error: `Something went wrong: ${error.message}. Please try again!`,
        }));
      }
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  if (state.isErrorBoundaryFaked)
    throw new Error('Fake error boundary has been triggered!');

  return (
    <main className={styles.main}>
      <Header />
      <SearchForm onSearch={handleSearch} />
      <SearchResultsList data={state} />
      <button
        onClick={() =>
          setState((prevState) => ({
            ...prevState,
            isErrorBoundaryFaked: true,
          }))
        }
      >
        Trigger error boundary
      </button>
    </main>
  );
}

export default App;
