import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import DetailsPage from '../pages/search/[page]/details/[id]';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import store from '../store';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '123', page: '1' },
  }),
}));

describe('DetailsPage', () => {
  it('renders SearchPage and ItemDetails with correct props', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <DetailsPage />
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/search/i)).toBeInTheDocument();
      expect(screen.getByText(/search/i)).toBeInTheDocument();
    });
  });
});
