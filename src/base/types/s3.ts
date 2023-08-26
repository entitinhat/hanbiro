export interface Metadata {
  [key: string]: any;
}
export interface StorageObject {
  key: string;
  bucket: string;
  contentType?: string;
  contentEncoding?: string;
  contentDisposition?: string;
  size?: number;
  etag?: string;
  metadata?: Metadata;
}
export interface CreateUploadRequest {
  object: StorageObject;
}

export interface Upload {
  id: string;
  bucket: string;
}

export interface UploadPartsRequest {
  uploadId: string;
  bucket: string;
  partNumbers: number[];
}
export interface S3Header {
  key: string;
  value: string[];
}

export interface PresignedUrl {
  url: string;
  method: string;
  headers: S3Header[];
}
export interface UploadPartsReply {
  uploadUrls: {
    [key: number]: PresignedUrl;
  };
}
export interface UploadObjectRequest {
  object: StorageObject;
}
export interface StoragePart {
  number: number;
  etag: string;
}
export interface CompleteUploadRequest {
  id: string;
  bucket: string;
  parts: StoragePart[];
}

export interface CompleteUploadResponse {
  success: boolean;
  data: any;
}

export interface DownloadObjectRequest {
  bucket: string;
  key: string;
}
export interface DeleteObjectRequest {
  bucket: string;
  key: string;
}

export interface DeleteUploadRequest {
  bucket: string;
  id: string; // upload id
}

export interface S3UploadedFile {
  objectId: string;
  objectUrl: string;
  name: string;
  contentType: string;
  size: number;
}
