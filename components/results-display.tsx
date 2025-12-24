"use client";

import * as React from "react";
import { Copy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useWorkflow } from "@/components/workflow-provider";

function asRecord(v: unknown): Record<string, unknown> | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  return v as Record<string, unknown>;
}

function getString(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

export function ResultsDisplay() {
  const { toast } = useToast();
  const { selected, lastResponse, showDebug, setShowDebug } = useWorkflow();

  const [reportOpen, setReportOpen] = React.useState(false);
  const [reportComment, setReportComment] = React.useState("");
  const [reportSubmitting, setReportSubmitting] = React.useState(false);
  const [reportError, setReportError] = React.useState<string | null>(null);

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

  const submitReport = React.useCallback(async () => {
    const comment = reportComment.trim();
    if (!comment) {
      setReportError("Ajoute un commentaire pour décrire le problème.");
      return;
    }
    if (comment.length > 2000) {
      setReportError("Le commentaire est trop long (2000 caractères max). ");
      return;
    }
    if (!shown) return;

    setReportSubmitting(true);
    try {
      const res = await fetch("/api/report-problem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          comment,
          executionId: (shown as any).executionId,
          success: (shown as any).success,
          executedAt: (shown as any).executedAt,
          payload: shown,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        toast({
          title: "Report échoué",
          description: data?.error?.message || "Impossible d'envoyer le report.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Report envoyé",
        description: "Le problème a été enregistré dans Airtable.",
      });
      setReportComment("");
      setReportError(null);
      setReportOpen(false);
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible d'appeler l'API de report.",
        variant: "destructive",
      });
    } finally {
      setReportSubmitting(false);
    }
  }, [reportComment, shown, toast]);

  const extracted = React.useMemo(() => {
    if (!shown?.success) return null;
    const data = asRecord((shown as any)?.data);
    if (!data) return null;

    const client = asRecord(data.client);
    const response = asRecord(data.response);
    const gemini = response ? asRecord(response.gemini) : null;

    return {
      motifIa: getString(data.motif_ia),
      clientFirstname: client ? getString(client.firstname) : null,
      clientLastname: client ? getString(client.lastname) : null,
      clientMessage: client ? getString(client.message) : null,
      geminiStatus: gemini ? getString(gemini.status) : null,
      geminiResponse: gemini ? getString(gemini.response) : null,
      geminiKoReason: gemini ? getString(gemini.ko_reason) : null,
    };
  }, [shown]);

  const statusBadgeVariant = extracted?.geminiStatus === "GO"
    ? "success"
    : extracted?.geminiStatus
      ? "destructive"
      : "default";

  const copyGeminiResponse = React.useCallback(async () => {
    const text = extracted?.geminiResponse;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copié", description: "Réponse copiée dans le presse-papiers" });
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de copier dans le presse-papiers",
        variant: "destructive",
      });
    }
  }, [extracted?.geminiResponse, toast]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>Résultats</CardTitle>
            <CardDescription>
              {shown
                ? `executionId: ${shown.executionId}`
                : "Aucune exécution sélectionnée"}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {shown ? (
              <Badge variant={shown.success ? "success" : "destructive"}>
                {shown.success ? "success" : "error"}
              </Badge>
            ) : null}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowDebug(!showDebug)}
              disabled={!shown}
            >
              {showDebug ? "Masquer debug" : "Voir debug"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {shown ? (
          <div className="text-sm text-muted-foreground">
            <p>Exécuté: {new Date(shown.executedAt).toLocaleString()}</p>
            <p>Durée: {shown.durationMs}ms</p>
            {!shown.success && shown.error ? (
              <p className="text-destructive">{shown.error.message}</p>
            ) : null}
          </div>
        ) : null}

        {shown?.success && extracted ? (
          <div className="space-y-3">
            <div className="rounded-md border border-border p-3">
              <p className="text-sm font-medium">Client</p>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>
                  {(extracted.clientFirstname || "—")}{" "}
                  {(extracted.clientLastname || "")}
                </p>
                <p className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-2 text-foreground">
                  {extracted.clientMessage || "—"}
                </p>
              </div>
            </div>

            <div className="rounded-md border border-border p-3">
              <p className="text-sm font-medium">Motif IA</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                {extracted.motifIa || "—"}
              </p>
            </div>

            <div className="rounded-md border border-border p-3">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium">Réponse (Gemini)</p>
                <div className="flex items-center gap-2">
                  {extracted.geminiStatus ? (
                    <Badge variant={statusBadgeVariant as any}>
                      {extracted.geminiStatus}
                    </Badge>
                  ) : null}
                  {extracted.geminiResponse ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={copyGeminiResponse}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copier
                    </Button>
                  ) : null}
                </div>
              </div>

              {extracted.geminiKoReason ? (
                <p className="mt-2 text-sm text-destructive">
                  {extracted.geminiKoReason}
                </p>
              ) : null}

              <p className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-2 text-sm text-foreground">
                {extracted.geminiResponse || "—"}
              </p>
            </div>
          </div>
        ) : null}

        {reportOpen ? (
          <div className="rounded-md border border-border p-3">
            <p className="text-sm font-medium">Signaler un problème</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Décris le problème observé. Le JSON d'exécution sera attaché au report.
            </p>
            <div className="mt-3 space-y-2">
              <div className="space-y-2">
                <Label htmlFor="reportComment">Commentaire</Label>
                <Textarea
                  id="reportComment"
                  rows={4}
                  placeholder="Ex: la réponse Gemini est incohérente / motif incorrect / etc."
                  value={reportComment}
                  onChange={(e) => {
                    const next = e.target.value;
                    setReportComment(next);
                    if (reportError) {
                      const trimmed = next.trim();
                      if (trimmed && trimmed.length <= 2000) setReportError(null);
                    }
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  2000 caractères max.
                </p>
                {reportError ? (
                  <p className="text-sm text-destructive">{reportError}</p>
                ) : null}
              </div>
              <Button
                type="button"
                className="w-full"
                onClick={submitReport}
                disabled={reportSubmitting || !shown}
              >
                {reportSubmitting ? "Envoi..." : "Envoyer le report"}
              </Button>
            </div>
          </div>
        ) : null}

        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setReportOpen((v) => !v)}
            disabled={!shown}
          >
            {reportOpen ? "Annuler" : "Report a problem"}
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
