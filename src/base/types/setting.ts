export interface SettingSelectionPayload {
  results: any[];
}

export interface MenuLanguageResponse {
  results: any;
}

export interface AvailableCountry {
  isoCode2: string;
  isoCode3: string;
  country: string;
  phoneCode: string;
  region: string;
  currency: string;
}
export interface Country extends AvailableCountry {
  id: string;
  isDefault: boolean;
}

export interface Template {
  id: string;
  name: string;
  properties?: string;
  templateGroup?: string;
  templateThumbnail?: string;
  html?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}
export interface GrapeEditorValue {
  content: {
    html: string;
    css: string;
  };
  tpl: Template;
}
export interface TemplateDetail {
  options: string;
}
export interface MenuSetting {
  id: string;
  key: string;
  menu: string;
  value: string;
}
export interface MenuSettingResponse {
  id: string;
  key: string;
  menu: string;
  value: string;
}

export interface UserSetting {
  id: string;
  user?: string;
  key: string;
  menu: string;
  value: string;
}

export interface ColumnSetting {
  keyName: string;
  languageKey: string;
  defaultViewInList: boolean;
  sortable: boolean;
  // for disable checkbox
  isDisabled: boolean;
}
