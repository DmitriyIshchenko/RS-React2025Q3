import { Component, type FormEvent } from 'react';
import { SEARCH_QUERY } from '../../lib/constants';

interface SearchFormProps {
  onSearch: (searchQuery: string) => void;
}

interface SearchFormState {
  searchQuery: string;
}

export class SearchForm extends Component<SearchFormProps, SearchFormState> {
  state = {
    searchQuery: localStorage.getItem(SEARCH_QUERY) ?? '',
  };

  componentDidMount(): void {
    this.props.onSearch(this.state.searchQuery);
  }

  handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    localStorage.setItem(SEARCH_QUERY, value);
    this.setState({
      searchQuery: value,
    });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onSearch(this.state.searchQuery);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name={SEARCH_QUERY}
          value={this.state.searchQuery}
          onChange={this.handleSearchQueryChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
