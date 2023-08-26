import { Base64 } from 'js-base64';

export const base64URLEncode = (url: any) => {
  return Base64.encode(url, true);
};

export const base64URLDecode = (base64: string) => {
  return Base64.decode(base64);
};

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString('base64');
}

export const decodeBase64 = (data: string) => {
  return Buffer.from(data, 'base64').toString('utf8');
}
