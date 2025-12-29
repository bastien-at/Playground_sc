"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Mail, Play } from "lucide-react";

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

  const firstnameHintId = React.useId();
  const lastnameHintId = React.useId();
  const messageHintId = React.useId();

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
        <CardTitle>Mailbot Générateur</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">Prénom</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="firstname"
                  placeholder="Ex: Marie"
                  className="pl-10 pr-10"
                  aria-describedby={firstnameHintId}
                  {...form.register("firstname")}
                />
              </div>
              <p id={firstnameHintId} className="text-sm text-muted-foreground">
                Prénom du client.
              </p>
              {form.formState.errors.firstname ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.firstname.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname">Nom</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="lastname"
                  placeholder="Ex: Dupont"
                  className="pl-10 pr-10"
                  aria-describedby={lastnameHintId}
                  {...form.register("lastname")}
                />
              </div>
              <p id={lastnameHintId} className="text-sm text-muted-foreground">
                Nom du client.
              </p>
              {form.formState.errors.lastname ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.lastname.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={6}
              placeholder="Écris le message du client…"
              aria-describedby={messageHintId}
              {...form.register("message")}
            />
           
            {form.formState.errors.message ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.message.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            variant="cta"
            size="cta"
            className="w-full text-md"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Play className="h-6 w-6" />
            )}
            Lancer le workflow 
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
