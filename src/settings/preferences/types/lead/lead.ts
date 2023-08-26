export interface LeadSettingValue {
  id: string;
  name: string;
}

export interface CollectionMethodSetting extends LeadSettingValue {
  children?: LeadSettingValue[];
}
