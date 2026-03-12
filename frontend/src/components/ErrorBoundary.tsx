import type { ErrorInfo, ReactNode } from "react";
import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./ErrorBoundary.module.css";

type ErrorBoundaryProps = {
  children?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error: unknown): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>
              <AlertTriangle size={64} />
            </div>

            <div className={styles.errorContent}>
              <h1 className={styles.errorTitle}>Oops! Algo deu errado</h1>
              <p className={styles.errorMessage}>
                Encontramos um erro inesperado. Nossa equipe foi notificada e
                está trabalhando para resolver o problema.
              </p>

              <div className={styles.errorActions}>
                <button
                  type="button"
                  onClick={this.handleReload}
                  className={`${styles.errorButton} ${styles.errorButtonPrimary}`}
                >
                  <RefreshCw size={20} />
                  Recarregar Página
                </button>

                <Link
                  to="/"
                  className={`${styles.errorButton} ${styles.errorButtonSecondary}`}
                >
                  <Home size={20} />
                  Voltar ao Início
                </Link>
              </div>

              {import.meta.env.DEV && this.state.error && (
                <details className={styles.errorDetails}>
                  <summary>Detalhes do erro (desenvolvimento)</summary>
                  <pre className={styles.errorStack}>
                    {this.state.error.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children ?? null;
  }
}

export default ErrorBoundary;
