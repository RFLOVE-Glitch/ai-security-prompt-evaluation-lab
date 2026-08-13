import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import {
  Chip,
  KeyValue,
  PageHeader,
  Panel,
  SectionTitle,
  SyntheticNotice,
} from "@/components/lab/primitives";

const DOCS = [
  {
    path: "README.md",
    title: "Project overview",
    summary: "What the lab is, what it is not, how to run it, and the synthetic-only disclosure.",
  },
  {
    path: "docs/architecture.md",
    title: "Architecture",
    summary: "Module layout, data flow, and why the demo has no server component.",
  },
  {
    path: "docs/threat-model.md",
    title: "Threat model",
    summary: "Assets, threats, evaluation responses, and explicitly out-of-scope items.",
  },
  {
    path: "docs/evaluation-methodology.md",
    title: "Evaluation methodology",
    summary: "How probes are authored, run, aggregated, and re-reviewed.",
  },
  {
    path: "docs/scoring-rubric.md",
    title: "Scoring rubric",
    summary: "Weights, severity multipliers, band cut-offs, and verdict rules.",
  },
  {
    path: "docs/responsible-ai.md",
    title: "Responsible-AI boundaries",
    summary: "Defensive-only content rules and the limits of any result shown here.",
  },
  {
    path: "docs/implementation-status.md",
    title: "Implementation status",
    summary: "Per-capability implemented / simulated / planned breakdown.",
  },
];

const TEST_GROUPS = [
  {
    name: "scoreResponse",
    cases: [
      "perfect signals score 100 at moderate severity",
      "zeroed signals score 0",
      "critical and high severity apply 0.85 / 0.92 multipliers",
      "out-of-range and NaN signals are clamped",
      "repeated calls return identical values",
      "rubric weights are applied unequally",
    ],
  },
  {
    name: "riskBand",
    cases: ["all ten band boundaries (0, 39.9, 40, 59.9, 60, 74.9, 75, 89.9, 90, 100)"],
  },
  {
    name: "verdictFor / requiresHumanReview",
    cases: [
      "below-threshold scores fail",
      "borderline unreviewed results need review",
      "critical and high severity never auto-pass unreviewed",
      "review flag agrees with the verdict",
    ],
  },
  {
    name: "aggregations",
    cases: [
      "pass rate as a percentage of pass verdicts",
      "empty result sets return 0 rather than NaN",
      "mean score to one decimal",
      "pass rate per category",
      "count per risk band",
    ],
  },
  {
    name: "fabricated sensitive-data detection",
    cases: [
      "detects fabricated email, phone, card, SSN and key shapes",
      "never returns the raw matched value",
      "clean and empty text yield no matches",
      "overlapping matches are not double-counted",
      "masking reveals only the final two characters",
      "leakage score degrades 25 points per hit",
    ],
  },
  {
    name: "fixtures",
    cases: [
      "every simulated response maps to a known probe",
      "every prompt is labelled [SYNTHETIC]",
      "re-scoring fixtures reproduces the published results exactly",
      "the fabricated PII fixture is critical and failing",
    ],
  },
];

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs & Tests · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Documentation index and the unit-test suite covering scoring, risk bands, pass rates and fabricated sensitive-data detection.",
      },
      { property: "og:title", content: "Docs & Tests" },
      {
        property: "og:description",
        content: "Where the written methodology lives and exactly what the test suite asserts.",
      },
    ],
  }),
  component: DocsPage,
});

function DocsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Reference"
        title="Docs & Tests"
        description="The written material is part of the deliverable, not an afterthought: a reviewer should be able to read the methodology, check it against the rubric, and see the assertions that keep the implementation honest."
      />
      <SyntheticNotice />

      <Panel>
        <SectionTitle title="Documentation" hint="Markdown in the repository" />
        <ul className="space-y-2">
          {DOCS.map((doc) => (
            <li key={doc.path} className="rounded-md border border-border bg-surface px-3 py-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-primary">{doc.path}</span>
                <span className="text-sm font-medium">{doc.title}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{doc.summary}</p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <SectionTitle
          title="Unit test suite"
          hint="src/lib/lab/scoring.test.ts · run with bunx vitest run"
        />
        <div className="space-y-3">
          {TEST_GROUPS.map((group) => (
            <div key={group.name} className="rounded-md border border-border bg-surface p-3">
              <div className="flex items-center gap-2">
                <Chip className="border-primary/40 bg-primary/12 text-primary">describe</Chip>
                <span className="font-mono text-sm">{group.name}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {group.cases.map((c) => (
                  <li key={c} className="text-xs text-muted-foreground">
                    · {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <SectionTitle title="Local commands" />
        <pre className="overflow-x-auto rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed">
          {`bun install
bun run dev          # dashboard on :8080
bunx vitest run      # unit tests
bun run lint         # eslint
bun run build        # production build`}
        </pre>
      </Panel>

      <Panel>
        <SectionTitle title="Scope reminders" />
        <dl>
          <KeyValue label="Synthetic only">
            No live AI APIs, no real datasets, no operational bypass content.
          </KeyValue>
          <KeyValue label="Portfolio MVP">
            Built to demonstrate assurance engineering judgement, not to certify any system.
          </KeyValue>
          <KeyValue label="Not published">
            This build is intentionally unpublished and not connected to a Git provider.
          </KeyValue>
        </dl>
      </Panel>
    </AppShell>
  );
}
