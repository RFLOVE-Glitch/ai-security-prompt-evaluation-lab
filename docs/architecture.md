# Architecture

> Synthetic evaluations only. No live AI APIs, no real data.

## Shape

The lab is a client-rendered TanStack Start application with no backend. Typed
fixtures flow into pure scoring functions, and the routes render the result.

```
  fixtures.ts                scoring.ts                 routes/*.tsx
┌───────────────┐        ┌──────────────────┐        ┌──────────────┐
│ SafetyTestCase│        │ scoreResponse()  │        │ Overview     │
│ SimulatedResp.│ ─────► │ riskBand()       │ ─────► │ Domain pages │
│ EvaluationRun │        │ verdictFor()     │        │ Audit / Docs │
│ AuditEvent    │        │ passRate()       │        └──────────────┘
└───────────────┘        │ detectFabricated │
                         │ SensitiveData()  │
   typed, versioned      └──────────────────┘        rendered read-only
                          pure + unit tested
```

## Modules

| Module                                | Responsibility                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `src/lib/lab/types.ts`                | Domain model: probes, simulated responses, runs, scored results, capability status, audit events. |
| `src/lib/lab/fixtures.ts`             | All synthetic data. The single place fabricated content lives.                                    |
| `src/lib/lab/scoring.ts`              | Pure functions only: no randomness, no clock reads, no I/O.                                       |
| `src/components/lab/primitives.tsx`   | Design-system chips, panels, metrics, score bars, disclosure notice.                              |
| `src/components/lab/CategoryPage.tsx` | Shared domain page (probes, outcomes, threats, boundary).                                         |
| `src/routes/*`                        | One route per dashboard section, each with its own head metadata.                                 |

## Trust boundaries

There are none crossed at runtime. The application performs no network egress,
holds no credentials, persists nothing, authenticates nobody, and never executes
user-supplied text. That is a deliberate property of a demo whose subject matter
is AI security: the artefact itself should not introduce risk.

A production version would add at least three boundaries — a model broker, an
evidence store, and an authenticated reviewer surface — and each would need its
own threat analysis. See [threat-model.md](threat-model.md).

## Determinism

Everything rendered is a function of committed fixtures. Rebuilding the project
at any time reproduces every score, band, verdict and pass rate exactly. This is
enforced by a unit test that re-scores every fixture and compares it against the
published results.

## Styling

A single dark enterprise design system lives in `src/styles.css` as oklch
semantic tokens (surfaces, primary teal, and five risk-band colours). Components
consume tokens only; no colour literals appear in component code.
