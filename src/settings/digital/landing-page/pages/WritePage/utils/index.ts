import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import { LANDING_PAGE_TYPE_OPTIONS, TEMPLATE_TYPE_OPTIONS } from '@settings/digital/landing-page/config/constants';
import { LANGUAGES } from '@base/config/constant';
import { t } from 'i18next';

export const useFormDefaultValues = () => {
  let defaultVal: any = {};

  defaultVal = {
    [keyNames.KEY_NAME_LANDING_PAGE_NAME]: '',
    [keyNames.KEY_NAME_LANDING_PAGE_TYPE]: LANDING_PAGE_TYPE_OPTIONS.map((item) => {
      return {
        ...item,
        label: t(item.label)
      };
    })?.[0],
    [keyNames.KEY_NAME_LANDING_PAGE_LANGUAGE]: LANGUAGES[0].value,
    [keyNames.KEY_NAME_LANDING_PAGE_PRODUCT]: [],
    [keyNames.KEY_NAME_LANDING_PAGE_DESCRIPTION]: '',
    [keyNames.KEY_NAME_LANDING_PAGE_TEMPLATE]: null,
    [keyNames.KEY_NAME_LANDING_PAGE_TITLE]: '',
    [keyNames.KEY_NAME_LANDING_PAGE_HTML]: '',
    [keyNames.KEY_NAME_LANDING_PAGE_PUBLISH]: 'PUBLISH_UNBLISH',
    [keyNames.KEY_NAME_LANDING_PAGE_STAGE]: 'STAGE_BUILD',
    [keyNames.KEY_NAME_LANDING_PAGE_ASSIGN_TO]: [],
    [keyNames.KEY_NAME_LANDING_PAGE_PUBLISH_DATE]: new Date().toISOString(),
    [keyNames.KEY_NAME_LANDING_PAGE_TEMPLATE_TYPE]: TEMPLATE_TYPE_OPTIONS[0]
  };

  return defaultVal;
};
