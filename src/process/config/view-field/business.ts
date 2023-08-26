import { SelectBoxView, SwitchView, TextAreaView, TextView, UserView } from '@base/config/view-field/components';
import { OptionValue } from '@base/types/common';
import { MODULE_OPTIONS, PROCESS_TRIGGER_OPTIONS } from '@process/config/constants';
import * as keyNames from '@process/config/keyNames';
import { ProductView } from '@product/item/config/view-field/components';
import { User, AssignToName } from '@base/types/user';

const BusinessViewField = {
  [keyNames.KEY_NAME_BUSINESS_MODULE]: {
    component: TextView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    showFullRow: true,
    languageKey: 'process_business_module',
    getValueView: (v: string) => MODULE_OPTIONS.find((e) => e.keyName == v)?.languageKey
  },
  [keyNames.KEY_NAME_BUSINESS_NAME]: {
    component: TextView,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    languageKey: 'process_business_name'
  },
  [keyNames.KEY_NAME_BUSINESS_DESCRIPTION]: {
    component: TextAreaView,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off',
      rows: 2
    },
    showFullRow: true,
    languageKey: 'process_business_description'
  },
  [keyNames.KEY_NAME_BUSINESS_ASSIGN_USER]: {
    component: UserView,
    componentProps: {
      single: false,
      showAvatar: true,
      placement: 'left'
    },
    showFullRow: true,
    languageKey: 'process_business_assign_user',
    getDefaultValue: (v: AssignToName[]) => v?.map((e) => ({ id: e.user.id, name: e.user.name })),
    getValueView: (v: User[]) => v?.map((e) => ({ user: { id: e.id, name: e.name } })),
    getValueEdit: (v: User[]) => v?.map((e) => ({ user: { id: e.id, name: e.name } }))
  },
  [keyNames.KEY_NAME_BUSINESS_PRODUCT]: {
    component: ProductView,
    showFullRow: true,
    languageKey: 'process_business_product',
    getDefaultValue: (v: any[]) => v?.map((e) => ({ id: e.id, name: e.name })),
    getMutationValue: (v: any[]) => ({
      [keyNames.KEY_NAME_BUSINESS_PRODUCT]: v?.map((e) => ({ id: e.id, name: e.name }))
    })
  },
  [keyNames.KEY_NAME_BUSINESS_SEND_EMAIL]: {
    component: SwitchView,
    languageKey: 'process_business_send_email',
    showFullRow: true
  },
  [keyNames.KEY_NAME_BUSINESS_TRIGGER]: {
    component: SelectBoxView,
    componentProps: {
      options: PROCESS_TRIGGER_OPTIONS
    },
    showFullRow: true,
    languageKey: 'process_business_trigger',
    getDefaultValue: (v: OptionValue) => v.keyName,
    getValueView: (v: string) => PROCESS_TRIGGER_OPTIONS.find((e) => e.keyName == v)?.languageKey,
    getValueEdit: (v: string | OptionValue) => {
      if (typeof v == 'string') {
        return PROCESS_TRIGGER_OPTIONS.find((e) => e.keyName == v)!!;
      } else {
        return v;
      }
    },
    getMutationValue: (v: OptionValue) => ({
      [keyNames.KEY_NAME_BUSINESS_TRIGGER]: v.keyName
    })
  }
};

export default BusinessViewField;
