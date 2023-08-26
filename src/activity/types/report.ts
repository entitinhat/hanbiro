import { BaseResponse } from "@base/types/response";
import { IdName } from "@base/types/common";

export interface Bucket {
  key: string;
  doc_count: number;
}

export interface Aggregate {
  aggs: {
    [key: string]: {
      buckets: Bucket[];
    };
  };
}

export interface Comparison {
  user: IdName;
  outGoingCall: number;
  incomingCall: number;
  allCallDuration: number;
  sentEmail: number;
  receivedEmail: number;
  sentSms: number;
  task: number;
}

export interface ComparisonResult<T> {
  total: T;
  lastTotal: T;
}

export interface ComparisonsResponse<T> extends BaseResponse<ComparisonResult<T>> {
  lastTotal: T;
  total: T;
}
