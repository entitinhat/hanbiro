type Context = 'signin' | 'signup' | 'use';

type UxMode = 'popup' | 'redirect';
type ResponseType = 'code' | 'token';
type ResponseMode = 'query' | 'fragment' | 'form_post' | 'direct';
type CodeChallengeMethod = 'S256' | 'plain';
type GrantType = 'refresh_token' | 'authorization_code';
type ErrorCode =
  | 'invalid_request'
  | 'access_denied'
  | 'unauthorized_client'
  | 'unsupported_response_type'
  | 'invalid_scope'
  | 'server_error'
  | 'temporarily_unavailable';

export interface InitVoraOption {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  scope: string;
  responseType: ResponseType;
  responseMode: ResponseMode;
  codeChallengeMethod: CodeChallengeMethod;
}

export interface InitAuthCodeOption {
  uxMode: UxMode;
  clientId: string;
  responseType: ResponseType;
  responseMode: ResponseMode;
  scope: string;
  state: string;
  codeChallenge: string;
  codeChallengeMethod: CodeChallengeMethod;
  resource: string;
  prompt: string;
  loginHint: string;
  includeGrantedScopes: string;
  optional: string;
  action: string;
  redirectUrl: string;
}

export interface TokenResponse {
  error?: ErrorCode;
  access_token: string;
  refresh_token: string;
  scope?: string;
  expires_in: number;
  expires_on: number;
  token_type?: string;
}
export interface RefreshTokenOption {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  grantType: GrantType;
}

export interface InitAccessTokenOption {
  clientId: string;
  clientSecret: string;
  code: string;
  grantType: GrantType;
  codeVerifier: string;
  accessTokenValidity: string;
  resource: string;
  refreshToken: string;
}

export interface UseVoraSignInOption extends InitVoraOption {
  uxMode: UxMode;
  callback: (response: VoraSignResposne) => void;
  onSuccess: (response: VoraSignResposne) => void;
  onError: (error: ErrorCode) => void;
}
export interface VoraSignResposne {
  state: string;
  codeVerifier: string;
}
export interface UserProfile {
  id: string;
  name: string;
}
export type VoraAuthContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};
