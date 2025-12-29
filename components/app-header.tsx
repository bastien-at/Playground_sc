"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { AlltricksLogo } from "@/components/alltricks-logo";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const router = useRouter();

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
    <header className="w-full bg-[#005162]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <div className="w-[248px]" />

        <div className="rounded-[3px]">
          <AlltricksLogo />
        </div>

        <div className="w-[248px] flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLogout}
            className="text-white border-white hover:bg-white hover:text-[#005162]"
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}
