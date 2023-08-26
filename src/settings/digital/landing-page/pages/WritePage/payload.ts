import * as keyNames from '@settings/digital/landing-page/config/keyNames';


export const finalizeParams = (params: any, variableKey = 'landingPage') => {
  let newParams: any = {
    // linkUrl: params?.linkUrl?.link ?? '',
    // openPageInNewWindow: params?.linkUrl?.openNewWindow ?? false.valueOf,
    // language: params?.language?.value ?? params?.language ?? '',
  };

  delete params.templateType;


  newParams = {
    ...params,
    ...newParams
  };

  return {
    [variableKey]: newParams
  };
};