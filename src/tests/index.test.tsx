import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import Home from '../pages/index';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Home', () => {
  it('redirects to /search/1 on mount', () => {
    const push = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push,
    });

    render(<Home />);

    expect(push).toHaveBeenCalledWith('/search/1');
  });
});
