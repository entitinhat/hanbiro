import * as keyNames from '@settings/template/config/key-names';
import * as configViewGeneral from '@settings/template/config/view-fields';
import { FieldConfig } from '@base/types/pagelayout';

import { SelectBoxCustomViewField } from '@settings/template/config/view-fields/components';

import { TEMPLATE_MESSAGE_TYPE_OPTIONS } from '../constants';

import _ from 'lodash';
import { LabelValue } from '@base/types/app';

const configViewSMS: FieldConfig = {
  ...configViewGeneral?.default,

  [keyNames.KEY_MENU_TEMPLATE_SUB_TYPE]: {
    showFullRow: true,
    component: SelectBoxCustomViewField,
    schema: `subType`,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    componentProps: {
      isMultiple: false,
      isSearchable: false,
      options: TEMPLATE_MESSAGE_TYPE_OPTIONS,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    getValue: (value: any) => {
      const currentKey = value?.[keyNames.KEY_MENU_TEMPLATE_SUB_TYPE] ?? '';
      const currentValue = TEMPLATE_MESSAGE_TYPE_OPTIONS.filter((item) => item.value === currentKey)[0];
      return currentValue?.label;
    },
    getValueView: (value: LabelValue | string) => {
      if (_.isObject(value)) return value.label;
      return value;
    },
    getMutationValue: (value: LabelValue) => {
      return value.label;
    }
  }
};

export default configViewSMS;
