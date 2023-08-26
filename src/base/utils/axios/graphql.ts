import axios, { AxiosProgressEvent } from 'axios';

import { BLOCK_STORAGE_SERVER, GRAPHQL_LOCAL_SERVER, GRAPHQL_SERVER, STORAGE_UPLOAD_SERVER } from '@base/config/graphql';
import { DataPayload, DatasPayload, DatasPromise, Paging, SubDataPayload } from '@base/types/response';

import { axiosHelper } from './helper';
import { S3Header } from '@base/types/s3';
import { buildS3Headers } from '../s3';
import { GRAPHQL_IAM_LOCAL_SERVER, GRAPHQL_IAM_SERVER } from '@base/config/iam/graphql';

// axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    // console.log('just before request successfull');
    return config;
  },
  function (err) {
    console.log('just before request failrue');
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function (response) {
    // console.log('just before response successfull');
    return response;
  },
  function (err) {
    console.log('just before response failrue');
    return Promise.reject(err);
  }
);

export type PostQueryKey = string[];

function GetGraphQLServer(): string {
  let serverAPI = GRAPHQL_SERVER;
  if (document.location.origin.indexOf('localhost') != -1 || document.location.origin.indexOf('jiki.me') != -1) {
    serverAPI = GRAPHQL_LOCAL_SERVER;
  }
  return serverAPI;
}

function GetIAMGraphQLServer(): string {
  let serverAPI = GRAPHQL_IAM_SERVER;
  if (document.location.origin.indexOf('localhost') != -1 || document.location.origin.indexOf('jiki.me') != -1) {
    serverAPI = GRAPHQL_IAM_LOCAL_SERVER;
  }
  return serverAPI;
}

export async function graphQLApi<T>(key: string, query: string, variables?: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<DataPayload<T>>(
      GetGraphQLServer(),
      {
        query,
        variables: helper.variablesHandler(variables)
      },
      {
        headers: helper.headerHandler()
      }
    );

    if (response.data.errors) {
      throw JSON.stringify(response.data.errors);
    }
    return response.data.data[key];
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function graphQLGetsApi<T>(key: string, query: string, variables?: any): Promise<DatasPromise<T>> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<DatasPayload<T>>(
      GetGraphQLServer(),
      {
        query,
        variables: helper.variablesHandler(variables)
      },
      {
        headers: helper.headerHandler()
      }
    );

    if (response.data.errors) {
      throw response.data.errors;
    }

    const { results: data, paging } = response.data.data[key];
    let newPaging = {} as Paging;
    if (paging) {
      const isNextPage = (paging.currentPage || 1) * (paging.itemPerPage || 10) < (paging.totalItems || 0);
      const isPreviousPage = (paging.currentPage || 1) <= 1;
      newPaging = {
        ...paging,
        nextPage: isNextPage ? (paging.currentPage || 1) + 1 : null,
        previousPage: isPreviousPage ? (paging.currentPage || 1) - 1 : null
      };
    }
    return {
      data,
      paging: newPaging
    };
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

/** ============================== S3 upload api ================================ */

export async function s3CreateUploadApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${STORAGE_UPLOAD_SERVER}/CreateUpload`,
      variables, //{ filename: 'test1', mediaType: 'pdf' },
      { headers: helper.s3HeaderHandler(false) }
    );
    if (response.data.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function s3UploadObjectApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  var encodedToken = window.btoa('root:eatcodesleep1');
  const headers = {
    Authorization: `Basic ${encodedToken}`,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json' //'application/octet-stream', 'multipart/form-data'
  };
  try {
    const response = await axios.post<any>(`${STORAGE_UPLOAD_SERVER}/UploadObject`, variables, { headers: headers });
    if (response.data.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function s3GetPresignedUrlPartsApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${STORAGE_UPLOAD_SERVER}/UploadParts`,
      variables, //{ uploadId: 'JCIbEOTASw6eo0CAleQAxg==', partNumber: 1 },
      { headers: helper.s3HeaderHandler(false) }
    );
    if (response.data.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function s3UploadPartApi<T>(url: string, data: any, headers?: S3Header[], progressCallBack?: any): Promise<any> {
  const helper = axiosHelper();
  try {
    const response = await axios.put<any>(url, data, {
      // headers: helper.s3HeaderHandler(true, headers),
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        console.log('progressEvent', progressEvent);
        progressCallBack && progressCallBack(progressEvent);
      }
    });
    if (response.data.errors) {
      throw response.data.errors;
    }
    return response.headers;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function s3CompleteUploadApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${STORAGE_UPLOAD_SERVER}/CompleteUpload`,
      variables, //{ uploadId: 'JCIbEOTASw6eo0CAleQAxg==', parts: [{uploadId: 'JCIbEOTASw6eo0CAleQAxg==', number: 1, etag: ''}] },
      { headers: helper.s3HeaderHandler(false) }
    );
    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function s3GetDownloadObjectPresignedUrlApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${STORAGE_UPLOAD_SERVER}/DownloadObject`,
      variables, //{ id: 'JCIbEOTASw6eo0CAleQAxg==' },
      { headers: helper.s3HeaderHandler(false) }
    );
    if (response.data.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
    // return {} as T;
  }
}

