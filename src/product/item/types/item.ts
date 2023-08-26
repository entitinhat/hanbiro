import { IdName } from '@base/types/common';

export interface ItemPrice {
  amount: number;
  currency: string;
}

export interface Item {
  [x: string]: any;
}
export interface ProductItem extends Item {
  name: string;
  code: string;
  unitVal?: IdName;
  attrValues?: IdName[];
  // basePrice?: ItemPrice[];
  // costPrice?: ItemPrice[];
  // purchasePrice?: ItemPrice[];
  openStock?: number;
  replenishmentPoint?: number;
  sku?: string;
}
