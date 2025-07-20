import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { vi } from 'vitest';
import ErrorBoundary from './components/ErrorBoundary';

describe('App Error Boundary Integration', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Triggers error boundary when error button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </div>
    );

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();

    await user.click(screen.getByText('Trigger error boundary'));

    // Verify error boundary is shown with the expected error message
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(
      screen.getByText('Fake error boundary has been triggered!')
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /search/i })
    ).not.toBeInTheDocument();
  });

  test('Shows normal UI when no error occurs', () => {
    render(
      <div>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </div>
    );

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();

    expect(screen.queryByText('Something went wrong!')).not.toBeInTheDocument();
  });
});
