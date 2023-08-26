import * as keyNames from '@process/config/keyNames';
import { TextView, TextAreaView } from '@base/config/view-field/components';

const StageViewField = {
  [keyNames.KEY_NAME_STAGE_NAME]: {
    languageKey: 'process_stage_name',
    showFullRow: true,
    component: TextView,
    getValueView: (value: string) => value,
  },
  [keyNames.KEY_NAME_STAGE_DESCRIPTION]: {
    languageKey: 'process_stage_description',
    showFullRow: true,
    component: TextAreaView,
    getValueView: (value: string) => value,
  },
  // [keyNames.KEY_NAME_STAGE_PROPERTY]: {
  //   languageKey: 'process_stage_property',
  //   showFullRow: true,
  //   component: Switch,
  //   checkFieldEdit: (value: string) => (value != 'PROPERTY_START'),
  //   getValueView: (value: string) => (value == 'PROPERTY_CLOSE' ? true : false),
  //   getValueEdit: (value: string) => (value == 'PROPERTY_CLOSE' ? true : false),
  //   getMutationValue: (value: string) => ({
  //     [keyNames.KEY_NAME_STAGE_PROPERTY]: value ? 'PROPERTY_CLOSE' : 'PROPERTY_LINK',
  //   }),
  // },
};

export default StageViewField;
