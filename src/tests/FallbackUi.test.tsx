import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import FallbackUi from '../components/FallbackUi/FallbackUi';

describe('FallbackUi Component', () => {
  it('renders the message and close button', () => {
    const message = 'Test message';
    const onClose = vi.fn();

    render(<FallbackUi message={message} onClose={onClose} />);

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const message = 'Test message';
    const onClose = vi.fn();

    render(<FallbackUi message={message} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
