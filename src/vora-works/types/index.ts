import src from 'react-select/dist/declarations/src';

export interface LogoLabel {
  label: string;
  logo: string;
}

export interface PlanFeature {
  name: string;
  isOpen: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: PlanFeature[];
}

export interface RegisterFreeLicenseRequest {
  displayName: string;
  companyName: string;
  fullName: string;
  urlName: string;
  email: string;
  phone: string;
  domain: string;
}
export interface ProductLicense {
  tenantId: string;
  orgId: string;
  urls: string[];
}

export interface RegisterFreeLicenseResponse {
  results: ProductLicense[];
}
