import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para mostrar a UI de erro
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Você pode registrar o erro em um serviço de relatório de erro
    console.error('ErrorBoundary capturou um erro:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  handleReload = () => {
    window.location.reload()
  }

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
                Encontramos um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
              </p>
              
              <div className={styles.errorActions}>
                <button 
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
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className={styles.errorDetails}>
                  <summary>Detalhes do erro (desenvolvimento)</summary>
                  <pre className={styles.errorStack}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary