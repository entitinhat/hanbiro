import * as commonConfig from '@base/config/view-field';
import * as keyNames from '../keyNames';
import * as components from './components';
import { FieldConfig } from '@base/types/pagelayout';
import { TextAreaView } from '@base/config/view-field/components';

const viewConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.KEY_UNIT_RELATED_PRODUCTS]: {
    schema: `relatedProducts {
      id
      name
    }`,
    component: components.RelateProductViewField,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_UNIT_VALUES]: {
    schema: `unitValues {
      id
      name
      qty
      relatedProducts {
        id
        name
      }
    }`,
    component: null
  },
  [keyNames.KEY_UNIT_DESCRIPTION]: {
    schema: `description`,
    component: TextAreaView
  }
};

export default viewConfig;
