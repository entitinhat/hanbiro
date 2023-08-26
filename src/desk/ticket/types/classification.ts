import { IdName } from '@base/types/common';

export interface ClassifficationValue {
  value: string;
  classification: IdName;
}
export interface Classiffication {
  id: string;
  name: string;
  values: string[];
}
export interface ClassifficationOption {
  value: string;
  label: string;
}
