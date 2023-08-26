import { IdName } from '@base/types/common';

export interface ProductGroup extends IdName {
  parent?: IdName;
  children?: ProductGroup[];
  nodeType?: string;
  countProducts?: number;
  createAt?: string;
  paging?: ProductGroupPaging;
  updateAt?: string;
  updateBy?: IdName;
  length?: number;
  description?: string;
}

export interface ProductGroupPaging {
  page: number;
  nextPage: number;
  size: number;
  totalPage: number;
}