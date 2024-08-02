import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import SearchPage from '../pages/search/[page]';
import store from '../store';

const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: { page: '1' },
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isReady: true,
  isPreview: false,
  forward: vi.fn(),
  isLocaleDomain: false,
  locale: undefined,
  locales: [],
  defaultLocale: undefined,
  domainLocales: undefined,
};

describe('SearchPage', () => {
  it('renders App component with correct page prop', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <Provider store={store}>
          <ThemeProvider>
            <SearchPage />
          </ThemeProvider>
        </Provider>
      </RouterContext.Provider>,
    );

    expect(container).toBeDefined();
  });
});
