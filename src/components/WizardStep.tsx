import { Radio, Select, Slider, Stack, Text, Title } from "@mantine/core";
import type { Question, RiskEffect, RiskRange } from "../engine/types";
import { CitationLink } from "./CitationLink";
import { QuestionInsights } from "./QuestionInsights";

// ── Risk display ─────────────────────────────────────────────────────────────

function RiskEffectsList({ risks }: { risks: RiskEffect[] }) {
  if (risks.length === 0) return null;
  return (
    <Stack gap={4}>
      {risks.map((risk, i) => (
        <Text
          key={i}
          size="xs"
          c={risk.direction === "increases" ? "red.6" : "teal.7"}
          style={{ display: "flex", alignItems: "baseline", gap: 4 }}
        >
          <span style={{ fontWeight: 600 }}>
            {risk.direction === "increases" ? "↑" : "↓"} {risk.condition}
          </span>
          <span style={{ color: "var(--mantine-color-dimmed)" }}>
            — {risk.magnitude}
          </span>
        </Text>
      ))}
    </Stack>
  );
}

function getSliderRisks(riskRanges: RiskRange[], value: number): RiskEffect[] {
  for (const range of riskRanges) {
    if (value <= range.upTo) return range.risks;
  }
  return riskRanges[riskRanges.length - 1]?.risks ?? [];
}

// ── WizardStep ────────────────────────────────────────────────────────────────

interface WizardStepProps {
  question: Question;
  value: string | number | undefined;
  onAnswer: (value: string | number) => void;
}

export function WizardStep({ question, value, onAnswer }: WizardStepProps) {
  // Compute which risks to show for the current answer
  const activeRisks: RiskEffect[] = (() => {
    if (question.type === "slider" && question.riskRanges && typeof value === "number") {
      return getSliderRisks(question.riskRanges, value);
    }
    if (question.options && value !== undefined) {
      return question.options.find((o) => o.value === value)?.risks ?? [];
    }
    return [];
  })();

  return (
    <Stack gap="lg" py="md">
      <div>
        <Title order={3} fw={500}>
          {question.text}
        </Title>
        {question.description && (
          <Text size="sm" c="dimmed" mt={4}>
            {question.description}
          </Text>
        )}
      </div>

      {question.type === "radio" && question.options && (
        <Radio.Group
          value={value as string | undefined}
          onChange={(val) => onAnswer(val)}
        >
          <Stack gap="sm">
            {question.options.map((opt) => (
              <Radio key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Stack>
        </Radio.Group>
      )}

      {question.type === "select" && question.options && (
        <Select
          data={question.options.map((opt) => ({
            value: opt.value,
            label: opt.label,
          }))}
          value={value as string | undefined}
          onChange={(val) => val && onAnswer(val)}
          placeholder="Select an option"
          allowDeselect={false}
          searchable={question.options.length > 10}
        />
      )}

      {question.type === "slider" && question.range && (
        <div>
          <Text size="sm" fw={500} mb="xs">
            {typeof value === "number" ? value : question.range.min} {question.range.unit}
          </Text>
          <Slider
            min={question.range.min}
            max={question.range.max}
            step={question.range.step}
            value={typeof value === "number" ? value : question.range.min}
            onChange={(val) => onAnswer(val)}
            label={(val) => `${val} ${question.range!.unit}`}
            marks={[
              { value: question.range.min, label: `${question.range.min}` },
              { value: question.range.max, label: `${question.range.max}` },
            ]}
          />
        </div>
      )}

      <QuestionInsights questionId={question.id} value={value} />

      {/* Risk effects — shown as soon as an answer/value is present */}
      {activeRisks.length > 0 && (
        <div
          style={{
            borderLeft: "2px solid var(--mantine-color-gray-3)",
            paddingLeft: 12,
          }}
        >
          <Text size="xs" c="dimmed" mb={6} tt="uppercase" fw={600} style={{ letterSpacing: "0.05em" }}>
            Research findings
          </Text>
          <RiskEffectsList risks={activeRisks} />
        </div>
      )}

      <CitationLink citations={question.citations} />
    </Stack>
  );
}
