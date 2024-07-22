import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

import {
  ThemeProvider,
  useTheme,
} from '../components/ThemeContext/ThemeContext';

describe('ThemeProvider', () => {
  it('should toggle theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      ),
    });

    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should render children', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <ThemeProvider>
          <div>Test Child</div>
        </ThemeProvider>,
      );
    });

    await waitFor(() => {
      expect(container.querySelector('div')).toHaveTextContent('Test Child');
    });

    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
  });
});
