import { FieldConfig } from '@base/types/pagelayout';
import * as keyNames from '@settings/users-groups/groups/config/keyNames';
// import * as commonConfig from '@base/config/view-field';
import * as commonComponents from '@base/config/view-field/components';
// import * as components from './components';
import validators from '@base/utils/validation/fieldValidator';
//FieldConfig
const viewFieldsConfig: FieldConfig = {
  [keyNames.KEY_GROUPS_NAME]: {
    component: commonComponents.TextView,
    componentProps: {},
    validate: {
      required: validators.required
    }
  },
  [keyNames.KEY_GROUPS_URL]: {
    component: commonComponents.TextView,
    componentProps: {},
    validate: {
      required: validators.required,
      maxLength: (values: string) => validators.maxLength(values, 63)
    }
  },
  [keyNames.KEY_GROUPS_DESCRIPTION]: {
    component: commonComponents.TextView,
    showFullRow: true,
    componentProps: {}
  }
};
export default viewFieldsConfig;
