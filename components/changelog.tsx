"use client";

import * as React from "react";
import { History, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ChangeType = "feature" | "fix" | "improvement";

interface ChangelogEntry {
  version: string;
  date: string;
  type: ChangeType;
  title: string;
  description: string;
}

const changelogData: ChangelogEntry[] = [
  {
    version: "1.3.0",
    date: "16 Février 2026",
    type: "improvement",
    title: "Agent Judge assoupli",
    description: "Barème du Judge revu : les GO avec procédure exploitable sont désormais SEND par défaut (note 3-5). Les critères mineurs (ton, longueur) ne déclenchent plus de REVIEW.",
  },
  {
    version: "1.2.1",
    date: "16 Février 2026",
    type: "improvement",
    title: "Page de connexion",
    description: "Ajout d'un bouton œil pour afficher/masquer le mot de passe. Correction de la redirection après connexion réussie.",
  },
  {
    version: "1.2.0",
    date: "11 Février 2026",
    type: "fix",
    title: "Affichage des résultats",
    description: "Correction de l'affichage des données client, playbooks consultés et extraits pertinents. Les champs playbook_sections_checked et relevant_passages sont désormais préservés lors de la normalisation API.",
  },
  {
    version: "1.1.0",
    date: "14 Janvier 2026",
    type: "feature",
    title: "Documentation SC Playbook",
    description: "Ajout d'une section dédiée affichant les prompts et la documentation directement depuis le repository GitHub SC_playbook.",
  },
  {
    version: "1.0.1",
    date: "10 Janvier 2026",
    type: "improvement",
    title: "Interface Utilisateur",
    description: "Amélioration de la réactivité du tableau de bord et optimisation des composants UI.",
  },
  {
    version: "1.0.0",
    date: "01 Janvier 2026",
    type: "feature",
    title: "Lancement Initial",
    description: "Première version du playground n8n avec support des workflows de génération de mails Alltricks.",
  }
];

const typeStyles: Record<ChangeType, { label: string, color: string, icon: React.ReactNode }> = {
  feature: {
    label: "Nouveauté",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: <CheckCircle2 className="h-3 w-3" />
  },
  fix: {
    label: "Correctif",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: <AlertCircle className="h-3 w-3" />
  },
  improvement: {
    label: "Amélioration",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    icon: <Circle className="h-3 w-3" />
  }
};

export function Changelog() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Changelog</CardTitle>
            <CardDescription>Dernières mises à jour de l'application</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {changelogData.map((entry, index) => (
            <div key={index} className="relative flex items-start gap-6 pl-10">
              <span className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-background ring-1 ring-border">
                {typeStyles[entry.type].icon}
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm leading-none">{entry.title}</h3>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-4 ${typeStyles[entry.type].color}`}>
                    {typeStyles[entry.type].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">{entry.version}</span>
                  <span>•</span>
                  <span>{entry.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
