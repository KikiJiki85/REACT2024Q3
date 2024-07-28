import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from '../components/SearchBar/SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls onSearch with the entered value when Search button is clicked', () => {
    render(<SearchBar searchTerm="" onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test value' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('test value');
  });

  it('calls onSearch with the entered value when Enter key is pressed', () => {
    render(<SearchBar searchTerm="" onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test value' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledWith('test value');
  });

  it('updates input value when searchTerm prop changes', () => {
    const { rerender } = render(
      <SearchBar searchTerm="initial value" onSearch={mockOnSearch} />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial value');

    rerender(<SearchBar searchTerm="new value" onSearch={mockOnSearch} />);
    expect(input).toHaveValue('new value');
  });
});
