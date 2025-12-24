"use client";

import { DebugPanel } from "@/components/debug-panel";
import { ExecutionHistory } from "@/components/execution-history";
import { ResultsDisplay } from "@/components/results-display";
import { WorkflowForm } from "@/components/workflow-form";
import { WorkflowProvider } from "@/components/workflow-provider";

export function Dashboard() {
  return (
    <WorkflowProvider>
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <header className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            n8n Workflow Playground
          </h1>
          <p className="text-sm text-muted-foreground">
            Exécute un workflow n8n via ton dashboard, sans passer par l’UI n8n.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="min-w-0 lg:col-span-1">
            <WorkflowForm />
          </section>

          <section className="min-w-0 space-y-6 lg:col-span-2">
            <ResultsDisplay />
            <ExecutionHistory />
            <DebugPanel />
          </section>
        </div>
      </main>
    </WorkflowProvider>
  );
}
