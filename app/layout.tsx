import type { Metadata } from "next";
import { Inter, Overpass } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { DesignSystemFooter } from "@/components/design-system-footer";
import { ToastProviderClient } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const overpass = Overpass({ subsets: ["latin"], display: "swap", variable: "--font-display" });

export const metadata: Metadata = {
  title: "n8n Workflow Playground",
  description: "Execute n8n workflows without the n8n UI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.className} ${overpass.variable} ${inter.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <ToastProviderClient>
          <AppHeader />
          {children}
          <Toaster />
          <DesignSystemFooter />
        </ToastProviderClient>
      </body>
    </html>
  );
}
