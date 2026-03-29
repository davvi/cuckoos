export interface Citation {
  label: string;
  url: string;
}

export interface RiskEffect {
  condition: string;       // e.g. "Lung cancer", "Cardiovascular disease"
  direction: "increases" | "reduces";
  magnitude: string;       // e.g. "25× higher risk", "35% lower risk"
  citation?: Citation;
}

export interface RiskRange {
  upTo: number;            // applies when slider value <= upTo
  risks: RiskEffect[];
}

export interface Option {
  value: string;
  label: string;
  modifier: number;
  risks?: RiskEffect[];
}

export interface Question {
  id: string;
  category: string;
  text: string;
  description?: string;
  type: "select" | "slider" | "radio";
  options?: Option[];
  range?: { min: number; max: number; step: number; unit: string };
  riskRanges?: RiskRange[];   // for slider questions
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
