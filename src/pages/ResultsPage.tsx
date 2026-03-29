import { Button, Card, Divider, Group, RingProgress, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import type { Answers } from "../engine/types";
import { calculateLifespan } from "../engine/calculator";
import { LifespanChart } from "../components/LifespanChart";
import { SuggestionCard } from "../components/SuggestionCard";
import { CountryProfile } from "../components/CountryProfile";
import { questions } from "../data/questions";

const proteinQuestionIds = ["plant_protein", "fish_intake", "poultry_intake", "red_meat"] as const;

function formatModifier(modifier: number): string {
  return `${modifier > 0 ? "+" : ""}${modifier.toFixed(1)} years`;
}

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
  const proteinSummary = proteinQuestionIds
    .map((questionId) => {
      const question = questions.find((item) => item.id === questionId);
      const answer = answers[questionId];

      if (!question || typeof answer !== "string") return null;

      const selectedOption = question.options?.find((option) => option.value === answer);
      if (!selectedOption) return null;

      return {
        id: question.id,
        text: question.text,
        answerLabel: selectedOption.label,
        modifier: selectedOption.modifier,
        risks: selectedOption.risks ?? [],
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

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

      {proteinSummary.length > 0 && (
        <>
          <Divider />
          <div>
            <Title order={3} fw={500} mb="sm">
              Protein intake summary
            </Title>
            <Text size="sm" c="dimmed" mb="md">
              Your protein-related answers combined in one place, with the selected frequency and why each source changes the estimate.
            </Text>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              {proteinSummary.map((item) => (
                <Card key={item.id} withBorder radius="lg" p="lg">
                  <Stack gap="sm">
                    <div>
                      <Text fw={600}>{item.text}</Text>
                      <Text size="sm" c="dimmed" mt={4}>
                        {item.answerLabel}
                      </Text>
                    </div>
                    <Text size="sm" fw={600} c={item.modifier >= 0 ? "teal" : "red"}>
                      {formatModifier(item.modifier)}
                    </Text>
                    {item.risks.length > 0 && (
                      <Stack gap={6}>
                        {item.risks.map((risk) => (
                          <Text key={`${item.id}-${risk.condition}`} size="sm" c="dimmed">
                            {risk.direction === "increases" ? "Higher" : "Lower"} {risk.condition}: {risk.magnitude}
                          </Text>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </div>
        </>
      )}

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
