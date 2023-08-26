import { Currency, KeyValue, LanguageData } from '@base/types/common';
import { Country } from '@base/types/setting';

export interface Selection extends KeyValue {
  id?: string;
  keyName: string;
  languageKey: string;
  keyGroup?: string;
  keyRoot?: string;
  orderInList?: number;
  isBase?: boolean;
  isDefault?: boolean;
  isSystem?: boolean;
  parentId?: string;
  parentName?: string;
  language?: LanguageData;
  children?: Selection[];
  expand?: boolean;
  isLoading?: boolean;
  isLoaded?: boolean;
}

export interface FieldOption extends KeyValue {
  id: string;
  keyName: string;
  languageKey: string;
  isDefault?: boolean;
  keyRoot?: string;
  parentId?: string;
  children?: any;
}

/** ================================== OLD ========================================== */
export type FormatSettingValue =
  | string
  | NumberSetting
  | DateSetting
  | TimeSetting
  | Timezone[]
  | Country[]
  | CurrencySetting
  | BusinessHours
  | CalendarSetting;

export type FormatKey = 'number' | 'date' | 'country' | 'currency' | 'time' | 'timezone' | 'calendar' | 'business_hours' | 'fiscal_period';
export interface FormatSetting {
  id: string;
  menu: string;
  key: FormatKey;
  parse?: boolean;
  value: FormatSettingValue;
}

export interface NumberSetting {
  decimalSymbol?: string;
  noOfDecimal?: number;
  digitGroupingSymbol?: string;
  digitGroup?: string;
  negativeNumberFormat?: string;
}

export interface Timezone {
  nationEn: string;
  tzone: string;
  sdtime: string;
  sdutc: string;
  isDefault: boolean;
}
export interface CurrencySetting {
  currencyFormat: string;
  currencyFormats: string[];
  negativeCurrencyFormat: string;
  negativeCurrencyFormats: string[];
  usedCurrencies: Currency[];
}
// export interface Currency {
//   code: string;
//   currencyName: string;
//   currencySymbol: string;
//   isDefault: boolean;
// }

export interface CalendarSetting {
  from: number;
  to: number;
  firstDayOfWeek: number;
}
export interface DateSetting {
  firstDayOfWeek: number;
  firstWeekOfYear: number;
  dateFormat: string;
  dateSeparator: string;
}
export interface BusinessHours {
  startAt: string;
  endAt: string;
}
export interface TimeSetting {
  timeFormat: string;
  timeSeperator: string;
}
export interface IQuarter {
  from: string;
  to: string;
}
export interface IFiscalPeriodSetting {
  quarter1: IQuarter;
  quarter2: IQuarter;
  quater3: IQuarter;
  quater4: IQuarter;
}

export interface IPriceDiscountResponse {
  results: FormatSetting;
}
