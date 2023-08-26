import * as keyNames from '@settings/sites/config/key-names';
import { SITE_TYPE_OPTIONS, SITE_MESSAGE_TYPE_OPTIONS } from '@settings/sites/config/constants';

export const useFormDefaultValues = (group: string) => {
  let defaultVal: any = {};
  if (group == 'sms') {
    defaultVal = {
      [keyNames.KEY_MENU_SITE_NAME]: '',
      [keyNames.KEY_MENU_SITE_TYPE]: SITE_TYPE_OPTIONS[1],
      [keyNames.KEY_MENU_SITE_SMS_TYPE]: SITE_MESSAGE_TYPE_OPTIONS[1],
      [keyNames.KEY_MENU_SITE_LANGUAGE]: 'en',
      [keyNames.KEY_MENU_SITE_PRODUCT]: [],
      [keyNames.KEY_MENU_SITE_DESCRIPTION]: '',
      [keyNames.KEY_MENU_SITE_OWNER]: [],
      [keyNames.KEY_MENU_SITE_TEMPLATE]: null,
      [keyNames.KEY_MENU_SITE_SUBJECT]: '',
      [keyNames.KEY_MENU_SITE_DESGIN]: { html: '<body></body>', css: '' }
    };
  } else {
    //desk
    defaultVal = {
      [keyNames.KEY_MENU_SITE_NAME]: '',
      [keyNames.KEY_MENU_SITE_TYPE]: SITE_TYPE_OPTIONS[1],
      [keyNames.KEY_MENU_SITE_LANGUAGE]: 'en',
      [keyNames.KEY_MENU_SITE_PRODUCT]: [],
      [keyNames.KEY_MENU_SITE_DESCRIPTION]: '',
      [keyNames.KEY_MENU_SITE_OWNER]: [],
      [keyNames.KEY_MENU_SITE_TEMPLATE]: null,
      [keyNames.KEY_MENU_SITE_SUBJECT]: '',
      [keyNames.KEY_MENU_SITE_DESGIN]: { html: '<body></body>', css: '' }
    };
  }

  return defaultVal;
};
