"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, LayoutDashboard, LogOut, Terminal } from "lucide-react";

import { AlltricksLogo } from "@/components/alltricks-logo";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      // En cas d'erreur, on redirige quand même vers login
      router.push("/login");
    }
  };

  return (
    <header className="w-full bg-[#005162] text-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="rounded-[3px] hover:opacity-90 transition-opacity">
            <AlltricksLogo />
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/" 
                  ? "bg-white/10 text-white" 
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              href="/playbooks" 
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/playbooks" 
                  ? "bg-white/10 text-white" 
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Playbooks
            </Link>
            <Link 
              href="/prompts" 
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/prompts" 
                  ? "bg-white/10 text-white" 
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Terminal className="h-4 w-4" />
              Prompts
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}
