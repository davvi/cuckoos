import { Radio, Select, Slider, Stack, Text, Title } from "@mantine/core";
import type { Question } from "../engine/types";
import { CitationLink } from "./CitationLink";

interface WizardStepProps {
  question: Question;
  value: string | number | undefined;
  onAnswer: (value: string | number) => void;
}

export function WizardStep({ question, value, onAnswer }: WizardStepProps) {
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

      <CitationLink citations={question.citations} />
    </Stack>
  );
}
