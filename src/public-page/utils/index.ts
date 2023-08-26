import { Base64 } from 'js-base64';
import { Token } from '@public-page/types';

export function tokenExtract(tk: string): Token {
  const tokenStr = Base64.decode(tk);

  // do param
  const tokenParam: Token = {
    D: '', // docId
    P: '', //
    S: '', //
    C: '', // customer id
    U: '', // user id
    T: '', // tenant id
    O: '' // org id
  };

  const arrTKParams = tokenStr.split('&');
  if (arrTKParams.length > 0) {
    arrTKParams.map((item: string) => {
      const [key, val] = item.split('=');
      tokenParam[key] = val;
    });
  }

  return tokenParam;
}

export function tokenEncoded(token: Token) {
  let tk: string = '';
  for (let key in token) {
    if (key == 'O') {
      tk += key + '=' + token[key];
    } else {
      tk += key + '=' + token[key] + '&';
    }
  }
  // console.log('tk string', tk);
  // console.log('tk string', Base64.encode(tk));
  return Base64.encode(tk);
}
