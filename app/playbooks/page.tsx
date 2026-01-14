"use client";

import { PlaybooksInterface } from "@/components/playbooks-interface";

export default function PlaybooksPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display">Playbooks & Documentation</h1>
        <p className="text-sm text-muted-foreground">
          Consultez les guides et les prompts pour optimiser vos réponses.
        </p>
      </div>

      <PlaybooksInterface />
    </main>
  );
}
