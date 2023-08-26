import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Attachment, AttachmentsResponse } from '@base/types/attachment';
import Avatar from '@base/components/@hanbiro/IconAvatar';
import { convertDateTimeServerToClient, getFileIcon, humanFileSize } from '@base/utils/helpers/generalUtils';
import { SvgIcons } from '@base/assets/icons/svg-icons';
import { useDeleteObjectMutation, useDownloadObjectMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query'; //v4
import Grid from '@mui/material/Grid';
import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import useSnackBar from '@base/hooks/useSnackBar';
import useAttachmentMutation from '@base/hooks/attachment/useAttachmentMutation';
import { DeleteOutline, FileDownloadOutlined } from '@mui/icons-material';

interface AttachmentCard {
  listType: string;
  menuSource: string;
  menuSourceId: string;
  item: Attachment;
  onRemoveItem: (id: string) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const AttachmentCard = (props: AttachmentCard) => {
  const { listType = 'grid', menuSource, menuSourceId, item, onRemoveItem } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  //lang
  const { t } = useTranslation();
  const [downloadItem, setDownloadItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  //download mutation
  const mDownload: any = useDownloadObjectMutation<BaseMutationResponse>({
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      //toast.success('Uploaded successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      //// console.log('mutation error', error);
      enqueueErrorBar('Downloaded failed: ' + error.message);
    }
  });

  //delete mutation
  const mDeleteUpload: any = useDeleteObjectMutation<BaseMutationResponse>({
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      //toast.success('Uploaded successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      console.log('mutation error', error.message);
      enqueueErrorBar('Deleted upload failed: ' + error.message);
    }
  });

  //delete in DB
  const { mDeleteAttachment } = useAttachmentMutation(menuSource, menuSourceId);

  //download success
  useEffect(() => {
    //// console.log('<<< download completed useEffect >>>', mDownload);
    //reference: https://base64.guru/converter/encode/image
    if (mDownload.isSuccess) {
      let link = window.document.createElement('a');
      link.href = mDownload.data;
      link.download = downloadItem.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //reset
      setDownloadItem(null);
    }
  }, [mDownload.isSuccess]);

  //delete upload success
  useEffect(() => {
    //// console.log('<<< deleted upload useEffect >>>', mDeleteUpload);
    if (mDeleteUpload.isSuccess) {
      //delete in DB
      const params = {
        source: {
          menu: menuSource,
          id: menuSourceId
        },
        id: deleteItem.id
      };
      mDeleteAttachment.mutate(params);
    }
  }, [mDeleteUpload.isSuccess]);

  //delete DB success
  useEffect(() => {
    //// console.log('<<< deleted DB useEffect >>>', mDeleteAttachment);
    if (mDeleteAttachment.isSuccess) {
      //reset
      setDeleteItem(null);
    }
  }, [mDeleteAttachment.isSuccess]);

  //download 1 file
  const handleDownloadFile = async (item: any) => {
    if (item) {
      setDownloadItem(item);
      const params = {
        key: item.objectId,
        bucket: item.objectUrl
      };
      mDownload.mutate(params);
    }
  };

  //delete a file
  const handleDeleteFile = (item: any) => {
    setDeleteItem(item);
    //delete upload
    // @TODO: Waiting DeleteObject from S3
    const params = { key: item.objectId, bucket: item.objectUrl };
    mDeleteUpload.mutate(params);
    // const params = {
    //   source: {
    //     menu: menuSource,
    //     id: menuSourceId
    //   },
    //   id: item.id
    // };
    // mDeleteAttachment.mutate(params);
  };

  //render icon or image
  const renderAttachmentIcon = () => {
    const [, fileExt] = item.name.split('.');
    let icon = 'txt';
    if (
      fileExt.toLowerCase() === 'jpg' ||
      fileExt.toLowerCase() === 'jpeg' ||
      fileExt.toLowerCase() === 'png' ||
      fileExt.toLowerCase() === 'gif'
    ) {
      if (item?.url) {
        return <Avatar key={item.id} url={item?.url} sx={{ height: '100px', width: '100px' }} />;
      } else {
        icon = getFileIcon(item.name);
      }
    } else {
      icon = getFileIcon(item.name);
    }
    return <SvgIcons type={icon} />;
  };

  //render grid view

  console.log(item.createdAt?.toString());
  //render list view
  const ListView = useMemo(() => {
    return (
      <Grid container sx={{ alignItems: 'center', flexWrap: 'nowrap', padding: '5px 10px', marginBottom: '3px' }}>
        <Grid container sx={{ alignItems: 'center', flexWrap: 'nowrap', flexGrow: 1 }}>
          <Box component="span" sx={{ '& svg': { width: 'auto', height: '30px' }, alignItems: 'center' }}>
            {renderAttachmentIcon()}
          </Box>
          <Box sx={{ overFlow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: '10px', flex: 1 }}>
            {item.name}
            <Typography sx={{ overFlow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#6c757d ', fontSize: '80%' }}>
              <>
                ({humanFileSize(item.size || 1)}) {convertDateTimeServerToClient({ date: item.createdAt?.toString(), isTime: true })}
              </>
            </Typography>
          </Box>
        </Grid>
        <Grid container sx={{ flexShrink: 0, width: 'auto' }}>
          <Tooltip title="Download">
            {mDownload.isLoading ? (
              <CircularProgress size="small" />
            ) : (
              <IconButton onClick={() => handleDownloadFile(item)}>
                <FileDownloadOutlined color="primary" fontSize="small" /> 
              </IconButton>
            )}
          </Tooltip>
          <Tooltip title="Delete">
            {mDeleteUpload.isLoading || mDeleteAttachment.isLoading ? (
              <CircularProgress size="small" />
            ) : (
              <IconButton onClick={() => handleDeleteFile(item)}>
                <DeleteOutline color="error" fontSize="small" /> 
              </IconButton>
            )}
          </Tooltip>
        </Grid>
      </Grid>
    );
  }, [item]);
  //render item
  return (
    <>
      {listType === 'grid' && ListView}
      {listType === 'list' && ListView}
    </>
  );
};

export default AttachmentCard;
