import { render, screen, fireEvent } from '@testing-library/react';
import {
  ThemeProvider,
  useTheme,
} from '../components/ThemeContext/ThemeContext';
import React from 'react';

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should toggle theme between light and dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeElement = screen.getByTestId('theme');
    const button = screen.getByText('Toggle Theme');

    expect(themeElement.textContent).toBe('light');

    fireEvent.click(button);
    expect(themeElement.textContent).toBe('dark');

    fireEvent.click(button);
    expect(themeElement.textContent).toBe('light');
  });
});
