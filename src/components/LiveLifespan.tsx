import { Group, Text } from "@mantine/core";
import { calculateLifespan } from "../engine/calculator";
import { BASE_HEALTHY_YEARS, BASE_LIFESPAN } from "../data/constants";
import { countryData } from "../data/countries";
import type { Answers } from "../engine/types";

interface LiveLifespanProps {
  answers: Answers;
}

export function LiveLifespan({ answers }: LiveLifespanProps) {
  const hasAnyAnswer = Object.keys(answers).length > 0;
  const result = hasAnyAnswer ? calculateLifespan(answers) : null;
  const countryAnswer = answers.country as string | undefined;
  const baseline = countryAnswer
    ? (countryData[countryAnswer]?.lifespan ?? BASE_LIFESPAN)
    : BASE_LIFESPAN;
  const baselineHealthyYears = countryAnswer
    ? (countryData[countryAnswer]?.hale ?? BASE_HEALTHY_YEARS)
    : BASE_HEALTHY_YEARS;
  const predicted = result?.predictedLifespan ?? baseline;
  const predictedHealthyYears = result?.predictedHealthyYears ?? baselineHealthyYears;
  const adjustment = result?.totalModifier ?? 0;
  const baselineLabel = countryAnswer ? `${countryAnswer} avg` : "global avg";
  const adjustColor = adjustment > 0 ? "teal" : adjustment < 0 ? "red" : "dimmed";
  const healthyYearsAdjustment = predictedHealthyYears - baselineHealthyYears;
  const healthyYearsAdjustColor =
    healthyYearsAdjustment > 0 ? "teal" : healthyYearsAdjustment < 0 ? "red" : "dimmed";

  return (
    <Group
      justify="center"
      align="baseline"
      gap="xl"
      py="sm"
      style={{
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Predicted lifespan */}
      <Group align="baseline" gap="xs">
        <Text
          key={predicted}
          fw={700}
          style={{
            fontSize: "2.5rem",
            lineHeight: 1,
            color: "var(--mantine-color-gray-9)",
          }}
        >
          {predicted}
        </Text>
        <div>
          <Text size="sm" c="dimmed" lh={1.2}>
            years predicted
          </Text>
          {result && adjustment !== 0 && (
            <Text size="xs" c={adjustColor} lh={1.2}>
              {adjustment > 0 ? "+" : ""}
              {adjustment} vs {baselineLabel}
            </Text>
          )}
        </div>
      </Group>

      {/* Healthy years estimate */}
      {baselineHealthyYears !== undefined && (
        <Group align="baseline" gap="xs">
          <Text
            fw={700}
            style={{ fontSize: "2.5rem", lineHeight: 1, color: "var(--mantine-color-gray-5)" }}
          >
            {predictedHealthyYears}
          </Text>
          <div>
            <Text size="sm" c="dimmed" lh={1.2}>
              healthy years est.
            </Text>
            {result && (
              <Text size="xs" c={healthyYearsAdjustColor} lh={1.2}>
                {healthyYearsAdjustment > 0 ? "+" : ""}
                {healthyYearsAdjustment.toFixed(1)} vs {baselineLabel} HALE
              </Text>
            )}
          </div>
        </Group>
      )}
    </Group>
  );
}
