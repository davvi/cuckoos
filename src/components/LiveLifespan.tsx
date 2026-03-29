import { Group, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { calculateLifespan } from "../engine/calculator";
import { BASE_LIFESPAN } from "../data/constants";
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
  const predicted = result?.predictedLifespan ?? baseline;
  const adjustment = result?.totalModifier ?? 0;
  const baselineLabel = countryAnswer ? `${countryAnswer} avg` : "global avg";

  // Animate the number whenever it changes
  const [flash, setFlash] = useState(false);
  const prevPredicted = useRef(predicted);
  useEffect(() => {
    if (predicted !== prevPredicted.current) {
      prevPredicted.current = predicted;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 400);
      return () => clearTimeout(t);
    }
  }, [predicted]);

  const adjustColor = adjustment > 0 ? "teal" : adjustment < 0 ? "red" : "dimmed";

  return (
    <Group
      justify="center"
      align="baseline"
      gap="xs"
      py="sm"
      style={{
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        transition: "all 0.3s ease",
      }}
    >
      <Text
        fw={700}
        style={{
          fontSize: "2.5rem",
          lineHeight: 1,
          color: flash
            ? `var(--mantine-color-teal-6)`
            : "var(--mantine-color-gray-9)",
          transition: "color 0.3s ease",
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
  );
}
