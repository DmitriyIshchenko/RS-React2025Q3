import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from './SearchForm';
import { SEARCH_QUERY } from '../../lib/constants';
import { localStorageMock } from '../../test-utils/mocks/localStorage';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('SearchForm', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  describe('Rendering Tests', () => {
    it('Renders search input and search button', () => {
      render(<SearchForm onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });

    it('Displays previously saved search term from localStorage on mount', () => {
      const searchQuery = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY, searchQuery);

      render(<SearchForm onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toHaveValue(searchQuery);
    });

    it('Shows empty input when no saved term exists', () => {
      render(<SearchForm onSearch={mockOnSearch} />);

      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  describe('User Interaction Tests', () => {
    it('Updates input value when user types', async () => {
      const user = userEvent.setup();
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Morty');

      expect(input).toHaveValue('Morty');
    });

    it('Saves search term to localStorage when search button is clicked', async () => {
      const user = userEvent.setup();
      const searchQuery = 'Summer';
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      await user.type(input, searchQuery);
      await user.click(screen.getByRole('button', { name: /search/i }));

      expect(window.localStorage.getItem(SEARCH_QUERY)).toBe(searchQuery);
    });

    it('Trims whitespace from search input before saving', async () => {
      const user = userEvent.setup();
      const searchQuery = '  Jerry  ';
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      await user.type(input, searchQuery);
      await user.click(screen.getByRole('button', { name: /search/i }));

      expect(window.localStorage.getItem(SEARCH_QUERY)).toBe(
        searchQuery.trim()
      );
    });

    it('Triggers search callback with correct parameters', async () => {
      const user = userEvent.setup();
      const searchQuery = 'Beth';
      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      await user.type(input, searchQuery);
      await user.click(screen.getByRole('button', { name: /search/i }));

      expect(mockOnSearch).toHaveBeenCalledWith(searchQuery);
    });
  });

  describe('LocalStorage Integration', () => {
    it('retrieves saved search term on component mount', () => {
      const savedQuery = 'Rick';
      window.localStorage.setItem(SEARCH_QUERY, savedQuery);

      render(<SearchForm onSearch={mockOnSearch} />);

      expect(mockOnSearch).toHaveBeenCalledWith(savedQuery);
    });

    it('Overwrites existing localStorage value when new search is performed', async () => {
      const user = userEvent.setup();
      const initialQuery = 'Rick';
      const newQuery = 'Morty';
      window.localStorage.setItem(SEARCH_QUERY, initialQuery);

      render(<SearchForm onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, newQuery);
      await user.click(screen.getByRole('button', { name: /search/i }));

      expect(window.localStorage.getItem(SEARCH_QUERY)).toBe(newQuery);
    });
  });
});
