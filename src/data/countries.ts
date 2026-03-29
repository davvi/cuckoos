// ─── WHO Global Health Observatory data ──────────────────────────────────────
// Sources:
//   Life expectancy & HALE: WHO GHO Global Health Estimates 2021
//   NCD mortality:          WHO GHO SDG indicator 3.4.1 (2019)
//   Tobacco use:            WHO GTSS / STEPS surveys 2020–2022
//   Obesity (BMI≥30):       WHO GHO NCD Risk Factor Collaboration 2022
//   Hypertension:           NCD-RisC / WHO GHO 2019
//   Physical inactivity:    WHO GHO 2016 (insufficient physical activity)
//   Population:             UN World Population Prospects 2023
//   Health expenditure:     WHO Global Health Expenditure Database 2021
// ─────────────────────────────────────────────────────────────────────────────

export type WHORegion = "AFRO" | "AMRO" | "SEARO" | "EURO" | "EMRO" | "WPRO";
export type IncomeLevel = "L" | "LM" | "UM" | "H";

export const regionLabels: Record<WHORegion, string> = {
  AFRO: "African Region",
  AMRO: "Region of the Americas",
  SEARO: "South-East Asia Region",
  EURO: "European Region",
  EMRO: "Eastern Mediterranean Region",
  WPRO: "Western Pacific Region",
};

export const incomeLevelLabels: Record<IncomeLevel, string> = {
  L: "Low income",
  LM: "Lower-middle income",
  UM: "Upper-middle income",
  H: "High income",
};

export interface CountryData {
  lifespan: number;           // LE at birth — both sexes (years)
  lifespanMale: number;       // LE at birth — male
  lifespanFemale: number;     // LE at birth — female
  hale: number;               // Healthy life expectancy — both sexes
  population: number;         // millions
  region: WHORegion;
  incomeLevel: IncomeLevel;
  healthExpenditure: number;  // % of GDP
  ncdMortality: number;       // % probability of dying 30–70 from CVD/cancer/diabetes/CRD
  tobaccoUse: number;         // % adults who currently use tobacco
  obesityRate: number;        // % adults BMI ≥ 30
  hypertension: number;       // % adults with raised blood pressure
  physicalInactivity: number; // % adults insufficiently active
  under5Mortality: number;    // deaths per 1,000 live births
  maternalMortality: number;  // deaths per 100,000 live births
}

