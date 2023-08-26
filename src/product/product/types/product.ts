import { IdName } from '@base/types/common';
import { User } from '@base/types/user';
import { Customer } from '@customer/types/interface';

export interface ShortProduct extends IdName {
  code: string;
}

export interface Product {
  [x: string]: any;
  createdAt?: Date;
  createdBy?: User;
  vendor?: Customer[];
}

export interface BoM extends ShortProduct {
  prod: IdName;
  attrValues: [
    {
      attr: IdName;
      id: string;
      name: string;
    }
  ];
  createdAt: string;
  itemCategory: {
    keyName: string;
    languageKey: string;
  };
  itemType: {
    keyName: string;
    languageKey: string;
  };
}

export interface Component {
  id: string;
  name: string;
  type: string;
  supplyMethod: string;
  unit: any;
  quantity: number;
}
