import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import {
  BandChip,
  Metric,
  PageHeader,
  Panel,
  ScoreBar,
  SectionTitle,
  SyntheticNotice,
  VerdictChip,
} from "@/components/lab/primitives";
import { capabilities, runs, scoredResults, tests } from "@/lib/lab/fixtures";
import { averageScore, countByBand, passRate, passRateByCategory } from "@/lib/lab/scoring";
import { StatusChip } from "@/components/lab/primitives";

const CATEGORY_LABEL: Record<string, string> = {
  "instruction-robustness": "Instruction robustness",
  "data-protection": "Data protection",
  "policy-consistency": "Policy consistency",
  "tool-safety": "Tool safety",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview · AI Security & Prompt Evaluation Lab" },
      {
        name: "description",
        content:
          "Defensive AI assurance dashboard using synthetic prompts, fabricated fixtures and deterministic scoring. Synthetic evaluations only.",
      },
      { property: "og:title", content: "AI Security & Prompt Evaluation Lab" },
      {
        property: "og:description",
        content:
          "Synthetic-only evaluation dashboard: instruction robustness, data protection, policy consistency and tool safety.",
      },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  const bands = countByBand(scoredResults);
  const byCategory = passRateByCategory(scoredResults);
  const reviewQueue = scoredResults.filter((r) => r.requiresHumanReview);

  return (
    <AppShell>
      <div className="grid-backdrop -mx-4 -mt-8 mb-2 px-4 pt-8 pb-2 sm:-mx-8 sm:px-8">
        <PageHeader
          eyebrow="Overview"
          title="AI Security & Prompt Evaluation Lab"
          description="A defensive assurance workbench for evaluating assistant behaviour before release. It measures instruction robustness, data protection, policy consistency and tool safety against a catalogue of synthetic probes, scores results with a transparent deterministic rubric, and routes anything uncertain to a human reviewer."
        />
      </div>

      <SyntheticNotice />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Synthetic probes" value={tests.length} hint="Across 4 assurance domains" />
        <Metric
          label="Overall pass rate"
          value={passRate(scoredResults)}
          unit="%"
          hint="Deterministic verdicts"
        />
        <Metric
          label="Mean score"
          value={averageScore(scoredResults)}
          hint="0–100 weighted rubric"
        />
        <Metric
          label="Human review queue"
          value={reviewQueue.length}
          hint="Blocked from auto-pass"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <SectionTitle title="Pass rate by domain" hint="Fabricated results" />
          <ul className="space-y-3">
            {Object.entries(byCategory).map(([category, rate]) => (
              <li key={category} className="flex items-center gap-3">
                <span className="w-44 shrink-0 text-sm">{CATEGORY_LABEL[category]}</span>
                <div className="h-2 grow overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.max(2, rate)}%` }}
                  />
                </div>
                <span className="w-14 text-right font-mono text-xs text-muted-foreground">
                  {rate}%
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <SectionTitle title="Risk band distribution" hint="Per scored result" />
          <ul className="space-y-2">
            {(["critical", "high", "moderate", "low", "minimal"] as const).map((band) => (
              <li key={band} className="flex items-center gap-3">
                <BandChip band={band} />
                <div className="h-2 grow overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full bg-${band}`}
                    style={{
                      width: `${(bands[band] / scoredResults.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-xs text-muted-foreground">
                  {bands[band]}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Bands come from fixed score cut-offs (40 / 60 / 75 / 90) documented on the Scoring page
            — no model judges a result.
          </p>
        </Panel>
      </div>

      <Panel>
        <SectionTitle
          title="Human review queue"
          hint="Critical and high-severity probes never auto-pass"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                <th className="py-2 pr-4 font-medium">Probe</th>
                <th className="py-2 pr-4 font-medium">Run</th>
                <th className="py-2 pr-4 font-medium">Severity</th>
                <th className="py-2 pr-4 font-medium">Score</th>
                <th className="py-2 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {reviewQueue.map((r) => (
                <tr key={`${r.runId}-${r.testId}`} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 font-mono text-xs">{r.testId}</td>
                  <td className="py-2.5 pr-4 font-mono text-xs text-muted-foreground">{r.runId}</td>
                  <td className="py-2.5 pr-4">
                    <BandChip band={r.severity} />
                  </td>
                  <td className="py-2.5 pr-4">
                    <ScoreBar score={r.score} />
                  </td>
                  <td className="py-2.5">
                    <VerdictChip verdict={r.verdict} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <SectionTitle title="Recent runs" hint="Static fixtures" />
          <ul className="space-y-3">
            {runs.map((run) => (
              <li key={run.id} className="rounded-md border border-border bg-surface p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{run.label}</p>
                  <span className="font-mono text-xs text-muted-foreground">{run.id}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {run.systemUnderTest} · {run.startedAt.slice(0, 10)}
                </p>
              </li>
            ))}
          </ul>
          <Link
            to="/runs"
            className="mt-4 inline-block text-xs font-medium text-primary hover:underline"
          >
            View all runs →
          </Link>
        </Panel>

        <Panel>
          <SectionTitle title="Implementation boundary" hint="What is real here" />
          <ul className="space-y-2.5">
            {capabilities.slice(0, 5).map((c) => (
              <li key={c.area} className="flex items-start justify-between gap-3">
                <span className="text-sm">{c.area}</span>
                <StatusChip status={c.status} />
              </li>
            ))}
          </ul>
          <Link
            to="/architecture"
            className="mt-4 inline-block text-xs font-medium text-primary hover:underline"
          >
            Architecture & threat model →
          </Link>
        </Panel>
      </div>
    </AppShell>
  );
}
