import { Component } from 'react';
import { SearchForm } from './features/search/SearchForm';
import { getSearchResults } from './api/getSearchResults';

interface AppState {
  searchResults: unknown;
  isLoading: boolean;
  error: string | null;
}

class App extends Component<unknown, AppState> {
  handleSearchSubmit = async (searchQuery: string) => {
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
      <>
        <SearchForm onSubmit={this.handleSearchSubmit} />
      </>
    );
  }
}

export default App;
