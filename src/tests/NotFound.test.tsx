import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import NotFound from '../components/NotFound/NotFound';

describe('NotFound Component', () => {
  it('renders the NotFound component with the correct text', () => {
    render(<NotFound />);
    const headingElement = screen.getByRole('heading', {
      name: /404 - Page Not Found/i,
    });
    expect(headingElement).toBeInTheDocument();
  });
});
