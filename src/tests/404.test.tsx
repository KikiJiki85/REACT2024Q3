import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Custom404 from '../pages/404';

describe('Custom404', () => {
  it('renders NotFound component', () => {
    render(<Custom404 />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
