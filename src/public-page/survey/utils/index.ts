import UrlParams from '@base/utils/helpers/urlParams';
import { PublicParams } from '@public-page/landingpage/types/interfaces';
import { tokenExtract } from '@public-page/utils';



export function extractUrlParams(param?: string): PublicParams {
  let queryParam = '';
  if (param) {
    queryParam = param.replace('?', '');
  } else {
    queryParam = location.search.replace('?', '');
  }

  // console.log('queryParam: ', queryParam);
  const urlParams = new UrlParams(queryParam);

  // set param
  // const id = urlParams.get('utm_id');
  // const source = urlParams.get('utm_source');
  const tk = urlParams.get('tk');
  const tokenParams = tokenExtract(tk);
  const readOnly = urlParams.get('readOnly');

  let params: PublicParams = {
    id: tokenParams?.D ?? '',
    token: tokenParams,
    tk: tk ?? '',
    readOnly: readOnly ?? ''
  };

  return params;
}
