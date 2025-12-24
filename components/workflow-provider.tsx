"use client";

import * as React from "react";

import type { ExecuteWorkflowResponse, WorkflowExecutionRecord } from "@/lib/types";

type WorkflowContextValue = {
  selected: WorkflowExecutionRecord | null;
  setSelected: (r: WorkflowExecutionRecord | null) => void;
  history: WorkflowExecutionRecord[];
  setHistory: (r: WorkflowExecutionRecord[]) => void;
  lastResponse: ExecuteWorkflowResponse | null;
  setLastResponse: (r: ExecuteWorkflowResponse | null) => void;
  showDebug: boolean;
  setShowDebug: (v: boolean) => void;
};

const WorkflowContext = React.createContext<WorkflowContextValue | null>(null);

const STORAGE_KEY = "n8n-workflow-playground:history:v1";

function readHistory(): WorkflowExecutionRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as WorkflowExecutionRecord[];
  } catch {
    return [];
  }
}

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistoryState] = React.useState<WorkflowExecutionRecord[]>([]);
  const [selected, setSelected] = React.useState<WorkflowExecutionRecord | null>(null);
  const [lastResponse, setLastResponse] = React.useState<ExecuteWorkflowResponse | null>(null);
  const [showDebug, setShowDebug] = React.useState(false);

  React.useEffect(() => {
    const initial = readHistory();
    setHistoryState(initial);
    setSelected(initial[0] ?? null);
  }, []);

  const setHistory = React.useCallback((items: WorkflowExecutionRecord[]) => {
    setHistoryState(items);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 10)));
    }
  }, []);

  return (
    <WorkflowContext.Provider
      value={{
        selected,
        setSelected,
        history,
        setHistory,
        lastResponse,
        setLastResponse,
        showDebug,
        setShowDebug,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const ctx = React.useContext(WorkflowContext);
  if (!ctx) throw new Error("useWorkflow must be used within WorkflowProvider");
  return ctx;
}
