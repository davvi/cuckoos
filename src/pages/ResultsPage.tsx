import { Button, Divider, Group, RingProgress, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import type { Answers } from "../engine/types";
import { calculateLifespan } from "../engine/calculator";
import { LifespanChart } from "../components/LifespanChart";
import { SuggestionCard } from "../components/SuggestionCard";
import { CountryProfile } from "../components/CountryProfile";

function loadAnswers(): Answers {
  try {
    const raw = localStorage.getItem("cuckoos-answers");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function ResultsPage() {
  const navigate = useNavigate();
  const answers = useMemo(() => loadAnswers(), []);
  const result = useMemo(() => calculateLifespan(answers), [answers]);
  const hasAnswers = Object.keys(answers).length > 0;

  if (!hasAnswers) {
    navigate("/wizard", { replace: true });
    return null;
  }
  const countryName = answers.country as string | undefined;

  const ringPercent = Math.min(100, Math.max(0, (result.predictedLifespan / 100) * 100));
  const ringColor = result.totalModifier >= 0 ? "teal" : "red";

  const handleRetake = () => {
    window.localStorage.removeItem("cuckoos-answers");
    window.localStorage.removeItem("cuckoos-step");
    navigate("/wizard");
  };

  return (
    <Stack gap="xl" py="md">

      {/* ── Personal prediction ── */}
      <Stack align="center" gap="sm">
        <Title order={2} fw={500}>
          Your Predicted Lifespan
        </Title>

        <RingProgress
          size={180}
          thickness={14}
          roundCaps
          sections={[{ value: ringPercent, color: ringColor }]}
          label={
            <Text ta="center" fw={700} size="xl">
              {result.predictedLifespan}
              <Text size="xs" c="dimmed">
                years
              </Text>
            </Text>
          }
        />

        <Group gap="lg">
          <div style={{ textAlign: "center" }}>
            <Text size="xs" c="dimmed">
              {countryName ? `${countryName} avg` : "Global avg"}
            </Text>
            <Text fw={600}>{result.baseLifespan}</Text>
          </div>
          <div style={{ textAlign: "center" }}>
            <Text size="xs" c="dimmed">
              Healthy years est.
            </Text>
            <Text fw={600}>{result.predictedHealthyYears}</Text>
          </div>
          <div style={{ textAlign: "center" }}>
            <Text size="xs" c="dimmed">
              Your adjustment
            </Text>
            <Text fw={600} c={result.totalModifier >= 0 ? "teal" : "red"}>
              {result.totalModifier > 0 ? "+" : ""}
              {result.totalModifier} years
            </Text>
          </div>
        </Group>
      </Stack>

      <Divider />

      {/* ── WHO country profile ── */}
      {countryName && (
        <>
          <CountryProfile countryName={countryName} />
          <Divider />
        </>
      )}

      {/* ── Personal factor breakdown ── */}
      <div>
        <Title order={3} fw={500} mb="sm">
          Your factor breakdown
        </Title>
        <Text size="sm" c="dimmed" mb="md">
          How each of your answers adjusts from the {countryName ?? "global"} baseline.
        </Text>
        <LifespanChart factors={result.factors} />
      </div>

      {/* ── Suggestions ── */}
      {result.suggestions.length > 0 && (
        <>
          <Divider />
          <div>
            <Title order={3} fw={500} mb="sm">
              How to improve
            </Title>
            <Text size="sm" c="dimmed" mb="md">
              Based on your answers, here are the most impactful changes you could make:
            </Text>
            <Stack gap="sm">
              {result.suggestions.map((s) => (
                <SuggestionCard key={s.questionId} suggestion={s} />
              ))}
            </Stack>
          </div>
        </>
      )}

      <Group justify="center" mt="lg">
        <Button variant="subtle" onClick={handleRetake}>
          Retake assessment
        </Button>
      </Group>

      <Text size="xs" c="dimmed" ta="center">
        Data sourced from WHO Global Health Observatory. For educational purposes only — not medical advice.
      </Text>
    </Stack>
  );
}
