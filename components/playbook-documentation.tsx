"use client";

import * as React from "react";
import { FileText, Loader2, RefreshCw, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type MarkdownFile = {
  name: string;
  path: string;
  size: number;
  url: string;
};

type FileContent = {
  name: string;
  path: string;
  content: string;
};

export function PlaybookDocumentation() {
  const { toast } = useToast();
  const [files, setFiles] = React.useState<MarkdownFile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadedContents, setLoadedContents] = React.useState<Map<string, string>>(new Map());
  const [loadingFiles, setLoadingFiles] = React.useState<Set<string>>(new Set());

  const fetchFiles = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/playbook-docs?path=Playbook");
      if (!res.ok) {
        throw new Error("Impossible de récupérer les fichiers");
      }
      const data = await res.json();
      setFiles(data.files || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les fichiers du playbook",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const loadFileContent = React.useCallback(
    async (filePath: string) => {
      if (loadedContents.has(filePath)) return;

      setLoadingFiles((prev) => new Set(prev).add(filePath));

      try {
        const res = await fetch(`/api/playbook-docs?file=${encodeURIComponent(filePath)}`);
        if (!res.ok) {
          throw new Error("Impossible de charger le fichier");
        }
        const data: FileContent = await res.json();
        setLoadedContents((prev) => new Map(prev).set(filePath, data.content));
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger le contenu du fichier",
          variant: "destructive",
        });
      } finally {
        setLoadingFiles((prev) => {
          const next = new Set(prev);
          next.delete(filePath);
          return next;
        });
      }
    },
    [loadedContents, toast]
  );

  const handleAccordionChange = React.useCallback(
    (value: string) => {
      if (value && !loadedContents.has(value)) {
        loadFileContent(value);
      }
    },
    [loadedContents, loadFileContent]
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Playbooks GitHub</CardTitle>
          <CardDescription>Guides disponibles dans le dossier Playbook</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>Playbooks GitHub</CardTitle>
            <CardDescription>
              Guides et procédures depuis{" "}
              <a
                href="https://github.com/bastien-at/SC_playbook/tree/main/Playbook"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                SC_playbook/Playbook
                <ExternalLink className="h-3 w-3" />
              </a>
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={fetchFiles}
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {files.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun fichier markdown trouvé</p>
        ) : (
          <Accordion type="single" collapsible onValueChange={handleAccordionChange}>
            {files.map((file) => {
              const isLoading = loadingFiles.has(file.path);
              const content = loadedContents.get(file.path);

              return (
                <AccordionItem key={file.path} value={file.path}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round(file.size / 1024)}kb)
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : content ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Impossible de charger le contenu
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
