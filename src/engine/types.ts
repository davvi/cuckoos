export interface Citation {
  label: string;
  url: string;
}

export interface Option {
  value: string;
  label: string;
  modifier: number;
}

export interface Question {
  id: string;
  category: string;
  text: string;
  description?: string;
  type: "select" | "slider" | "radio";
  options?: Option[];
  range?: { min: number; max: number; step: number; unit: string };
  citations?: Citation[];
}

export type Answers = Record<string, string | number>;

export interface FactorBreakdown {
  questionId: string;
  category: string;
  label: string;
  modifier: number;
  citations?: Citation[];
}

export interface Suggestion {
  questionId: string;
  text: string;
  potentialGain: number;
  citations?: Citation[];
}

export interface LifespanResult {
  baseLifespan: number;
  totalModifier: number;
  predictedLifespan: number;
  factors: FactorBreakdown[];
  suggestions: Suggestion[];
}
