import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { Control, FieldErrorsImpl } from 'react-hook-form';

import WriteField from '@base/containers/WriteField';
import { S3UploadedFile } from '@base/types/s3';
import { Box, Grid } from '@mui/material';
import { KEY_NAME_TASK_ATTACHMENT } from '@project/config/keyNames';

interface WriteFieldsProps {
  fields: any[]; //with write form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  startUpload: boolean;
  onUploadComplete: (uploads: S3UploadedFile[]) => void;
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, control, errors, startUpload, onUploadComplete } = props;

  const onAttachUploadCompleted = (files: S3UploadedFile[]) => {
    console.log('onUploadCompleted', files);
    onUploadComplete(files);
  };

  // main fields
  const MainFields = useMemo(() => {
    return (
      <>
        {fields.map((_item, _index) => {
          if (_item.keyName == KEY_NAME_TASK_ATTACHMENT) {
            _item.componentProps = {
              ..._item.componentProps,
              onUploadCompleted: onAttachUploadCompleted,
              startUpload: startUpload
            };

            console.log('startupload', startUpload);
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
