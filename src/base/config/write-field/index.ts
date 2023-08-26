import * as keyNames from '@base/config/keyNames';
import { WriteConfig } from '@base/types/common';
// import * as components from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';

/**
 * Basic field by keyname
 */
/**
 * parseValue --> convert api value to component value
 * parseParam --> convert component value to api value
 */
export const BasicConfig: WriteConfig = {
  // [keyNames.KEY_NAME_NAME]: {
  //   component: components.Input,
  //   componentProps: {
  //     type: 'text',
  //   },
  //   validate: {},
  //   defaultValue: '',
  //   parseValue: (valueApi: string) => valueApi || '',
  //   parseParam: (value: string) => value,
  // },
};
