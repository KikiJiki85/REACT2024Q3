import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import 'normalize.css';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default MyApp;
