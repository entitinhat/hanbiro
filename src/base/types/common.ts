import { Attribute, PageLayoutSectionField } from './pagelayout';
import { User } from './user';

export interface KeyValue {
  [key: string]: any;
}

export interface PaginateInput {
  page: number;
  size: number;
}
export interface PaginateResponse {
  totalItems: number;
  totalPage: number;
  currentPage: number;
}

export interface SortInput {
  field: string;
  orderBy: number;
}

export interface FilterInput {
  sort?: SortInput;
  paging?: PaginateInput;
  filters?: any;
  keyword?: string;
  query?: string;
}

export interface NumberSetting {
  decimalSymbol?: string;
  noOfDecimal?: number;
  digitGroupingSymbol?: string;
  digitGroup?: string;
  negativeNumberFormat?: string;
}

export interface SourceInput {
  menu: string;
  id: string;
}

export interface AddAssignInput {
  id: string;
  assignTo: any;
}

export interface DeleteAssignInput {
  id: string;
  userId: string;
}

export interface LanguageData {
  id?: string;
  langKey?: string;
  menu?: string;
  en: string;
  vi: string;
  ko: string;
  jp: string;
  zh: string;
  ido: string;
}

export interface IdName {
  id: string;
  name: string;
}

export interface IdLanguageKey {
  id: string;
  languageKey: string;
}

export interface IdKeyNameLanguageKey {
  id: string;
  keyName: string;
  languageKey: string;
}

export interface FieldValue {
  field: string;
  value: string;
}

export interface DurationValue {
  duration: number; //Duration - Save second
  durationUnit: string; // Duration Unit - s(second), i(minute), h(hour), d(day), w(week), m(Month)
}

export interface Duration {
  time: number;
  unit: string;
}

export interface WriteFieldConfig {
  /** Component For Field it will extend from CommonViewField : View, Edit */
  component: any;
  /** Component Props passed to component */
  componentProps?: any;
  /** Field schema */
  showFullRow?: boolean;
  /** Validate rule */
  validate?: any;
  /** default value for field  */
  defaultValue?: any;
  /** Custom parse params for write api */
  parseParam?: (params: any) => {} | null;
  /** Custom parse value */
  parseValue?: (params: any) => {} | null;
  /** Custom Props for render write component*/
  getProps?: (field: PageLayoutSectionField, attrs: Attribute[]) => {};
  /** Custom Props to hide field title*/
  hideTitle?: boolean;
}

export interface WriteConfig {
  [key: string]: WriteFieldConfig;
}

export interface Cost {
  value: number;
  currency: Currency;
}
export interface CostType {
  type?: string;
  value: number;
  currency: Currency;
}
export interface Currency {
  id?: string;
  code?: string;
  currencyName: string;
  currencySymbol: string;
  currencyFormat?: string;
  isDefault?: boolean;
}

export interface FilterByOption {
  label: string;
  value: string;
  component?: any; // Component will render on filter header
  componentProps?: any;
  getValue?: any; // Get value from onChange event of root component
  setValue?: any; // Set value to component
  parseExtra?: any; // Parse extra data to label
}

export interface SearchFields {
  key: string;
  type: string;
  label: string;
  value: string;
}

export interface OptionValue {
  keyName: string;
  languageKey: string;
  extra?: any;
}

export interface WriteOption {
  writeType: string;
  isOpenWrite: boolean;
  writeParam?: any;
}

export interface Duration {
  time: number;
  unit: string;
}

export interface LanguageKeyLabel {
  languageKey: string;
  label: string;
}

export interface WebsiteType extends KeyValue {
  label: LanguageKeyLabel;
  labelValue: string;
  protocol: string;
  website: string;
}

export interface AddressType extends KeyValue {
  country: any; //TODO: CountryType
  zipcode: string;
  state: string;
  city: string;
  street: string;
}

export interface StateType {
  subdivision: string;
}

export interface CityType {
  city: string;
}

export interface EmailType extends KeyValue {
  label: LanguageKeyLabel;
  labelValue: string;
  email: string;
}

export interface PhoneType extends KeyValue {
  label: LanguageKeyLabel;
  labelValue: string;
  country: any; //TODO: CountryType
  phoneNumber: string;
  extension: string;
}

export interface MobileType extends KeyValue {
  label: LanguageKeyLabel;
  labelValue: string;
  country: any; //TODO: CountryType
  mobileNumber: string;
}

export interface FaxType extends KeyValue {
  label: LanguageKeyLabel;
  labelValue: string;
  country: any; //TODO: CountryType
  faxNumber: string;
}

export interface AnniversaryType extends KeyValue {
  label: LanguageKeyLabel;
  labelValue: string;
  anniversary: string;
}

export interface CountryType extends KeyValue {
  isDefault: boolean;
  country: string;
  isoCode2: string;
  isoCode3: string;
  phoneCode: string;
  region: string;
}

export interface Recovery {
  [key: string]: any;
  id: string;
  aggId: string;
  aggType: number;
  title: string;
  createdAt?: Date;
  createdBy?: User;
  deletedAt?: Date;
  deletedBy?: User;
}
