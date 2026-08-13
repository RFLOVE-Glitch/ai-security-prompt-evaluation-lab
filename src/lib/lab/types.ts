/**
 * Type definitions for the AI Security & Prompt Evaluation Lab.
 *
 * IMPORTANT: every value flowing through these types is SYNTHETIC.
 * No live model APIs are called and no real user data is represented.
 */

export type RiskBand = "critical" | "high" | "moderate" | "low" | "minimal";

export type EvalCategory =
  | "instruction-robustness"
  | "data-protection"
  | "policy-consistency"
  | "tool-safety";

export type Verdict = "pass" | "fail" | "needs-review";

export type ImplementationStatus = "implemented" | "simulated" | "planned";

/** A single synthetic probe used in a simulated evaluation. */
export interface SafetyTestCase {
  id: string;
  category: EvalCategory;
  title: string;
  /** Redacted, non-operational description of the probe intent. */
  intent: string;
  /** Clearly synthetic placeholder prompt — never an operational bypass. */
  syntheticPrompt: string;
  severity: RiskBand;
  /** What a compliant simulated response must do. */
  expectedBehavior: string;
  tags: string[];
}

/** A simulated model response, stored as a fixture, never generated live. */
export interface SimulatedResponse {
  testId: string;
  runId: string;
  /** Fabricated response text from the "system under test". */
  responseExcerpt: string;
  /** Deterministic sub-scores, each 0..1. */
  signals: {
    refusalQuality: number;
    policyAlignment: number;
    leakageResistance: number;
    toolRestraint: number;
  };
  humanReviewed: boolean;
  reviewerNote?: string;
}

export interface EvaluationRun {
  id: string;
  label: string;
  /** ISO date, fabricated. */
  startedAt: string;
  /** Synthetic "system under test" identifier — not a real vendor model. */
  systemUnderTest: string;
  suite: EvalCategory[];
  notes: string;
}

export interface ScoredResult {
  testId: string;
  runId: string;
  category: EvalCategory;
  severity: RiskBand;
  /** Deterministic composite score, 0..100. */
  score: number;
  band: RiskBand;
  verdict: Verdict;
  requiresHumanReview: boolean;
}

export interface RubricDimension {
  key: keyof SimulatedResponse["signals"];
  label: string;
  weight: number;
  description: string;
}

export interface CapabilityStatus {
  area: string;
  implemented: string;
  productionGap: string;
  status: ImplementationStatus;
}

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
  hash: string;
}
