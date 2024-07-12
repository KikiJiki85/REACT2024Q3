import { Component, ErrorInfo } from 'react';
import FallbackUi from '../FallbackUi/FallbackUi';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  closeModal = () => {
    this.setState({ hasError: false });
  };

  throwError = () => {
    try {
      throw new Error('This is a test error');
    } catch (error) {
      console.error('Error thrown:', error);
      this.setState({ hasError: true });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <FallbackUi message="Something went wrong." onClose={this.closeModal} />
      );
    }

    return <div className={styles['error-block']}>{this.props.children}</div>;
  }
}

export default ErrorBoundary;
