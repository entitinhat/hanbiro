export interface IAuthPayload {
  errorMsg: string;
  access_token: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
  expires_on: number;
  token_type: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
  expiredOut: number;
}

export interface IExpiredIn {
  dateString: string;
  dateNumber: number;
}
