"use client";

import * as React from "react";
import { Book, Edit3, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function ManualPlaybooks() {
  const { toast } = useToast();
  const [content, setContent] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchContent = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/manual-playbooks");
      if (!res.ok) throw new Error("Impossible de charger les playbooks manuels");
      const data = await res.json();
      setContent(data.content);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le fichier manual-playbooks.md",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Mes Playbooks & Prompts</CardTitle>
            <CardDescription>Contenu personnalisé depuis manual-playbooks.md</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : content ? (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Edit3 className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Le fichier manual-playbooks.md est vide ou introuvable.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
