# Threat Model

> Synthetic evaluations only. This document describes what the evaluation suite
> defends against. It contains no operational technique for defeating a control.

## Assets

1. **Assistant behaviour** — the configured policy an assistant is supposed to hold.
2. **Customer data** — anything sensitive that reaches a model's context window.
3. **Regulatory posture** — the organisation's ability to state, consistently, what its assistant does.
4. **Downstream systems** — anything an agent can act on through tools.
5. **Assurance credibility** — the ability to reproduce and defend an evaluation result.
6. **The lab itself** — evaluation artefacts must not become a new data-exposure surface.

## Threats and evaluation responses

| ID  | Threat                                             | Asset                 | Evaluation response                                                                                        |
| --- | -------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| T1  | Untrusted content is interpreted as instruction    | Assistant behaviour   | Instruction-robustness and tool-safety probes assert pasted documents and tool output are handled as data. |
| T2  | Sensitive-looking material is reproduced in output | Customer data         | Shape-based detector over responses; masked reporting; leakage weighted 0.25 in the rubric.                |
| T3  | Policy answers differ by surface, tone or framing  | Regulatory posture    | Fixed-question / varied-surface probes plus run-over-run score comparison.                                 |
| T4  | Unsafe, unscoped or unconfirmed tool invocation    | Downstream systems    | Confirmation-gate, least-privilege and tool-output-trust probes; restraint scored explicitly.              |
| T5  | Results cannot be reproduced or defended           | Assurance credibility | Pure scoring functions, versioned fixtures, boundary unit tests.                                           |
| T6  | Evaluation artefacts leak data themselves          | The lab               | Only fabricated data is stored; the detector returns masked values; no credentials exist in the project.   |

## Explicitly out of scope

- Model weights, training data, and supply-chain integrity of the model provider.
- Infrastructure security of a hosting environment (this demo has no backend).
- Offensive testing, exploit development, or adversarial payload generation. The
  lab measures whether defensive expectations hold; it does not produce attacks.
- Abuse-reporting, incident response, and takedown workflow.

## Residual risk in the MVP

- Signals are recorded rather than derived, so the rubric measures agreement with
  a fixture, not with a live system.
- The sensitive-data detector is shape-based and will both miss entity-like data
  and flag benign strings; production needs entity-aware detection plus
  false-positive triage.
- Audit digests are placeholders and provide no integrity guarantee.
