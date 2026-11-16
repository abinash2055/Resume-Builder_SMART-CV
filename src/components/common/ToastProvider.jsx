
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  XCircle,
} from "lucide-react";

const ToastContext = createContext(null);

const TOAST_CONFIG = {
  success: {
    icon: CheckCircle2,
    className: "border-green-200 bg-green-50 text-green-800",
  },
  error: {
    icon: XCircle,
    className: "border-red-200 bg-red-50 text-red-800",
  },
  warning: {
    icon: AlertCircle,
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50 text-blue-800",
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    const timer = timersRef.current.get(id);

    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setToasts((current) =>
      current.filter((toast) => toast.id !== id)
    );
  }, []);

  const showToast = useCallback(
    (message, type = "success", duration = 3500) => {
      if (!message) return null;

      const id = crypto.randomUUID();

      const newToast = {
        id,
        message,
        type: TOAST_CONFIG[type] ? type : "info",
      };

      setToasts((current) => [
        ...current.slice(-3),
        newToast,
      ]);

      if (duration > 0) {
        const timer = window.setTimeout(() => {
          removeToast(id);
        }, duration);

        timersRef.current.set(id, timer);
      }

      return id;
    },
    [removeToast]
  );

  // Clean up all active timers when the provider unmounts.
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => {
        window.clearTimeout(timer);
      });

      timersRef.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{ showToast, removeToast }}
    >
      {children}

      <div
        className="fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => {
          const config =
            TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;

          const Icon = config.icon;

          return (
            <div
              key={toast.id}
              role={toast.type === "error" ? "alert" : "status"}
              className={`flex items-start gap-3 rounded-xl border p-4 shadow-lg ${config.className}`}
            >
              <Icon
                size={21}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />

              <p className="min-w-0 flex-1 text-sm font-medium">
                {toast.message}
              </p>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="shrink-0 rounded-md p-1 transition hover:bg-black/5"
                aria-label="Dismiss notification"
              >
                <X size={17} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider."
    );
  }

  return context;
}
