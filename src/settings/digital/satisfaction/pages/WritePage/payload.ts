import * as keyNames from '@settings/digital/satisfaction/config/keyNames';

export const finalizeParams = (params: any) => {
  let newParams: any = { ...params };

  //survey content
  if (params[keyNames.KEY_SATISFACTION_SURVEY_CONTENT]) {
    newParams.question = JSON.stringify(params[keyNames.KEY_SATISFACTION_SURVEY_CONTENT]?.sections || '');
    newParams.headerImage = params[keyNames.KEY_SATISFACTION_SURVEY_CONTENT]?.headerImg || '';
    newParams.headerLineColor = params[keyNames.KEY_SATISFACTION_SURVEY_CONTENT]?.headerLineColor || '';
    newParams.bgColor = params[keyNames.KEY_SATISFACTION_SURVEY_CONTENT]?.bgColor || '';
  }
  //delete content
  delete newParams[keyNames.KEY_SATISFACTION_SURVEY_CONTENT];
  //delete newParams[keyNames.KEY_SATISFACTION_SURVEY_TYPE];
  //delete newParams[keyNames.KEY_SURVEY_TEMPLATE];

  return newParams;
};
