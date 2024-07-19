import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import SearchResult from '../components/SearchResult/SearchResult';

// Моковые данные
const mockResults = [
  { id: '1', name: 'John Doe', description: '1980' },
  { id: '2', name: 'Jane Smith', description: '1990' },
];

describe('SearchResult Component', () => {
  it('renders loading state correctly', () => {
    render(
      <SearchResult results={[]} isLoading={true} onItemClick={() => {}} />,
    );
    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });

  it('renders no results message when there are no results', () => {
    render(
      <SearchResult results={[]} isLoading={false} onItemClick={() => {}} />,
    );
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders search results correctly', () => {
    render(
      <SearchResult
        results={mockResults}
        isLoading={false}
        onItemClick={() => {}}
      />,
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Year of birth: 1980')).toBeInTheDocument();
    expect(screen.getByText('Year of birth: 1990')).toBeInTheDocument();
  });

  it('handles item click correctly', () => {
    const handleClick = vi.fn();
    render(
      <SearchResult
        results={mockResults}
        isLoading={false}
        onItemClick={handleClick}
      />,
    );

    fireEvent.click(screen.getByText('John Doe'));
    expect(handleClick).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByText('Jane Smith'));
    expect(handleClick).toHaveBeenCalledWith('2');
  });
});
