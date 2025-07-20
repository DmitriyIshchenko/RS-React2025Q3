import { render, screen } from '@testing-library/react';
import Card from './Card';
import { mockCharacters } from '../test-utils/mocks/data/characters';

describe('Card Component', () => {
  const [mockCharacter] = mockCharacters;

  describe('Rendering Tests', () => {
    test('Displays item name and description correctly', () => {
      render(<Card character={mockCharacter} />);

      const nameElement = screen.getByText('Rick Sanchez');
      expect(nameElement).toBeInTheDocument();

      const statusElement = screen.getByText('Alive');
      expect(statusElement).toBeInTheDocument();
    });
  });
});
