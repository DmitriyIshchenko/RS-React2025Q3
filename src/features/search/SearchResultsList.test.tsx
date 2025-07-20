import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchResultsList } from './SearchResultsList';
import { mockCharacters } from '../../test-utils/mocks/data/characters';
import type { Character } from '../../lib/types';

vi.mock('../../components/Card', () => ({
  default: ({ character }: { character: Character }) => (
    <li data-testid="card-mock">
      <h3>{character.name}</h3>
      <p>{character.status}</p>
    </li>
  ),
}));

vi.mock('../../components/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('SearchResultsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('Rendering Tests', () => {
    test('Renders correct number of items when data is provided', () => {
      render(
        <SearchResultsList
          data={{
            searchResults: mockCharacters,
            isLoading: false,
            error: null,
            isErrorBoundaryFaked: false,
          }}
        />
      );

      const cards = screen.getAllByRole('listitem');
      expect(cards).toHaveLength(mockCharacters.length);
    });

    test('Displays "no results" message when data array is empty', () => {
      render(
        <SearchResultsList
          data={{
            searchResults: [],
            isLoading: false,
            error: null,
            isErrorBoundaryFaked: false,
          }}
        />
      );

      expect(screen.getByText('No characters found!')).toBeInTheDocument();
    });

    test('Shows loading state while fetching data', () => {
      render(
        <SearchResultsList
          data={{
            searchResults: [],
            isLoading: true,
            error: null,
            isErrorBoundaryFaked: false,
          }}
        />
      );

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    test('Correctly displays item names and descriptions', () => {
      render(
        <SearchResultsList
          data={{
            searchResults: [mockCharacters[0]],
            isLoading: false,
            error: null,
            isErrorBoundaryFaked: false,
          }}
        />
      );

      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Alive')).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    test('Displays error message when API call fails', () => {
      const errorMessage = 'Failed to fetch';
      render(
        <SearchResultsList
          data={{
            searchResults: [],
            isLoading: false,
            error: errorMessage,
            isErrorBoundaryFaked: false,
          }}
        />
      );

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('Shows appropriate error for different HTTP status codes (4xx, 5xx)', () => {
      const errors = [
        '400 - Bad Request',
        '403 - Forbidden',
        '500 - Internal Server Error',
        '503 - Service Unavailable',
      ];

      const { rerender } = render(
        <SearchResultsList
          data={{
            searchResults: [],
            isLoading: false,
            error: null,
            isErrorBoundaryFaked: false,
          }}
        />
      );

      errors.forEach((error) => {
        rerender(
          <SearchResultsList
            data={{
              searchResults: [],
              isLoading: false,
              error,
              isErrorBoundaryFaked: false,
            }}
          />
        );
        expect(screen.getByText(error)).toBeInTheDocument();
      });
    });
  });
});
