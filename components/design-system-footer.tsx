import * as React from "react";
import Link from "next/link";
import { Terminal, BookOpen, LayoutDashboard } from "lucide-react";

import { AlltricksLogo } from "@/components/alltricks-logo";

export function DesignSystemFooter() {
  return (
    <footer className="mt-12 w-full bg-[#EFF1F3]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-16 lg:py-16">
        <div className="flex w-full flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-display text-xl font-semibold tracking-[0.32px] text-[#142129]">
                Clémentine powered by AI
              </p>
              <p className="font-display text-xl text-[#687787]">www.alltricks.com</p>
            </div>
            
            <nav className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Navigation</p>
              <div className="flex flex-col gap-2">
                <Link href="/" className="flex items-center gap-2 text-sm text-[#687787] hover:text-[#005162] transition-colors">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link href="/playbooks" className="flex items-center gap-2 text-sm text-[#687787] hover:text-[#005162] transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Playbooks
                </Link>
                <Link href="/prompts" className="flex items-center gap-2 text-sm text-[#687787] hover:text-[#005162] transition-colors font-medium">
                  <Terminal className="h-4 w-4" />
                  Prompts
                </Link>
              </div>
            </nav>
          </div>

          <div className="inline-flex items-center justify-center rounded-lg bg-[#005162] p-4">
            <AlltricksLogo />
          </div>
        </div>
      </div>
    </footer>
  );
}
