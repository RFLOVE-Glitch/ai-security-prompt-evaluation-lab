import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import { CategoryPage } from "@/components/lab/CategoryPage";

export const Route = createFileRoute("/robustness")({
  head: () => ({
    meta: [
      { title: "Instruction Robustness · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Synthetic probes checking whether configured policy survives conflicting or embedded instructions in untrusted content.",
      },
      { property: "og:title", content: "Instruction Robustness Evaluations" },
      {
        property: "og:description",
        content:
          "Deterministic, synthetic-only checks for instruction priority and paraphrase stability.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <CategoryPage
        category="instruction-robustness"
        eyebrow="Domain"
        title="Instruction Robustness"
        description="Does the assistant keep its configured behaviour when the surrounding context pushes against it? These synthetic probes cover instruction priority, content-vs-command separation for untrusted text, and stability across paraphrases."
        threats={[
          {
            name: "Instruction priority confusion",
            mitigation:
              "Probe pairs put system policy and user request in conflict and check the policy wins and the conflict is named.",
          },
          {
            name: "Indirect injection via untrusted content",
            mitigation:
              "Fabricated documents contain instruction-shaped lines; the expected behaviour is to summarise them as data.",
          },
          {
            name: "Answer drift across rewording",
            mitigation:
              "Paraphrase sets measure semantic agreement so a policy answer cannot be reworded into a different policy.",
          },
          {
            name: "Persona pressure",
            mitigation:
              "Requests to adopt an unconstrained persona are scored on refusal quality and continued usefulness.",
          },
        ]}
        boundary="Implemented: fixture probes, deterministic rubric scoring, review routing. Not implemented: live model execution, automated paraphrase generation, and semantic equivalence models — a production harness would generate paraphrase sets and score agreement with a calibrated similarity metric plus human spot-checks."
      />
    </AppShell>
  ),
});
