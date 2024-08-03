import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../src/components/ThemeContext/ThemeContext';
import RootLayout from '../../app/layout';
import store from '../../src/store';

const MockComponent = () => <div>Mock Component</div>;

describe('RootLayout', () => {
  it('renders without crashing', () => {
    const pageProps = {};

    const { container } = render(
      <Provider store={store}>
        <ThemeProvider>
          <RootLayout>
            <MockComponent {...pageProps} />
          </RootLayout>
        </ThemeProvider>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
