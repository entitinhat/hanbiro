import { IdName } from '@base/types/common';
import { User } from '@base/types/user';

export interface Quote {
  id: string;
  code: string;
  name: string;
  category: string;
  customer: any;
  account: any;
  contact: any;
  process: IdName;
  expiryDate: string;
  quoteDate: string;
  currency: any;
  items: any;
  salesRep: User;
  billTo: any;
  shipTo: any;
  totalAmount: number;
  stage: any;
  status: any;
  quoteRevision: any;
}
