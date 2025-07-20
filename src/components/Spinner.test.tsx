import { render, screen } from '@testing-library/react';
import { SearchResultsList } from '../features/search/SearchResultsList';

describe('Spinner Component', () => {
  describe('Rendering Tests', () => {
    test('Renders loading indicator ', () => {
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

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});
