import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ToastProvider } from "./components/common/ToastProvider";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)
