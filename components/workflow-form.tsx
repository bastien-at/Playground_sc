"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Play } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useWorkflow } from "@/components/workflow-provider";
import type { ExecuteWorkflowResponse, WorkflowExecutionRecord } from "@/lib/types";
import { sanitizeString } from "@/lib/utils";

const schema = z
  .object({
    firstname: z
      .string()
      .min(1, { message: "Entre un prénom." })
      .max(200, { message: "Le prénom est trop long (200 caractères max)." }),
    lastname: z
      .string()
      .min(1, { message: "Entre un nom." })
      .max(200, { message: "Le nom est trop long (200 caractères max)." }),
    message: z
      .string()
      .min(1, { message: "Écris un message." })
      .max(10_000, { message: "Le message est trop long (10 000 caractères max)." }),
  });

type FormValues = z.infer<typeof schema>;

export function WorkflowForm() {
  const { toast } = useToast();
  const { setLastResponse, history, setHistory, setSelected } = useWorkflow();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      message: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = React.useCallback(
    async (values: FormValues) => {
      const startedAt = Date.now();

      const payload: {
        input: { firstname: string; lastname: string; message: string };
      } = {
        input: {
          firstname: sanitizeString(values.firstname),
          lastname: sanitizeString(values.lastname),
          message: sanitizeString(values.message),
        },
      };

      try {
        const res = await fetch("/api/execute-workflow", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = (await res.json()) as ExecuteWorkflowResponse;
        setLastResponse(data);

        const record: WorkflowExecutionRecord = {
          executionId: data.executionId,
          executedAt: data.executedAt,
          durationMs: data.durationMs,
          params: {
            input: payload.input,
          },
          success: data.success,
          data: data.success ? data.data : undefined,
          error: data.success ? undefined : data.error,
        };

        const next = [record, ...history].slice(0, 10);
        setHistory(next);
        setSelected(record);

        toast({
          title: data.success ? "Exécution réussie" : "Exécution en échec",
          description: data.success
            ? `Durée: ${data.durationMs}ms`
            : data.error.message,
          variant: data.success ? "default" : "destructive",
        });

        const elapsed = Date.now() - startedAt;
        if (!data.success && res.status === 500 && elapsed < 1000) {
          // no-op
        }
      } catch {
        toast({
          title: "Erreur",
          description: "Impossible d’appeler l’API. Vérifie que le serveur Next tourne.",
          variant: "destructive",
        });
      }
    },
    [history, setHistory, setLastResponse, setSelected, toast],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exécuter le workflow</CardTitle>
        <CardDescription>
          Test unitaire: envoie 1 message client au workflow n8n.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">firstname</Label>
              <Input
                id="firstname"
                placeholder="Ex: Marie"
                {...form.register("firstname")}
              />
              <p className="text-sm text-muted-foreground">Prénom du client.</p>
              {form.formState.errors.firstname ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.firstname.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname">lastname</Label>
              <Input
                id="lastname"
                placeholder="Ex: Dupont"
                {...form.register("lastname")}
              />
              <p className="text-sm text-muted-foreground">Nom du client.</p>
              {form.formState.errors.lastname ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.lastname.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">message</Label>
            <Textarea
              id="message"
              rows={6}
              placeholder="Écris le message du client…"
              {...form.register("message")}
            />
            <p className="text-sm text-muted-foreground">
              Un message clair aide le workflow à produire une réponse cohérente.
            </p>
            {form.formState.errors.message ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.message.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Exécuter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
