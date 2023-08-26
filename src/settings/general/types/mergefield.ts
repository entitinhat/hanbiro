export interface MergeField {
  id: string;
  menu: string;
  fieldTag: string;
  replace: string;
  fixed: boolean;
  order: number;
}

export type OrderItem = {
  id: string;
  order: number;
};
