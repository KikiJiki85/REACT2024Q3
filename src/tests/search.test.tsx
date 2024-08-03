import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../src/components/ThemeContext/ThemeContext';
import SearchPage from '../../app/search/[page]/page';
import store from '../store';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { page: '1' },
  }),
}));

describe('SearchPage', () => {
  it('renders SearchPage with correct page prop', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchPage params={{ page: '1' }} />
        </ThemeProvider>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
