# Responsible-AI Boundaries

> Synthetic evaluations only. This project is a defensive assurance
> demonstration.

## Content rules

1. **Defensive framing only.** The library states what is being checked, never
   how to defeat a control. No jailbreak text, exploit payloads, or bypass
   instructions appear anywhere in the codebase, fixtures, or documentation.
2. **No real data.** Every identifier, tenant, reviewer, vendor, model name and
   timestamp is invented. Fabricated identifiers use reserved example domains and
   documentation/test number ranges.
3. **No live inference.** There is no model provider, API key, or network call.
   Every "response" is committed text.
4. **Masked reporting.** The sensitive-data detector returns masked matches only,
   so evaluation output cannot become a second copy of sensitive-looking data.
5. **Labelled everywhere.** A persistent "Synthetic evaluations only" banner sits
   above every page, and each page repeats the disclosure in context.

## Human oversight

Automation ranks and routes; people decide. Critical and high-severity probes can
never auto-pass, borderline scores are held for review, and the review state is
displayed wherever a score is displayed. Reviewer notes are treated as part of
the result, not as metadata.

Not implemented here: authenticated reviewer identity, dual sign-off, dispute
handling, and escalation SLAs. Those are production requirements, listed in
[implementation-status.md](implementation-status.md).

## Limits of any result shown

- A pass rate means fixtures agreed with a rubric on a given day.
- It is not a certification, a guarantee, or evidence about a real product.
- Absence of a finding is not evidence of safety; the corpus is small and
  deliberately illustrative.
- The detector will miss things and will produce false positives.

## If this were adapted for real use

Before pointing this at a real system, at minimum: pin and version the probe
corpus, run behind a model broker with quota and redaction, replace placeholder
digests with tamper-evident storage, add authenticated reviewers with dual
sign-off, and put a false-positive triage process behind the detector. Until all
of that exists, results should be treated as exploratory rather than assurance
evidence.
