import { Token } from '@public-page/types';
import { ESiteType, ETrackingType } from './enums';

export interface SitePage {
  content: string;
}

export interface Tracking {
  cta: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  congent: string;
  token: string;
  unique: boolean;
}

//// http://localhost:8080/site/view/?tk=RD05MDg2MTdiYS1iMzczLTQ1ODgtYjBlMC00MDE2MThlODg5NjImUD0yJlM9MyZDPTI0YTEwMDdkLTNiMjEtNDAwOS1hY2Q1LTYwZmM1ZGUyYmY0MiZUPS1FZHFuSEZEZmVB
export interface SiteParam {
  id: string;
  source: string;
  token: Token;
  tk: string;
  siteType: ESiteType;
  trackingType: ETrackingType;
}
