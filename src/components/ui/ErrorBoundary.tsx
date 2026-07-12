"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[ErrorBoundary] ${this.props.sectionName || "Section"} crashed:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-5 py-4 text-sm text-rose-400">
          <p className="font-medium mb-1">⚠️ {this.props.sectionName || "This section"} failed to render.</p>
          <p className="text-rose-500/70 text-xs">The rest of the report is unaffected. You can try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
