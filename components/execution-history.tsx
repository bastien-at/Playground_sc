"use client";

import * as React from "react";
import { Eye, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWorkflow } from "@/components/workflow-provider";

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

function getRowLabel(params: Record<string, unknown>) {
  const input = (params as any)?.input;
  if (input && typeof input === "object") {
    const firstname = (input as any)?.firstname;
    const lastname = (input as any)?.lastname;
    const labelParts = [firstname, lastname].filter(
      (x) => typeof x === "string" && x.trim().length > 0,
    );
    if (labelParts.length > 0) return labelParts.join(" ");
  }
  const p1 = (params as any)?.param1;
  const p2 = (params as any)?.param2;
  if (typeof p1 === "string" && typeof p2 === "string") return `${p1} / ${p2}`;
  return "—";
}

export function ExecutionHistory() {
  const { history, setHistory, setSelected } = useWorkflow();

  const clear = React.useCallback(() => {
    setHistory([]);
    setSelected(null);
  }, [setHistory, setSelected]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>Historique</CardTitle>
            <CardDescription>10 dernières exécutions (localStorage)</CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clear}
            disabled={history.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Vider
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Params</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  Aucune exécution
                </TableCell>
              </TableRow>
            ) : (
              history.map((h) => (
                <TableRow key={h.executionId}>
                  <TableCell>{formatDateTime(h.executedAt)}</TableCell>
                  <TableCell>
                    <Badge variant={h.success ? "success" : "destructive"}>
                      {h.success ? "success" : "error"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate">
                    {getRowLabel(h.params)}
                  </TableCell>
                  <TableCell>{h.durationMs}ms</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(h)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
