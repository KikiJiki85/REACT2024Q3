import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { ComponentType, createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';

describe('ErrorBoundary', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('renders FallbackUi when error is thrown', () => {
    const ThrowError: ComponentType = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('closes the FallbackUi when Close button is clicked', async () => {
    const ThrowError: ComponentType = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
  });

  it('catches the error and logs it to console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const ThrowError: ComponentType = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('can throw an error manually using throwError method', async () => {
    const errorBoundaryRef = createRef<ErrorBoundary>();

    render(
      <ErrorBoundary ref={errorBoundaryRef}>
        <div>Child component</div>
      </ErrorBoundary>,
    );

    if (errorBoundaryRef.current) {
      errorBoundaryRef.current.throwError();
    }

    await waitFor(() => {
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });
  });
});
