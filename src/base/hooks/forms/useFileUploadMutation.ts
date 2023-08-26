import { useEffect } from 'react';
import {
  s3CreateUploadApi,
  s3UploadPartApi,
  s3CompleteUploadApi,
  s3GetPresignedUrlPartsApi,
  s3GetDownloadObjectPresignedUrlApi,
  s3DownloadObjectApi,
  s3DeleteObjectApi,
  s3AbortUploadApi,
  storageCreateUploadApi,
  storageCreateDownloadApi,
  storageCreateChunkUploadApi,
  storageCompleteUploadApi,
  storageChunkUploadPartApi
} from '@base/utils/axios/graphql';
import { IResponseError } from '@base/utils/axios/helper';
import { isString } from 'lodash';
//import { useMutation, UseMutationResult } from 'react-query';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  CreateUploadRequest,
  DeleteObjectRequest,
  DeleteUploadRequest,
  DownloadObjectRequest,
  PresignedUrl,
  StorageObject,
  Upload,
  UploadPartsReply,
  UploadPartsRequest
} from '@base/types/s3';
import { STORAGE_BUCKET } from '@base/config/graphql';
import { s3CreateObjectKey } from '@base/utils/s3';
import _ from 'lodash';

/**============================ S3 STORAGE =============================== */

