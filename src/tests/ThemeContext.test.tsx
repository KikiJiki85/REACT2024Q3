import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';

import {
  ThemeProvider,
  useTheme,
} from '../components/ThemeContext/ThemeContext';

describe('ThemeProvider', () => {
  it('should toggle theme', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      React.useEffect(() => {
        toggleTheme();
      }, [toggleTheme]);
      return <div>{theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText('light')).toBeInTheDocument();

    act(() => {
      // Since toggleTheme is called in useEffect, we need to wait for the next render
      waitFor(() => expect(screen.getByText('dark')).toBeInTheDocument());
    });
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
