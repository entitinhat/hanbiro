import { OAUTH_SERVER, AUTHORIZE_ENDPOINT, TOKEN_ENDPOINT } from '@base/config/vora';
import axios from 'axios';
// import Storages from '@base/utils/storages/ls';

import { InitAccessTokenOption, RefreshTokenOption, InitAuthCodeOption, TokenResponse } from '@base/types/vora';

// oauthToken
export async function requestAccessToken(input: InitAccessTokenOption): Promise<TokenResponse> {
  const params = new URLSearchParams();
  params.append('client_id', input.clientId);
  params.append('client_secret', input.clientSecret);
  params.append('code', input.code);
  params.append('code_verifier', input.codeVerifier);

  params.append('access_token_validity', input.accessTokenValidity);
  params.append('grant_type', input.grantType);
  params.append('resource', input.resource);
  params.append('refresh_token', input.refreshToken);
  const oauthServer = getOAuthServer();
  const url = `${oauthServer}${TOKEN_ENDPOINT}`;
  try {
    const response = await axios.post<TokenResponse>(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error in 'postApi(${url})': ${error.message}`);
  }
}

// getDevToken
export function getDevToken(): TokenResponse {
  const token: TokenResponse = {
    access_token:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyOTdhNmMwLTZjNTUtNDA1YS05YmM0LTBiYzIxYTE5NDBlNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkLmhhYmluLmlvIiwic3ViIjoiNjg1YzVhMzAtY2MxNy00MDQ4LTgxZWMtZTJmZWQ1OWMzN2VkIiwiYXVkIjoiaHR0cHM6Ly9pZC5oYWJpbi5pbyIsImV4cCI6MTY0NTY0MDgwMiwiaWF0IjoxNjQ1NDAwODAyLCJqdGkiOiIyMmQ3YWFlMi0xNzBjLTQxMTQtYmE3Zi1iY2ZjODE2MjZjNTIiLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJjbGllbnRfaWQiOiIyMjk3OTk3Yy02NzkyLTQwODQtYmJlYi1iOTQxNjE5ZDJmMDAiLCJlbWFpbCI6Imppa2ltZUBnbWFpbC5jb20iLCJwcmltYXJ5X2VtYWlsIjoiamlraW1lQGdtYWlsLmNvbSIsInRlc3QiOnRydWV9.aPED9rjr3R8B8kMoqzD9d_Mwdsp8VmMl8OSS0EFEdnELN1_cqSJK48lfCZrwOzaoMwsVFMBy-IL_lsmscl2AC2qKWIWrlZZ5m6FRORTws-Vw7rdsKtrBiqTW0uZcZthtczvlYVFgKhbr3XPYsMXe9v3Rx5VQEBXvfAQlPhG3BtV_IEJDrtFc8EVcG0rLEiSCUXldD3p5S8AUPI7fQ9p5kPsjkBJQgDUTxKi8Ms6Hkz1jAqeIDZjDDogr_0xUDvFDfYWLk7JOOVd34yKZNnhwa6PBx-VjY9Uhp1JZM1oNX8kIwRSqp1PqvfRlVygn_fjXjBktJvWaFn3a0uWm0G1zqg',
    refresh_token:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIyOTdhNmMwLTZjNTUtNDA1YS05YmM0LTBiYzIxYTE5NDBlNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2lkLmhhYmluLmlvIiwic3ViIjoiNjg1YzVhMzAtY2MxNy00MDQ4LTgxZWMtZTJmZWQ1OWMzN2VkIiwiYXVkIjoiaHR0cHM6Ly9pZC5oYWJpbi5pbyIsImV4cCI6MTY0NTY0MDgwMiwiaWF0IjoxNjQ1NDAwODAyLCJqdGkiOiIyMmQ3YWFlMi0xNzBjLTQxMTQtYmE3Zi1iY2ZjODE2MjZjNTIiLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJjbGllbnRfaWQiOiIyMjk3OTk3Yy02NzkyLTQwODQtYmJlYi1iOTQxNjE5ZDJmMDAiLCJlbWFpbCI6Imppa2ltZUBnbWFpbC5jb20iLCJwcmltYXJ5X2VtYWlsIjoiamlraW1lQGdtYWlsLmNvbSIsInRlc3QiOnRydWV9.aPED9rjr3R8B8kMoqzD9d_Mwdsp8VmMl8OSS0EFEdnELN1_cqSJK48lfCZrwOzaoMwsVFMBy-IL_lsmscl2AC2qKWIWrlZZ5m6FRORTws-Vw7rdsKtrBiqTW0uZcZthtczvlYVFgKhbr3XPYsMXe9v3Rx5VQEBXvfAQlPhG3BtV_IEJDrtFc8EVcG0rLEiSCUXldD3p5S8AUPI7fQ9p5kPsjkBJQgDUTxKi8Ms6Hkz1jAqeIDZjDDogr_0xUDvFDfYWLk7JOOVd34yKZNnhwa6PBx-VjY9Uhp1JZM1oNX8kIwRSqp1PqvfRlVygn_fjXjBktJvWaFn3a0uWm0G1zqg',
    expires_in: 1000000,
    expires_on: 10000000
  };
  return token;
}
// GetUser information
export function getUser() {}

// refeshToken
export async function refreshToken(input: RefreshTokenOption): Promise<TokenResponse> {
  const params = new URLSearchParams();
  params.append('client_id', input.clientId);
  params.append('refresh_token', input.refreshToken);
  params.append('grant_type', input.grantType);
  params.append('client_secret', input.clientSecret);
  const oauthServer = getOAuthServer();
  const url = `${oauthServer}${TOKEN_ENDPOINT}`;
  try {
    const response = await axios.post<TokenResponse>(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error in 'postApi(${url})': ${error.message}`);
  }
}
// getOAuthServce
export function getOAuthServer() {
  return OAUTH_SERVER;
}
// doOAuth
export function requestCode(config: InitAuthCodeOption) {
  // force mode = redirect
  if (config.uxMode === 'redirect') {
    const params = new URLSearchParams();
    params.append('client_id', config.clientId);
    params.append('repsonse_type', config.responseType);
    params.append('response_mode', config.responseMode);
    params.append('scope', config.scope);
    params.append('state', config.state);

    params.append('code_challenge', config.codeChallenge);
    params.append('code_challenge_method', config.codeChallengeMethod);
    params.append('resource', config.resource);
    params.append('prompt', config.prompt);
    params.append('login_hint', config.loginHint);

    params.append('include_granted_scopes', config.includeGrantedScopes);
    params.append('optional', config.optional);
    params.append('action', config.action);
    params.append('redirect_uri', config.redirectUrl);
    const queryString = params.toString();
    const oauthServer = getOAuthServer();
    window.location.href = `${oauthServer}${AUTHORIZE_ENDPOINT}?${queryString}`;
  } else {
    // mode == popup
  }
}

// export function checkToken() {
//   const [, exp] = getToken();
//   const nowDate = new Date().getTime() / 1000;

//   if (exp < nowDate) {
//     // show notify : yes - run refreshToken, no: go to login
//     // refreshToken();
//   }
// }

// function getToken() {
//   const token = JSON.parse(Ls.get('token') as string) as IToken;
//   if (isUndefined(token?.accessToken)) return ['', 0];
//   const { exp } = jwt.decode(token.accessToken) as {
//     exp: number;
//   };
//   return [token.accessToken, exp];
// }
