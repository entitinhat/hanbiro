import { IdName } from '@base/types/common';

import { MultipleType, ShapeType } from './diagram';
import { StepSetting } from './process';
import { DefinedItemType } from './settings';

export type UpdateStatusNextStepRequest = {
  id: string;
  stepId: string;
  status: {
    id: string;
    nextStep: IdName;
    multiple: MultipleType;
  };
};

export type DeleteStepRequest = {
  id: string;
  stepId: string;
};

export interface DefinedItemRequest {
  type: DefinedItemType;
  name: string;
  description: string;
  shape: ShapeType;
  setting?: StepSetting;
  data: string;
}
