import type { Citation } from "../engine/types";

interface SuggestionTemplate {
  text: string;
  potentialGain: number;
  citations?: Citation[];
}

// Maps question ID + answer value to improvement suggestions.
// Only negative-modifier answers have suggestions.
export const suggestionMap: Record<string, Record<string, SuggestionTemplate>> = {
  smoking: {
    light: {
      text: "Quitting smoking could add up to 5 years to your life. Even reducing intake helps. Talk to your doctor about cessation programs.",
      potentialGain: 4,
      citations: [
        {
          label: "CDC — Benefits of Quitting Smoking",
          url: "https://www.cdc.gov/tobacco/quit-smoking/reasons-to-quit/index.html",
        },
      ],
    },
    heavy: {
      text: "Quitting smoking is the single most impactful change you can make. Heavy smokers who quit before age 40 recover nearly a decade of life expectancy.",
      potentialGain: 8,
      citations: [
        {
          label: "Jha et al., NEJM 2013",
          url: "https://www.nejm.org/doi/full/10.1056/NEJMsa1211128",
        },
      ],
    },
    former_recent: {
      text: "Great job quitting! The longer you stay smoke-free, the more your risk decreases. After 10 years, your risk is substantially reduced.",
      potentialGain: 2,
    },
  },
  sleep: {
    under5: {
      text: "Aim for 7–8 hours of sleep. Chronic sleep deprivation increases risk of heart disease, diabetes, and cognitive decline.",
      potentialGain: 2.5,
      citations: [
        {
          label: "Walker, Why We Sleep — Sleep Foundation Summary",
          url: "https://www.sleepfoundation.org/how-sleep-works/why-do-we-need-sleep",
        },
      ],
    },
    "5to6": {
      text: "Try to get an extra hour of sleep. Even small improvements in sleep duration have measurable health benefits.",
      potentialGain: 1,
    },
  },
  diet: {
    poor: {
      text: "Shifting toward a Mediterranean-style diet rich in vegetables, fruits, whole grains, and healthy fats could significantly improve your health outcomes.",
      potentialGain: 4,
      citations: [
        {
          label: "Sofi et al., BMJ 2008",
          url: "https://www.bmj.com/content/337/bmj.a1344",
        },
      ],
    },
    average: {
      text: "Adding more fruits, vegetables, and whole grains while reducing processed foods can provide meaningful health benefits.",
      potentialGain: 1.5,
    },
  },
  alcohol: {
    heavy: {
      text: "Reducing alcohol to moderate levels or quitting entirely can significantly reduce risks of liver disease, cancer, and cardiovascular events.",
      potentialGain: 4,
      citations: [
        {
          label: "GBD 2016 Alcohol Collaborators, The Lancet 2018",
          url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(18)31310-2/fulltext",
        },
      ],
    },
  },
  bmi: {
    obese: {
      text: "Losing weight through diet and exercise can reduce risks of heart disease, diabetes, and certain cancers. Even a 5–10% reduction in body weight has meaningful benefits.",
      potentialGain: 3,
      citations: [
        {
          label: "Wing et al., Diabetes Care 2011",
          url: "https://pubmed.ncbi.nlm.nih.gov/21788632/",
        },
      ],
    },
    overweight: {
      text: "Maintaining a healthy weight through balanced diet and regular activity can reduce long-term health risks.",
      potentialGain: 1,
    },
  },
  social: {
    weak: {
      text: "Social isolation is as harmful as smoking 15 cigarettes a day. Consider joining community groups, volunteering, or reconnecting with old friends.",
      potentialGain: 3,
      citations: [
        {
          label: "Holt-Lunstad, PLoS Medicine 2010",
          url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000316",
        },
      ],
    },
  },
  stress: {
    high: {
      text: "Chronic stress management through mindfulness, exercise, therapy, or lifestyle changes can measurably improve health outcomes and longevity.",
      potentialGain: 2,
      citations: [
        {
          label: "Steptoe & Kivimäki, Nature Reviews Cardiology 2013",
          url: "https://www.nature.com/articles/nrcardio.2012.45",
        },
      ],
    },
  },
  exercise_minutes: {
    _low: {
      text: "Even 150 minutes of moderate exercise per week (brisk walking) can add years to your life. Start small and build up gradually.",
      potentialGain: 3,
      citations: [
        {
          label: "WHO Physical Activity Guidelines",
          url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
        },
      ],
    },
  },
};