export const countryData: Record<string, CountryData> = {
  Afghanistan: {
    lifespan: 63.7, lifespanMale: 62.1, lifespanFemale: 65.4, hale: 55.2,
    population: 42.2, region: "EMRO", incomeLevel: "L", healthExpenditure: 17.6,
    ncdMortality: 31, tobaccoUse: 11, obesityRate: 5, hypertension: 29, physicalInactivity: 52,
    under5Mortality: 55, maternalMortality: 620,
  },
  Albania: {
    lifespan: 78.5, lifespanMale: 76.2, lifespanFemale: 80.8, hale: 69.1,
    population: 2.8, region: "EURO", incomeLevel: "UM", healthExpenditure: 6.7,
    ncdMortality: 19, tobaccoUse: 29, obesityRate: 21, hypertension: 35, physicalInactivity: 55,
    under5Mortality: 9, maternalMortality: 15,
  },
  Algeria: {
    lifespan: 77.1, lifespanMale: 75.7, lifespanFemale: 78.6, hale: 66.3,
    population: 45.0, region: "EMRO", incomeLevel: "LM", healthExpenditure: 6.2,
    ncdMortality: 22, tobaccoUse: 21, obesityRate: 27, hypertension: 33, physicalInactivity: 56,
    under5Mortality: 23, maternalMortality: 78,
  },
  Argentina: {
    lifespan: 76.5, lifespanMale: 73.2, lifespanFemale: 79.8, hale: 67.0,
    population: 45.7, region: "AMRO", incomeLevel: "UM", healthExpenditure: 9.8,
    ncdMortality: 16, tobaccoUse: 22, obesityRate: 28, hypertension: 34, physicalInactivity: 41,
    under5Mortality: 9, maternalMortality: 39,
  },
  Armenia: {
    lifespan: 75.1, lifespanMale: 71.9, lifespanFemale: 78.2, hale: 66.0,
    population: 2.9, region: "EURO", incomeLevel: "UM", healthExpenditure: 12.3,
    ncdMortality: 21, tobaccoUse: 23, obesityRate: 20, hypertension: 38, physicalInactivity: 59,
    under5Mortality: 12, maternalMortality: 26,
  },
  Australia: {
    lifespan: 83.2, lifespanMale: 81.3, lifespanFemale: 85.2, hale: 72.0,
    population: 26.5, region: "WPRO", incomeLevel: "H", healthExpenditure: 9.6,
    ncdMortality: 10, tobaccoUse: 13, obesityRate: 31, hypertension: 21, physicalInactivity: 30,
    under5Mortality: 4, maternalMortality: 3,
  },
  Austria: {
    lifespan: 81.5, lifespanMale: 79.4, lifespanFemale: 83.5, hale: 72.4,
    population: 9.1, region: "EURO", incomeLevel: "H", healthExpenditure: 10.4,
    ncdMortality: 11, tobaccoUse: 24, obesityRate: 20, hypertension: 28, physicalInactivity: 35,
    under5Mortality: 3, maternalMortality: 5,
  },
  Bangladesh: {
    lifespan: 73.3, lifespanMale: 71.0, lifespanFemale: 75.6, hale: 63.4,
    population: 170.0, region: "SEARO", incomeLevel: "LM", healthExpenditure: 2.6,
    ncdMortality: 28, tobaccoUse: 35, obesityRate: 4, hypertension: 26, physicalInactivity: 49,
    under5Mortality: 28, maternalMortality: 123,
  },
  Belgium: {
    lifespan: 81.5, lifespanMale: 79.2, lifespanFemale: 83.8, hale: 72.0,
    population: 11.6, region: "EURO", incomeLevel: "H", healthExpenditure: 10.7,
    ncdMortality: 10, tobaccoUse: 22, obesityRate: 22, hypertension: 25, physicalInactivity: 40,
    under5Mortality: 4, maternalMortality: 5,
  },
  Bolivia: {
    lifespan: 71.5, lifespanMale: 69.1, lifespanFemale: 74.0, hale: 62.8,
    population: 12.1, region: "AMRO", incomeLevel: "LM", healthExpenditure: 7.5,
    ncdMortality: 21, tobaccoUse: 14, obesityRate: 20, hypertension: 29, physicalInactivity: 38,
    under5Mortality: 26, maternalMortality: 161,
  },
  Brazil: {
    lifespan: 75.5, lifespanMale: 72.0, lifespanFemale: 79.1, hale: 65.5,
    population: 215.0, region: "AMRO", incomeLevel: "UM", healthExpenditure: 9.9,
    ncdMortality: 17, tobaccoUse: 13, obesityRate: 26, hypertension: 33, physicalInactivity: 47,
    under5Mortality: 14, maternalMortality: 72,
  },
  Cambodia: {
    lifespan: 70.3, lifespanMale: 67.2, lifespanFemale: 73.1, hale: 61.8,
    population: 16.7, region: "SEARO", incomeLevel: "LM", healthExpenditure: 7.5,
    ncdMortality: 25, tobaccoUse: 21, obesityRate: 4, hypertension: 24, physicalInactivity: 18,
    under5Mortality: 27, maternalMortality: 218,
  },
  Canada: {
    lifespan: 82.2, lifespanMale: 80.4, lifespanFemale: 84.1, hale: 72.3,
    population: 38.2, region: "AMRO", incomeLevel: "H", healthExpenditure: 12.9,
    ncdMortality: 10, tobaccoUse: 13, obesityRate: 30, hypertension: 24, physicalInactivity: 28,
    under5Mortality: 5, maternalMortality: 11,
  },
  Chile: {
    lifespan: 80.0, lifespanMale: 77.3, lifespanFemale: 82.8, hale: 69.8,
    population: 19.5, region: "AMRO", incomeLevel: "H", healthExpenditure: 9.3,
    ncdMortality: 13, tobaccoUse: 26, obesityRate: 34, hypertension: 28, physicalInactivity: 43,
    under5Mortality: 7, maternalMortality: 15,
  },
  China: {
    lifespan: 78.2, lifespanMale: 75.8, lifespanFemale: 80.7, hale: 68.5,
    population: 1415.0, region: "WPRO", incomeLevel: "UM", healthExpenditure: 5.4,
    ncdMortality: 17, tobaccoUse: 25, obesityRate: 7, hypertension: 31, physicalInactivity: 37,
    under5Mortality: 7, maternalMortality: 23,
  },
  Colombia: {
    lifespan: 77.0, lifespanMale: 73.5, lifespanFemale: 80.4, hale: 67.8,
    population: 51.9, region: "AMRO", incomeLevel: "UM", healthExpenditure: 9.0,
    ncdMortality: 15, tobaccoUse: 9, obesityRate: 24, hypertension: 26, physicalInactivity: 42,
    under5Mortality: 14, maternalMortality: 75,
  },
  "Costa Rica": {
    lifespan: 79.9, lifespanMale: 77.8, lifespanFemale: 82.0, hale: 69.7,
    population: 5.2, region: "AMRO", incomeLevel: "UM", healthExpenditure: 7.7,
    ncdMortality: 13, tobaccoUse: 9, obesityRate: 31, hypertension: 25, physicalInactivity: 47,
    under5Mortality: 8, maternalMortality: 27,
  },
  Croatia: {
    lifespan: 78.6, lifespanMale: 75.5, lifespanFemale: 81.7, hale: 68.8,
    population: 3.9, region: "EURO", incomeLevel: "H", healthExpenditure: 7.8,
    ncdMortality: 14, tobaccoUse: 37, obesityRate: 24, hypertension: 35, physicalInactivity: 47,
    under5Mortality: 5, maternalMortality: 8,
  },
  Cuba: {
    lifespan: 78.8, lifespanMale: 77.0, lifespanFemale: 80.5, hale: 68.3,
    population: 11.1, region: "AMRO", incomeLevel: "UM", healthExpenditure: 12.1,
    ncdMortality: 18, tobaccoUse: 29, obesityRate: 24, hypertension: 32, physicalInactivity: 39,
    under5Mortality: 5, maternalMortality: 39,
  },
  "Czech Republic": {
    lifespan: 78.9, lifespanMale: 76.2, lifespanFemale: 81.5, hale: 69.4,
    population: 10.8, region: "EURO", incomeLevel: "H", healthExpenditure: 9.2,
    ncdMortality: 13, tobaccoUse: 31, obesityRate: 26, hypertension: 33, physicalInactivity: 40,
    under5Mortality: 3, maternalMortality: 3,
  },
  Denmark: {
    lifespan: 81.3, lifespanMale: 79.4, lifespanFemale: 83.2, hale: 72.0,
    population: 5.9, region: "EURO", incomeLevel: "H", healthExpenditure: 10.6,
    ncdMortality: 11, tobaccoUse: 17, obesityRate: 20, hypertension: 25, physicalInactivity: 23,
    under5Mortality: 4, maternalMortality: 4,
  },
  Ecuador: {
    lifespan: 77.2, lifespanMale: 74.4, lifespanFemale: 80.0, hale: 67.0,
    population: 18.0, region: "AMRO", incomeLevel: "UM", healthExpenditure: 8.1,
    ncdMortality: 17, tobaccoUse: 9, obesityRate: 22, hypertension: 29, physicalInactivity: 48,
    under5Mortality: 13, maternalMortality: 59,
  },
  Egypt: {
    lifespan: 71.0, lifespanMale: 69.5, lifespanFemale: 72.6, hale: 62.3,
    population: 105.0, region: "EMRO", incomeLevel: "LM", healthExpenditure: 4.9,
    ncdMortality: 27, tobaccoUse: 28, obesityRate: 32, hypertension: 39, physicalInactivity: 51,
    under5Mortality: 20, maternalMortality: 17,
  },
  Ethiopia: {
    lifespan: 67.8, lifespanMale: 65.3, lifespanFemale: 70.3, hale: 59.0,
    population: 123.0, region: "AFRO", incomeLevel: "L", healthExpenditure: 3.2,
    ncdMortality: 25, tobaccoUse: 4, obesityRate: 5, hypertension: 24, physicalInactivity: 22,
    under5Mortality: 51, maternalMortality: 267,
  },
  Finland: {
    lifespan: 81.7, lifespanMale: 79.3, lifespanFemale: 84.1, hale: 72.4,
    population: 5.5, region: "EURO", incomeLevel: "H", healthExpenditure: 9.6,
    ncdMortality: 10, tobaccoUse: 17, obesityRate: 23, hypertension: 28, physicalInactivity: 34,
    under5Mortality: 2, maternalMortality: 3,
  },
  France: {
    lifespan: 82.5, lifespanMale: 80.1, lifespanFemale: 85.0, hale: 72.6,
    population: 68.0, region: "EURO", incomeLevel: "H", healthExpenditure: 11.9,
    ncdMortality: 10, tobaccoUse: 30, obesityRate: 21, hypertension: 26, physicalInactivity: 28,
    under5Mortality: 4, maternalMortality: 8,
  },
  Germany: {
    lifespan: 81.3, lifespanMale: 79.0, lifespanFemale: 83.5, hale: 71.6,
    population: 84.0, region: "EURO", incomeLevel: "H", healthExpenditure: 12.8,
    ncdMortality: 11, tobaccoUse: 28, obesityRate: 24, hypertension: 29, physicalInactivity: 38,
    under5Mortality: 4, maternalMortality: 4,
  },
  Ghana: {
    lifespan: 64.1, lifespanMale: 62.0, lifespanFemale: 66.2, hale: 55.3,
    population: 33.0, region: "AFRO", incomeLevel: "LM", healthExpenditure: 4.0,
    ncdMortality: 26, tobaccoUse: 6, obesityRate: 14, hypertension: 32, physicalInactivity: 31,
    under5Mortality: 43, maternalMortality: 263,
  },
  Greece: {
    lifespan: 82.2, lifespanMale: 80.1, lifespanFemale: 84.4, hale: 72.1,
    population: 10.7, region: "EURO", incomeLevel: "H", healthExpenditure: 8.5,
    ncdMortality: 12, tobaccoUse: 37, obesityRate: 22, hypertension: 36, physicalInactivity: 22,
    under5Mortality: 4, maternalMortality: 3,
  },
  Guatemala: {
    lifespan: 74.3, lifespanMale: 70.6, lifespanFemale: 77.9, hale: 64.4,
    population: 17.4, region: "AMRO", incomeLevel: "UM", healthExpenditure: 6.2,
    ncdMortality: 17, tobaccoUse: 10, obesityRate: 21, hypertension: 25, physicalInactivity: 43,
    under5Mortality: 24, maternalMortality: 96,
  },
  Honduras: {
    lifespan: 75.3, lifespanMale: 72.1, lifespanFemale: 78.5, hale: 65.6,
    population: 10.3, region: "AMRO", incomeLevel: "LM", healthExpenditure: 9.0,
    ncdMortality: 17, tobaccoUse: 9, obesityRate: 24, hypertension: 27, physicalInactivity: 47,
    under5Mortality: 17, maternalMortality: 72,
  },
  Hungary: {
    lifespan: 76.9, lifespanMale: 73.5, lifespanFemale: 80.2, hale: 67.4,
    population: 9.7, region: "EURO", incomeLevel: "H", healthExpenditure: 7.3,
    ncdMortality: 17, tobaccoUse: 33, obesityRate: 30, hypertension: 39, physicalInactivity: 44,
    under5Mortality: 4, maternalMortality: 15,
  },
  Iceland: {
    lifespan: 82.9, lifespanMale: 81.4, lifespanFemale: 84.4, hale: 73.2,
    population: 0.37, region: "EURO", incomeLevel: "H", healthExpenditure: 9.6,
    ncdMortality: 9, tobaccoUse: 12, obesityRate: 22, hypertension: 22, physicalInactivity: 27,
    under5Mortality: 2, maternalMortality: 3,
  },
  India: {
    lifespan: 70.0, lifespanMale: 68.7, lifespanFemale: 71.5, hale: 60.3,
    population: 1430.0, region: "SEARO", incomeLevel: "LM", healthExpenditure: 3.3,
    ncdMortality: 26, tobaccoUse: 28, obesityRate: 5, hypertension: 28, physicalInactivity: 34,
    under5Mortality: 31, maternalMortality: 103,
  },
  Indonesia: {
    lifespan: 72.0, lifespanMale: 70.0, lifespanFemale: 74.1, hale: 62.7,
    population: 275.0, region: "SEARO", incomeLevel: "UM", healthExpenditure: 3.4,
    ncdMortality: 27, tobaccoUse: 36, obesityRate: 7, hypertension: 34, physicalInactivity: 33,
    under5Mortality: 23, maternalMortality: 173,
  },
  Iran: {
    lifespan: 76.7, lifespanMale: 75.2, lifespanFemale: 78.2, hale: 66.7,
    population: 87.0, region: "EMRO", incomeLevel: "UM", healthExpenditure: 9.3,
    ncdMortality: 21, tobaccoUse: 13, obesityRate: 25, hypertension: 31, physicalInactivity: 58,
    under5Mortality: 14, maternalMortality: 22,
  },
  Iraq: {
    lifespan: 71.1, lifespanMale: 69.9, lifespanFemale: 72.4, hale: 61.8,
    population: 42.3, region: "EMRO", incomeLevel: "UM", healthExpenditure: 5.3,
    ncdMortality: 26, tobaccoUse: 22, obesityRate: 30, hypertension: 35, physicalInactivity: 58,
    under5Mortality: 24, maternalMortality: 76,
  },
  Ireland: {
    lifespan: 82.0, lifespanMale: 80.4, lifespanFemale: 83.7, hale: 71.8,
    population: 5.1, region: "EURO", incomeLevel: "H", healthExpenditure: 7.5,
    ncdMortality: 10, tobaccoUse: 21, obesityRate: 26, hypertension: 23, physicalInactivity: 33,
    under5Mortality: 3, maternalMortality: 5,
  },
  Israel: {
    lifespan: 82.6, lifespanMale: 81.0, lifespanFemale: 84.3, hale: 72.4,
    population: 9.4, region: "EURO", incomeLevel: "H", healthExpenditure: 7.5,
    ncdMortality: 10, tobaccoUse: 20, obesityRate: 26, hypertension: 26, physicalInactivity: 30,
    under5Mortality: 4, maternalMortality: 3,
  },
  Italy: {
    lifespan: 83.0, lifespanMale: 81.0, lifespanFemale: 85.0, hale: 72.8,
    population: 59.4, region: "EURO", incomeLevel: "H", healthExpenditure: 9.6,
    ncdMortality: 10, tobaccoUse: 23, obesityRate: 20, hypertension: 31, physicalInactivity: 38,
    under5Mortality: 3, maternalMortality: 5,
  },
  Japan: {
    lifespan: 84.3, lifespanMale: 81.1, lifespanFemale: 87.1, hale: 74.1,
    population: 125.0, region: "WPRO", incomeLevel: "H", healthExpenditure: 10.9,
    ncdMortality: 9, tobaccoUse: 16, obesityRate: 4, hypertension: 36, physicalInactivity: 35,
    under5Mortality: 2, maternalMortality: 4,
  },
  Jordan: {
    lifespan: 74.8, lifespanMale: 73.2, lifespanFemale: 76.4, hale: 65.1,
    population: 10.3, region: "EMRO", incomeLevel: "UM", healthExpenditure: 7.6,
    ncdMortality: 21, tobaccoUse: 37, obesityRate: 35, hypertension: 37, physicalInactivity: 54,
    under5Mortality: 16, maternalMortality: 41,
  },
  Kazakhstan: {
    lifespan: 73.2, lifespanMale: 68.6, lifespanFemale: 77.6, hale: 63.8,
    population: 19.4, region: "EURO", incomeLevel: "UM", healthExpenditure: 3.5,
    ncdMortality: 22, tobaccoUse: 27, obesityRate: 23, hypertension: 40, physicalInactivity: 41,
    under5Mortality: 10, maternalMortality: 13,
  },
  Kenya: {
    lifespan: 63.5, lifespanMale: 61.3, lifespanFemale: 65.7, hale: 55.0,
    population: 54.0, region: "AFRO", incomeLevel: "LM", healthExpenditure: 4.3,
    ncdMortality: 23, tobaccoUse: 11, obesityRate: 9, hypertension: 31, physicalInactivity: 31,
    under5Mortality: 41, maternalMortality: 342,
  },
  "South Korea": {
    lifespan: 83.3, lifespanMale: 80.5, lifespanFemale: 86.1, hale: 73.1,
    population: 51.7, region: "WPRO", incomeLevel: "H", healthExpenditure: 8.8,
    ncdMortality: 10, tobaccoUse: 20, obesityRate: 6, hypertension: 28, physicalInactivity: 35,
    under5Mortality: 3, maternalMortality: 8,
  },
  Luxembourg: {
    lifespan: 82.2, lifespanMale: 80.6, lifespanFemale: 83.8, hale: 72.1,
    population: 0.66, region: "EURO", incomeLevel: "H", healthExpenditure: 5.4,
    ncdMortality: 10, tobaccoUse: 20, obesityRate: 22, hypertension: 23, physicalInactivity: 37,
    under5Mortality: 3, maternalMortality: 5,
  },
  Malaysia: {
    lifespan: 75.9, lifespanMale: 73.6, lifespanFemale: 78.4, hale: 66.2,
    population: 33.0, region: "WPRO", incomeLevel: "UM", healthExpenditure: 4.4,
    ncdMortality: 22, tobaccoUse: 23, obesityRate: 19, hypertension: 38, physicalInactivity: 37,
    under5Mortality: 12, maternalMortality: 29,
  },
  Mexico: {
    lifespan: 75.0, lifespanMale: 71.9, lifespanFemale: 78.1, hale: 65.3,
    population: 130.0, region: "AMRO", incomeLevel: "UM", healthExpenditure: 5.5,
    ncdMortality: 16, tobaccoUse: 9, obesityRate: 36, hypertension: 28, physicalInactivity: 47,
    under5Mortality: 13, maternalMortality: 59,
  },
  Morocco: {
    lifespan: 75.6, lifespanMale: 74.3, lifespanFemale: 77.0, hale: 65.2,
    population: 37.0, region: "EMRO", incomeLevel: "LM", healthExpenditure: 5.3,
    ncdMortality: 22, tobaccoUse: 21, obesityRate: 26, hypertension: 37, physicalInactivity: 54,
    under5Mortality: 19, maternalMortality: 70,
  },
  Mozambique: {
    lifespan: 60.7, lifespanMale: 57.5, lifespanFemale: 63.6, hale: 51.2,
    population: 32.0, region: "AFRO", incomeLevel: "L", healthExpenditure: 7.2,
    ncdMortality: 23, tobaccoUse: 15, obesityRate: 8, hypertension: 34, physicalInactivity: 21,
    under5Mortality: 71, maternalMortality: 289,
  },
  Myanmar: {
    lifespan: 66.1, lifespanMale: 63.2, lifespanFemale: 69.2, hale: 57.3,
    population: 54.4, region: "SEARO", incomeLevel: "LM", healthExpenditure: 4.7,
    ncdMortality: 30, tobaccoUse: 33, obesityRate: 8, hypertension: 28, physicalInactivity: 29,
    under5Mortality: 45, maternalMortality: 179,
  },
  Nepal: {
    lifespan: 70.7, lifespanMale: 68.3, lifespanFemale: 73.2, hale: 61.5,
    population: 29.5, region: "SEARO", incomeLevel: "L", healthExpenditure: 5.3,
    ncdMortality: 24, tobaccoUse: 30, obesityRate: 5, hypertension: 24, physicalInactivity: 28,
    under5Mortality: 27, maternalMortality: 174,
  },
  Netherlands: {
    lifespan: 81.7, lifespanMale: 80.0, lifespanFemale: 83.5, hale: 72.0,
    population: 17.9, region: "EURO", incomeLevel: "H", healthExpenditure: 10.1,
    ncdMortality: 10, tobaccoUse: 22, obesityRate: 21, hypertension: 25, physicalInactivity: 27,
    under5Mortality: 3, maternalMortality: 4,
  },
  "New Zealand": {
    lifespan: 82.0, lifespanMale: 80.2, lifespanFemale: 83.9, hale: 72.0,
    population: 5.1, region: "WPRO", incomeLevel: "H", healthExpenditure: 9.7,
    ncdMortality: 10, tobaccoUse: 13, obesityRate: 31, hypertension: 22, physicalInactivity: 35,
    under5Mortality: 5, maternalMortality: 9,
  },
  Nigeria: {
    lifespan: 53.0, lifespanMale: 51.5, lifespanFemale: 54.5, hale: 44.9,
    population: 218.0, region: "AFRO", incomeLevel: "LM", healthExpenditure: 3.4,
    ncdMortality: 23, tobaccoUse: 4, obesityRate: 9, hypertension: 34, physicalInactivity: 35,
    under5Mortality: 111, maternalMortality: 1047,
  },
  Norway: {
    lifespan: 82.8, lifespanMale: 81.2, lifespanFemale: 84.4, hale: 73.0,
    population: 5.5, region: "EURO", incomeLevel: "H", healthExpenditure: 10.7,
    ncdMortality: 9, tobaccoUse: 12, obesityRate: 23, hypertension: 24, physicalInactivity: 32,
    under5Mortality: 2, maternalMortality: 2,
  },
  Pakistan: {
    lifespan: 67.0, lifespanMale: 65.5, lifespanFemale: 68.6, hale: 57.6,
    population: 231.0, region: "EMRO", incomeLevel: "LM", healthExpenditure: 3.4,
    ncdMortality: 30, tobaccoUse: 22, obesityRate: 9, hypertension: 33, physicalInactivity: 52,
    under5Mortality: 60, maternalMortality: 154,
  },
  Panama: {
    lifespan: 78.7, lifespanMale: 76.1, lifespanFemale: 81.4, hale: 69.0,
    population: 4.4, region: "AMRO", incomeLevel: "H", healthExpenditure: 8.2,
    ncdMortality: 14, tobaccoUse: 6, obesityRate: 30, hypertension: 26, physicalInactivity: 50,
    under5Mortality: 14, maternalMortality: 52,
  },
  Paraguay: {
    lifespan: 74.3, lifespanMale: 71.4, lifespanFemale: 77.2, hale: 64.4,
    population: 7.4, region: "AMRO", incomeLevel: "UM", healthExpenditure: 8.3,
    ncdMortality: 17, tobaccoUse: 16, obesityRate: 22, hypertension: 29, physicalInactivity: 42,
    under5Mortality: 19, maternalMortality: 71,
  },
  Peru: {
    lifespan: 76.7, lifespanMale: 73.9, lifespanFemale: 79.5, hale: 67.0,
    population: 33.7, region: "AMRO", incomeLevel: "UM", healthExpenditure: 6.2,
    ncdMortality: 17, tobaccoUse: 8, obesityRate: 22, hypertension: 27, physicalInactivity: 48,
    under5Mortality: 14, maternalMortality: 69,
  },
  Philippines: {
    lifespan: 69.5, lifespanMale: 66.3, lifespanFemale: 72.9, hale: 60.0,
    population: 115.0, region: "WPRO", incomeLevel: "LM", healthExpenditure: 5.1,
    ncdMortality: 28, tobaccoUse: 23, obesityRate: 7, hypertension: 28, physicalInactivity: 32,
    under5Mortality: 26, maternalMortality: 78,
  },
  Poland: {
    lifespan: 77.5, lifespanMale: 73.9, lifespanFemale: 81.1, hale: 68.2,
    population: 37.6, region: "EURO", incomeLevel: "H", healthExpenditure: 6.5,
    ncdMortality: 14, tobaccoUse: 29, obesityRate: 24, hypertension: 36, physicalInactivity: 45,
    under5Mortality: 4, maternalMortality: 2,
  },
  Portugal: {
    lifespan: 81.0, lifespanMale: 78.1, lifespanFemale: 83.9, hale: 71.5,
    population: 10.3, region: "EURO", incomeLevel: "H", healthExpenditure: 9.8,
    ncdMortality: 11, tobaccoUse: 21, obesityRate: 21, hypertension: 31, physicalInactivity: 42,
    under5Mortality: 3, maternalMortality: 12,
  },
  Romania: {
    lifespan: 75.6, lifespanMale: 72.1, lifespanFemale: 79.1, hale: 66.3,
    population: 19.1, region: "EURO", incomeLevel: "H", healthExpenditure: 6.0,
    ncdMortality: 18, tobaccoUse: 28, obesityRate: 23, hypertension: 38, physicalInactivity: 48,
    under5Mortality: 7, maternalMortality: 10,
  },
  Russia: {
    lifespan: 72.4, lifespanMale: 67.5, lifespanFemale: 77.2, hale: 63.3,
    population: 144.0, region: "EURO", incomeLevel: "UM", healthExpenditure: 5.6,
    ncdMortality: 22, tobaccoUse: 30, obesityRate: 26, hypertension: 45, physicalInactivity: 41,
    under5Mortality: 5, maternalMortality: 14,
  },
  "Saudi Arabia": {
    lifespan: 77.1, lifespanMale: 75.8, lifespanFemale: 78.6, hale: 67.3,
    population: 36.4, region: "EMRO", incomeLevel: "H", healthExpenditure: 5.8,
    ncdMortality: 17, tobaccoUse: 21, obesityRate: 35, hypertension: 32, physicalInactivity: 54,
    under5Mortality: 7, maternalMortality: 17,
  },
  Singapore: {
    lifespan: 83.9, lifespanMale: 81.6, lifespanFemale: 86.1, hale: 73.9,
    population: 5.9, region: "WPRO", incomeLevel: "H", healthExpenditure: 5.1,
    ncdMortality: 9, tobaccoUse: 16, obesityRate: 8, hypertension: 25, physicalInactivity: 33,
    under5Mortality: 3, maternalMortality: 3,
  },
  Slovenia: {
    lifespan: 81.3, lifespanMale: 78.7, lifespanFemale: 84.0, hale: 72.0,
    population: 2.1, region: "EURO", incomeLevel: "H", healthExpenditure: 8.5,
    ncdMortality: 11, tobaccoUse: 23, obesityRate: 21, hypertension: 32, physicalInactivity: 45,
    under5Mortality: 2, maternalMortality: 3,
  },
  "South Africa": {
    lifespan: 64.0, lifespanMale: 60.7, lifespanFemale: 67.1, hale: 54.7,
    population: 60.0, region: "AFRO", incomeLevel: "UM", healthExpenditure: 8.1,
    ncdMortality: 26, tobaccoUse: 20, obesityRate: 28, hypertension: 42, physicalInactivity: 39,
    under5Mortality: 33, maternalMortality: 127,
  },
  Spain: {
    lifespan: 83.2, lifespanMale: 80.9, lifespanFemale: 85.5, hale: 73.1,
    population: 47.4, region: "EURO", incomeLevel: "H", healthExpenditure: 10.0,
    ncdMortality: 9, tobaccoUse: 24, obesityRate: 24, hypertension: 28, physicalInactivity: 28,
    under5Mortality: 3, maternalMortality: 3,
  },
  "Sri Lanka": {
    lifespan: 76.4, lifespanMale: 73.1, lifespanFemale: 79.6, hale: 67.1,
    population: 22.2, region: "SEARO", incomeLevel: "LM", healthExpenditure: 4.2,
    ncdMortality: 23, tobaccoUse: 23, obesityRate: 7, hypertension: 26, physicalInactivity: 25,
    under5Mortality: 7, maternalMortality: 29,
  },
  Sweden: {
    lifespan: 82.8, lifespanMale: 81.3, lifespanFemale: 84.4, hale: 73.0,
    population: 10.5, region: "EURO", incomeLevel: "H", healthExpenditure: 11.0,
    ncdMortality: 9, tobaccoUse: 16, obesityRate: 21, hypertension: 24, physicalInactivity: 36,
    under5Mortality: 3, maternalMortality: 5,
  },
  Switzerland: {
    lifespan: 83.4, lifespanMale: 81.8, lifespanFemale: 85.1, hale: 73.4,
    population: 8.7, region: "EURO", incomeLevel: "H", healthExpenditure: 11.8,
    ncdMortality: 9, tobaccoUse: 22, obesityRate: 23, hypertension: 23, physicalInactivity: 40,
    under5Mortality: 4, maternalMortality: 5,
  },
  Tanzania: {
    lifespan: 66.0, lifespanMale: 62.9, lifespanFemale: 68.9, hale: 57.3,
    population: 63.0, region: "AFRO", incomeLevel: "LM", healthExpenditure: 3.9,
    ncdMortality: 23, tobaccoUse: 11, obesityRate: 10, hypertension: 30, physicalInactivity: 23,
    under5Mortality: 53, maternalMortality: 238,
  },
  Thailand: {
    lifespan: 77.0, lifespanMale: 73.4, lifespanFemale: 80.4, hale: 67.3,
    population: 72.0, region: "SEARO", incomeLevel: "UM", healthExpenditure: 4.4,
    ncdMortality: 22, tobaccoUse: 21, obesityRate: 10, hypertension: 28, physicalInactivity: 31,
    under5Mortality: 8, maternalMortality: 29,
  },
  Tunisia: {
    lifespan: 76.2, lifespanMale: 74.4, lifespanFemale: 78.0, hale: 66.3,
    population: 11.9, region: "EMRO", incomeLevel: "LM", healthExpenditure: 7.4,
    ncdMortality: 22, tobaccoUse: 29, obesityRate: 27, hypertension: 35, physicalInactivity: 55,
    under5Mortality: 15, maternalMortality: 37,
  },
  Turkey: {
    lifespan: 77.7, lifespanMale: 75.0, lifespanFemale: 80.4, hale: 68.1,
    population: 85.0, region: "EURO", incomeLevel: "UM", healthExpenditure: 4.6,
    ncdMortality: 17, tobaccoUse: 31, obesityRate: 32, hypertension: 38, physicalInactivity: 40,
    under5Mortality: 10, maternalMortality: 17,
  },
  Uganda: {
    lifespan: 65.5, lifespanMale: 63.2, lifespanFemale: 67.7, hale: 57.0,
    population: 47.0, region: "AFRO", incomeLevel: "L", healthExpenditure: 5.2,
    ncdMortality: 22, tobaccoUse: 11, obesityRate: 6, hypertension: 27, physicalInactivity: 27,
    under5Mortality: 37, maternalMortality: 189,
  },
  Ukraine: {
    lifespan: 71.0, lifespanMale: 65.4, lifespanFemale: 76.4, hale: 62.3,
    population: 43.5, region: "EURO", incomeLevel: "LM", healthExpenditure: 7.1,
    ncdMortality: 22, tobaccoUse: 27, obesityRate: 21, hypertension: 46, physicalInactivity: 47,
    under5Mortality: 8, maternalMortality: 17,
  },
  "United Kingdom": {
    lifespan: 81.0, lifespanMale: 79.3, lifespanFemale: 82.8, hale: 71.3,
    population: 67.7, region: "EURO", incomeLevel: "H", healthExpenditure: 11.9,
    ncdMortality: 11, tobaccoUse: 16, obesityRate: 28, hypertension: 27, physicalInactivity: 34,
    under5Mortality: 4, maternalMortality: 10,
  },
  "United States": {
    lifespan: 78.5, lifespanMale: 75.9, lifespanFemale: 81.1, hale: 67.4,
    population: 335.0, region: "AMRO", incomeLevel: "H", healthExpenditure: 17.4,
    ncdMortality: 13, tobaccoUse: 13, obesityRate: 43, hypertension: 32, physicalInactivity: 40,
    under5Mortality: 6, maternalMortality: 21,
  },
  Uruguay: {
    lifespan: 77.5, lifespanMale: 74.0, lifespanFemale: 81.0, hale: 68.0,
    population: 3.5, region: "AMRO", incomeLevel: "H", healthExpenditure: 8.8,
    ncdMortality: 14, tobaccoUse: 22, obesityRate: 30, hypertension: 33, physicalInactivity: 49,
    under5Mortality: 7, maternalMortality: 17,
  },
  Uzbekistan: {
    lifespan: 72.6, lifespanMale: 70.0, lifespanFemale: 75.1, hale: 63.5,
    population: 35.0, region: "EURO", incomeLevel: "LM", healthExpenditure: 7.2,
    ncdMortality: 25, tobaccoUse: 20, obesityRate: 17, hypertension: 39, physicalInactivity: 31,
    under5Mortality: 21, maternalMortality: 29,
  },
  Venezuela: {
    lifespan: 72.1, lifespanMale: 68.5, lifespanFemale: 75.8, hale: 62.5,
    population: 29.8, region: "AMRO", incomeLevel: "UM", healthExpenditure: 2.5,
    ncdMortality: 18, tobaccoUse: 17, obesityRate: 28, hypertension: 33, physicalInactivity: 41,
    under5Mortality: 26, maternalMortality: 259,
  },
  Vietnam: {
    lifespan: 73.6, lifespanMale: 70.3, lifespanFemale: 76.9, hale: 64.2,
    population: 98.2, region: "WPRO", incomeLevel: "LM", healthExpenditure: 5.8,
    ncdMortality: 22, tobaccoUse: 25, obesityRate: 3, hypertension: 26, physicalInactivity: 29,
    under5Mortality: 20, maternalMortality: 124,
  },
  Zimbabwe: {
    lifespan: 60.7, lifespanMale: 57.1, lifespanFemale: 63.9, hale: 51.5,
    population: 16.3, region: "AFRO", incomeLevel: "LM", healthExpenditure: 4.8,
    ncdMortality: 24, tobaccoUse: 12, obesityRate: 16, hypertension: 38, physicalInactivity: 31,
    under5Mortality: 52, maternalMortality: 357,
  },
};

export const countryOptions = Object.keys(countryData)
  .sort()
  .map((name) => ({ value: name, label: name, modifier: 0 }));
