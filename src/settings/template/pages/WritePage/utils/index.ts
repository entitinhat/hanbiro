import * as keyNames from '@settings/template/config/key-names';
import { TEMPLATE_TYPE_OPTIONS, TEMPLATE_MESSAGE_TYPE_OPTIONS, TEMPLATE_TASK_TYPE_OPTIONS } from '@settings/template/config/constants';

export const useFormDefaultValues = (group: string) => {
  let defaultVal: any = {};
  if (group == 'sms') {
    defaultVal = {
      [keyNames.KEY_MENU_TEMPLATE_NAME]: '',
      [keyNames.KEY_MENU_TEMPLATE_TYPE]: TEMPLATE_TYPE_OPTIONS[0],
      [keyNames.KEY_MENU_TEMPLATE_SUB_TYPE]: TEMPLATE_MESSAGE_TYPE_OPTIONS[1],
      [keyNames.KEY_MENU_TEMPLATE_LANGUAGE]: null,
      [keyNames.KEY_MENU_TEMPLATE_PRODUCT]: [],
      [keyNames.KEY_MENU_TEMPLATE_DESCRIPTION]: '',
      [keyNames.KEY_MENU_TEMPLATE_TEMPLATE]: null,
      [keyNames.KEY_MENU_TEMPLATE_SUBJECT]: '',
      [keyNames.KEY_MENU_TEMPLATE_DESGIN]: { html: '<body></body>', css: '' }
    };
  } else if (group == 'task') {
    defaultVal = {
      [keyNames.KEY_MENU_TEMPLATE_NAME]: '',
      [keyNames.KEY_MENU_TEMPLATE_TYPE]: TEMPLATE_TYPE_OPTIONS[0],
      [keyNames.KEY_MENU_TEMPLATE_SUB_TYPE]: TEMPLATE_TASK_TYPE_OPTIONS[1],
      [keyNames.KEY_MENU_TEMPLATE_LANGUAGE]: null,
      [keyNames.KEY_MENU_TEMPLATE_PRODUCT]: [],
      [keyNames.KEY_MENU_TEMPLATE_DESCRIPTION]: '',
      [keyNames.KEY_MENU_TEMPLATE_TEMPLATE]: null,
      [keyNames.KEY_MENU_TEMPLATE_SUBJECT]: '',
      [keyNames.KEY_MENU_TEMPLATE_DESGIN]: { html: '<body></body>', css: '' }
    };
  } else {
    //email
    defaultVal = {
      [keyNames.KEY_MENU_TEMPLATE_NAME]: '',
      [keyNames.KEY_MENU_TEMPLATE_TYPE]: TEMPLATE_TYPE_OPTIONS[0],
      [keyNames.KEY_MENU_TEMPLATE_LANGUAGE]: null,
      [keyNames.KEY_MENU_TEMPLATE_PRODUCT]: [],
      [keyNames.KEY_MENU_TEMPLATE_DESCRIPTION]: '',
      [keyNames.KEY_MENU_TEMPLATE_TEMPLATE]: null,
      [keyNames.KEY_MENU_TEMPLATE_SUBJECT]: '',
      [keyNames.KEY_MENU_TEMPLATE_DESGIN]: { html: '<body></body>', css: '' }
    };
  }

  return defaultVal;
};