export async function s3DownloadObjectApi(url: string, method: string, headers?: S3Header[], progressCallBack?: any): Promise<any> {
  const helper = axiosHelper();
  try {
    const nHeaders = buildS3Headers(headers ?? []);
    const response = await axios({
      responseType: 'stream', //'blob'
      url,
      method,
      headers: {
        ...nHeaders
      },
      onDownloadProgress: (pEvent: AxiosProgressEvent) => {
        progressCallBack && progressCallBack(pEvent);
      }
    });
    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function s3DeleteObjectApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${STORAGE_UPLOAD_SERVER}/DeleteObject`,
      variables, //{ id: 'JCIbEOTASw6eo0CAleQAxg==' },
      { headers: helper.s3HeaderHandler(false) }
    );
    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function s3AbortUploadApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${STORAGE_UPLOAD_SERVER}/DeleteUpload`,
      variables, //{ id: 'JCIbEOTASw6eo0CAleQAxg==' },
      { headers: helper.s3HeaderHandler(false) }
    );
    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

/** ============================== blockstorage upload/download ================================ */
export async function storageCompleteUploadApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${BLOCK_STORAGE_SERVER}/complete-upload`,
      variables, //{ uploadId: 'JCIbEOTASw6eo0CAleQAxg==', parts: [{uploadId: 'JCIbEOTASw6eo0CAleQAxg==', number: 1, etag: ''}] },
      { headers: helper.blockStorageHeaderHandler(false) }
    );
    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function storageCreateUploadApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${BLOCK_STORAGE_SERVER}/upload`,
      variables, //{ files: [FILE], module: 'XYZ' },
      { headers: helper.blockStorageHeaderHandler(true) }
    );
    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function storageCreateChunkUploadApi<T>(variables: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<any>(
      `${BLOCK_STORAGE_SERVER}/create-chunk-upload`,
      variables, //{ files: [FILE], module: 'XYZ' },
      { headers: helper.blockStorageHeaderHandler(true) }
    );
    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function storageCreateDownloadApi<T>(variables: any, progressCallBack?: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.get<any>(`${BLOCK_STORAGE_SERVER}/download`, {
      responseType: 'stream', //'blob'
      headers: helper.blockStorageHeaderHandler(false),
      params: variables
      // onDownloadProgress: (pEvent: ProgressEvent) => {
      //   progressCallBack && progressCallBack(pEvent);
      // },
    });
    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function storageChunkUploadPartApi<T>(data: any, progressCallBack: any): Promise<any> {
  const helper = axiosHelper();
  try {
    const response = await axios.put<any>(`${BLOCK_STORAGE_SERVER}/chunk-upload`, data, {
      headers: helper.blockStorageHeaderHandler(true)
      // onUploadProgress: (pEvent: ProgressEvent) => {
      //   progressCallBack && progressCallBack(pEvent);
      // },
    });
    if (response.data?.error) {
      throw response.data.error;
    }
    return response.headers;
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}
/** ===================================== GRAPH FOR PUBLIC ================================== */

export async function graphQLPublicApi<T>(key: string, query: string, variables?: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<DataPayload<T>>(
      GetGraphQLServer(),
      {
        query,
        variables: helper.variablesHandler(variables)
      },
      {
        headers: helper.publicHeaderHandler() //TODO: add token
      }
    );

    if (response.data?.errors) {
      throw response.data.errors;
    }
    return response.data.data[key];
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function graphQLGetsPublicApi<T>(key: string, query: string, variables?: any): Promise<DatasPromise<T>> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<DatasPayload<T>>(
      GetGraphQLServer(),
      {
        query,
        variables: helper.variablesHandler(variables)
      },
      {
        headers: helper.publicHeaderHandler() //TODO: add token
      }
    );

    if (response.data.errors) {
      throw response.data.errors;
    }

    const { results: data, paging } = response.data.data[key];
    let newPaging = {} as Paging;
    if (paging) {
      const isNextPage = (paging.currentPage || 1) * (paging.itemPerPage || 10) < (paging.totalItems || 0);
      const isPreviousPage = (paging.currentPage || 1) <= 1;
      newPaging = {
        ...paging,
        nextPage: isNextPage ? (paging?.currentPage || 1) + 1 : null,
        previousPage: isPreviousPage ? (paging?.currentPage || 1) - 1 : null
      };
    }
    return {
      data,
      paging: newPaging
    };
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function graphQLIAMSubApi<T>(key: string, query: string, variables?: any): Promise<T> {
  const helper = axiosHelper();
  if (key.indexOf('_') === -1) {
    throw new Error('The key value is invalid!');
  }
  const [mainKey, subKey] = key.split('_');
  try {
    const response = await axios.post<SubDataPayload<T>>(
      GetIAMGraphQLServer(),
      {
        query,
        variables: helper.variablesIAMHandler(variables)
      },
      {
        headers: helper.headerIAMHandler()
      }
    );

    if (response.data.errors) {
      throw JSON.stringify(response.data.errors);
    }
    return response.data.data[mainKey][subKey];
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}

export async function graphQLIAMApi<T>(key: string, query: string, variables?: any): Promise<T> {
  const helper = axiosHelper();
  try {
    const response = await axios.post<DataPayload<T>>(
      GetIAMGraphQLServer(),
      {
        query,
        variables: helper.variablesIAMHandler(variables)
      },
      {
        headers: helper.headerIAMHandler()
      }
    );

    if (response.data.errors) {
      throw JSON.stringify(response.data.errors);
    }
    return response.data.data[key];
  } catch (error: any) {
    throw helper.errorHandler(error);
  }
}
