import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Activity,
  BookOpen,
  FileCheck2,
  FlaskConical,
  Gauge,
  LayoutDashboard,
  Lock,
  Scale,
  ShieldAlert,
  Sigma,
  Wrench,
} from "lucide-react";

import { SYNTHETIC_DISCLOSURE } from "@/lib/lab/fixtures";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/runs", label: "Evaluation Runs", icon: Activity },
  { to: "/library", label: "Safety Test Library", icon: FlaskConical },
  { to: "/robustness", label: "Instruction Robustness", icon: ShieldAlert },
  { to: "/data-protection", label: "Data Protection", icon: Lock },
  { to: "/policy-consistency", label: "Policy Consistency", icon: Scale },
  { to: "/tool-safety", label: "Tool Safety", icon: Wrench },
  { to: "/scoring", label: "Scoring & Rubrics", icon: Sigma },
  { to: "/architecture", label: "Architecture & Threat Model", icon: Gauge },
  { to: "/audit", label: "Audit Evidence", icon: FileCheck2 },
  { to: "/docs", label: "Docs & Tests", icon: BookOpen },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 border-b border-primary/25 bg-primary/10 backdrop-blur">
        <p className="mx-auto max-w-[1600px] px-4 py-2 text-center text-xs font-medium tracking-wide text-primary sm:text-[13px]">
          {SYNTHETIC_DISCLOSURE}
        </p>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        <aside className="border-b border-border bg-sidebar lg:sticky lg:top-[41px] lg:h-[calc(100vh-41px)] lg:w-72 lg:shrink-0 lg:border-r lg:border-b-0">
          <div className="px-5 py-5">
            <Link to="/" className="block">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
                Assurance Lab
              </p>
              <p className="mt-1 text-base leading-tight font-semibold text-sidebar-foreground">
                AI Security &amp; Prompt Evaluation
              </p>
            </Link>
          </div>
          <nav className="flex flex-wrap gap-1 px-3 pb-4 lg:flex-col lg:flex-nowrap">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                activeProps={{
                  className:
                    "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                }}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-8">{children}</div>
          <footer className="mx-auto mt-16 max-w-6xl border-t border-border pt-5 text-xs text-muted-foreground">
            Portfolio MVP · defensive AI assurance demonstration · fabricated data
            throughout · not a security control and not a certification.
          </footer>
        </main>
      </div>
    </div>
  );
}
