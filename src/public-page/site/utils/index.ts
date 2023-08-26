import { Base64 } from 'js-base64';
import UrlParams from '@base/utils/helpers/urlParams';
import { SiteParam } from '@public-page/site/types/interfaces';
import { ESiteType, ETrackingType } from '@public-page/site/types/enums';
import { Token } from '@public-page/types';
import { tokenExtract } from '@public-page/utils';

//utm_id=xxxxxxx&utm_source=marketo&utm_medium=email&utm_campaign=idea_2022_2_newsletter&utm_content=newsletter&tk=RD0xJlA9MiZTPTMmQz00JlQ9NQ
// - url : site/page url
// - utm_source : facebook, naver
// - utm_medium : email, sms, blog, newsletter
// - utm_campaign : sign_up, summer_sale, free_trial
// - utm_term(keyword) : social_media, product_name
// - utm_content : video_ad, text_ad, banner
// - token : Identity(acccount/contact id) or email // D=%s&P=%s&S=%s&C=%s&T=%s // D: docId

export function getSiteType(source: string): ESiteType {
  switch (source) {
    case 'desk':
      return ESiteType.DESK;
    default:
      return ESiteType.NONE;
  }
}

export function getTrackingType(tokenParam: Token): ETrackingType {
  let result = ETrackingType.NONE;
  if (tokenParam) {
    // @TODO: Need to get Site Type
    result = ETrackingType.SITE;
  }
  return result;
}

export function extractUrlParams(param?: string): SiteParam {
  let queryParam = '';
  if (param) {
    queryParam = param.replace('?', '');
  } else {
    queryParam = location.search.replace('?', '');
  }

  const urlParams = new UrlParams(queryParam);
  // set param
  const id = urlParams.get('utm_id');
  const source = urlParams.get('utm_source');
  const tk = urlParams.get('tk');
  const tokenParams = tokenExtract(tk);
  let params: SiteParam = {
    id: id,
    source: source ?? '',
    token: tokenParams,
    tk: tk ?? '',
    siteType: getSiteType(source),
    trackingType: getTrackingType(tokenParams)
  };
  return params;
}
