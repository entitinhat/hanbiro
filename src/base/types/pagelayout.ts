export interface PageLayout {
  [key: string]: any | undefined;
}

export interface PageLayoutPayload {
  data: {
    menuPagelayout: PageLayout;
  };
}

export interface PageLayoutSchema {
  data: PageLayoutSectionField[];
  schema: string;
  keyNames: string[];
}

export interface Attribute {
  keyName: string;
  languageKey: string;
  value: string;
  defaultValue?: string;
}

export interface ViewFieldConfig {
  /** Component For Field it will extend from CommonViewField : View, Edit */
  component?: any;
  /** Component Props passed to component */
  componentProps?: any;
  /** Field schema */
  schema?: string;
  /** Get Value to render view component */
  getValueView?: (fieldValue: any) => {};
  /** Get Value to render edit component */
  getValueEdit?: (fieldValue: any) => {} | null;
  /**getPropsEdit: set additional props for edit component.  */
  // getPropsEdit?: (viewData: any) => {};
  /**getValue: return field value from api response.  */
  getValue?: (viewData: any) => {};
  /**getMutationValue: return mutation value for modified api */
  /**return field value to update by mutation.  */
  getMutationValue?: (fieldValue: any, viewData?: any) => {} | null;
  /**return field value to update recoil.  */
  // getRecoilStateValue?: (fieldValue: any) => {} | null;
  /**return field value to view after update in some special cases.  */
  // getChangedValue?: (changedValue: any) => {} | null;
  getDefaultValue?: (value: any) => {} | null;
  /** Validate rule */
  validate?: Record<string, any>;
  /** fetch List is used for lookup type  */
  // fetchList?: (params: any) => {};
  sectionId?: string;
  /** call api after save */
  refetchQueryKey?: string[] | string[][];
  optimisticQueryKey?: string[];
  /** array Field extra. it will get form viewData */
  getExtraMutationParam?: (viewData: any, currentValue?: any) => {};
  /** view data of page view */
  viewData?: any;
  /** show one row */
  showFullRow?: boolean;
  languageKey?: string;
  /** hide or show field name */
  hideFieldLabel?: boolean;
  /** api save */
  onSave?: (params: any) => {};
  /** view field props */
  viewProps?: Record<string, any>;
}

export interface FieldConfig {
  [key: string]: ViewFieldConfig;
}
export interface PageLayoutSectionField {
  children: PageLayoutSectionField[];
  dataType: string;
  defaultViewInList: boolean;
  isViewing?: boolean;
  hidden: boolean;
  id: string;
  isDefault: boolean;
  keyName: string;
  languageKey: string;
  name: string;
  order: number;
  orderInList: number;
  orderInView: number;
  orderInWrite: number;
  showInList: boolean;
  showInView: boolean;
  showInWrite: boolean;
  title: string;
  userPermission?: FieldUserPermission;
  options?: PageLayoutSectionField[];
  attributes?: Attribute[];
  data?: any;
  config?: Record<string, any>;
}

export interface PageLayoutData {
  menu: string;
  code: string;
  layout: PageLayoutSchema;
  menuSourceId: string | undefined | null;
  menuSource: string;
  showFields?: string[];
  forceUpdating?: boolean;
  data?: any;
}
export interface FieldUserPermission {
  /** Can Edit field value */
  isEdit?: Boolean;
  /** Can Show field value */
  isShow?: Boolean;
  /** Field can be sortable or not */
  isSortable?: Boolean;
}
export interface PageLayoutField {
  data: any;
  attributes: any[];
  children: any[];
  dataType: string;
  defaultViewInList: Boolean;
  hidden: Boolean;
  id: string;
  isDefault: Boolean;
  keyName: string;
  languageKey: string;
  name: string;
  order: Number;
  orderInList: Number;
  orderInView: Number;
  orderInWrite: Number;
  showInList: Boolean;
  showInView: Boolean;
  showInWrite: Boolean;
  title: string;
  userPermission: FieldUserPermission;
  config: any;
  dataTypeFormat?: string;
  componentView?: string;
  // componentEdit?: string;
}

export interface PageLayoutResponse extends PageLayout {
  menu: string;
  id: string;
  list: PageLayoutSchema;
  view: PageLayoutSchema;
  write: PageLayoutSchema;
}

export interface DataSourceProps {
  /** isMultiple or not */
  isMultiple?: boolean;
  /** UI style: dropdown */
  ui?: string;
  /** it can search or not */
  isSearch?: boolean;
  /** fieldValue */
  fieldValue?: string;
  /** fieldLabel */
  fieldLabel?: string;
  /** fetchList api */
  fetchList?: (params: any) => {};
  /**useDefault : true in value properites */
  useDefault?: boolean;
}
