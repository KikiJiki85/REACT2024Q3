import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import store from '../store';

describe('AppRouter', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
    );
    expect(container).toBeDefined();
  });
});
