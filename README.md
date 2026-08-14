# AI Security & Prompt Evaluation Lab

A recruiter-facing defensive AI assurance portfolio lab for evaluating assistant behavior across **instruction robustness, data protection, policy consistency, and tool safety** using synthetic probes, transparent deterministic scoring, and explicit human review.

> **Synthetic evaluations only.** Every prompt, response, metric, reviewer, tenant, model name, and timestamp in this project is fabricated. No live AI APIs are called, no real or sensitive data is used, and the repository does not contain operational instructions for bypassing safety controls.

## At a glance

- **12 synthetic probes** across 4 assurance domains
- Transparent **0–100 deterministic scoring** with documented risk bands
- Conservative verdict logic with explicit **human-review routing**
- Separate views for evaluation runs, safety tests, instruction robustness, data protection, policy consistency, tool safety, scoring, architecture, audit evidence, and docs/tests
- Architecture, threat-model, methodology, responsible-AI, scoring-rubric, and implementation-status documentation
- **27/27 automated tests passing**
- Production build verified successfully

## What this project demonstrates

### AI security assurance

The lab models a pre-release evaluation workflow for assistant behavior. Synthetic probes are grouped into four assurance domains:

- **Instruction robustness** — whether an assistant remains aligned when instructions conflict or become adversarial
- **Data protection** — whether simulated responses preserve sensitive-data boundaries
- **Policy consistency** — whether behavior remains consistent across equivalent scenarios
- **Tool safety** — whether tool-use decisions respect defined safety constraints

### Transparent scoring

Evaluation results are produced with deterministic, documented rules rather than opaque model-generated judgments. The scoring pipeline maps recorded signals into:

- Weighted scores
- Risk bands
- Pass/fail/needs-review verdicts
- Domain-level summaries
- Human-review queues

The scoring implementation is isolated in pure functions and covered by unit tests.

### Human oversight

The lab intentionally blocks automatic approval when review is warranted. High-stakes or uncertain results are routed to a human reviewer, and the interface makes review status visible wherever evaluation results appear.

### Threat modeling and responsible AI

The project documents trust boundaries, assets, threats, out-of-scope conditions, and responsible-AI constraints. It is designed to demonstrate assurance thinking without presenting the portfolio lab as a certification, production control, or evidence about any real AI system.

## Dashboard sections

| Section | Purpose |
| --- | --- |
| Overview | Assurance posture, pass rates, risk distribution, and review queue |
| Evaluation Runs | Synthetic run history and evaluation outcomes |
| Safety Test Library | Catalogue of fabricated probes and metadata |
| Instruction Robustness | Instruction-conflict and adversarial-behavior evaluation concepts |
| Data Protection | Synthetic privacy and sensitive-data protection checks |
| Policy Consistency | Cross-scenario policy consistency checks |
| Tool Safety | Simulated tool-use safety evaluation |
| Scoring & Rubrics | Transparent weights, thresholds, risk bands, and verdict logic |
| Architecture & Threat Model | System design, trust boundaries, threats, and mitigations |
| Audit Evidence | Synthetic evaluation/audit evidence and review records |
| Docs & Tests | Engineering documentation, implementation status, and test coverage |

## Engineering quality

The MVP includes typed synthetic fixtures, deterministic scoring logic, reusable dashboard components, documented security boundaries, and automated tests.

Verified during the build:

- `bunx vitest run` — **27/27 tests passed**
- `bun run lint` — **0 errors**; 6 pre-existing shadcn Fast Refresh warnings
- `bun run build` — **successful production build**

## Implementation boundary

### Implemented in this portfolio MVP

- Synthetic probe catalogue and simulated responses
- Deterministic scoring and risk-band logic
- Evaluation dashboards and review queue
- Human-review state and indicators
- Architecture and threat-model documentation
- Synthetic audit evidence
- Automated unit tests

### Production capabilities intentionally not implemented

A real assurance platform would require additional controls such as authenticated users, persistent storage, provider integrations, protected secrets, production-grade authorization, immutable audit storage, monitored evaluation infrastructure, and operational governance workflows.

This repository deliberately keeps those boundaries explicit.

## Repository layout

```text
src/lib/lab/types.ts          Typed domain model
src/lib/lab/fixtures.ts       Synthetic probes, simulated responses, runs, audit events
src/lib/lab/scoring.ts        Pure scoring, risk bands, aggregation, masked detection
src/lib/lab/scoring.test.ts   Unit tests
src/components/lab/*          Shell, shared primitives, reusable domain views
src/routes/*                  Dashboard routes
docs/*                        Architecture, threat model, methodology, rubric, boundaries
```

## Documentation

| Document | Contents |
| --- | --- |
| [Architecture](docs/architecture.md) | Module layout, data flow, and trust boundaries |
| [Threat Model](docs/threat-model.md) | Assets, threats, responses, and out-of-scope conditions |
| [Evaluation Methodology](docs/evaluation-methodology.md) | How synthetic probes are authored, evaluated, and reviewed |
| [Scoring Rubric](docs/scoring-rubric.md) | Weights, severity multipliers, bands, and verdicts |
| [Responsible AI](docs/responsible-ai.md) | Content rules, limitations, and human-accountability principles |
| [Implementation Status](docs/implementation-status.md) | Implemented, simulated, planned, and production-only capabilities |

## Run locally

```bash
bun install
bun run dev
bunx vitest run
bun run lint
bun run build
```

## Portfolio context

This project was created to demonstrate how AI assurance can be approached as a **security engineering and governance problem**: define the risks, create repeatable evaluations, make scoring explainable, preserve evidence, and keep humans accountable for consequential decisions.

**Portfolio:** https://rachellove.tech
