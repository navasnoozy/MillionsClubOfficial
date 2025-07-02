// components/RouteErrorBoundary.tsx
import React from "react";

class ErrorBoundary extends React.Component<{}, { hasError: boolean; error?: Error }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Route error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong while loading this page.</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }

    // React Router expects this component to render something,
    // even if error hasn't occurred yet.
    return null;
  }
}

export default ErrorBoundary;