import {IdName} from '@base/types/common';
import {EMediumEnum, EPackageEnum} from "@analytic/main/types/enum";

interface BackHalf {
  urlSuffix: string;
  pathPrefix: string;
  domain: string;
}

export interface SusLog {
  id: string;
  sUrl: string;
  url: string;
  urlType: string;
  cta: IdName;
  campaign: IdName;
  source: EPackageEnum;
  medium: EMediumEnum;
  term: string;
  content: string;
  customer: IdName;
  activity: IdName;
  process: IdName;
  document: IdName;
  email: string;
  mobile: string;
  totalClick: number;
  backHalf: BackHalf;
  createdAt: Date;
  createdBy: IdName;
  updatedAt: Date;
  updatedBy: IdName;
  deleted: boolean;
}

export interface SusClick {
  id: string;
  log: SusLog;
  extraData: string;
  createdAt: Date;
  createdBy: IdName;
}