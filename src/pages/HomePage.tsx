import { Button, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Stack gap="xl" py="xl" align="center" maw={480} mx="auto">
      <div style={{ textAlign: "center" }}>
        <Title order={1} fw={700}>
          How long will you live?
        </Title>
        <Text size="lg" c="dimmed" mt="sm">
          Answer a few research-backed questions to get a personalized lifespan estimate — and
          learn what you can do to add more years.
        </Text>
      </div>

      <Button size="lg" onClick={() => navigate("/wizard")}>
        Start the assessment
      </Button>

      <Text size="xs" c="dimmed" ta="center">
        This is for educational purposes only and not medical advice. All estimates are based on
        population-level research and may not reflect individual outcomes.
      </Text>
    </Stack>
  );
}
