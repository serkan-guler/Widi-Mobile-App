import React, {Component, ErrorInfo, ReactNode} from 'react';
import ErrorScreen from './ErrorScreen';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage?: string;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Gerekirse loglama yap
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', info.componentStack);
  }

  handleRetry = (): void => {
    this.setState({hasError: false, errorMessage: undefined});
  };

  render() {
    const {hasError, errorMessage} = this.state;

    if (hasError) {
      return <ErrorScreen message={errorMessage} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
