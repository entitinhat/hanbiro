export interface BaseResponse<T> {
  results: T;
}

export interface ResponsePaging<T> extends BaseResponse<T> {
  paging: Paging;
}

export interface BaseMutationResponse {
  id: string;
}

export interface ResponseError {
  message: string;
}

export interface Paging {
  totalPage: number;
  totalItems: number;
  currentPage: number;
  itemPerPage?: number;
  nextPage?: number | null;
  previousPage?: number | null;
}

export interface DatasPayload<T> {
  data: {
    [key: string]: {
      results: T;
      paging: Paging;
    };
  };
  errors: {
    message: string;
  }[];
}

export interface DataIndex<T> {
  [key: string]: T;
}

export interface DataPayload<T> {
  data: {
    [key: string]: T;
  };
  errors: {
    message: string;
  }[];
}

export interface DatasPromise<T> {
  data: T;
  paging?: Paging;
}

export interface BaseMutationKeysResponse {
  ids: string[];
}

export interface BaseMutationBulkKeysResponse extends BaseMutationKeysResponse {
  refIds: string[];
}

export interface SubDataPayload<T> {
  data: {
    [key: string]: {
      [key: string]: T;
    };
  };
  errors: {
    message: string;
  }[];
}
