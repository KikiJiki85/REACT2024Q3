import { render, screen, waitFor } from '@testing-library/react';
import React, { act } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import useSearchTerm from '../useSearchTerm';

const TestComponent: React.FC<{ initialTerm: string }> = ({ initialTerm }) => {
  const [searchTerm, setSearchTerm, isInitialized] = useSearchTerm(initialTerm);
  return (
    <div>
      <span data-testid="searchTerm">{searchTerm}</span>
      <span data-testid="isInitialized">
        {isInitialized ? 'true' : 'false'}
      </span>
      <button onClick={() => setSearchTerm('newTerm')}>Update Term</button>
    </div>
  );
};

describe('useSearchTerm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with initial term if no saved term in localStorage', async () => {
    render(<TestComponent initialTerm="initial" />);

    await waitFor(() => {
      expect(screen.getByTestId('searchTerm')).toHaveTextContent('initial');
      expect(screen.getByTestId('isInitialized')).toHaveTextContent('true');
    });
  });

  it('should initialize with saved term from localStorage', async () => {
    localStorage.setItem('searchTerm', 'savedTerm');
    render(<TestComponent initialTerm="initial" />);

    await waitFor(() => {
      expect(screen.getByTestId('searchTerm')).toHaveTextContent('savedTerm');
      expect(screen.getByTestId('isInitialized')).toHaveTextContent('true');
    });
  });

  it('should update search term and save to localStorage', async () => {
    render(<TestComponent initialTerm="initial" />);

    act(() => {
      screen.getByText('Update Term').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('searchTerm')).toHaveTextContent('newTerm');
      expect(localStorage.getItem('searchTerm')).toBe('newTerm');
    });
  });
});
