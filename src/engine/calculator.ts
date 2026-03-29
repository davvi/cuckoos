import { BASE_HEALTHY_YEARS, BASE_LIFESPAN } from "../data/constants";
import { countryData } from "../data/countries";
import { questions } from "../data/questions";
import { suggestionMap } from "../data/suggestions";
import type { Answers, FactorBreakdown, LifespanResult, Suggestion } from "./types";

// Piecewise-linear interpolation for slider questions
const sliderCurves: Record<string, [number, number][]> = {
  // [minutes_per_week, modifier_in_years]
  cardio_minutes: [
    [0, -3],
    [75, -1],
    [150, 0],
    [300, 3],
    [450, 3.8],
    [600, 4],
  ],
  // [days_per_week, modifier_in_years]
  // 2–3 days/week is optimal; daily may increase injury risk
  strength_days: [
    [0, -1],
    [1, 0],
    [2, 1.5],
    [3, 2],
    [5, 2.3],
    [7, 1.8],
  ],
  // [servings_per_day, modifier_in_years]
  // WHO recommends 5+ servings; benefit plateaus around 7-8
  vegetables_fruit: [
    [0, -2],
    [2, -0.5],
    [5, 0],
    [7, 1.5],
    [10, 2],
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

function roundToTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

function getSexModifier(countryName: string | undefined, answer: string): number | undefined {
  const country = countryName ? countryData[countryName] : undefined;
  if (!country) return undefined;

  if (answer === "male") return country.lifespanMale - country.lifespan;
  if (answer === "female") return country.lifespanFemale - country.lifespan;

  return undefined;
}

function getSexHealthyYearsModifier(countryName: string | undefined, answer: string): number | undefined {
  const country = countryName ? countryData[countryName] : undefined;
  if (!country || country.lifespan <= 0) return undefined;

  const sexLifespan =
    answer === "male" ? country.lifespanMale : answer === "female" ? country.lifespanFemale : undefined;

  if (sexLifespan === undefined) return undefined;

  const healthyYearsRatio = country.hale / country.lifespan;
  return sexLifespan * healthyYearsRatio - country.hale;
}

function getModifier(questionId: string, answer: string | number, type: string, answers: Answers): number {
  if (type === "slider") {
    const curve = sliderCurves[questionId];
    if (curve) return interpolate(curve, answer as number);
    return 0;
  }

  if (questionId === "sex" && typeof answer === "string") {
    const countryAnswer = answers.country as string | undefined;
    const sexModifier = getSexModifier(countryAnswer, answer);
    if (sexModifier !== undefined) return sexModifier;
  }

  const question = questions.find((q) => q.id === questionId);
  const option = question?.options?.find((o) => o.value === answer);
  return option?.modifier ?? 0;
}

function getHealthyYearsModifier(
  questionId: string,
  answer: string | number,
  answers: Answers,
  modifier: number,
): number {
  if (questionId === "sex" && typeof answer === "string") {
    const countryAnswer = answers.country as string | undefined;
    const sexHealthyModifier = getSexHealthyYearsModifier(countryAnswer, answer);
    if (sexHealthyModifier !== undefined) return sexHealthyModifier;
  }

  return modifier;
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
      const thresholds: Record<string, number> = {
        cardio_minutes: 150,
        strength_days: 2,
        vegetables_fruit: 5,
      };
      const threshold = thresholds[factor.questionId];
      if (threshold !== undefined && answerValue < threshold && questionSuggestions._low) {
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
  // Country sets the baseline; all other factors are modifiers on top of it
  const countryAnswer = answers.country as string | undefined;
  const country = countryAnswer ? countryData[countryAnswer] : undefined;
  const baseLifespan = country?.lifespan ?? BASE_LIFESPAN;
  const baseHealthyYears = country?.hale ?? BASE_HEALTHY_YEARS;

  const factors: FactorBreakdown[] = [];
  let totalModifier = 0;
  let totalHealthyYearsModifier = 0;

  for (const q of questions) {
    if (q.id === "country") continue; // country is the baseline, not a factor

    const answer = answers[q.id];
    if (answer === undefined) continue;

    const modifier = getModifier(q.id, answer, q.type, answers);
    const healthyYearsModifier = getHealthyYearsModifier(q.id, answer, answers, modifier);
    totalModifier += modifier;
    totalHealthyYearsModifier += healthyYearsModifier;

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
  const predictedLifespan = baseLifespan + totalModifier;
  const predictedHealthyYears = Math.min(
    predictedLifespan,
    Math.max(0, baseHealthyYears + totalHealthyYearsModifier),
  );

  return {
    baseLifespan: roundToTenth(baseLifespan),
    baseHealthyYears: roundToTenth(baseHealthyYears),
    totalModifier: roundToTenth(totalModifier),
    predictedLifespan: roundToTenth(predictedLifespan),
    predictedHealthyYears: roundToTenth(predictedHealthyYears),
    factors,
    suggestions,
  };
}
