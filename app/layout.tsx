import type { Metadata } from "next";
import "./globals.css";
import { ToastProviderClient } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "n8n Workflow Playground",
  description: "Execute n8n workflows without the n8n UI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ToastProviderClient>
          {children}
          <Toaster />
        </ToastProviderClient>
      </body>
    </html>
  );
}
