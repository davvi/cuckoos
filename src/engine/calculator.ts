import { BASE_LIFESPAN } from "../data/constants";
import { questions } from "../data/questions";
import { suggestionMap } from "../data/suggestions";
import type { Answers, FactorBreakdown, LifespanResult, Suggestion } from "./types";

// Piecewise-linear interpolation for slider questions
const sliderCurves: Record<string, [number, number][]> = {
  // [minutes_per_week, modifier_in_years]
  exercise_minutes: [
    [0, -3],
    [75, -1],
    [150, 0],
    [300, 3],
    [450, 3.8],
    [600, 4],
  ],
};

function interpolate(points: [number, number][], x: number): number {
  if (points.length === 0) return 0;
  if (x <= points[0][0]) return points[0][1];
  if (x >= points[points.length - 1][0]) return points[points.length - 1][1];

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }

  return 0;
}

function getModifier(questionId: string, answer: string | number, type: string): number {
  if (type === "slider") {
    const curve = sliderCurves[questionId];
    if (curve) return interpolate(curve, answer as number);
    return 0;
  }

  const question = questions.find((q) => q.id === questionId);
  const option = question?.options?.find((o) => o.value === answer);
  return option?.modifier ?? 0;
}

function generateSuggestions(answers: Answers, factors: FactorBreakdown[]): Suggestion[] {
  const suggestions: Suggestion[] = [];

  for (const factor of factors) {
    if (factor.modifier >= 0) continue;

    const answerValue = answers[factor.questionId];
    const questionSuggestions = suggestionMap[factor.questionId];

    if (!questionSuggestions) continue;

    // Handle slider questions with special _low key
    if (typeof answerValue === "number") {
      if (answerValue < 150 && questionSuggestions._low) {
        const template = questionSuggestions._low;
        suggestions.push({
          questionId: factor.questionId,
          text: template.text,
          potentialGain: template.potentialGain,
          citations: template.citations,
        });
      }
      continue;
    }

    const template = questionSuggestions[answerValue as string];
    if (template) {
      suggestions.push({
        questionId: factor.questionId,
        text: template.text,
        potentialGain: template.potentialGain,
        citations: template.citations,
      });
    }
  }

  return suggestions.sort((a, b) => b.potentialGain - a.potentialGain);
}

export function calculateLifespan(answers: Answers): LifespanResult {
  const factors: FactorBreakdown[] = [];
  let totalModifier = 0;

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;

    const modifier = getModifier(q.id, answer, q.type);
    totalModifier += modifier;

    const displayLabel =
      q.type === "slider"
        ? `${answer} ${q.range?.unit ?? ""}`
        : (q.options?.find((o) => o.value === answer)?.label ?? String(answer));

    factors.push({
      questionId: q.id,
      category: q.category,
      label: displayLabel,
      modifier: Math.round(modifier * 10) / 10,
      citations: q.citations,
    });
  }

  const suggestions = generateSuggestions(answers, factors);

  return {
    baseLifespan: BASE_LIFESPAN,
    totalModifier: Math.round(totalModifier * 10) / 10,
    predictedLifespan: Math.round((BASE_LIFESPAN + totalModifier) * 10) / 10,
    factors,
    suggestions,
  };
}
