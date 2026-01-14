"use client";

import * as React from "react";
import { FileText, Loader2, RefreshCw, ChevronRight, Book, Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type MarkdownFile = {
  name: string;
  path: string;
  size: number;
  url: string;
  source: "github" | "local";
};

export function PlaybooksInterface() {
  const { toast } = useToast();
  const [files, setFiles] = React.useState<MarkdownFile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedFile, setSelectedFile] = React.useState<MarkdownFile | null>(null);
  const [content, setContent] = React.useState<string | null>(null);
  const [contentLoading, setContentLoading] = React.useState(false);

  const fetchFiles = React.useCallback(async () => {
    setLoading(true);
    try {
      const [githubRes, localRes] = await Promise.all([
        fetch("/api/playbook-docs?path=Playbook"),
        fetch("/api/manual-playbooks")
      ]);

      let allFiles: MarkdownFile[] = [];

      if (githubRes.ok) {
        const githubData = await githubRes.json();
        allFiles = [
          ...allFiles,
          ...(githubData.files || []).map((f: any) => ({ ...f, source: "github" }))
        ];
      }

      if (localRes.ok) {
        const localData = await localRes.json();
        allFiles = [
          ...allFiles,
          ...(localData.files || []).map((f: any) => ({ ...f, source: "local" }))
        ];
      }

      setFiles(allFiles);
      if (allFiles.length > 0 && !selectedFile) {
        setSelectedFile(allFiles[0]);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger la liste des fichiers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast, selectedFile]);

  const loadFileContent = React.useCallback(async (file: MarkdownFile) => {
    setContentLoading(true);
    try {
      const url = file.source === "github" 
        ? `/api/playbook-docs?file=${encodeURIComponent(file.path)}`
        : `/api/manual-playbooks?file=${encodeURIComponent(file.path)}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erreur de chargement");
      const data = await res.json();
      setContent(data.content);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger le contenu",
        variant: "destructive",
      });
      setContent(null);
    } finally {
      setContentLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  React.useEffect(() => {
    if (selectedFile) {
      loadFileContent(selectedFile);
    }
  }, [selectedFile, loadFileContent]);

  if (loading) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[600px]">
      {/* Sidebar Menu */}
      <div className="w-full md:w-80 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Navigation
          </h2>
          <Button variant="ghost" size="icon" onClick={fetchFiles} disabled={loading} className="h-8 w-8">
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
        </div>
        
        <Card className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {files.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFile(file)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors group",
                  selectedFile?.path === file.path
                    ? "bg-[#005162] text-white"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {file.source === "github" ? (
                  <Globe className={cn("h-4 w-4", selectedFile?.path === file.path ? "text-white/80" : "text-muted-foreground")} />
                ) : (
                  <Book className={cn("h-4 w-4", selectedFile?.path === file.path ? "text-white/80" : "text-muted-foreground")} />
                )}
                <span className="flex-1 text-left truncate">{file.name}</span>
                <ChevronRight className={cn(
                  "h-4 w-4 opacity-0 transition-all group-hover:opacity-100",
                  selectedFile?.path === file.path && "opacity-100 translate-x-1"
                )} />
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Content Area */}
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b px-6 py-4 flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#005162]" />
            <div>
              <h3 className="font-semibold text-foreground">
                {selectedFile?.name || "Sélectionnez un fichier"}
              </h3>
              <p className="text-xs text-muted-foreground capitalize">
                Source: {selectedFile?.source || "—"}
              </p>
            </div>
          </div>
        </div>
        
        <CardContent className="flex-1 overflow-y-auto p-8">
          {contentLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : content ? (
            <div className="prose prose-sm max-w-none dark:prose-invert animate-in fade-in slide-in-from-bottom-2 duration-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground">Aucun contenu à afficher</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
