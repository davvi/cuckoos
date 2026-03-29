import type { Question } from "../engine/types";
import { countryOptions } from "./countries";

export const questions: Question[] = [
  {
    id: "country",
    category: "Baseline",
    text: "Where do you live?",
    description: "Your country sets the baseline life expectancy for your calculation.",
    type: "select",
    options: countryOptions,
    citations: [
      {
        label: "WHO Global Health Observatory — Life expectancy at birth",
        url: "https://www.who.int/data/gho/data/indicators/indicator-details/GHO/life-expectancy-at-birth-(years)",
      },
    ],
  },
  {
    id: "sex",
    category: "Baseline",
    text: "What is your biological sex?",
    type: "radio",
    options: [
      { value: "male", label: "Male", modifier: -2.2 },
      { value: "female", label: "Female", modifier: 2.2 },
    ],
    citations: [
      {
        label: "WHO Global Health Observatory — Life expectancy at birth",
        url: "https://www.who.int/data/gho/data/indicators/indicator-details/GHO/life-expectancy-at-birth-(years)",
      },
    ],
  },
  {
    id: "smoking",
    category: "Lifestyle",
    text: "Do you smoke?",
    description: "Smoking is the single largest preventable cause of death worldwide.",
    type: "select",
    options: [
      { value: "never", label: "Never smoked", modifier: 0 },
      { value: "former_long", label: "Quit 10+ years ago", modifier: -1 },
      { value: "former_recent", label: "Quit within last 10 years", modifier: -3 },
      { value: "light", label: "Light smoker (<10/day)", modifier: -5 },
      { value: "heavy", label: "Heavy smoker (10+/day)", modifier: -10 },
    ],
    citations: [
      {
        label: "Jha et al., NEJM 2013 — 21st-Century Hazards of Smoking",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMsa1211128",
      },
    ],
  },
  {
    id: "cardio_minutes",
    category: "Exercise",
    text: "How many minutes of cardio do you do per week?",
    description:
      "Cardio (aerobic exercise) includes brisk walking, running, cycling, swimming, or anything that sustainably raises your heart rate.",
    type: "slider",
    range: { min: 0, max: 600, step: 15, unit: "min/week" },
    citations: [
      {
        label: "Lee et al., JAMA Internal Medicine 2022",
        url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2788473",
      },
      {
        label: "WHO Physical Activity Guidelines — 150–300 min/week recommended",
        url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
      },
    ],
  },
  {
    id: "strength_days",
    category: "Exercise",
    text: "How many days per week do you do strength or resistance training?",
    description:
      "Includes weight lifting, bodyweight exercises (push-ups, squats), resistance bands, or any exercise focused on building muscle.",
    type: "slider",
    range: { min: 0, max: 7, step: 1, unit: "days/week" },
    citations: [
      {
        label: "Stamatakis et al., BMJ 2022 — Muscle-strengthening and mortality",
        url: "https://bjsm.bmj.com/content/56/13/755",
      },
      {
        label: "Liu et al., British Journal of Sports Medicine 2022",
        url: "https://bjsm.bmj.com/content/56/13/755",
      },
    ],
  },
  {
    id: "sleep",
    category: "Lifestyle",
    text: "How many hours of sleep do you typically get per night?",
    type: "select",
    options: [
      { value: "under5", label: "Less than 5 hours", modifier: -3 },
      { value: "5to6", label: "5–6 hours", modifier: -1.5 },
      { value: "7to8", label: "7–8 hours", modifier: 0 },
      { value: "9plus", label: "9+ hours", modifier: -1 },
    ],
    citations: [
      {
        label: "Cappuccio et al., Sleep 2010 — Sleep Duration and All-Cause Mortality",
        url: "https://pubmed.ncbi.nlm.nih.gov/20469800/",
      },
    ],
  },
  {
    id: "vegetables_fruit",
    category: "Diet",
    text: "How many servings of vegetables and fruit do you eat per day?",
    description: "One serving is roughly a handful: 1 medium fruit, ½ cup cooked veg, or 1 cup raw leafy greens.",
    type: "slider",
    range: { min: 0, max: 10, step: 1, unit: "servings/day" },
    citations: [
      {
        label: "Wang et al., Circulation 2021 — Fruit and vegetable intake and mortality",
        url: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.120.048996",
      },
      {
        label: "WHO — Healthy diet: at least 400g (5 portions) per day",
        url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
      },
    ],
  },
  {
    id: "whole_grains",
    category: "Diet",
    text: "What type of grains do you mainly eat?",
    description: "Whole grains include oats, brown rice, whole wheat bread, quinoa, and barley. Refined grains include white bread, white rice, and most pastries.",
    type: "select",
    options: [
      { value: "mostly_whole", label: "Mostly whole grains", modifier: 1 },
      { value: "mixed", label: "Mix of whole and refined", modifier: 0 },
      { value: "mostly_refined", label: "Mostly refined grains (white bread, white rice)", modifier: -1 },
    ],
    citations: [
      {
        label: "Zong et al., Circulation 2016 — Whole grain intake and cardiovascular disease",
        url: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.115.021101",
      },
    ],
  },
  {
    id: "protein_source",
    category: "Diet",
    text: "What are your main protein sources?",
    description: "Think about what you eat most often across a typical week.",
    type: "select",
    options: [
      { value: "mostly_plant", label: "Mostly plant-based (legumes, tofu, nuts)", modifier: 1.5 },
      { value: "fish_seafood", label: "Mostly fish and seafood", modifier: 1 },
      { value: "mixed", label: "Mixed (poultry, some red meat, some plant)", modifier: 0 },
      { value: "mostly_poultry", label: "Mostly poultry (chicken, turkey)", modifier: 0 },
      { value: "mostly_red_meat", label: "Mostly red meat (beef, pork, lamb)", modifier: -1.5 },
    ],
    citations: [
      {
        label: "Orlich et al., JAMA Internal Medicine 2013 — Vegetarian dietary patterns and mortality",
        url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1710093",
      },
      {
        label: "Zheng & Lee, PLOS Medicine 2009 — Red meat and mortality",
        url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000032",
      },
    ],
  },
  {
    id: "red_meat",
    category: "Diet",
    text: "How often do you eat red or processed meat?",
    description: "Red meat includes beef, pork, lamb, and veal. Processed meat includes bacon, sausages, hot dogs, and deli meats.",
    type: "select",
    options: [
      { value: "rarely", label: "Rarely or never", modifier: 0.5 },
      { value: "occasional", label: "1–2 times per week", modifier: 0 },
      { value: "regular", label: "3–4 times per week", modifier: -1 },
      { value: "daily", label: "Daily or almost daily", modifier: -2 },
    ],
    citations: [
      {
        label: "WHO IARC — Red meat and processed meat classification",
        url: "https://www.iarc.who.int/wp-content/uploads/2018/07/pr240_E.pdf",
      },
      {
        label: "Pan et al., Archives of Internal Medicine 2012",
        url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1134845",
      },
    ],
  },
  {
    id: "processed_food",
    category: "Diet",
    text: "How often do you eat ultra-processed foods?",
    description: "Ultra-processed foods include fast food, packaged snacks, sugary drinks, ready meals, and most breakfast cereals.",
    type: "select",
    options: [
      { value: "rarely", label: "Rarely — less than once a week", modifier: 0.5 },
      { value: "sometimes", label: "Sometimes — 1–2 times per week", modifier: 0 },
      { value: "often", label: "Often — 3–5 times per week", modifier: -2 },
      { value: "daily", label: "Daily or with most meals", modifier: -3.5 },
    ],
    citations: [
      {
        label: "Srour et al., BMJ 2019 — Ultra-processed food intake and risk of mortality",
        url: "https://www.bmj.com/content/365/bmj.l1949",
      },
    ],
  },
  {
    id: "alcohol",
    category: "Lifestyle",
    text: "How much alcohol do you consume?",
    type: "select",
    options: [
      { value: "none", label: "None", modifier: 0 },
      { value: "moderate", label: "1–2 drinks/day", modifier: -0.5 },
      { value: "heavy", label: "3+ drinks/day", modifier: -5 },
    ],
    citations: [
      {
        label: "GBD 2016 Alcohol Collaborators, The Lancet 2018",
        url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(18)31310-2/fulltext",
      },
    ],
  },
  {
    id: "bmi",
    category: "Health",
    text: "What is your approximate BMI range?",
    description: "BMI = weight (kg) / height (m)². A rough guide: 5'9\" / 170 lbs ≈ 25 BMI.",
    type: "select",
    options: [
      { value: "underweight", label: "Under 18.5 (underweight)", modifier: -2 },
      { value: "normal", label: "18.5–24.9 (normal)", modifier: 0 },
      { value: "overweight", label: "25–29.9 (overweight)", modifier: -1.5 },
      { value: "obese", label: "30+ (obese)", modifier: -4 },
    ],
    citations: [
      {
        label: "Global BMI Mortality Collaboration, The Lancet 2016",
        url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)30175-1/fulltext",
      },
    ],
  },
  {
    id: "social",
    category: "Mental Health",
    text: "How strong are your social connections?",
    description: "Consider close relationships, community involvement, and social support.",
    type: "radio",
    options: [
      { value: "strong", label: "Strong — regular close relationships", modifier: 2 },
      { value: "moderate", label: "Moderate — some close friends", modifier: 0.5 },
      { value: "weak", label: "Weak — mostly isolated", modifier: -3 },
    ],
    citations: [
      {
        label: "Holt-Lunstad et al., PLoS Medicine 2010 — Social Relationships and Mortality Risk",
        url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000316",
      },
    ],
  },
  {
    id: "stress",
    category: "Mental Health",
    text: "How would you rate your chronic stress level?",
    type: "radio",
    options: [
      { value: "low", label: "Low — rarely stressed", modifier: 1 },
      { value: "moderate", label: "Moderate — sometimes stressed", modifier: 0 },
      { value: "high", label: "High — frequently stressed", modifier: -2.5 },
    ],
    citations: [
      {
        label: "Steptoe & Kivimäki, Nature Reviews Cardiology 2013",
        url: "https://www.nature.com/articles/nrcardio.2012.45",
      },
    ],
  },
];
