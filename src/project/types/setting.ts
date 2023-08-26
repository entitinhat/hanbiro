export type SettingType =
  | 'TYPE_PROJECT'
  | 'TYPE_PAGE'
  | 'TYPE_DEV'
  | 'TYPE_DEV_SOURCE'
  | 'TYPE_NOTE_CATEGORY'
  | 'TYPE_TASK_RESULT'
  | 'TYPE_COST'
  | 'TYPE_MEMBER_FIELD';

export interface SettingMeta {
  cost?: number;
  results?: string[];
}

export interface Setting {
  id: string;
  name: string;
  type: SettingType;
  meta?: SettingMeta;
  default: boolean;
  fixed?: boolean;
  new?: boolean;
  edit?: boolean;
}

export interface SettingResponse {
  results: Setting[];
}

export interface SettingRequest {
  setting: Setting;
}
