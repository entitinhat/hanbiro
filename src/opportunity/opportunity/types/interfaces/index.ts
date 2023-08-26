export interface Opportunity {
  id: string;
  code: string;
  title: string;
  customer: any;
  products: any;
  process: any;
  salesReps: any;
  description: string;
  stage: any;
  status: any;
  estimatedRevenue: number;
  insightWinProbability: number;
  probability: number;
  weightedAmount: number;
  closedAt: string;
}
