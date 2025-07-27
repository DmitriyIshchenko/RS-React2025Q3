import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SEARCH_QUERY } from '../../lib/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  onSearch: (searchQuery: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useLocalStorage(SEARCH_QUERY, '');
  const [userInput, setUserInput] = useState(searchQuery);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedUserInput = userInput.trim();
    setSearchQuery(formattedUserInput);
    onSearch(formattedUserInput);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name={SEARCH_QUERY}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
