export interface SexInsight {
  summary: string;
  topCauses: string[];
  riskFactors: Array<{
    label: string;
    detail: string;
  }>;
}

export const sexInsights: Record<string, SexInsight> = {
  male: {
    summary:
      "Globally, men tend to die younger and carry more mortality burden from cardiovascular disease, tobacco-linked illness, injuries, and alcohol-related harm.",
    topCauses: [
      "Ischaemic heart disease",
      "COVID-19",
      "Stroke",
      "Chronic obstructive pulmonary disease",
      "Trachea, bronchus and lung cancers",
    ],
    riskFactors: [
      {
        label: "Tobacco use",
        detail: "Higher smoking prevalence contributes to lung cancer, COPD, stroke, and heart disease.",
      },
      {
        label: "High blood pressure",
        detail: "A major upstream driver of heart attack, stroke, kidney disease, and heart failure.",
      },
      {
        label: "Alcohol and injury exposure",
        detail: "Road trauma, violence, and liver disease account for a larger share of premature male deaths.",
      },
      {
        label: "Visceral adiposity and metabolic risk",
        detail: "Raises diabetes and cardiovascular risk even when total body weight does not look extreme.",
      },
    ],
  },
  female: {
    summary:
      "Globally, women live longer on average, but stroke, dementia, diabetes, and later-life cardiovascular disease account for a larger share of mortality.",
    topCauses: [
      "Ischaemic heart disease",
      "Stroke",
      "COVID-19",
      "Alzheimer disease and other dementias",
      "Chronic obstructive pulmonary disease",
    ],
    riskFactors: [
      {
        label: "High blood pressure",
        detail: "Strongly linked to stroke, heart disease, and kidney disease, especially after midlife.",
      },
      {
        label: "Obesity and insulin resistance",
        detail: "Drives type 2 diabetes, cardiovascular disease, osteoarthritis, and some cancers.",
      },
      {
        label: "Air pollution and household smoke",
        detail: "Adds respiratory and cardiovascular burden, especially where indoor fuel exposure is common.",
      },
      {
        label: "Bone health and frailty",
        detail: "Osteoporosis and fall-related complications become more important risks with older age.",
      },
    ],
  },
};
