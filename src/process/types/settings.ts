import { IconType } from '@base/types/app';
import { ShapeType } from './diagram';

import { BusinessStatus, DefinedTrigger, StepSetting, Wait } from './process';

export type SettingType = 'action' | 'criteria' | 'attribute' | 'wait' | 'trigger' | 'all';

export type DefinedItemType = 'TYPE_NONE' | 'TYPE_ACTION' | 'TYPE_CRITERIA' | 'TYPE_WAIT' | 'TYPE_SITE' | 'TYPE_ATTRIBUTE' | 'TYPE_TRIGGER';

export interface ActionProperty {
  value: SettingType;
  label: string;
  icon: string;
  iconType: IconType;
  iconPosition?: 'bottom' | 'top' | 'end' | 'start';
  type: DefinedItemType;
}

export interface DefinedItem {
  id: string;
  type: DefinedItemType;
  name: string;
  description: string;
  shape: ShapeType;
  setting?: StepSetting;
  trigger?: DefinedTrigger;
  wait?: Wait;
  statuses?: BusinessStatus[];
  fixed: boolean;
}

export interface SettingWrite {
  writeComponent?: string;
  isOpenWrite?: boolean;
  writeTitle?: string;
  writeData?: DefinedItem;
}

export interface SettingOpen {
  open: boolean;
  type: SettingType;
  size: number;
  data?: DefinedItem;
}
