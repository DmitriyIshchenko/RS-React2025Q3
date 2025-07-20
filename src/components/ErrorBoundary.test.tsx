import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { vi } from 'vitest';

describe('ErrorBoundary', () => {
  const ErrorComponent = () => {
    throw new Error('Test error');
  };

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Error Catching Tests', () => {
    test('Catches and handles JavaScript errors in child components', () => {
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    test('Displays custom fallback UI when provided', () => {
      const fallback = <div>Custom error message</div>;
      render(
        <ErrorBoundary fallback={fallback}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();
      expect(
        screen.queryByText('Something went wrong!')
      ).not.toBeInTheDocument();
    });

    test('Logs error to console', () => {
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(console.error).toHaveBeenCalled();
    });
  });
});
