import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ImplementationStatus, RiskBand, Verdict } from "@/lib/lab/types";

const BAND_CLASS: Record<RiskBand, string> = {
  critical: "border-critical/40 bg-critical/12 text-critical",
  high: "border-high/40 bg-high/12 text-high",
  moderate: "border-moderate/40 bg-moderate/12 text-moderate",
  low: "border-low/40 bg-low/12 text-low",
  minimal: "border-minimal/40 bg-minimal/12 text-minimal",
};

const VERDICT_CLASS: Record<Verdict, string> = {
  pass: "border-minimal/40 bg-minimal/12 text-minimal",
  fail: "border-critical/40 bg-critical/12 text-critical",
  "needs-review": "border-moderate/40 bg-moderate/12 text-moderate",
};

const STATUS_CLASS: Record<ImplementationStatus, string> = {
  implemented: "border-minimal/40 bg-minimal/12 text-minimal",
  simulated: "border-primary/40 bg-primary/12 text-primary",
  planned: "border-border bg-muted text-muted-foreground",
};

export function Chip({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function BandChip({ band }: { band: RiskBand }) {
  return <Chip className={BAND_CLASS[band]}>{band}</Chip>;
}

export function VerdictChip({ verdict }: { verdict: Verdict }) {
  return <Chip className={VERDICT_CLASS[verdict]}>{verdict.replace("-", " ")}</Chip>;
}

export function StatusChip({ status }: { status: ImplementationStatus }) {
  return <Chip className={STATUS_CLASS[status]}>{status}</Chip>;
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("panel p-5", className)}>{children}</section>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="space-y-2">
      <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  );
}

export function SectionTitle({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="text-sm font-semibold tracking-[0.14em] uppercase">{title}</h2>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function Metric({
  label,
  value,
  unit,
  hint,
}: {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
}) {
  return (
    <Panel className="flex flex-col gap-1">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="font-mono text-3xl font-semibold text-foreground">
        {value}
        {unit ? (
          <span className="ml-1 text-base text-muted-foreground">{unit}</span>
        ) : null}
      </p>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </Panel>
  );
}

export function ScoreBar({ score }: { score: number }) {
  const band =
    score < 40
      ? "bg-critical"
      : score < 60
        ? "bg-high"
        : score < 75
          ? "bg-moderate"
          : score < 90
            ? "bg-low"
            : "bg-minimal";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", band)}
          style={{ width: `${Math.max(2, Math.min(100, score))}%` }}
        />
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        {score.toFixed(1)}
      </span>
    </div>
  );
}

export function SyntheticNotice({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "rounded-md border border-primary/30 bg-primary/8 px-3 py-2 text-xs text-muted-foreground",
        className,
      )}
    >
      <span className="font-semibold text-primary">Synthetic:</span> everything on
      this page is fabricated fixture data. No live model was called and no real
      personal data is present.
    </p>
  );
}

export function KeyValue({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-border/60 py-2.5 last:border-0 sm:grid-cols-[180px_1fr] sm:gap-4">
      <dt className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-foreground">{children}</dd>
    </div>
  );
}
