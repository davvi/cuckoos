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
  whole_grains: {
    mostly_refined: {
      text: "Switching to whole grains (oats, brown rice, whole wheat) instead of refined grains can reduce cardiovascular disease risk and improve metabolic health.",
      potentialGain: 1,
      citations: [
        {
          label: "Zong et al., Circulation 2016",
          url: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.115.021101",
        },
      ],
    },
  },
  protein_source: {
    mostly_red_meat: {
      text: "Replacing red meat with plant proteins (legumes, nuts), fish, or poultry is one of the most evidence-backed dietary changes for longevity.",
      potentialGain: 2.5,
      citations: [
        {
          label: "Orlich et al., JAMA Internal Medicine 2013",
          url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1710093",
        },
      ],
    },
  },
  red_meat: {
    regular: {
      text: "Limiting red and processed meat to 1–2 times per week reduces risk of colorectal cancer, cardiovascular disease, and all-cause mortality.",
      potentialGain: 0.8,
      citations: [
        {
          label: "Pan et al., Archives of Internal Medicine 2012",
          url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1134845",
        },
      ],
    },
    daily: {
      text: "Daily red or processed meat consumption is strongly linked to higher cancer and heart disease risk. Reducing to occasional (1–2x/week) can meaningfully extend your life.",
      potentialGain: 1.5,
      citations: [
        {
          label: "WHO IARC — Processed meat classified as Group 1 carcinogen",
          url: "https://www.iarc.who.int/wp-content/uploads/2018/07/pr240_E.pdf",
        },
      ],
    },
  },
  processed_food: {
    often: {
      text: "Reducing ultra-processed foods and replacing them with whole foods (vegetables, legumes, whole grains) can add years to your life.",
      potentialGain: 1.5,
      citations: [
        {
          label: "Srour et al., BMJ 2019",
          url: "https://www.bmj.com/content/365/bmj.l1949",
        },
      ],
    },
    daily: {
      text: "Eating ultra-processed foods daily is one of the strongest predictors of early death in recent large-scale studies. Cooking whole foods at home most days is the most impactful change you can make here.",
      potentialGain: 3,
      citations: [
        {
          label: "Srour et al., BMJ 2019",
          url: "https://www.bmj.com/content/365/bmj.l1949",
        },
      ],
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
  cardio_minutes: {
    _low: {
      text: "Even 150 minutes of cardio per week — 30 minutes five days a week — can add years to your life. Brisk walking counts. Start small and build gradually.",
      potentialGain: 3,
      citations: [
        {
          label: "WHO Physical Activity Guidelines",
          url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
        },
      ],
    },
  },
  strength_days: {
    _low: {
      text: "Adding just 2 days of strength training per week reduces all-cause mortality by up to 17%. Bodyweight exercises at home count — no gym required.",
      potentialGain: 2,
      citations: [
        {
          label: "Stamatakis et al., BMJ 2022",
          url: "https://bjsm.bmj.com/content/56/13/755",
        },
      ],
    },
  },
  vegetables_fruit: {
    _low: {
      text: "Eating 5+ servings of vegetables and fruit per day is associated with significantly lower risk of heart disease, stroke, and cancer. Frozen and canned count too.",
      potentialGain: 2,
      citations: [
        {
          label: "Wang et al., Circulation 2021",
          url: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.120.048996",
        },
      ],
    },
  },
};
