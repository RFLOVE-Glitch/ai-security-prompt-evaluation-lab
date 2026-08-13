import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import {
  BandChip,
  Chip,
  PageHeader,
  Panel,
  ScoreBar,
  SectionTitle,
  SyntheticNotice,
  VerdictChip,
} from "@/components/lab/primitives";
import { resultsForRun, runs } from "@/lib/lab/fixtures";
import { averageScore, passRate } from "@/lib/lab/scoring";

export const Route = createFileRoute("/runs")({
  head: () => ({
    meta: [
      { title: "Evaluation Runs · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Fabricated evaluation runs with deterministic pass rates, mean scores and per-probe verdicts.",
      },
      { property: "og:title", content: "Evaluation Runs" },
      {
        property: "og:description",
        content:
          "Three synthetic runs against mock systems under test, scored reproducibly.",
      },
    ],
  }),
  component: RunsPage,
});

function RunsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Runs"
        title="Evaluation Runs"
        description="Each run is a fixed set of synthetic probes executed against a mock system under test. Runs are stored as fixtures, so re-rendering this page always produces the same numbers — that reproducibility is the point of the deterministic rubric."
      />
      <SyntheticNotice />

      <div className="space-y-6">
        {runs.map((run) => {
          const results = resultsForRun(run.id);
          return (
            <Panel key={run.id}>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold">{run.label}</h2>
                <Chip>{run.id}</Chip>
                <Chip className="border-primary/40 bg-primary/12 text-primary">
                  {run.systemUnderTest}
                </Chip>
                <span className="grow" />
                <span className="font-mono text-xs text-muted-foreground">
                  {run.startedAt}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{run.notes}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <StatBox label="Probes" value={String(results.length)} />
                <StatBox label="Pass rate" value={`${passRate(results)}%`} />
                <StatBox label="Mean score" value={String(averageScore(results))} />
              </div>

              <SectionTitle title="Results" hint="Deterministic scoring" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                      <th className="py-2 pr-4 font-medium">Probe</th>
                      <th className="py-2 pr-4 font-medium">Domain</th>
                      <th className="py-2 pr-4 font-medium">Severity</th>
                      <th className="py-2 pr-4 font-medium">Score</th>
                      <th className="py-2 pr-4 font-medium">Band</th>
                      <th className="py-2 font-medium">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.testId} className="border-b border-border/50">
                        <td className="py-2.5 pr-4 font-mono text-xs">{r.testId}</td>
                        <td className="py-2.5 pr-4 text-xs text-muted-foreground">
                          {r.category}
                        </td>
                        <td className="py-2.5 pr-4">
                          <BandChip band={r.severity} />
                        </td>
                        <td className="py-2.5 pr-4">
                          <ScoreBar score={r.score} />
                        </td>
                        <td className="py-2.5 pr-4">
                          <BandChip band={r.band} />
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
          );
        })}
      </div>

      <Panel>
        <SectionTitle title="Implemented vs. production" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Implemented: run fixtures, per-run aggregation, verdict computation, review
          flags. Not implemented: scheduling, live execution, CI regression gates, or
          run-over-run diffing with statistical significance. A production harness
          would pin the probe corpus by version and fail a release when a domain pass
          rate drops below its agreed threshold.
        </p>
      </Panel>
    </AppShell>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2">
      <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="font-mono text-xl font-semibold">{value}</p>
    </div>
  );
}
