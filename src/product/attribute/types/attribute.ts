import { IdName } from '@base/types/common';
import { User } from '@base/types/user';

export interface AttributeValue extends IdName {
  attr?: IdName;
}

export interface Attribute extends IdName {
  createdAt?: Date;
  createdBy?: User;
  values?: AttributeValue[];
}
