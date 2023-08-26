import { FunctionComponent, ReactNode } from 'react';

import { FieldUserPermission, ViewFieldConfig } from '@base/types/pagelayout';

export interface CommonViewFieldProps {
  /** Component for view mode */
  componentView?: any; //ReactNode | FunctionComponent;
  /** Component for Edit mode */
  componentEdit?: any; //ReactNode | FunctionComponent;
  /** permission for component */
  userPermission?: FieldUserPermission;
  /** callback save action*/
  onSave?: (keyName: string, isSuccess: boolean, value: any) => void; // value: edit component value <=> hook form value
  /** TODO: same onSave ? */
  onSubmitHandler?: (params: any) => void; // external form submit
  /** callback for close  action*/
  onClose?: (fieldName: string, value?: any) => void; // value: edit component value <=> hook form value
  /** callback for refetch action*/
  // onRefetch?: () => void;
  /** callback for delete action */
  // onDelete?: (params: any) => void;
  /** default value for component */
  value: any;
  /** change value */
  onChange?: any;
  //display under link format
  // link?: string;
  /** event onClik to link */
  // onClickLink?: (params: any) => void;
  /** field config */
  config?: ViewFieldConfig;
  /** field keyName */
  keyName: string;
  /** layout style */
  isHorizontal?: boolean;
  // id: string;
  /** id is viewing */
  menuSourceId: string;
  // menu: string;
  // category: string;
  /** Menu Source  */
  menuSource: string;
  /** Only show edit component when click Edit icon */
  clickIconToEdit?: boolean;
  // isValid?: boolean;
  // isSaving?: boolean;
  /** Object view data */
  viewData?: any;
  /** setQueryData useQueryClient */
  setQueryData?: string[];
  metadata?: any;
  checkEqual?: boolean;
  /** turn on flag is public for site - non-authorized */
  isPublic?: boolean;
  /**using this for format component from IAM Web */
  isIAMComponent?: boolean;
  /**Using this to trigger appear edit component frist instead of view component */
  isDefaultEdit?: boolean;
}

export interface CommonViewProps {
  keyName?: string;
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
  metadata?: any;
  [x: string]: any;
}

export interface CommonEditProps {
  keyName?: string;
  value?: any;
  onChange?: (params?: any) => void;
  componentProps?: {
    [x: string]: any;
  };
  metadata?: any;
  [x: string]: any;
}
