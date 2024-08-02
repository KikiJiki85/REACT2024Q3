import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import MyApp from '../pages/_app';
import store from '../store';
import { AppProps } from 'next/app';
import { NextRouter } from 'next/router';

const MockComponent = () => <div>Mock Component</div>;

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: async () => true,
  replace: async () => true,
  reload: () => {},
  back: () => {},
  prefetch: async () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isReady: true,
  isPreview: false,
  forward: () => {},
  isLocaleDomain: false,
  locale: undefined,
  locales: [],
  defaultLocale: undefined,
  domainLocales: undefined,
};

describe('MyApp', () => {
  it('renders without crashing', () => {
    const pageProps = {};

    const { container } = render(
      <Provider store={store}>
        <ThemeProvider>
          <MyApp
            Component={MockComponent}
            pageProps={pageProps}
            router={mockRouter as unknown as AppProps['router']}
          />
        </ThemeProvider>
      </Provider>,
    );

    expect(container).toBeDefined();
  });
});
