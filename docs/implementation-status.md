# Implementation Status

> Synthetic evaluations only. Nothing below is overstated: "simulated" means the
> capability is demonstrated with fixtures, and "planned" means it is described
> but not built.

| Area                     | Status      | In this MVP                                                         | Production gap                                                      |
| ------------------------ | ----------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Test library & fixtures  | Implemented | Typed probe catalogue with severity, intent and expected behaviour. | Versioned corpora, per-tenant policy variants, provenance tracking. |
| Deterministic scoring    | Implemented | Pure weighted rubric, bands, pass rates, verdicts — unit tested.    | Inter-rater calibration and rubric-drift monitoring.                |
| Sensitive-data detection | Implemented | Shape-based detector with masked output and leakage scoring.        | Entity-aware detection, locale coverage, false-positive triage.     |
| Aggregation & reporting  | Implemented | Per-run and per-domain pass rates, mean scores, band distribution.  | Statistical significance, trendlines, release gates.                |
| Model execution          | Simulated   | All responses are stored fixtures.                                  | A harness behind a model broker with quotas, redaction and logging. |
| Human review workflow    | Simulated   | Review flags and reviewer notes surfaced with every score.          | Reviewer identity, dual sign-off, dispute handling, SLAs.           |
| Agent/tool harness       | Simulated   | Mock tools with recorded proposed calls.                            | Sandboxed execution, capability tokens, rate limits, rollback.      |
| Audit evidence           | Planned     | Append-only fabricated events with placeholder digests.             | Tamper-evident storage, retention policy, attested export.          |
| Continuous evaluation    | Planned     | Static runs compared side by side.                                  | Scheduled runs per release with CI regression gates.                |
| Access control           | Planned     | None — the demo is read-only and unauthenticated.                   | Role-based access, per-tenant isolation, audit of reads.            |

## Testing status

`src/lib/lab/scoring.test.ts` covers composite scoring (including severity
multipliers, clamping and determinism), every risk-band boundary, verdict and
review-routing rules, aggregation helpers (pass rate, mean, per-category,
per-band, empty sets), the fabricated sensitive-data detector (all five classes,
masking, overlaps, clean input, leakage scoring), rounding, and fixture integrity
(prompt labelling, response/probe mapping, exact re-score reproducibility).

## Deliberately not done

- Publishing and Git provider connection.
- Any backend, database, or credential storage.
- Any offensive or bypass-oriented content.
