import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import {
  BandChip,
  Chip,
  Metric,
  PageHeader,
  Panel,
  SectionTitle,
  SyntheticNotice,
} from "@/components/lab/primitives";
import { tests } from "@/lib/lab/fixtures";
import type { EvalCategory } from "@/lib/lab/types";

const GROUPS: { category: EvalCategory; label: string }[] = [
  { category: "instruction-robustness", label: "Instruction robustness" },
  { category: "data-protection", label: "Data protection" },
  { category: "policy-consistency", label: "Policy consistency" },
  { category: "tool-safety", label: "Tool safety" },
];

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Safety Test Library · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Typed catalogue of synthetic safety probes with intent, severity and expected behaviour — no operational bypass content.",
      },
      { property: "og:title", content: "Safety Test Library" },
      {
        property: "og:description",
        content:
          "Twelve fabricated probes across four assurance domains, described by intent rather than technique.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Library"
        title="Safety Test Library"
        description="The probe catalogue is typed data, not prose. Each entry records what the probe is checking, how severe a failure would be, and what a compliant response looks like. Prompts are placeholders that describe intent — they deliberately contain no working technique for defeating a safety control."
      />
      <SyntheticNotice />

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Probes" value={tests.length} hint="All synthetic" />
        <Metric label="Domains" value={GROUPS.length} hint="Assurance areas" />
        <Metric
          label="Critical severity"
          value={tests.filter((t) => t.severity === "critical").length}
          hint="Never auto-pass"
        />
      </div>

      <Panel>
        <SectionTitle title="Authoring rules" hint="Applied to every entry in this library" />
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li>
            · Prompts are labelled <span className="font-mono">[SYNTHETIC]</span> and describe
            intent only.
          </li>
          <li>· No real names, accounts, tenants, vendors, or credentials.</li>
          <li>· No operational instructions for bypassing a safety control.</li>
          <li>· Every probe states an expected compliant behaviour.</li>
          <li>· Severity drives review routing, not just presentation.</li>
          <li>· A unit test asserts the labelling rule holds for all entries.</li>
        </ul>
      </Panel>

      {GROUPS.map(({ category, label }) => (
        <Panel key={category}>
          <SectionTitle
            title={label}
            hint={`${tests.filter((t) => t.category === category).length} probes`}
          />
          <div className="space-y-3">
            {tests
              .filter((t) => t.category === category)
              .map((test) => (
                <article key={test.id} className="rounded-md border border-border bg-surface p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-primary">{test.id}</span>
                    <h3 className="text-sm font-semibold">{test.title}</h3>
                    <span className="grow" />
                    <BandChip band={test.severity} />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {test.intent}
                  </p>
                  <p className="mt-2 rounded border border-border/70 bg-background/40 p-2 font-mono text-xs">
                    {test.syntheticPrompt}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="text-foreground">Expected:</span> {test.expectedBehavior}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {test.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                </article>
              ))}
          </div>
        </Panel>
      ))}
    </AppShell>
  );
}
