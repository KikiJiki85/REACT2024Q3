import { Component, ErrorInfo, ReactNode } from "react";
import FallbackUI from "./FallbackUi";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    closeModal = () => {
        this.setState({ hasError: false });
    };

    throwError = () => {
        try {
            throw new Error("This is a test error");
        } catch (error) {
            console.error("Error thrown:", error);
            this.setState({ hasError: true });
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <FallbackUI
                    message="Something went wrong."
                    onClose={this.closeModal}
                />
            );
        }

        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                    onClick={this.throwError}
                    style={{ alignSelf: "center", padding: "5px 10px" }}
                >
                    Throw Error
                </button>
                {this.props.children}
            </div>
        );
    }
}

export default ErrorBoundary;
