import { useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useItemMutation } from './useItemMutation';
const IMAGE_TYPE_PRIMARY = 'IMAGE_TYPE_PRIMARY';
const IMAGE_TYPE_ADDITIONAL = 'IMAGE_TYPE_ADDITIONAL';
export const useUpdateItemImages = (value: File[], isStart: boolean) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const [images, setImages] = useState<any[]>(value);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [result, setResult] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [curFileIndex, setCurFileIndex] = useState<number>(-1);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState<number>(-1);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [needUpload, setNeedUpload] = useState<any[]>([]);

  const mUpload: any = useUploadMutation<BaseMutationResponse>(
    {
      onMutate: (data: any) => {},
      onSuccess: (data: any, variables: any, context: any) => {
        console.log('...mUpload.onSuccess...', data);
        console.log('...mUpload.variables...', variables);
        console.log('...mUpload.context...', context);

        // const newUploadedFiles = [...uploadedFiles];
        // const selectedFiles = needUpload;
        const newUploadedFiles = _.cloneDeep(uploadedFiles);
        const selectedFiles = _.cloneDeep(needUpload);
        const newUpload = {
          objectId: data.key, //upload id
          objectUrl: data.bucket, //download url
          name: selectedFiles[curFileIndex]?.image?.name,
          size: selectedFiles[curFileIndex]?.image?.size,
          contentType: selectedFiles[curFileIndex]?.image?.type,
          type: selectedFiles[curFileIndex]?.type
        };
        newUploadedFiles.push(newUpload);
        setUploadedFiles(newUploadedFiles);

        // next file uploading
        setLastUploadedFileIndex(curFileIndex);
      },
      onError: (error: any, variables: any, context: any) => {
        setIsSaving(false);
        enqueueErrorBar('Uploaded failed: ' + JSON.parse(error).message);
      }
    }
    // (pEvent: ProgressEvent, partsNumber: number, partIndex: number, extraParam?: any) =>
    // uploadProgressHandler(pEvent, partsNumber, partIndex, extraParam)
  );

  useEffect(() => {
    if (value && value?.length) {
      setImages([...value]);
    }
  }, [value]);
  useEffect(() => {
    if (isStart) {
      handleOnSave(images);
    }
  }, [isStart, images]);

  const handleUpload = (nImages?: any[]) => {
    const newImages = _.cloneDeep(images);
    nImages?.map((item: any) => {
      let newImage: any = item;
      newImages.push(newImage);
    });
    setImages(newImages);
  };

  const handleRemove = (rIndex: number) => {
    const newImages = _.cloneDeep(images);
    newImages.splice(rIndex, 1);
    setImages(newImages);
  };

  const handleOnSave = (images: any[]) => {
    let uploadImages: any[] = [];
    images?.map((image: any, index: number) => {
      if (!_.isString(image?.id)) {
        uploadImages.push({ type: index === 0 ? IMAGE_TYPE_PRIMARY : IMAGE_TYPE_ADDITIONAL, image: image });
      }
    });
    // console.log('uploadImages images', images);
    // console.log('uploadImages uploadImages', uploadImages);
    setNeedUpload(uploadImages);
    setIsSaving(true);
  };

  useEffect(() => {
    if (needUpload?.length > 0) {
      if (curFileIndex === -1) {
        setCurFileIndex(lastUploadedFileIndex === -1 ? 0 : lastUploadedFileIndex + 1);
      }
    }
  }, [needUpload]);

  useEffect(() => {
    if (curFileIndex !== -1) {
      mUpload.mutate(needUpload[curFileIndex]?.image);
    }
  }, [curFileIndex]);

  // next file - last file
  useEffect(() => {
    if (lastUploadedFileIndex === -1) {
      return;
    }

    const selectedFiles = needUpload;
    const isLastFile = lastUploadedFileIndex === selectedFiles.length - 1;
    if (isLastFile) {
      setCurFileIndex(-1);

      // start save to db
      let imagesData: any[] = [];

      images?.map((image: any, index: number) => {
        if (_.isString(image?.id)) {
          imagesData.push({ ...image, type: index === 0 ? IMAGE_TYPE_PRIMARY : IMAGE_TYPE_ADDITIONAL });
        }
      });

      uploadedFiles?.map((image: any) => {
        if (image?.type === IMAGE_TYPE_PRIMARY) {
          imagesData.unshift({
            id: image?.objectId,
            name: image?.objectUrl,
            orgName: image?.name,
            type: IMAGE_TYPE_PRIMARY
          });
        } else {
          imagesData.push({
            id: image?.objectId,
            name: image?.objectUrl,
            orgName: image?.name,
            type: IMAGE_TYPE_ADDITIONAL
          });
        }
      });
      setResult([...imagesData]);
      setIsFinished(true);
      setIsSaving(false);
      // const params: any = {
      //   item: {
      //     id: menuSourceId,
      //     images: imagesData
      //   }
      // };
      // mUpdate.mutate(params, {
      //   onSuccess: (data: any, variables: any, context: any) => {
      //     setIsSaving(false);
      //     onClose && onClose();
      //   },
      //   onError: (error: any, variables: any, context: any) => {
      //     setIsSaving(false);
      //     enqueueErrorBar('Update item failed: ' + JSON.parse(error).message);
      //   }
      // });
    } else {
      // next uploaded
      const nextFileIndex = curFileIndex + 1;
      setCurFileIndex(nextFileIndex);
    }
  }, [lastUploadedFileIndex]);

  return { result, isFinished, isSaving };
};
