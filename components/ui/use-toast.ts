"use client";

import * as React from "react";

type ToastData = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

type ToastContextValue = {
  toasts: ToastData[];
  toast: (t: Omit<ToastData, "id">) => void;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback((t: Omit<ToastData, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev: ToastData[]) => [...prev, { id, ...t }]);
    setTimeout(() => dismiss(id), 6000);
  }, [dismiss]);

  return React.createElement(
    ToastContext.Provider,
    { value: { toasts, toast, dismiss } },
    children,
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProviderClient");
  }
  return ctx;
}
