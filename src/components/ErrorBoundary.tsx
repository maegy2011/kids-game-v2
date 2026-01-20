"use client";

import { Component, type ReactNode } from "react";
import { motion } from "motion/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="min-h-screen flex items-center justify-center p-4"
          dir="rtl"
          style={{
            background: "linear-gradient(180deg, #87CEEB 0%, #98FB98 50%, #FFE4B5 100%)",
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-md border-4 border-yellow-400"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              😅
            </motion.div>
            <h2 className="text-3xl font-black text-purple-600 mb-4">
              عذراً! حدث خطأ
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              لا تقلق، يمكنك المحاولة مرة أخرى
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleRetry}
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg border-4 border-white"
            >
              🔄 حاول مرة أخرى
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
