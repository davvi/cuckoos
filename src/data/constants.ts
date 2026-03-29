// Global average life expectancy (WHO 2023)
export const BASE_LIFESPAN = 73;

// Sex-based adjustments relative to global average
export const SEX_ADJUSTMENT = {
  male: -2.2,
  female: 2.2,
} as const;
