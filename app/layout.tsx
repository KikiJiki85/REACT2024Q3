'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store';
import 'normalize.css';
import { ThemeProvider } from '../src/components/ThemeContext/ThemeContext';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React 2024 Q3 RSschool</title>
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <React.StrictMode>{children}</React.StrictMode>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
