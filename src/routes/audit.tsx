import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import {
  Chip,
  KeyValue,
  Metric,
  PageHeader,
  Panel,
  SectionTitle,
  SyntheticNotice,
} from "@/components/lab/primitives";
import { auditEvents, responses, scoredResults } from "@/lib/lab/fixtures";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Evidence · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Fabricated append-only evaluation trail with placeholder digests, reviewer notes and export expectations.",
      },
      { property: "og:title", content: "Audit Evidence" },
      {
        property: "og:description",
        content: "What an assurance reviewer would need to reconstruct a synthetic evaluation run.",
      },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  const reviewed = responses.filter((r) => r.humanReviewed);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Evidence"
        title="Audit Evidence"
        description="Assurance work is only useful if someone else can reconstruct it. This page shows the shape of the evidence trail an external reviewer would ask for: what ran, what it scored, who reviewed it, and what changed afterwards. Digests here are placeholders — nothing is cryptographically anchored."
      />
      <SyntheticNotice />

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Recorded events" value={auditEvents.length} hint="Fabricated" />
        <Metric
          label="Reviewed results"
          value={`${reviewed.length}/${scoredResults.length}`}
          hint="With reviewer notes"
        />
        <Metric
          label="Open findings"
          value={scoredResults.filter((r) => r.verdict === "fail").length}
          hint="Failing verdicts"
        />
      </div>

      <Panel>
        <SectionTitle title="Event trail" hint="Append-only, oldest first" />
        <ol className="space-y-2">
          {auditEvents.map((e) => (
            <li key={e.id} className="rounded-md border border-border bg-surface px-3 py-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{e.at}</span>
                <Chip className="border-primary/40 bg-primary/12 text-primary">{e.action}</Chip>
                <Chip>{e.actor}</Chip>
              </div>
              <p className="mt-1.5 text-sm">{e.detail}</p>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">{e.hash}</p>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel>
        <SectionTitle title="Reviewer notes" hint="Attached to scored results" />
        <ul className="space-y-2">
          {reviewed.map((r) => (
            <li
              key={`${r.runId}-${r.testId}`}
              className="rounded-md border border-border bg-surface px-3 py-2.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-primary">{r.testId}</span>
                <span className="font-mono text-xs text-muted-foreground">{r.runId}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.reviewerNote}</p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <SectionTitle title="What a real evidence package needs" />
        <dl>
          <KeyValue label="Integrity">
            Tamper-evident storage with real digests over run inputs, fixtures and code version.
            Placeholders here.
          </KeyValue>
          <KeyValue label="Provenance">
            Probe corpus version, rubric version, and system-under-test build pinned per run.
          </KeyValue>
          <KeyValue label="Identity">
            Authenticated reviewer identity and dual sign-off on critical findings. Reviewers here
            are mock labels.
          </KeyValue>
          <KeyValue label="Retention & export">
            Defined retention window and an attested export format for external auditors. Not
            implemented.
          </KeyValue>
          <KeyValue label="Change history">
            Diffs when a rubric weight or band boundary moves, since that changes the meaning of
            every historical score.
          </KeyValue>
        </dl>
      </Panel>
    </AppShell>
  );
}
