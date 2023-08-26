import * as keyNames from '@campaign/config/keyNames';
import { CAMPAIGN_CATEGORY_EMAIL, CAMPAIGN_CATEGOTY_ENUM_EMAIL, CAMPAIGN_CATEGOTY_ENUM_SMS, STEP_FIELDS } from '@campaign/config/constants';

export const finalizeParams = (configParams: any, category: string, formStep: number) => {
  const newParams: any = {};

  newParams.category = category === CAMPAIGN_CATEGORY_EMAIL ? CAMPAIGN_CATEGOTY_ENUM_EMAIL : CAMPAIGN_CATEGOTY_ENUM_SMS;

  STEP_FIELDS[formStep].map((_field: string) => {
    newParams[_field] = configParams[_field];
  });

  //final step
  if (formStep === 2) {
    const configContent = configParams[keyNames.KEY_CAMPAIGN_CONTENT];
    newParams[keyNames.KEY_CAMPAIGN_EMAIL_TEMPALTE] = configContent.tpl;
    newParams[keyNames.KEY_CAMPAIGN_CONTENT] = JSON.stringify(configContent.content);
  }

  return newParams;
};
