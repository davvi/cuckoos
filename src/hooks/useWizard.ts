import { useState, useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";
import type { Answers } from "../engine/types";
import { questions } from "../data/questions";

const STORAGE_KEY_ANSWERS = "cuckoos-answers";
const STORAGE_KEY_STEP = "cuckoos-step";

export function useWizard() {
  const [answers, setAnswers] = useLocalStorage<Answers>({
    key: STORAGE_KEY_ANSWERS,
    defaultValue: {},
  });

  const [storedStep] = useLocalStorage<number>({
    key: STORAGE_KEY_STEP,
    defaultValue: 0,
  });

  const [activeStep, setActiveStep] = useState(storedStep);

  const setStep = useCallback(
    (step: number) => {
      setActiveStep(step);
      window.localStorage.setItem(STORAGE_KEY_STEP, JSON.stringify(step));
    },
    [],
  );

  const setAnswer = useCallback(
    (questionId: string, value: string | number) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    [setAnswers],
  );

  const nextStep = useCallback(() => {
    setStep(Math.min(activeStep + 1, questions.length - 1));
  }, [activeStep, setStep]);

  const prevStep = useCallback(() => {
    setStep(Math.max(activeStep - 1, 0));
  }, [activeStep, setStep]);

  const reset = useCallback(() => {
    setAnswers({});
    setStep(0);
  }, [setAnswers, setStep]);

  const currentQuestion = questions[activeStep] ?? null;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === questions.length - 1;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  return {
    answers,
    activeStep,
    setStep,
    setAnswer,
    nextStep,
    prevStep,
    reset,
    currentQuestion,
    currentAnswer,
    isFirstStep,
    isLastStep,
    totalSteps: questions.length,
  };
}
