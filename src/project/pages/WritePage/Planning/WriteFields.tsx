import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { Control, FieldErrorsImpl } from 'react-hook-form';

import WriteField from '@base/containers/WriteField';
import { Box, Grid } from '@mui/material';
import { S3UploadedFile } from '../../../../base/types/s3';
import { KEY_NAME_PLANNING_ATTACHMENT, KEY_NAME_PLANNING_UI_IMAGE } from '../../../config/keyNames';

interface WriteFieldsProps {
  fields: any[]; //with write form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  startUpload: boolean;
  onUploadComplete: (uploads: Record<string, S3UploadedFile[]>) => void;
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, control, errors, startUpload, onUploadComplete } = props;
  const [uploadCount, setUploadCount] = useState(0);
  const [imageFiles, setImageFiles] = useState<S3UploadedFile[]>([]);
  const [attachFiles, setAttachFiles] = useState<S3UploadedFile[]>([]);

  const onImageUploadCompleted = (files: S3UploadedFile[]) => {
    console.log('onImageUploadCompleted', files);
    if (files.length > 0) {
      setImageFiles([...imageFiles, ...files]);
    }
    setUploadCount((cur) => cur + 1);
  };

  const onAttachUploadCompleted = (files: S3UploadedFile[]) => {
    console.log('onUploadCompleted', files);
    if (files.length > 0) {
      setAttachFiles([...attachFiles, ...files]);
    }
    setUploadCount((cur) => cur + 1);
  };

  useEffect(() => {
    if (uploadCount == 2) {
      const files = {} as Record<string, S3UploadedFile[]>;
      if (imageFiles) {
        files.image = imageFiles;
      }
      if (attachFiles) {
        files.attach = attachFiles;
      }
      onUploadComplete(files);
    }
  }, [uploadCount, imageFiles, attachFiles]);

  // main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          if (_item.keyName == KEY_NAME_PLANNING_UI_IMAGE) {
            _item.componentProps = {
              ..._item.componentProps,
              onUploadCompleted: onImageUploadCompleted,
              startUpload: startUpload,
              allowExtensions: [
                {
                  type: 'image',
                  subtype: 'png',
                  extensions: ['.jpg', '.png', '.jpeg', '.gif']
                }
              ]
            };
          }
          if (_item.keyName == KEY_NAME_PLANNING_ATTACHMENT) {
            _item.componentProps = {
              ..._item.componentProps,
              onUploadCompleted: onAttachUploadCompleted,
              startUpload: startUpload
            };
          }
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fields, startUpload]);

  //render
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
