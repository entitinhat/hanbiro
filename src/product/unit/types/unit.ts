import { IdName } from '@base/types/common';
import { User } from '@base/types/user';

export interface UnitValue extends IdName {
  qty: number;
  unit?: IdName;
  relatedProducts?: IdName[] | null;
}

export interface BaseUnit extends IdName {
  active?: boolean;
  unitValues?: UnitValue[];
  createdAt?: Date;
  createdBy?: User;
  updatedAt?: Date;
  updatedBy?: User;
  [x: string]: any;
}
