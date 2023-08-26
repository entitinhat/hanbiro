import { SelectBoxView, SwitchView, TextAreaView, TextView } from '@base/config/view-field/components';
import { LabelValue } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { PROCESS_CLOSED_PROPERTY_OPTIONS, PROCESS_CLOSED_VIEW_OPTIONS } from '@process/config/constants';
import * as keyNames from '@process/config/keyNames';

export const ClosedViewField = {
  [keyNames.KEY_NAME_CLOSED_NAME]: {
    languageKey: 'process_closed_name',
    showFullRow: true,
    component: TextView
  },
  [keyNames.KEY_NAME_CLOSED_DESCRIPTION]: {
    languageKey: 'process_closed_description',
    showFullRow: true,
    component: TextAreaView
  },
  [keyNames.KEY_NAME_CLOSED_PROPERTY]: {
    component: SelectBoxView,
    showFullRow: true,
    getValueView: (value: string) => PROCESS_CLOSED_PROPERTY_OPTIONS.find((opt) => opt.keyName == value)?.languageKey,
    getValueEdit: (value: string) => PROCESS_CLOSED_PROPERTY_OPTIONS.find((opt) => opt.keyName == value),
    getMutationValue: (value: OptionValue) => ({
      close: { [keyNames.KEY_NAME_CLOSED_PROPERTY]: value.keyName }
    }),
    getDefaultValue: (value: OptionValue) => value.keyName,
    languageKey: 'process_closed_property',
    componentProps: {
      options: PROCESS_CLOSED_PROPERTY_OPTIONS
    }
  },
  [keyNames.KEY_NAME_CLOSED_VIEW]: {
    component: TextView,
    showFullRow: true,
    languageKey: 'process_closed_view',
    getValueView: (v: string) => PROCESS_CLOSED_VIEW_OPTIONS.find((opt: LabelValue) => opt.value == v)?.label,
    getValueEdit: (v: string) => PROCESS_CLOSED_VIEW_OPTIONS.find((opt: LabelValue) => opt.value == v),
    getMutationValue: (v: LabelValue) => ({
      close: { [keyNames.KEY_NAME_CLOSED_VIEW]: v.value }
    }),
    getDefaultValue: (v: LabelValue) => v.value,
    componentProps: {
      options: PROCESS_CLOSED_VIEW_OPTIONS,
      isHorizontal: true
    }
  },
  [keyNames.KEY_NAME_CLOSED_JUMP]: {
    languageKey: 'process_closed_jump',
    component: SwitchView,
    showFullRow: true,
    componentProps: {
      label: 'process_business_form_msg_possible_to_jump'
    },
    viewProps: {
      label: 'process_business_form_msg_possible_to_jump'
    },
    getMutationValue: (value: boolean) => ({
      close: { [keyNames.KEY_NAME_CLOSED_JUMP]: value }
    }),
  }
};
