"use client";

import { PromptsInterface } from "@/components/prompts-interface";

export default function PromptsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display">Prompts & Templates</h1>
        <p className="text-sm text-muted-foreground">
          Gérez et consultez vos prompts personnalisés.
        </p>
      </div>

      <PromptsInterface />
    </main>
  );
}
