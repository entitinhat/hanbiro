import { GRAPHQL_HOST, GRAPHQL_HOSTID, STORAGE_SERVER_PASSWORD, STORAGE_SERVER_USERNAME } from '@base/config/graphql';
import Storages from '@base/utils/storages/ls';
import { Token } from '@base/types/auth';
import axios from 'axios';
import { merge } from 'lodash';
import { S3Header } from '@base/types/s3';
import { buildS3Headers } from '../s3';
import { baseUrl } from '../vora';
const SESSION_ID = 'r0hct74pvw9jqgpsbzkalijp';
export interface IResponseError {
  message: string;
}

export function isDevServer(): boolean {
  if (location.origin.indexOf('localhost') !== -1 || location.origin.indexOf('jiki.me') !== -1) {
    return true;
  }
  return false;
}

export function axiosHelper() {
  const Ls = new Storages();
  const token = JSON.parse(Ls.get('token') as string) as Token;

  return {
    headerHandler,
    publicHeaderHandler,
    s3HeaderHandler,
    blockStorageHeaderHandler,
    variablesHandler,
    errorHandler,
    headerIAMHandler,
    variablesIAMHandler
  };

  function headerHandler() {
    let headers = {
      // authorization: token?.accessToken ? `Bearer ${token.accessToken}` : '',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Credentials': true,
      Accept: 'application/json',
      // 'User-Agent': 'Axios GraphQL',
      'Accept-Language': 'ko'
    };
    if (isDevServer()) {
      headers = {
        ...headers,
        ...{ 'Session-Id': SESSION_ID }
      };
    }
    return headers;
  }

  function headerIAMHandler() {
    let headers: any = {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Credentials': true,
      Accept: 'application/json',
      // 'User-Agent': 'Axios GraphQL',
      'Accept-Language': 'ko'
      // Cookie: sessid=SESSION_ID  (http)
      // Session-Id: SESSION_ID  (webrpc, http)
      // Authorization: Bearer ACCESS_TOKEN  (webrpc, http)
    };
    // if (location.host.indexOf('localhost') !== -1) {

    if (isDevServer()) {
      headers = {
        ...headers,
        ...{ 'Session-Id': SESSION_ID }
      };
    }
    // }
    return headers;
  }

  function publicHeaderHandler() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'ko',
      'Session-Id': SESSION_ID
    };
  }

  function s3HeaderHandler(isUpload: boolean, extraHeaders?: S3Header[]) {
    // var encodedToken = window.btoa(STORAGE_SERVER_USERNAME + ':' + STORAGE_SERVER_PASSWORD);
    let baseHeaders = {
      // Authorization: `Basic ${encodedToken}`,
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      'Session-Id': SESSION_ID
    };
    if (isUpload) {
      return {
        ...baseHeaders,
        'Content-Type': 'application/octet-stream' //'application/octet-stream', 'multipart/form-data'
        // ...(extraHeaders ? buildS3Headers(extraHeaders) : {})
      };
    } else {
      return {
        ...baseHeaders,
        'Content-Type': 'application/json'
      };
    }
  }

  function blockStorageHeaderHandler(isUpload: boolean) {
    var encodedToken = window.btoa(STORAGE_SERVER_USERNAME + ':' + STORAGE_SERVER_PASSWORD);
    let baseHeaders = {
      Authorization: `Basic ${encodedToken}`,
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*'
    };
    if (isUpload) {
      return {
        ...baseHeaders,
        'Content-Type': 'application/octet-stream' //'application/octet-stream', 'multipart/form-data'
      };
    } else {
      return {
        ...baseHeaders,
        'Content-Type': 'application/json'
      };
    }
  }

  function variablesHandler(variables: any) {
    let tenantHost = Ls.get('tenant_host') as string;
    if (tenantHost === '' || tenantHost === null) {
      tenantHost = GRAPHQL_HOST;
    }
    let tenantUrl = baseUrl();
    if (tenantUrl === '/') {
      tenantUrl = '';
    }
    //
    // tenantHost: save in localstorage or http host
    return merge(variables, { tenantHost: tenantHost + tenantUrl, tenantId: GRAPHQL_HOSTID });
  }

  function variablesIAMHandler(variables: any) {
    return merge(variables, {});
  }

  function errorHandler(error: any) {
    if (axios.isAxiosError(error)) {
      if ([401, 403].includes(error.response?.status as number) && token?.accessToken) {
        throw { message: 'no_authentication' };
      } else {
        throw error;
        // return;
      }
    } else {
      let returnMessage = null;
      try {
        const response = JSON.parse(error) as IResponseError[];
        response.forEach(({ message }) => {
          if (
            (message.match(/not a tenant member|not a member|re-authenticate|tenant not found/i) || message.match(/code 401/)) &&
            token?.accessToken
          ) {
            returnMessage = { message: 'no_authentication' };
            return;
          } else if (message.match(/internal server error/i)) {
            returnMessage = { message: 'server_error' };
            return;
          }
        });
        throw returnMessage ? returnMessage : error;
      } catch (exception: any) {
        throw error;
      }
    }
  }
}
