import { IdName } from '@base/types/common';
import { Product } from '@product/product/types/product';

export interface Customer {
  id: string;
  code: string;
  name: string;
  category: string;
  type?: {
    keyName: string;
    languageKey: string;
  };
  contactType?: {
    keyName: string;
    languageKey: string;
  };
  rating: any;
  state?: string;
  photo?: string;
  memo?: string;
  industries?: any[]; //TODO
  addresses?: Address[];
  billAddress?: Address; //[];
  shipAddress?: Address; //[];
  phones?: Phone[];
  mobiles?: Mobile[];
  emails?: Email[];
  staffs?: IdName[];
  assignTo: any;
  //websites?: WebSite[];
  website?: WebSite;
  flagshipProduct?: string; //main product
  relatedProducts?: Product[];
  account?: any;
  businessNumber?: string;
  lastActivityDate?: string;
  createdBy?: IdName | null;
  updatedBy?: IdName | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  id: string;
  label: {
    languageKey: string;
    label: string;
  };
  labelValue: string;
  zipcode: string;
  street: string;
  country: {
    isoCode2: string;
    country: string;
  };
  state: string;
  city: string;
  primary: Boolean;
}

export interface Phone {
  id: string;
  label: {
    languageKey: string;
    label: string;
  };
  labelValue: string;
  country: string;
  phoneNumber: string;
  extension: string;
}

export interface Mobile {
  id: string;
  label: {
    languageKey: string;
    label: string;
  };
  labelValue: string;
  country: string;
  mobileNumber: string;
}

export interface Email {
  id: string;
  label: {
    languageKey: string;
    label: string;
  };
  labelValue: string;
  email: string;
}

export interface WebSite {
  id: string;
  label: {
    languageKey: string;
    label: string;
  };
  labelValue: string;
  protocol: string;
  website: string;
}
export interface ShortCustomer {
  id: string;
  code: string;
  name: string;
  photo: string;
  addresses?: any[];
}

export interface CustomerQuickView {
  id: string;
  code: string;
  name: string;
  photo: string;
  category: string;
  typeEnum: string;
  type: any;
  contactTypeEnum: string;
  contactType: any;
  industries: any[];
  rating: {
    id: string;
    languageKey: string;
  };
  phones: any[];
  emails: any[];
  staffs: any[];
  flagshipProduct: string;
  annualRevenue: number;
}
