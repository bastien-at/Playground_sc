"use client";

import * as React from "react";
import { Copy, Star } from "lucide-react";

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

function formatDateTime(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "medium",
      timeZone: "Europe/Paris",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function getString(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

function getNumber(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

export function ResultsDisplay() {
  const { toast } = useToast();
  const { selected, lastResponse } = useWorkflow();

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
    const data = (shown as any)?.data;
    if (!data) return null;

    // Handle array format (new payload) or single object format (old payload)
    const item = Array.isArray(data) ? asRecord(data[0]) : asRecord(data);
    if (!item) return null;

    // --- Format mapping ---
    // New payload: contact { nom, prenom, mail, message }
    // Old payload: client { firstname, lastname, mail, message }
    const contact = asRecord(item.contact) || asRecord(item.client);

    // Fallback: use form input params when API response has null/empty client data
    const inputParams = selected?.params?.input ? asRecord(selected.params.input) : null;
    
    // New payload: motif { categorie, sous_categorie, priorite, action_recommandee }
    // Old payload: motif_ia (string) + motif_details { sous_categorie, priorite, action_recommandee }
    const motif = asRecord(item.motif);
    const motifDetails = asRecord(item.motif_details);

    // New payload: reponse { agent, status, message, raw_response, ko_details, judge }
    // Old payload: response { gemini { agent, status, response, ko_reason, judge } }
    const reponse = asRecord(item.reponse);
    const responseLegacy = asRecord(item.response);
    const geminiLegacy = responseLegacy ? asRecord(responseLegacy.gemini) : null;

    // Judge info
    const judge = asRecord(reponse?.judge) || (geminiLegacy ? asRecord(geminiLegacy.judge) : null);
    const judgeFeedback = judge 
      ? (Array.isArray(judge.feedback) 
          ? judge.feedback.map(getString).filter((v): v is string => Boolean(v))
          : (getString(judge.commentaire) ? [getString(judge.commentaire)!] : null))
      : null;

    // playbook_sections_checked & relevant_passages may live directly on reponse
    // OR inside raw_response (a JSON string wrapped in ```json ... ```)
    // This applies to both new format (reponse.raw_response) and legacy format (geminiLegacy.response which may contain JSON)
    let parsedRaw: Record<string, unknown> | null = null;
    const rawResponseStr = reponse?.raw_response ?? geminiLegacy?.response;
    if (rawResponseStr && typeof rawResponseStr === "string") {
      try {
        const cleaned = (rawResponseStr as string)
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "")
          .trim();
        const parsed = JSON.parse(cleaned);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          parsedRaw = parsed as Record<string, unknown>;
        }
      } catch {
        parsedRaw = null;
      }
    }

    const playbookSections =
      (reponse ? (reponse.playbook_sections_checked ?? reponse.playbook_sections) : null)
      ?? (geminiLegacy ? (geminiLegacy.playbook_sections_checked ?? geminiLegacy.playbook_sections) : null)
      ?? (parsedRaw ? (parsedRaw.playbook_sections_checked ?? parsedRaw.playbook_sections) : null);
    const relevantPassages =
      (reponse ? reponse.relevant_passages : null)
      ?? (geminiLegacy ? geminiLegacy.relevant_passages : null)
      ?? (parsedRaw ? parsedRaw.relevant_passages : null);

    return {
      motifIa: motif ? getString(motif.categorie) : getString(item.motif_ia),
      motifSousCategorie: motif ? getString(motif.sous_categorie) : (motifDetails ? getString(motifDetails.sous_categorie) : null),
      motifPriorite: motif ? getString(motif.priorite) : (motifDetails ? getString(motifDetails.priorite) : null),
      motifAction: motif ? getString(motif.action_recommandee) : (motifDetails ? getString(motifDetails.action_recommandee) : null),
      motifLangue: motif ? getString(motif.langue) : (motifDetails ? getString(motifDetails.langue) : null),
      clientFirstname: (contact ? (getString(contact.prenom) || getString(contact.firstname)) : null) || (inputParams ? getString(inputParams.firstname) : null),
      clientLastname: (contact ? (getString(contact.nom) || getString(contact.lastname)) : null) || (inputParams ? getString(inputParams.lastname) : null),
      clientMessage: (contact ? getString(contact.message) : null) || (inputParams ? getString(inputParams.message) : null),
      clientMail: (contact ? getString(contact.mail) : null) || (inputParams ? getString(inputParams.mail) : null),
      geminiStatus: reponse
        ? getString(reponse.status)
        : geminiLegacy
          ? (() => {
              // In legacy format, geminiLegacy.status may contain the Judge decision (REVIEW/SEND/REJECT)
              // instead of the Agent Réponse status (GO/KO). Extract from debug array if available.
              if (Array.isArray(geminiLegacy.debug)) {
                const statusLine = geminiLegacy.debug
                  .map(getString)
                  .find((s) => s?.startsWith("Status:"));
                if (statusLine) return statusLine.replace("Status:", "").trim();
              }
              const raw = getString(geminiLegacy.status);
              // If the status looks like a Judge decision, don't use it as agent status
              if (raw === "REVIEW" || raw === "SEND" || raw === "REJECT") return null;
              return raw;
            })()
          : null,
      geminiResponse: reponse ? getString(reponse.message) : (geminiLegacy ? getString(geminiLegacy.response) : null),
      geminiKoReason: reponse ? getString((asRecord(reponse.ko_details))?.reason) : (geminiLegacy ? getString(geminiLegacy.ko_reason) : null),
      geminiAgent: reponse ? getString(reponse.agent) : (geminiLegacy ? getString(geminiLegacy.agent) : null),
      geminiDebug: reponse && Array.isArray(reponse.debug) 
        ? reponse.debug.map(getString).filter((v): v is string => Boolean(v))
        : (geminiLegacy && Array.isArray(geminiLegacy.debug) 
            ? geminiLegacy.debug.map(getString).filter((v): v is string => Boolean(v))
            : null),
      playbookSectionsChecked: Array.isArray(playbookSections)
        ? playbookSections.map(getString).filter((v): v is string => Boolean(v))
        : null,
      relevantPassages: Array.isArray(relevantPassages)
        ? relevantPassages.map(getString).filter((v): v is string => Boolean(v))
        : null,
      judgeDecision: judge ? getString(judge.decision) : null,
      judgeNote: judge ? getNumber(judge.note) : null,
      judgeFeedback,
    };
  }, [shown]);

  const statusBadgeVariant = extracted?.geminiStatus === "GO"
    ? "success"
    : extracted?.geminiStatus === "REVIEW"
      ? "tagOrange"
      : extracted?.geminiStatus
        ? "destructive"
        : "default";

  const judgeNoteLabel = extracted?.judgeNote !== null && extracted?.judgeNote !== undefined
    ? `${extracted.judgeNote}/5`
    : null;

  const judgeDecisionUpper = extracted?.judgeDecision?.toUpperCase?.()
    ? extracted.judgeDecision.toUpperCase()
    : null;
  const hasJudge = Boolean(judgeDecisionUpper) || judgeNoteLabel !== null;

  const inferredDecisionFromNote =
    judgeDecisionUpper
      ? null
      : extracted?.judgeNote !== null && extracted?.judgeNote !== undefined
        ? extracted.judgeNote >= 3
          ? "SEND"
          : extracted.judgeNote === 2
            ? "REVIEW"
            : "REJECT"
        : null;

  const judgeDecisionForColor = judgeDecisionUpper ?? inferredDecisionFromNote;
  const judgeVariant =
    judgeDecisionForColor === "SEND" || judgeDecisionForColor === "ACCEPT" || judgeDecisionForColor === "GO"
      ? ("tagBlue" as const)
      : judgeDecisionForColor === "REVIEW"
        ? ("tagOrange" as const)
        : judgeDecisionForColor === "REJECT" || judgeDecisionForColor === "KO"
          ? ("tagRed" as const)
          : ("tag" as const);
  const judgeHeaderLabel = judgeNoteLabel ?? judgeDecisionUpper;

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
              shown.success && extracted?.geminiStatus ? (
                <Badge variant={statusBadgeVariant as any}>
                  {extracted.geminiStatus}
                </Badge>
              ) : (
                <Badge variant={shown.success ? "success" : "destructive"}>
                  {shown.success ? "success" : "error"}
                </Badge>
              )
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {!shown ? (
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            Lance une exécution via le formulaire à gauche pour afficher les résultats ici.
          </div>
        ) : null}

        {shown ? (
          <div className="text-sm text-muted-foreground">
            <p>Exécuté: {formatDateTime(shown.executedAt)}</p>
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
                  {extracted.clientMail ? ` (${extracted.clientMail})` : ""}
                </p>
                <p className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-2 text-foreground">
                  {extracted.clientMessage || "—"}
                </p>
              </div>
            </div>

            <div className="rounded-md border border-border p-3">
              <p className="text-sm font-medium">Analyse Motif</p>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p><span className="font-medium">Catégorie :</span> {extracted.motifIa || "—"}</p>
                {extracted.motifSousCategorie ? (
                  <p><span className="font-medium">Sous-catégorie :</span> {extracted.motifSousCategorie}</p>
                ) : null}
                {extracted.motifPriorite ? (
                  <p><span className="font-medium">Priorité :</span> {extracted.motifPriorite}</p>
                ) : null}
                {extracted.motifLangue ? (
                  <p><span className="font-medium">Langue détectée :</span> {extracted.motifLangue.toUpperCase()}</p>
                ) : null}
                {extracted.motifAction ? (
                  <div className="mt-2 rounded-md bg-tagBlue/10 p-2 text-foreground">
                    <p className="font-medium text-tagBlue">Action recommandée :</p>
                    <p className="mt-1">{extracted.motifAction}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-md border border-border p-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Réponse</p>
                  {extracted.geminiAgent ? (
                    <p className="text-xs text-muted-foreground">{extracted.geminiAgent}</p>
                  ) : null}
                </div>
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

              {extracted.geminiKoReason && !(extracted.judgeFeedback?.length) ? (
                <p className="mt-2 text-sm text-destructive">
                  {extracted.geminiKoReason}
                </p>
              ) : null}

              <p className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-2 text-sm text-foreground">
                {extracted.geminiResponse || (extracted.geminiAgent ? extracted.geminiAgent : "—")}
              </p>

              {extracted.playbookSectionsChecked && extracted.playbookSectionsChecked.length > 0 ? (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Playbooks consultés
                  </p>
                  <div className="rounded-md border border-dashed border-border bg-muted/20 p-2 text-xs text-muted-foreground">
                    {extracted.playbookSectionsChecked.join(", ")}
                  </div>
                </div>
              ) : null}

              {extracted.relevantPassages && extracted.relevantPassages.length > 0 ? (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Extraits pertinents
                  </p>
                  <div className="rounded-md border border-dashed border-border bg-muted/20 p-2">
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                      {extracted.relevantPassages.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {extracted.geminiDebug && extracted.geminiDebug.length > 0 ? (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Debug Info</p>
                  <div className="rounded-md border border-dashed border-border bg-muted/20 p-2">
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
                      {extracted.geminiDebug.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>

            {extracted.judgeDecision || extracted.judgeNote !== null || extracted.judgeFeedback ? (
              <div className="rounded-md border border-border p-3">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium">Judge</p>
                  <div className="flex items-center gap-2">
                    {judgeDecisionForColor ? (
                      <Badge variant={judgeVariant}>
                        {judgeDecisionForColor}
                      </Badge>
                    ) : null}
                    {judgeNoteLabel ? (
                      <Badge variant="tag" className="gap-1">
                        <Star className="h-3 w-3" />
                        {judgeNoteLabel}
                      </Badge>
                    ) : null}
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {extracted.judgeFeedback && extracted.judgeFeedback.length ? (
                    <p className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-2 text-foreground">
                      {extracted.judgeFeedback.join("\n")}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
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
