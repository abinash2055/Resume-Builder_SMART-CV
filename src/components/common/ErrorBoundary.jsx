
import { Component } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("SmartCV Application Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle size={30} />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              SmartCV encountered an unexpected error while displaying
              this page. You can try again or reload the application.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <RefreshCw size={16} />
                Try Again
              </button>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Home size={16} />
                Reload App
              </button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
