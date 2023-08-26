import React, { useState, useEffect } from 'react';

// material-ui
import Avatar from '@base/components/@extended/Avatar';
import { AvatarProps, SxProps } from '@mui/material';

// types
import { AvatarTypeProps, ColorProps, SizeProps } from '@base/types/extended';

// assets
import noImage from '@base/assets/images/commerce/notfound.png';
import noAvatar from '@base/assets/images/users/avatar-1.png';
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { useStorageDownloadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';

export interface IconAvatarProps extends AvatarProps {
  id?: string;
  url?: string;
  alt?: string;
  color?: ColorProps;
  type?: AvatarTypeProps;
  size?: SizeProps;
  showType?: 'avatar' | 'image';
  sx?: SxProps;
  getImageSrc?: (url: string) => void;
  moduleDownload?: string; // to down load data using Storage
}

/**
 *
 * @param {*} props
 * @returns
 */
const IconAvatar = (props: IconAvatarProps) => {
  const { id = '', url = '', size = 'sm', alt = '', showType = 'avatar', moduleDownload, ...others } = props;

  /*  Down load image using S3
  // //state
  // const [imageData, setImageData] = useState<any>(null);
  // //download mutation
  // const { mDownload } = useAWSS3Mutation(setImageData);
  // // set new image
  // useEffect(() => {
  //   if (url && id) {
  //     try {
  //       const params = {
  //         key: id,
  //         bucket: url
  //       };
  //       mDownload.mutate(params);
  //     } catch {
  //       setImageData(null);
  //     }
  //   } else {
  //     setImageData(null);
  //   }
  // }, [url, id]);
  */

  /* Download image using Storage */
  const [imageData, setImageData] = useState<any>(null);
  //Get html data from html key
  const mStorageDownload: any = useStorageDownloadMutation<BaseMutationResponse>({
    onSuccess: (data: any, variables: any, context: any) => {
      setImageData(data);
    },
    onError: (error: any, variables: any, context: any) => {
      // console.log('There is an error during uploading: ' + JSON.parse(error).message);
    }
  });

  useEffect(() => {
    if (url && id && moduleDownload) {
      try {
        const params = {
          filename: id,
          module: moduleDownload
        };
        mStorageDownload.mutate(params);
      } catch {
        setImageData(null);
      }
    } else {
      setImageData(null);
    }
  }, [url, id, moduleDownload]);
  /* Download image using Storage */

  // render image by url
  if (url && id) {
    return (
      // mDownload image using S3
      // <>
      //   {!mDownload.isLoading && imageData === null && (
      //     <Avatar alt={alt} size={size} src={showType === 'avatar' ? noAvatar : noImage} {...others} />
      //   )}
      //   {!mDownload.isLoading && imageData !== null && <Avatar alt={alt} size={size} src={imageData} {...others} />}
      // </>

      // mDownload image using Storage
      <>
        {!mStorageDownload.isLoading && imageData === null && (
          <Avatar alt={alt} size={size} src={showType === 'avatar' ? noAvatar : noImage} {...others} />
        )}
        {!mStorageDownload.isLoading && imageData !== null && <Avatar alt={alt} size={size} src={imageData} {...others} />}
      </>
    );
  }

  // render image by name
  return <Avatar alt={alt} size={size} src={showType === 'avatar' ? noAvatar : noImage} {...others} />;
};

export default IconAvatar;
