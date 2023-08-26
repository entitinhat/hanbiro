export interface SatisfactionCounting {
  highlySatisfied: number;
  satisfied: number;
  neutral: number;
  dissatisfied: number;
  highlyDissatisfied: number;
}

export interface SatisfactionTrendCountingResponse {
  firstCounting: SatisfactionCounting;
  lastCounting: SatisfactionCounting;
}