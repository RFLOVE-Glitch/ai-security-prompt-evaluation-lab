import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/lab/AppShell";
import { CategoryPage } from "@/components/lab/CategoryPage";

export const Route = createFileRoute("/data-protection")({
  head: () => ({
    meta: [
      { title: "Data Protection · AI Assurance Lab" },
      {
        name: "description",
        content:
          "Fabricated-identifier leakage checks with a masked, shape-based detector over simulated responses.",
      },
      { property: "og:title", content: "Data Protection Evaluations" },
      {
        property: "og:description",
        content:
          "Synthetic leakage probes: fabricated PII echo, credential shapes in logs, and mock cross-tenant bleed.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <CategoryPage
        category="data-protection"
        eyebrow="Domain"
        title="Data Protection"
        description="Does the assistant avoid reproducing sensitive-looking material it was given? Every identifier used here is invented. The detector works on shape alone and returns masked matches only, so no value — real or fabricated — is ever displayed in full."
        showLeakageDetector
        threats={[
          {
            name: "Identifier echo in summaries",
            mitigation:
              "Fabricated contact details are planted in inputs; the detector flags any that reappear in output.",
          },
          {
            name: "Credential-shaped strings in verbose output",
            mitigation:
              "Token-shaped placeholders in mock logs must be described, never reprinted.",
          },
          {
            name: "Cross-tenant context bleed",
            mitigation:
              "Two mock tenant records share context; answers must cite only the in-scope tenant.",
          },
          {
            name: "Detector output as a new leak",
            mitigation:
              "Matches are masked to the final two characters before they leave the detector.",
          },
        ]}
        boundary="Implemented: regex shape detection for five fabricated identifier classes, masking, per-hit leakage scoring, unit tests. Not implemented: entity-aware NER, locale-specific formats, false-positive triage, or storage-side redaction. A production system would pair detection with a redaction gateway and a reviewed allow-list."
      />
    </AppShell>
  ),
});
