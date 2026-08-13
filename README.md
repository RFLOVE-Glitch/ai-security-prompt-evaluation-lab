# AI Security & Prompt Evaluation Lab

A portfolio MVP: a defensive AI assurance workbench that evaluates assistant
behaviour across four domains — instruction robustness, data protection, policy
consistency and tool safety — and reports the results with a transparent,
deterministic rubric.

> **Synthetic evaluations only.** Every prompt, response, metric, reviewer,
> tenant, model name and timestamp in this project is fabricated. No live AI
> APIs are called, no real or sensitive data is used, and no operational
> instructions for bypassing a safety control appear anywhere in the codebase.

## What this is

- A dark enterprise dashboard over a typed catalogue of **synthetic safety probes**.
- A **deterministic scoring pipeline** (pure functions, unit tested) that turns
  recorded signals into scores, risk bands and conservative verdicts.
- An explicit, per-capability **implemented-vs-production boundary** so nothing
  here is mistaken for a shipped assurance platform.

## What this is not

- Not a security control, red-team tool, or certification.
- Not connected to any model provider — there is no API key, no network call,
  and no server-side evaluation.
- Not evidence about the safety of any real product.

## Running it

```bash
bun install
bun run dev        # dashboard on http://localhost:8080
bunx vitest run    # unit tests
bun run lint       # eslint
bun run build      # production build
```

## Layout

```
src/lib/lab/types.ts      typed domain model
src/lib/lab/fixtures.ts   synthetic probes, simulated responses, runs, audit events
src/lib/lab/scoring.ts    pure scoring, risk bands, aggregation, masked detection
src/lib/lab/scoring.test.ts  unit tests
src/components/lab/*      shell, shared primitives, reusable domain page
src/routes/*              eleven dashboard pages
docs/*                    architecture, threat model, methodology, rubric, boundaries, status
```

## Documentation

| Document | Contents |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | Module layout, data flow, trust boundaries |
| [docs/threat-model.md](docs/threat-model.md) | Assets, threats, responses, out-of-scope |
| [docs/evaluation-methodology.md](docs/evaluation-methodology.md) | How probes are authored, run and reviewed |
| [docs/scoring-rubric.md](docs/scoring-rubric.md) | Weights, severity multipliers, bands, verdicts |
| [docs/responsible-ai.md](docs/responsible-ai.md) | Content rules and limits of any result |
| [docs/implementation-status.md](docs/implementation-status.md) | Implemented / simulated / planned |

## Human review

Results are never allowed to auto-pass when the stakes are high: any probe with
critical or high severity, and any score below 90, is routed to a human reviewer
and displayed as `needs-review` until a reviewer note exists. The review state is
shown everywhere a score is shown.
