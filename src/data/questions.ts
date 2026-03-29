import type { Question } from "../engine/types";

export const questions: Question[] = [
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
    id: "exercise_minutes",
    category: "Exercise",
    text: "How many minutes of moderate exercise per week?",
    description:
      "Include brisk walking, cycling, swimming, or any activity that raises your heart rate.",
    type: "slider",
    range: { min: 0, max: 600, step: 15, unit: "min/week" },
    citations: [
      {
        label: "Lee et al., JAMA Internal Medicine 2022",
        url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2788473",
      },
      {
        label: "WHO Physical Activity Guidelines",
        url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
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
    id: "diet",
    category: "Diet",
    text: "How would you describe your diet?",
    description: "Consider your overall eating pattern over the past year.",
    type: "select",
    options: [
      {
        value: "mediterranean",
        label: "Mediterranean / plant-rich",
        modifier: 2.5,
      },
      {
        value: "balanced",
        label: "Balanced with fruits & vegetables",
        modifier: 1,
      },
      {
        value: "average",
        label: "Average / mixed",
        modifier: 0,
      },
      {
        value: "poor",
        label: "High in processed food / fast food",
        modifier: -3,
      },
    ],
    citations: [
      {
        label: "Sofi et al., BMJ 2008 — Mediterranean Diet and Health Status",
        url: "https://www.bmj.com/content/337/bmj.a1344",
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
