"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastKind = "ok" | "err";

interface ToastItem {
  id: number;
  msg: string;
  kind: ToastKind;
  show: boolean;
}

interface ToastContextValue {
  toast: (msg: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const ICON_OK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
);

const ICON_ERR = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16.5v.01" />
  </svg>
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const toast = useCallback((msg: string, kind: ToastKind = "ok") => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, msg, kind, show: false }]);

    // animate in
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, show: true } : t))
        )
      )
    );

    // animate out then remove
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, show: false } : t))
      );
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 350);
    }, 3800);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div id="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast${t.kind === "err" ? " err" : ""}${t.show ? " show" : ""}`}>
            {t.kind === "err" ? ICON_ERR : ICON_OK}
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
