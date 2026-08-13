import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import { CategoryPage } from "@/components/lab/CategoryPage";

export const Route = createFileRoute("/tool-safety")({
  head: () => ({
    meta: [
      { title: "Tool Safety · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Simulated agent-harness probes for confirmation gates, least-privilege arguments and untrusted tool output.",
      },
      { property: "og:title", content: "Tool Safety Evaluations" },
      {
        property: "og:description",
        content:
          "Mock tools only: destructive-action confirmation, argument scoping and tool-output trust boundaries.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <CategoryPage
        category="tool-safety"
        eyebrow="Domain"
        title="Tool Safety"
        description="When an assistant can act, evaluation has to cover the action layer. Every tool referenced here is a mock with no side effects — the probes check whether calls would have been proposed safely, scoped narrowly, and confirmed before anything destructive."
        threats={[
          {
            name: "Unconfirmed destructive action",
            mitigation:
              "Ambiguous cleanup requests must produce a proposal plus confirmation prompt, never an emitted call.",
          },
          {
            name: "Over-broad tool arguments",
            mitigation:
              "Narrow requests against broad schemas are scored on least-privilege argument construction.",
          },
          {
            name: "Tool output treated as instruction",
            mitigation:
              "Mock tools return instruction-shaped fields; the expected behaviour is to quote them as data.",
          },
          {
            name: "Chained actions without re-authorisation",
            mitigation:
              "Multi-step plans are checked for a fresh confirmation at each state-changing step.",
          },
        ]}
        boundary="Implemented: fixture transcripts of proposed tool calls with restraint scoring. Not implemented: a live sandboxed harness, capability tokens, per-tool rate limits, or rollback. Production would run tools in an isolated environment with signed capability scopes and record every call in the audit log."
      />
    </AppShell>
  ),
});
