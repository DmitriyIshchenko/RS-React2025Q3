import { Component, type FormEvent } from 'react';
import { SEARCH_QUERY } from '../../lib/constants';
import styles from './SearchForm.module.css';

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

    localStorage.setItem(SEARCH_QUERY, value.trim());
    this.setState({
      searchQuery: value,
    });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({
      searchQuery: this.state.searchQuery.trim(),
    });
    this.props.onSearch(this.state.searchQuery);
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name={SEARCH_QUERY}
          value={this.state.searchQuery}
          onChange={this.handleSearchQueryChange}
        />

        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    );
  }
}
