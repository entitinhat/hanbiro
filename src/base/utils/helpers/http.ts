const version = 'v1';
const BASE_URL = ''; //`${process.env.MIX_APP_URL || (window.Laravel.appUrl === '/' ? '' : window.Laravel.appUrl) }`;
const API_URL = `${BASE_URL}/api/`;

export const apiUrl = (path: string, params: { [index: string]: any } = {}) => {
  let url = `${BASE_URL}/${path}`;
  if (params) {
    let queryString = Object.keys(params)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');
    url += '?' + queryString;
  }
  return url;
};
