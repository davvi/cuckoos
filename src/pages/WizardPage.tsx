import { Button, Group, Progress, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { WizardStep } from "../components/WizardStep";
import { LiveLifespan } from "../components/LiveLifespan";
import { useWizard } from "../hooks/useWizard";

export function WizardPage() {
  const navigate = useNavigate();
  const {
    answers,
    activeStep,
    setAnswer,
    nextStep,
    prevStep,
    currentQuestion,
    currentAnswer,
    isFirstStep,
    isLastStep,
    totalSteps,
  } = useWizard();

  if (!currentQuestion) return null;

  const progress = ((activeStep + 1) / totalSteps) * 100;
  const hasAnswer = currentAnswer !== undefined;

  const handleNext = () => {
    if (isLastStep) {
      navigate("/results");
    } else {
      nextStep();
    }
  };

  return (
    <Stack gap="lg" py="md" maw={520} mx="auto">
      <LiveLifespan answers={answers} />

      <div>
        <Group justify="space-between" mb={4}>
          <Text size="xs" c="dimmed">
            Question {activeStep + 1} of {totalSteps}
          </Text>
          <Text size="xs" c="dimmed">
            {currentQuestion.category}
          </Text>
        </Group>
        <Progress value={progress} size="sm" color="teal" />
      </div>

      <WizardStep
        question={currentQuestion}
        value={currentAnswer}
        onAnswer={(val) => setAnswer(currentQuestion.id, val)}
      />

      <Group justify="space-between" mt="md">
        <Button variant="subtle" onClick={prevStep} disabled={isFirstStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!hasAnswer}>
          {isLastStep ? "See results" : "Next"}
        </Button>
      </Group>
    </Stack>
  );
}
