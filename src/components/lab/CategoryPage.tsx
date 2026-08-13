import {
  BandChip,
  Chip,
  Metric,
  PageHeader,
  Panel,
  ScoreBar,
  SectionTitle,
  SyntheticNotice,
  VerdictChip,
} from "@/components/lab/primitives";
import { responses, scoredResults, tests } from "@/lib/lab/fixtures";
import { averageScore, detectFabricatedSensitiveData, passRate } from "@/lib/lab/scoring";
import type { EvalCategory } from "@/lib/lab/types";

export interface CategoryPageProps {
  category: EvalCategory;
  eyebrow: string;
  title: string;
  description: string;
  threats: { name: string; mitigation: string }[];
  boundary: string;
  showLeakageDetector?: boolean;
}

export function CategoryPage({
  category,
  eyebrow,
  title,
  description,
  threats,
  boundary,
  showLeakageDetector = false,
}: CategoryPageProps) {
  const categoryTests = tests.filter((t) => t.category === category);
  const results = scoredResults.filter((r) => r.category === category);
  const reviewCount = results.filter((r) => r.requiresHumanReview).length;

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <SyntheticNotice />

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Probes in domain" value={categoryTests.length} hint="Synthetic test cases" />
        <Metric
          label="Pass rate"
          value={passRate(results)}
          unit="%"
          hint="Deterministic verdicts"
        />
        <Metric label="Awaiting human review" value={reviewCount} hint="Blocked from auto-pass" />
      </div>

      <Panel>
        <SectionTitle
          title="Threats considered"
          hint="Defensive framing only — no bypass technique is described"
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {threats.map((threat) => (
            <li key={threat.name} className="rounded-md border border-border bg-surface p-3">
              <p className="text-sm font-medium">{threat.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {threat.mitigation}
              </p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <SectionTitle
          title="Probes & simulated outcomes"
          hint={`Average score ${averageScore(results)}`}
        />
        <div className="space-y-4">
          {categoryTests.map((test) => {
            const result = results.find((r) => r.testId === test.id);
            const response = responses.find((r) => r.testId === test.id);
            const leaks = response ? detectFabricatedSensitiveData(response.responseExcerpt) : [];
            return (
              <article key={test.id} className="rounded-md border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-primary">{test.id}</span>
                  <h3 className="text-sm font-semibold">{test.title}</h3>
                  <span className="grow" />
                  <BandChip band={test.severity} />
                  {result ? <VerdictChip verdict={result.verdict} /> : null}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{test.intent}</p>

                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  <div className="rounded border border-border/70 bg-background/40 p-3">
                    <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                      Synthetic prompt
                    </p>
                    <p className="mt-1 font-mono text-xs leading-relaxed">{test.syntheticPrompt}</p>
                  </div>
                  <div className="rounded border border-border/70 bg-background/40 p-3">
                    <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                      Simulated response excerpt
                    </p>
                    <p className="mt-1 font-mono text-xs leading-relaxed">
                      {response?.responseExcerpt ?? "No fixture recorded."}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {result ? <ScoreBar score={result.score} /> : null}
                  {response?.humanReviewed ? (
                    <Chip className="border-minimal/40 bg-minimal/12 text-minimal">
                      human reviewed
                    </Chip>
                  ) : (
                    <Chip className="border-moderate/40 bg-moderate/12 text-moderate">
                      review required
                    </Chip>
                  )}
                  {showLeakageDetector ? (
                    <Chip
                      className={
                        leaks.length
                          ? "border-critical/40 bg-critical/12 text-critical"
                          : "border-minimal/40 bg-minimal/12 text-minimal"
                      }
                    >
                      detector: {leaks.length} masked hit
                      {leaks.length === 1 ? "" : "s"}
                    </Chip>
                  ) : null}
                </div>

                {showLeakageDetector && leaks.length > 0 ? (
                  <p className="mt-2 font-mono text-xs text-critical">
                    {leaks.map((l) => `${l.kind}:${l.masked}`).join("  ·  ")}
                  </p>
                ) : null}

                <p className="mt-3 text-xs text-muted-foreground">
                  <span className="text-foreground">Expected:</span> {test.expectedBehavior}
                </p>
                {response?.reviewerNote ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className="text-foreground">Reviewer note:</span> {response.reviewerNote}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </Panel>

      <Panel>
        <SectionTitle title="Implemented vs. production" />
        <p className="text-sm leading-relaxed text-muted-foreground">{boundary}</p>
      </Panel>
    </>
  );
}
