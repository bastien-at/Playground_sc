"use client";

import * as React from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useWorkflow } from "@/components/workflow-provider";

export function DebugPanel() {
  const { toast } = useToast();
  const { selected, lastResponse, showDebug } = useWorkflow();

  const shown = selected
    ? {
        success: selected.success,
        executedAt: selected.executedAt,
        durationMs: selected.durationMs,
        executionId: selected.executionId,
        data: selected.data,
        error: selected.error,
      }
    : lastResponse;

  const copyJson = React.useCallback(async () => {
    try {
      const json = JSON.stringify(shown, null, 2);
      await navigator.clipboard.writeText(json);
      toast({ title: "Copié", description: "JSON copié dans le presse-papiers" });
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de copier dans le presse-papiers",
        variant: "destructive",
      });
    }
  }, [shown, toast]);

  if (!showDebug) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>Debug</CardTitle>
            <CardDescription>
              {shown ? `executionId: ${shown.executionId}` : "Aucune exécution sélectionnée"}
            </CardDescription>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={copyJson}
            disabled={!shown}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copier JSON
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <pre className="max-h-[420px] overflow-auto text-xs leading-relaxed">
            {shown ? JSON.stringify(shown, null, 2) : "—"}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
