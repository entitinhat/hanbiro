import React, { useEffect, useState } from 'react';
import _ from 'lodash';

// mui
import { Stack } from '@mui/material';

// project
import { MultiFileUpload } from '@base/components/@hanbiro/FileUpload';
import HanButtonGroup from '@base/components/@hanbiro/HanButtonGroup';
import { useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { useStorageUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryClient } from '@base/config/queryClient';
import { convertImageToBase64 } from '@base/utils/helpers';

import { IMAGE_MODULE_PRODUCT_ITEM } from '@product/main/config/constants';
import { useItemMutation } from '@product/item/hooks/useItemMutation';
import { queryKeys } from '@product/item/config/queryKeys';
import ImagesSlider from './Images';

interface ImagesProps {
  [x: string]: any;
  value?: any[];
  onClose?: (value?: any) => void;
}

const IMAGE_TYPE_NONE = 'IMAGE_TYPE_NONE';
const IMAGE_TYPE_PRIMARY = 'IMAGE_TYPE_PRIMARY';
const IMAGE_TYPE_ADDITIONAL = 'IMAGE_TYPE_ADDITIONAL';

const Images = (props: ImagesProps) => {
  const { value, onClose, menuSourceId } = props;

  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const [images, setImages] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [curFileIndex, setCurFileIndex] = useState<number>(-1);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState<number>(-1);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [needUpload, setNeedUpload] = useState<any[]>([]);

  // Upload Image Using S3
  const mUpload: any = useUploadMutation<BaseMutationResponse>(
    {
      onMutate: (data: any) => {},
      onSuccess: (data: any, variables: any, context: any) => {
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

  // Upload Image Using Storage
  const mStorageUpLoad: any = useStorageUploadMutation<BaseMutationResponse>({
    onError: (error: any, variables: any, context: any) => {
      setIsSaving(false);
      enqueueErrorBar('Uploaded failed: ' + JSON.parse(error).message);
    },
    onSuccess: (data: any, variables: any, context: any) => {
      // console.log('...mUpload.onSuccess...', data);
      // console.log('...mUpload.variables...', variables);
      // console.log('...mUpload.context...', context);

      // const newUploadedFiles = [...uploadedFiles];
      // const selectedFiles = needUpload;
      const newUploadedFiles = _.cloneDeep(uploadedFiles);
      const selectedFiles = _.cloneDeep(needUpload);
      const newUpload = {
        objectId: data?.data?.[0], //upload id
        objectUrl: selectedFiles[curFileIndex]?.image?.type, //
        name: selectedFiles[curFileIndex]?.image?.name,
        size: selectedFiles[curFileIndex]?.image?.size,
        contentType: selectedFiles[curFileIndex]?.image?.type,
        type: selectedFiles[curFileIndex]?.type
      };
      newUploadedFiles.push(newUpload);
      setUploadedFiles(newUploadedFiles);

      // next file uploading
      setLastUploadedFileIndex(curFileIndex);
    }
  });

  const { mUpdate } = useItemMutation([queryKeys.listItem, [queryKeys.viewItem, menuSourceId as string]]);

  useEffect(() => {
    if (value?.length) {
      setImages(value);
    }
  }, [value]);

  const handleUpload = (nImages?: any[]) => {
    // Upload using S3
    // const newImages = _.cloneDeep(images);
    // nImages?.map((item: any) => {
    //   let newImage: any = item;
    //   newImages.push(newImage);
    // });
    // setImages(newImages);

    // Upload using Storage
    const newImages: any[] = [];
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

  const handleOnSave = () => {
    // console.log('...handleOnSave...', images);
    let uploadImages: any[] = [];
    images?.map((image: any, index: number) => {
      if (!_.isString(image?.id)) {
        uploadImages.push({ type: index === 0 ? IMAGE_TYPE_PRIMARY : IMAGE_TYPE_ADDITIONAL, image: image });
      }
    });

    // On Save in upload S3
    // setNeedUpload(uploadImages);
    // setIsSaving(true);

    // On Save in upload Storage
    if (uploadImages?.length > 0) {
      setNeedUpload(uploadImages);
      setIsSaving(true);
    } else {
      if (value != images && images?.length != 0) {
        // incase image was changed less than default but not null
        const params: any = {
          item: {
            id: menuSourceId,
            images: images
          }
        };
        mUpdate.mutate(params, {
          onSuccess: (data: any, variables: any, context: any) => {
            setIsSaving(false);
            queryClient.refetchQueries({ queryKey: [queryKeys.listItem] });
          },
          onError: (error: any, variables: any, context: any) => {
            setIsSaving(false);
            enqueueErrorBar('Update item failed: ' + JSON.parse(error).message);
          }
        });
        onClose && onClose(images);
      } else if (value?.length != 0 && images?.length == 0) {
        // incase image was changed to null
        const params: any = {
          item: {
            id: menuSourceId,
            images: null
          }
        };
        mUpdate.mutate(params, {
          onSuccess: (data: any, variables: any, context: any) => {
            setIsSaving(false);
            queryClient.refetchQueries({ queryKey: [queryKeys.listItem] });
          },
          onError: (error: any, variables: any, context: any) => {
            setIsSaving(false);
            enqueueErrorBar('Update item failed: ' + JSON.parse(error).message);
          }
        });
        onClose && onClose(images);
      } else if (value?.length == 0 && images?.length == 0) {
        // incase image was null and nothing change
        onClose && onClose([]);
        setIsSaving(false);
      } else {
        // incase nothing change
        onClose && onClose(images);
        setIsSaving(false);
      }
    }
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
      // using S3
      // mUpload.mutate(needUpload[curFileIndex]?.image);

      // using Storage
      convertImageToBase64(needUpload[curFileIndex]?.image).then((data: any) => {
        const blob = new Blob([data], { type: needUpload[curFileIndex]?.image?.type });
        const fileName = needUpload[curFileIndex]?.image?.name;
        const uploadFile = new File([blob], fileName);

        const fileFormData = new FormData();
        fileFormData.append('files', uploadFile);
        fileFormData.append('module', IMAGE_MODULE_PRODUCT_ITEM);
        console.log('fileFormData', fileFormData);
        mStorageUpLoad.mutate(fileFormData);
      });
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

      const params: any = {
        item: {
          id: menuSourceId,
          images: imagesData
        }
      };
      mUpdate.mutate(params, {
        onSuccess: (data: any, variables: any, context: any) => {
          queryClient.refetchQueries({ queryKey: [queryKeys.listItem] });
          setIsSaving(false);
          onClose && onClose(imagesData);
        },
        onError: (error: any, variables: any, context: any) => {
          setIsSaving(false);
          enqueueErrorBar('Update item failed: ' + JSON.parse(error).message);
        }
      });
    } else {
      // next uploaded
      const nextFileIndex = curFileIndex + 1;
      setCurFileIndex(nextFileIndex);
    }
  }, [lastUploadedFileIndex]);

  return (
    <Stack sx={{ p: 2 }} spacing={0.5}>
      <MultiFileUpload onChange={handleUpload} value={images} />
      <ImagesSlider images={images} onDelete={handleRemove} />
      <HanButtonGroup
        onSave={handleOnSave}
        // disabled={!isValid}
        onClose={onClose}
        isSaving={isSaving}
        // isHorizontal={isHorizontal}
      />
    </Stack>
  );
};

export default Images;
