import { OptionValue } from '@base/types/common';

export const USER_TYPE_INTERNAL = 'USER_TYPE_INTERNAL';
export const USER_TYPE_EXTERNAL = 'USER_TYPE_EXTERNAL';

export const USER_TYPE_OPTIONS: OptionValue[] = [
  { keyName: USER_TYPE_INTERNAL, languageKey: 'Internal' },
  { keyName: USER_TYPE_EXTERNAL, languageKey: 'External' }
];
