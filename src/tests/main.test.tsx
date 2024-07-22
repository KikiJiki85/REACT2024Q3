import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import AppRouter from '../AppRouter';

describe('AppRouter', () => {
  it('renders without crashing', () => {
    const { container } = render(<AppRouter />);
    expect(container).toBeDefined();
  });
});