export function useUploadMutation<T>(options?: any, progressCallBack?: any): UseMutationResult<T, unknown, any, unknown> {
  const FILE_CHUNK_SIZE = 5 * 1024 * 1024; //minimum size: 5MB

  const mutation = useMutation(async (file: any) => {
    //// console.log('file', file);
    let uploadParts: any[] = [];
    let curChunkIndex = 0;
    let stoppedUploading = false;
    const fileSize = file.size;
    const maxChunks = Math.ceil(fileSize / FILE_CHUNK_SIZE) - 1;
    console.log('stoppedUploading', stoppedUploading);
    //get each binary part
    function readCurrentChunkAsync(curChunk: number, file: any) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        const startPos = curChunk * FILE_CHUNK_SIZE;
        const endPos = startPos + FILE_CHUNK_SIZE;
        const blob = file.slice(startPos, endPos);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    //// console.log('maxChunks', maxChunks);
    while (curChunkIndex <= maxChunks) {
      const chunkBuffer = await readCurrentChunkAsync(curChunkIndex, file);
      uploadParts.push({ data: chunkBuffer });
      curChunkIndex++;
    }
    //// console.log('uploadParts', uploadParts);

    //1. create upload id
    // filename: file.name, mediaType: file.type
    const req: CreateUploadRequest = {
      object: {
        key: s3CreateObjectKey(file.name),
        bucket: STORAGE_BUCKET,
        contentType: file.type
      }
    };
    const createResp: Upload = await s3CreateUploadApi<Upload>(req);
    const uploadId = createResp.id;
    //// console.log('create Resp', createResp);

    //2. get presigned url for parts
    const uploadPartParams: UploadPartsRequest = {
      bucket: createResp.bucket,
      uploadId,
      partNumbers: uploadParts.map((_ele: any, index: number) => index + 1)
    };
    const uploadPartResp: UploadPartsReply = await s3GetPresignedUrlPartsApi<UploadPartsReply>(uploadPartParams);
    // console.log('upload parts partResp', uploadPartResp);
    const uploadUrls: any[] = Object.values(uploadPartResp?.uploadUrls) || [];
    // console.log('uploadUrls', uploadUrls);
    if (uploadUrls.length > 0) {
      uploadParts = uploadParts.map((_part: any, index: number) => {
        _part.url = uploadUrls[index].url;
        _part.headers = uploadUrls[index].headers;
        return _part;
      });
    }
    //// console.log('uploadParts after get url', uploadParts);

    //3. upload parts
    // console.log('uploadParts', uploadParts);
    const promises: any = [];
    uploadParts.map((_part: any, index: any) => {
      promises.push(
        s3UploadPartApi<T>(
          _part.url,
          _part.data,
          _part.headers,
          (pEvent: ProgressEvent) =>
            progressCallBack && progressCallBack(pEvent, uploadParts.length, index, { uploadId, bucket: STORAGE_BUCKET })
        ).catch((err) => {
          console.log('s3UploadPartApi error', err);
          stoppedUploading = true;
        })
      );
    });

    const uploadPartResps = await Promise.all(promises);
    // uploading has error
    if (stoppedUploading) {
      return {
        key: '',
        bucket: '',
        error: true
      } as T;
    }
    //// console.log('uploaded parts res', uploadPartResps);
    uploadParts = uploadParts.map((_part: any, index: any) => {
      _part.etag = _.replace(uploadPartResps[index].etag, /"/g, '');
      return _part;
    });
    //// console.log('uploadParts after upload part', uploadParts);

    //4. complete upload
    const completeParams = {
      id: uploadId,
      bucket: STORAGE_BUCKET,
      parts: uploadParts.map((_ele: any, index: number) => ({
        number: index + 1,
        etag: _ele.etag
      }))
    };
    const completeReps = await s3CompleteUploadApi<T>(completeParams);
    console.log('completeReps', completeReps);
    if (!completeReps) {
      return {
        key: req.object.key,
        bucket: req.object.bucket
      } as T;
    }
    return completeReps;
  }, options);

  return mutation;
}

export function useAbortUploadMutation<T>(options?: any): UseMutationResult<T, unknown, DeleteUploadRequest, unknown> {
  const mutation = useMutation(async (reqParams: DeleteUploadRequest) => {
    //get blob
    const abortResp = await s3AbortUploadApi<T>(reqParams);

    return abortResp;
  }, options);

  return mutation;
}

export function useDownloadObjectMutation<T>(options?: any, progressCallBack?: any): UseMutationResult<T, unknown, any, unknown> {
  const mutation = useMutation(async (obj: StorageObject) => {
    const getParams: DownloadObjectRequest = {
      key: obj.key,
      bucket: obj.bucket
    };
    const presignedResp: PresignedUrl = await s3GetDownloadObjectPresignedUrlApi<PresignedUrl>(getParams);
    const { url, method, headers } = presignedResp;

    //get blob
    const downloadResp = await s3DownloadObjectApi(url, method, [], progressCallBack);

    return downloadResp;
  }, options);

  return mutation;
}

export function useDeleteObjectMutation<T>(options?: any): UseMutationResult<T, unknown, any, unknown> {
  const mutation = useMutation(async (object: StorageObject) => {
    const params: DeleteObjectRequest = {
      key: object.key,
      bucket: object.bucket
    };
    //get blob
    const deleteResp = await s3DeleteObjectApi<T>(params);

    return deleteResp;
  }, options);
  return mutation;
}

/**============================ BLOCK STORAGE =============================== */

export function useStorageUploadMutation<T>(options?: any): UseMutationResult<T, unknown, string, unknown> {
  const mutation = useMutation(async (formData: any) => {
    //get blob
    const uploadResp = await storageCreateUploadApi<T>(formData);

    return uploadResp;
  }, options);

  useEffect(() => {
    if (isString(mutation.error)) {
      const err = JSON.parse(mutation.error) as IResponseError;
      if (['no_authentication', 'server_error'].includes(err.message)) {
        // Ls.remove('token');
        // setAuth(null);
        // // console.log('logout');
      }
    }
  }, [mutation.error]);

  return mutation;
}

export function useStorageDownloadMutation<T>(options?: any, progressCallBack?: any): UseMutationResult<T, unknown, any, unknown> {
  const mutation = useMutation(async (params: any) => {
    //get blob
    const downloadResp = await storageCreateDownloadApi<T>(params, progressCallBack);

    return downloadResp;
  }, options);

  return mutation;
}

export function useStorageChunkUploadMutation<T>(options?: any, progressCallBack?: any): UseMutationResult<T, unknown, any, unknown> {
  const FILE_CHUNK_SIZE = 5 * 1024 * 1024; //minimum size: 5MB

  const mutation = useMutation(async (params: any) => {
    // console.log('useStorageChunkUploadMutation start ', params.file.name, params.file.size);
    const { module, file } = params;
    let uploadParts: any[] = [];
    let curChunkIndex = 0;
    const fileSize = file.size;
    const maxChunks = Math.ceil(fileSize / FILE_CHUNK_SIZE) - 1;

    //get each binary part
    function readCurrentChunkAsync(curChunk: number, file: any) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        const startPos = curChunk * FILE_CHUNK_SIZE;
        const endPos = startPos + FILE_CHUNK_SIZE;
        const blob = file.slice(startPos, endPos);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });
    }

    // console.log('maxChunks', maxChunks);
    while (curChunkIndex <= maxChunks) {
      const chunkBuffer: any = await readCurrentChunkAsync(curChunkIndex, file);
      const formData = new FormData();
      const blob = new Blob([chunkBuffer], { type: file.type });
      const fileName = file.name;
      const uploadFile = new File([blob], fileName);
      formData.append('file', uploadFile);
      formData.append('module', module);
      uploadParts.push({ data: formData });
      curChunkIndex++;
    }
    // console.log('uploadParts', uploadParts);

    //1. create upload id
    const createData = new FormData();
    createData.append('module', module);
    createData.append('filename', file.name);
    createData.append('mediaType', file.type);
    createData.append('fileSize', file.size);
    const createResp: any = await storageCreateChunkUploadApi<T>(createData);
    if (createResp?.error && createResp.error != '') {
      toast.error(createResp.error);
      return createResp;
    }
    const uploadId = createResp.data;

    //2. upload parts
    const promises: any = [];
    uploadParts.map((_part: any, index: any) => {
      const nFormData = _part.data;
      nFormData.append('uploadId', uploadId);
      nFormData.append('module', module);
      // module
      promises.push(
        storageChunkUploadPartApi<T>(nFormData, (pEvent: ProgressEvent) => {
          const nPEvent = {
            loaded: pEvent.loaded,
            total: file.size
          };
          progressCallBack && progressCallBack(nPEvent, uploadParts.length, index, uploadId);
        })
      );
    });
    const uploadPartResps = await Promise.all(promises);
    uploadParts = uploadParts.map((_part: any, index: any) => {
      _part.isCompleted = uploadPartResps[index].isCompleted;
      return _part;
    });

    //4. complete upload
    const completeParams = new FormData();
    completeParams.append('uploadId', uploadId);
    completeParams.append('module', module);

    const completeReps = await storageCompleteUploadApi<T>(completeParams);
    // console.log('completeReps', file.name, completeReps);
    return completeReps;
  }, options);

  return mutation;
}
