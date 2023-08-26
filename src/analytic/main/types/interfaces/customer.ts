// import { IdNameLanguageKey } from '@analytic/dashboard/types/interfaces/index';

export interface Customer {
  id: string;
  code: string;
  name: string;
  category: string;
  updatedAt: string;
}

export interface CustomerCounting {
  total: number;
  account: number;
  contact: number;
}

export interface CustomerRatingCounting {
  // rating: IdNameLanguageKey;
  counting: CustomerCounting;
}

export interface CustomerIndustryCounting {
  // industry: IdNameLanguageKey;
  counting: CustomerCounting;
}
