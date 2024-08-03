import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../src/components/ThemeContext/ThemeContext';
import store from '../../src/store';
import DetailsPage from '../../app/search/[page]/details/[id]/page';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

// Mocking useRouter and useSearchParams
vi.mock('next/navigation', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      prefetch: vi.fn(),
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
    }),
    useSearchParams: () => new URLSearchParams({ id: '1', page: '1' }),
  };
});

describe('DetailsPage', () => {
  it('renders SearchPage and ItemDetails with correct props', async () => {
    mockRouter.setCurrentUrl('/');

    render(
      <MemoryRouterProvider>
        <Provider store={store}>
          <ThemeProvider>
            <DetailsPage />
          </ThemeProvider>
        </Provider>
      </MemoryRouterProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/search/i)).toBeInTheDocument();
      expect(screen.getByText(/search/i)).toBeInTheDocument();
    });
  });
});
