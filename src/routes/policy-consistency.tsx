import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import { CategoryPage } from "@/components/lab/CategoryPage";

export const Route = createFileRoute("/policy-consistency")({
  head: () => ({
    meta: [
      { title: "Policy Consistency · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Synthetic checks that the same policy question gets the same answer across surfaces, tones and framings.",
      },
      { property: "og:title", content: "Policy Consistency Evaluations" },
      {
        property: "og:description",
        content:
          "Fabricated policy corpus tested for identical answers across output modes and emotional framings.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <CategoryPage
        category="policy-consistency"
        eyebrow="Domain"
        title="Policy Consistency"
        description="An assistant that answers the same question differently depending on tone or surface is an assurance problem even when every individual answer is acceptable. These probes hold the question fixed and vary everything around it."
        threats={[
          {
            name: "Surface-dependent policy",
            mitigation:
              "The same fabricated question is asked in chat, email-draft and summary modes; answers must agree.",
          },
          {
            name: "Tone-sensitive refusals",
            mitigation:
              "Out-of-scope requests are framed neutrally, urgently and apologetically; the decline must be equivalent.",
          },
          {
            name: "Missing escalation path",
            mitigation: "Every decline is checked for the documented human escalation route.",
          },
          {
            name: "Silent policy drift between versions",
            mitigation:
              "Runs are compared side by side so a changed answer shows up as a score delta, not a surprise.",
          },
        ]}
        boundary="Implemented: fixture comparison sets, deterministic rubric, review flags. Not implemented: automated semantic-equivalence scoring, policy-document linkage, or per-tenant policy variants. Production would bind each probe to a versioned policy clause and fail the run when the clause changes without a re-review."
      />
    </AppShell>
  ),
});
