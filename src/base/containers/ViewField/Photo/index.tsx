import React, { useEffect, useState } from 'react';

//third-party
import _ from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

//project
import { MENU_CUSTOMER } from '@base/config/menus';
import { HoverEditContainer, ViewContainer } from '@base/containers/ViewField/Common';
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';

//menu
import { KEY_NAME_CUSTOMER_ID, KEY_NAME_CUSTOMER_PHOTO } from '@customer/config/keyNames';
import { customerQueryKeys } from '@customer/config/queryKeys';
import useCustomerUpdate from '@customer/hooks/useCustomerUpdate';

//material
import { Box, CircularProgress, ClickAwayListener, IconButton, useTheme } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

//local
import Edit from './Edit';
import View from './View';

interface PhotoViewFieldProps {
  menuSource: string;
  menuSourceId: string;
  value: any;
  onRefetch?: () => void;
}

const PhotoViewField = (props: PhotoViewFieldProps) => {
  const { menuSource, menuSourceId, value, onRefetch } = props;
  //state
  const [isEdit, setIsEdit] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  //hooks
  const { mUpload } = useAWSS3Mutation();
  const mUpdateCustomer: any = useCustomerUpdate();
  const queryClient = useQueryClient();

  //upload success
  useEffect(() => {
    //console.log('mUpload', mUpload);
    if (mUpload.isSuccess) {
      if (menuSource === MENU_CUSTOMER) {
        //then update to db
        const params = {
          [KEY_NAME_CUSTOMER_ID]: menuSourceId,
          [KEY_NAME_CUSTOMER_PHOTO]: mUpload.data ? JSON.stringify(mUpload.data) : ''
        };
        mUpdateCustomer.mutate({ customer: params });
      }
    }
  }, [mUpload.isSuccess]);

  //update success
  useEffect(() => {
    //console.log('mUpdateCustomer', mUpdateCustomer);
    if (mUpdateCustomer.isSuccess) {
      if (menuSource === MENU_CUSTOMER) {
        // optimisticQueryKey
        const newPhotoValue = { [KEY_NAME_CUSTOMER_PHOTO]: mUpdateCustomer.variables?.customer?.[KEY_NAME_CUSTOMER_PHOTO] };
        queryClient.setQueryData([customerQueryKeys.customerGet], (old: any) => {
          return { ...old, ...newPhotoValue };
        });

        onRefetch && onRefetch();
      }
      //off edit
      setIsEdit(false);
    }
  }, [mUpdateCustomer.isSuccess]);

  //event
  const handleFileChange = (files: any[]) => {
    setFiles(files);
  };

  //upload and save
  const handleUploadAndSave = () => {
    //// console.log('save....', files);
    if (files.length > 0) {
      //upload to file server
      mUpload.mutate(files[0]);
    }
  };

  return (
    <HoverEditContainer>
      {isEdit ? (
        <ClickAwayListener
          onClickAway={() => {
            setIsEdit(false);
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Edit value={files} onChange={handleFileChange} />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton onClick={handleUploadAndSave} sx={{ padding: 0 }}>
                {mUpload.isLoading || mUpdateCustomer.isLoading ? <CircularProgress /> : <SaveIcon color="success" />}
              </IconButton>
              <IconButton onClick={() => setIsEdit(false)} sx={{ padding: 0 }}>
                <ClearIcon color="error" />
              </IconButton>
            </Box>
          </Box>
        </ClickAwayListener>
      ) : (
        <ViewContainer
          style={{ padding: '1px 0px 1px 2px', cursor: 'pointer' }}
          onClick={() => {
            setIsEdit(true);
          }}
        >
          <View key={menuSourceId} value={value} />
        </ViewContainer>
      )}
    </HoverEditContainer>
  );
};

export default PhotoViewField;
