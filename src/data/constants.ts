// Global average life expectancy (WHO 2023)
export const BASE_LIFESPAN = 73;
// Global average healthy life expectancy (WHO GHE 2021, rounded)
export const BASE_HEALTHY_YEARS = 63.5;

// Sex-based adjustments relative to global average
export const SEX_ADJUSTMENT = {
  male: -2.2,
  female: 2.2,
} as const;
