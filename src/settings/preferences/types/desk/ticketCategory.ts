import { DurationValue, IdName, OptionValue } from '@base/types/common';
import { Product } from '@product/product/types/product';

export interface TicketCategoryRule {
  id: string;
  isAllProducts: boolean;
  products: IdName[];
  priority: OptionValue | null;
  averageTimeResolve: DurationValue;
}
export interface TicketCategory {
  id: string;
  name: string;
  rules: TicketCategoryRule[];
}
