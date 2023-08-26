//import randomBytes from 'randombytes';
import * as jwt from 'jsonwebtoken';
import { sha256 } from 'js-sha256';
import QueryString from 'query-string';

import Storages from '@base/utils/storages/ls';
import { base64URLEncode, base64URLDecode } from '@base/utils/helpers/base64';
import { IAuthPayload, IToken } from '@sign-in/types/auth';
import { postApi } from '@base/utils/axios/api';
import {
  OAUTH_SERVER,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  AUTHORIZE_ENDPOINT,
  OAUTH_SIGNUP_ENDPOINT,
  TOKEN_ENDPOINT,
  REDIRECT_URI
} from '@sign-in/config/constant';
import { toast } from 'react-toastify';
import { isUndefined } from 'lodash';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '@sign-in/recoil/atoms/auth';
import { useNavigate } from 'react-router-dom';
import usePost from '@base/hooks/usePost';
import { User } from '@base/types/user';
import { GET_ME } from './graphql/user';
import { OAUTH_LOCAL_SERVER } from '@sign-in/config/constant';

export function useOAuthService() {
  const Ls = new Storages();
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const token = JSON.parse(Ls.get('token') as string) as IToken;

  return {
    showError,
    refreshToken,
    checkToken,
    getToken,
    logout,
    getUser,
    oauthToken,
    getOAuthEndPoint,
    forceLoginDevMode,
    getOAuthServer
  };
  function getOAuthEndPoint(): string {
    const nonce = base64URLEncode(randomStrings(8));
    Ls.set('nonce', nonce);

    const state = base64URLEncode(
      new URLSearchParams({
        nonce,
        continue: window.location.href
      }).toString()
    );
    const codeVerifier = randomStrings(16);
    Ls.set('codeVerifier', codeVerifier);
    const shaBuffer = sha256.arrayBuffer(codeVerifier);
    const codeChallenge = arrayBufferToBase64(shaBuffer);
    const params = new URLSearchParams();
    params.append('client_id', OAUTH_CLIENT_ID);
    params.append('repsone_type', 'code');
    params.append('response_mode', 'query');
    params.append('scope', 'openid email offline_access');
    params.append('state', state);

    params.append('code_challenge', codeChallenge);
    params.append('code_challenge_method', 'S256');
    params.append('resource', 'openid email offline_access');
    params.append('prompt', '');
    params.append('login_hint', '');

    params.append('include_granted_scopes', 'false');
    params.append('optional', 'false');
    params.append('action', 'false');
    params.append('redirect_uri', REDIRECT_URI);
    const queryString = params.toString();
    const oauthServer = getOAuthServer();

    return `${oauthServer}${AUTHORIZE_ENDPOINT}?${queryString}`;
  }
  function showError(msg: string | null) {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: false
    });
    console.error(msg);
  }

  function oauthToken(authCode: string) {
    const resp = QueryString.parse(window.location.search);
    if (resp.error) {
      showError(resp?.error as string);
      return;
    }
    if (authCode == '') {
      showError('expected code');
      return;
    }
    if (resp.state) {
      const state = QueryString.parse(base64URLDecode(resp.state as string));
      if (state.nonce !== Ls.get('nonce')) {
        showError('invalid nonce');
        // return;
      }
      Ls.remove('nonce');
    }

    // const codeVerifier = base64URLEncode(sha256(randomBytes(16)));
    const params = new URLSearchParams();
    params.append('client_id', OAUTH_CLIENT_ID);
    params.append('code', authCode);
    params.append('code_verifier', Ls.get('codeVerifier') as string);
    params.append('client_secret', OAUTH_CLIENT_SECRET);
    params.append('access_token_validity', '240000');
    params.append('grant_type', 'authorization_code');
    params.append('resource', '');
    params.append('refresh_token', '');
    const oauthServer = getOAuthServer();

    postApi<IAuthPayload>(`${oauthServer}${TOKEN_ENDPOINT}`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((payload) => {
      if (payload.errorMsg) {
        showError(payload.errorMsg);
        return;
      }

      Ls.remove('codeVerifier');
      const token = payload.access_token;

      if (!token) {
        showError('Expected token');
        return;
      }

      const authToken: IToken = {
        accessToken: payload.access_token,
        refreshToken: payload.refresh_token,
        expiredIn: payload.expires_in,
        expiredOut: payload.expires_on
      };

      // store user details and jwt token in local storage to keep user logged in between page refreshes
      Ls.set('token', JSON.stringify(authToken));
      setAuth(authToken);
      navigate('/');
    });
  }

  function refreshToken(cb?: any) {
    const params = new URLSearchParams();
    params.append('client_id', OAUTH_CLIENT_ID);
    params.append('refresh_token', token.refreshToken);
    params.append('grant_type', 'refresh_token');
    params.append('client_secret', OAUTH_CLIENT_SECRET);

    postApi<IAuthPayload>(`${OAUTH_SERVER}/oauth/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((payload) => {
      if (payload.errorMsg) {
        showError(payload.errorMsg);
        return;
      }
      const authToken: IToken = {
        accessToken: payload.access_token,
        refreshToken: payload.refresh_token,
        expiredIn: payload.expires_in,
        expiredOut: payload.expires_on
      };
      Ls.set('token', JSON.stringify(authToken));
      setAuth(authToken);

      cb && cb();
    });
  }

  function checkToken() {
    const [, exp] = getToken();
    const nowDate = new Date().getTime() / 1000;

    if (exp < nowDate) {
      // show notify : yes - run refreshToken, no: go to login
      refreshToken();
    }
  }

  function getToken() {
    if (isUndefined(token?.accessToken)) return ['', 0];
    const { exp } = jwt.decode(token.accessToken) as {
      exp: number;
    };
    return [token.accessToken, exp];
  }

  function logout() {
    // console.log('logout');
    // remove user from local storage, set auth state to null and redirect to login page
    Ls.remove('token');
    Ls.remove('tenantHost');
    setAuth(null);
    navigate('/sign-in');
  }

  function getOAuthServer() {
    let server = OAUTH_SERVER;
    if (document.domain.indexOf('localhost') != -1) {
      server = OAUTH_LOCAL_SERVER;
    }
    return server;
  }
  function getUser() {
    return usePost<User>(['directory_me'], GET_ME, {});
  }

  function forceLoginDevMode() {
    const token = {
      accessToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyOTdhNmMwLTZjNTUtNDA1YS05YmM0LTBiYzIxYTE5NDBlNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkLmhhYmluLmlvIiwic3ViIjoiNjg1YzVhMzAtY2MxNy00MDQ4LTgxZWMtZTJmZWQ1OWMzN2VkIiwiYXVkIjoiaHR0cHM6Ly9pZC5oYWJpbi5pbyIsImV4cCI6MTY0NTY0MDgwMiwiaWF0IjoxNjQ1NDAwODAyLCJqdGkiOiIyMmQ3YWFlMi0xNzBjLTQxMTQtYmE3Zi1iY2ZjODE2MjZjNTIiLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJjbGllbnRfaWQiOiIyMjk3OTk3Yy02NzkyLTQwODQtYmJlYi1iOTQxNjE5ZDJmMDAiLCJlbWFpbCI6Imppa2ltZUBnbWFpbC5jb20iLCJwcmltYXJ5X2VtYWlsIjoiamlraW1lQGdtYWlsLmNvbSIsInRlc3QiOnRydWV9.aPED9rjr3R8B8kMoqzD9d_Mwdsp8VmMl8OSS0EFEdnELN1_cqSJK48lfCZrwOzaoMwsVFMBy-IL_lsmscl2AC2qKWIWrlZZ5m6FRORTws-Vw7rdsKtrBiqTW0uZcZthtczvlYVFgKhbr3XPYsMXe9v3Rx5VQEBXvfAQlPhG3BtV_IEJDrtFc8EVcG0rLEiSCUXldD3p5S8AUPI7fQ9p5kPsjkBJQgDUTxKi8Ms6Hkz1jAqeIDZjDDogr_0xUDvFDfYWLk7JOOVd34yKZNnhwa6PBx-VjY9Uhp1JZM1oNX8kIwRSqp1PqvfRlVygn_fjXjBktJvWaFn3a0uWm0G1zqg',
      refreshToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyOTdhNmMwLTZjNTUtNDA1YS05YmM0LTBiYzIxYTE5NDBlNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkLmhhYmluLmlvIiwic3ViIjoiNjg1YzVhMzAtY2MxNy00MDQ4LTgxZWMtZTJmZWQ1OWMzN2VkIiwiYXVkIjoiaHR0cHM6Ly9pZC5oYWJpbi5pbyIsImV4cCI6MTY0NTY0MDgwMiwiaWF0IjoxNjQ1NDAwODAyLCJqdGkiOiIyMmQ3YWFlMi0xNzBjLTQxMTQtYmE3Zi1iY2ZjODE2MjZjNTIiLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJjbGllbnRfaWQiOiIyMjk3OTk3Yy02NzkyLTQwODQtYmJlYi1iOTQxNjE5ZDJmMDAiLCJlbWFpbCI6Imppa2ltZUBnbWFpbC5jb20iLCJwcmltYXJ5X2VtYWlsIjoiamlraW1lQGdtYWlsLmNvbSIsInRlc3QiOnRydWV9.aPED9rjr3R8B8kMoqzD9d_Mwdsp8VmMl8OSS0EFEdnELN1_cqSJK48lfCZrwOzaoMwsVFMBy-IL_lsmscl2AC2qKWIWrlZZ5m6FRORTws-Vw7rdsKtrBiqTW0uZcZthtczvlYVFgKhbr3XPYsMXe9v3Rx5VQEBXvfAQlPhG3BtV_IEJDrtFc8EVcG0rLEiSCUXldD3p5S8AUPI7fQ9p5kPsjkBJQgDUTxKi8Ms6Hkz1jAqeIDZjDDogr_0xUDvFDfYWLk7JOOVd34yKZNnhwa6PBx-VjY9Uhp1JZM1oNX8kIwRSqp1PqvfRlVygn_fjXjBktJvWaFn3a0uWm0G1zqg',
      expiredIn: 1000000,
      expiredOut: 10000000
    };
    setAuth(token);
    Ls.set('token', JSON.stringify(token));
    navigate('/');
  }

  function testAPI(cb?: any) {
    const url = 'https://api.habin.io/core.storage.v1.Storage/CreateUpload';
    postApi<IAuthPayload>(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Headers': 'http://localhost:8080',
          Authorization: 'Basic cm9vdDplYXRjb2Rlc2xlZXAx'
        }
      }
    ).then((payload) => {
      // console.log('payload', payload);
    });
  }
  function randomStrings(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function rawurlencode(str: string) {
    //       discuss at: https://locutus.io/php/rawurlencode/
    //      original by: Brett Zamir (https://brett-zamir.me)
    //         input by: travc
    //         input by: Brett Zamir (https://brett-zamir.me)
    //         input by: Michael Grier
    //         input by: Ratheous
    //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      bugfixed by: Brett Zamir (https://brett-zamir.me)
    //      bugfixed by: Joris
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    // reimplemented by: Brett Zamir (https://brett-zamir.me)
    //           note 1: This reflects PHP 5.3/6.0+ behavior
    //           note 1: Please be aware that this function expects \
    //           note 1: to encode into UTF-8 encoded strings, as found on
    //           note 1: pages served as UTF-8
    //        example 1: rawurlencode('Kevin van Zonneveld!')
    //        returns 1: 'Kevin%20van%20Zonneveld%21'
    //        example 2: rawurlencode('https://kvz.io/')
    //        returns 2: 'https%3A%2F%2Fkvz.io%2F'
    //        example 3: rawurlencode('https://www.google.nl/search?q=Locutus&ie=utf-8')
    //        returns 3: 'https%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'
    str = str + '';
    // Tilde should be allowed unescaped in future versions of PHP (as reflected below),
    // but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  }
  function arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary).replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
  }
}
