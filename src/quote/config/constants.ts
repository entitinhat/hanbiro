import Icon from '@base/assets/icons/svg-icons';
import { LabelValueIcon } from '@base/types/app';
import { OptionValue } from '@base/types/common';
//import * as keyNames from '@quote/config/keyNames';

//category
export const QUOTE_CATEGORY_ORIGINAL = 'QUOTE';
export const QUOTE_CATEGORY_REVISION = 'REVISION';

export const FILE_TYPE_NONE = 'TYPE_NONE';
export const FILE_TYPE_CTA = 'TYPE_CTA';
export const FILE_TYPE_LANDING_PAGE = 'TYPE_LANDING_PAGE';
export const QUOTE_ITEM_TYPE_GENERAL = 'QUOTE_ITEM_TYPE_GENERAL';
export const QUOTE_ITEM_TYPE_PREPAID = 'QUOTE_ITEM_TYPE_PREPAID';
export const QUOTE_ITEM_TYPE_SUBSCRIPTION = 'QUOTE_ITEM_TYPE_SUBSCRIPTION';

export const FILE_TYPE_OPTIONS: OptionValue[] = [
  { keyName: FILE_TYPE_NONE, languageKey: 'none' },
  { keyName: FILE_TYPE_CTA, languageKey: 'CTA' },
  { keyName: FILE_TYPE_LANDING_PAGE, languageKey: 'Landing page' }
];

export const QUOTE_TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
  {
    label: 'Import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'Export',
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'Quote  Preferences',
    value: 'quote_setting',
    icon: Icon('quotes')
  }
];

//delete groupby
export const QUOTE_DELTED_OPTIONS: LabelValueIcon[] = [
  {
    label: 'Import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'Export',
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'ncrm_common_btn_empty_all',
    value: 'empty',
    icon: Icon('empty')
  }
];
