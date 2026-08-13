import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import {
  KeyValue,
  PageHeader,
  Panel,
  SectionTitle,
  StatusChip,
  SyntheticNotice,
} from "@/components/lab/primitives";
import { capabilities } from "@/lib/lab/fixtures";

const THREATS = [
  {
    id: "T1",
    name: "Untrusted content becomes instruction",
    asset: "Assistant behaviour",
    mitigation:
      "Probes in the instruction-robustness and tool-safety domains assert that pasted documents and tool output are handled as data.",
  },
  {
    id: "T2",
    name: "Sensitive material reproduced in output",
    asset: "Customer data",
    mitigation:
      "Shape-based detector over responses; masked reporting; leakage weighted at 0.25 of the rubric.",
  },
  {
    id: "T3",
    name: "Inconsistent policy across surfaces",
    asset: "Regulatory posture",
    mitigation: "Fixed-question / varied-surface probes plus run-over-run score comparison.",
  },
  {
    id: "T4",
    name: "Unsafe or unscoped tool invocation",
    asset: "Downstream systems",
    mitigation: "Confirmation-gate and least-privilege probes; restraint scored explicitly.",
  },
  {
    id: "T5",
    name: "Evaluation results that cannot be reproduced",
    asset: "Assurance credibility",
    mitigation: "Pure scoring functions, versioned fixtures, unit tests covering boundaries.",
  },
  {
    id: "T6",
    name: "Evaluation artefacts become a data source themselves",
    asset: "The lab itself",
    mitigation:
      "Only fabricated data is stored; the detector returns masked values; no live API keys exist in this project.",
  },
];

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture & Threat Model · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Data flow, trust boundaries, threat model and an explicit implemented-versus-production capability table.",
      },
      { property: "og:title", content: "Architecture & Threat Model" },
      {
        property: "og:description",
        content:
          "How the synthetic evaluation lab is built, what it defends against, and where the demo stops.",
      },
    ],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Design"
        title="Architecture & Threat Model"
        description="The lab is deliberately small: typed fixtures in, pure functions in the middle, presentation out. There is no server-side evaluation, no model provider, and no persistence — which removes whole classes of risk from the demo and makes the boundary between demonstration and production explicit."
      />
      <SyntheticNotice />

      <Panel>
        <SectionTitle title="Data flow" hint="All in-process, all synthetic" />
        <pre className="overflow-x-auto rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed">
          {`  fixtures.ts                scoring.ts                 routes/*.tsx
┌───────────────┐        ┌──────────────────┐        ┌──────────────┐
│ SafetyTestCase│        │ scoreResponse()  │        │ Overview     │
│ SimulatedResp.│ ─────► │ riskBand()       │ ─────► │ Domain pages │
│ EvaluationRun │        │ verdictFor()     │        │ Audit / Docs │
│ AuditEvent    │        │ passRate()       │        └──────────────┘
└───────────────┘        │ detectFabricated │
                         │ SensitiveData()  │
   typed, versioned      └──────────────────┘        rendered read-only
                          pure + unit tested

Trust boundaries crossed: none. No network egress, no storage, no auth,
no model provider, no user-supplied input is executed or persisted.`}
        </pre>
      </Panel>

      <Panel>
        <SectionTitle title="Threat model" hint="Defensive posture only" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                <th className="py-2 pr-4 font-medium">ID</th>
                <th className="py-2 pr-4 font-medium">Threat</th>
                <th className="py-2 pr-4 font-medium">Asset</th>
                <th className="py-2 font-medium">Evaluation response</th>
              </tr>
            </thead>
            <tbody>
              {THREATS.map((t) => (
                <tr key={t.id} className="border-b border-border/50 align-top">
                  <td className="py-3 pr-4 font-mono text-xs text-primary">{t.id}</td>
                  <td className="py-3 pr-4">{t.name}</td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground">{t.asset}</td>
                  <td className="py-3 text-xs leading-relaxed text-muted-foreground">
                    {t.mitigation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel>
        <SectionTitle title="Implemented vs. production" hint="No capability is overstated" />
        <div className="space-y-3">
          {capabilities.map((c) => (
            <div key={c.area} className="rounded-md border border-border bg-surface p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">{c.area}</p>
                <StatusChip status={c.status} />
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                <span className="text-foreground">In this MVP:</span> {c.implemented}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                <span className="text-foreground">Production gap:</span> {c.productionGap}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <SectionTitle title="Responsible-AI boundaries" />
        <dl>
          <KeyValue label="Defensive only">
            The library describes what is being checked, never how to defeat a control. No jailbreak
            text, exploit payloads, or bypass instructions appear anywhere in this project.
          </KeyValue>
          <KeyValue label="No real data">
            Every identifier, tenant, reviewer, vendor and timestamp is invented. Fabricated
            identifiers use reserved example domains and test ranges.
          </KeyValue>
          <KeyValue label="No live inference">
            There is no model provider, API key, or network call. Responses are stored text.
          </KeyValue>
          <KeyValue label="Human in the loop">
            High-stakes results cannot auto-pass. The UI shows the review state wherever it shows a
            score.
          </KeyValue>
          <KeyValue label="Not a certification">
            A green pass rate here means fixtures agreed with a rubric. It is not evidence about any
            real product's safety.
          </KeyValue>
        </dl>
      </Panel>
    </AppShell>
  );
}
