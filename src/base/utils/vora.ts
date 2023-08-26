import { AuthProps, Token } from '@base/types/auth';
import { Base64 } from 'js-base64';
import Storages from '@base/utils/storages/ls';
import { ProductType } from '@base/types/iam';

export function randomStrings(length: number): string {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
}

export const base64URLEncode = (url: any) => {
  return Base64.encode(url, true);
};

export const base64URLDecode = (base64: string) => {
  return Base64.decode(base64);
};

export function getDefaultAuth(): AuthProps {
  const Ls = new Storages();
  const lsToken = Ls.get('token') as string;
  let token = null;
  let isLoggedIn = false;
  try {
    token = JSON.parse(lsToken) as Token;
    if (token) {
      isLoggedIn = true;
    }
  } catch (err) {}
  let defaultValues: AuthProps = {
    isLoggedIn: isLoggedIn,
    isInitialized: false,
    user: null,
    token: token
  };
  return defaultValues;
}

export const baseUrl = (): string => {
  if (location.pathname.indexOf('/desk') === 0) {
    return '/desk';
  } else if (location.pathname.indexOf('/sales') === 0) {
    return '/sales';
  } else if (location.pathname.indexOf('/marketing') === 0) {
    return '/marketing';
  }
  return '/';
};
export const productType = (): ProductType => {
  if (location.pathname.indexOf('/desk') === 0) {
    return ProductType.DESK;
  } else if (location.pathname.indexOf('/sales') === 0) {
    return ProductType.SALES;
  } else if (location.pathname.indexOf('/marketing') === 0) {
    return ProductType.MARKETING;
  }
  return ProductType.DESK;
};
