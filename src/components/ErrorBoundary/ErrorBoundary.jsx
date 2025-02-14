import { Component } from "react";
import PropTypes from "prop-types";
import { FaExclamationTriangle, FaSync } from "react-icons/fa";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error Boundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const isDevelopment =
      typeof import.meta !== "undefined" &&
      import.meta.env &&
      import.meta.env.MODE === "development";

    if (this.state.hasError) {
      return (
        <div className={styles["error-boundary-overlay"]}>
          <div className={styles["error-boundary-card"]}>
            <div className={styles["error-icon-container"]}>
              <FaExclamationTriangle className={styles["error-main-icon"]} />
              <div className={styles["error-pulse-effect"]} />
            </div>

            <h2 className={styles["error-title"]}>
              Oops! Something Went Wrong
              <span className={styles["error-emoji"]}> 😱</span>
            </h2>

            <p className={styles["error-description"]}>
              We&apos;re sorry for the inconvenience. Our team has been
              notified. Please try refreshing the page.
            </p>

            {isDevelopment && (
              <details className={styles["error-details"]}>
                <summary>Debug Information</summary>
                <pre className={styles["error-stack"]}>
                  {this.state.error?.toString()}
                  {"\n"}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleReload}
              className={styles["reload-button"]}
            >
              <FaSync className={styles["reload-icon"]} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
