import {
  SETTING_CTA_CONTENT_TYPE_LANDING_PAGE,
  SETTING_CTA_CONTENT_TYPE_SITE,
  SETTING_CTA_CONTENT_TYPE_SURVEY
} from '@settings/digital/cta/config/constants';

export const finalizeParams = (params: any, variableKey = 'cta') => {
  let newParams: any = {
    linkUrl: params?.linkUrl?.link ?? '',
    linkBlank: params?.linkUrl?.openNewWindow ?? false.valueOf,
    txtFontWeight: params?.txtFontWeight?.value,
    txtFontSize: Number(params?.txtFontSize),
    txtRounded: Number(params?.txtRounded)
  };

  // if(params?.contentType == SETTING_CTA_CONTENT_TYPE_LANDING_PAGE){
  //   newParams.landingPage= {
  //     id: params?.landingPage?.name?.id,
  //     name: params?.landingPage?.name?.name
  //   }
  //   newParams.landingPageTitle= params?.landingPage?.title
  // }

  // if(params?.contentType == SETTING_CTA_CONTENT_TYPE_SITE){
  //   newParams.site = {
  //     id: params?.site?.name?.id,
  //     name: params?.site?.name?.name
  //   }
  //   newParams.siteTitle= params?.site?.title
  // }

  // if(params?.contentType == SETTING_CTA_CONTENT_TYPE_SURVEY){
  //   newParams.survey = {
  //     id: params?.survey?.name?.id,
  //     name: params?.survey?.name?.name
  //   }
  //   newParams.surveyTitle = params?.survey?.title
  // }

  delete params.ctaValue;
  delete params.linkUrl;
  delete params.resourceType;

  newParams = {
    ...params,
    ...newParams
  };

  return {
    [variableKey]: newParams
  };
};
