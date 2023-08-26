import { MENU_ACTIVITY } from '@base/config/menus';
import { keys } from 'lodash';
import { dateRangeIncludeCustomOptions, dateRangeOptions } from '@base/config/options';
import { GroupTreeAutocomplete } from '@base/components/@hanbiro/DirectoryGroup';

export const CATEGORY_COMPARISON = 'comparison';
export const MENU_CATEGORY_COMPARISON = `${MENU_ACTIVITY}_${CATEGORY_COMPARISON}`;

export const filterOptions = [
  {
    label: 'ncrm_activity_groups',
    value: 'groupIds',
    component: GroupTreeAutocomplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }
];
//old dateRangeIncludeCustomOptions
export const periodOptions = keys(dateRangeOptions).map((k) => {
  return {
    label: dateRangeOptions[k],
    value: k
  };
});
