import { useEffect, useState } from 'react';
//project
import { Attachment } from '@base/types/attachment';
import Avatar from '@base/components/@hanbiro/IconAvatar';
import { getFileIcon, humanFileSize } from '@base/utils/helpers/generalUtils';
import { SvgIcons } from '@base/assets/icons/svg-icons';
import { useDownloadObjectMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import useSnackBar from '@base/hooks/useSnackBar';
import { CommentTicket, EmailTicket } from '@desk/ticket/types/comment';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import Icon from '@base/assets/icons/svg-icons';
import { DownloadObjectRequest } from '@base/types/s3';
import { nanoid } from '@base/utils/helpers';

//third-party
import { useTranslation } from 'react-i18next';
import saveAs from 'file-saver';
import JSZip from 'jszip';

//material-ui
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  Grid,
  Stack,
  Divider
} from '@mui/material';
import { FileDownloadOutlined, KeyboardArrowDown, AttachFile } from '@mui/icons-material';

interface CommentAttachment {
  comment: CommentTicket | EmailTicket;
}

/**
 *
 * @param {*} props
 * @returns
 */
const zip = new JSZip();

const CommentAttachment = (props: CommentAttachment) => {
  const { comment } = props;
  const { enqueueErrorBar } = useSnackBar();
  //lang
  const { t } = useTranslation();
  //state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [downloadItem, setDownloadItem] = useState<any>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState<boolean>(false);
  const [curDownloadIndex, setCurDownloadIndex] = useState<number>(-1);
  const [attachments, setAttachments] = useState<any>([]);
  const [lastDownloadedIndex, setLastDownloadedIndex] = useState<number>(-1);
  const [downloadIndex, setDownloadIndex] = useState<number>(-1);

  //set list state
  useEffect(() => {
    if (comment) {
      //// console.log('data hook', data?.results);
      setAttachments(comment.attachedFiles);
    } else {
      setAttachments([]); //TEST_DATA
    }
  }, [comment]);

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

  /* ================================== Download 1 file ====================================== */

  //download success
  useEffect(() => {
    //// console.log('<<< download completed useEffect >>>', mDownload);
    //reference: https://base64.guru/converter/encode/image
    if (mDownload.isSuccess && downloadItem !== null) {
      console.log('mDownload', mDownload);
      let link = window.document.createElement('a');
      link.href = mDownload.data;
      link.download = downloadItem.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //reset
      setDownloadItem(null);
      setDownloadIndex(-1);
    }
  }, [mDownload.isSuccess]);

  //download 1 file
  const handleDownloadFile = async (item: any, key: number) => {
    if (item) {
      setDownloadItem(item);
      setDownloadIndex(key);
      const params = {
        key: item.objectId,
        bucket: item.objectUrl
      };
      mDownload.mutate(params);
    }
  };
  /* ================================== End Download 1 file ====================================== */

  //get total files size
  const getTotalSize = (comment: CommentTicket | EmailTicket) => {
    let totalSize = 0;
    if (comment.attachedFiles) {
      comment.attachedFiles.map((file: Attachment) => {
        if (file !== null) {
          totalSize += file.size;
        }
      });
    }
    return totalSize;
  };
  /* ================================== Download ALL ====================================== */
  useEffect(() => {
    if (curDownloadIndex !== -1 && isDownloadingAll) {
      const params: DownloadObjectRequest = {
        key: attachments[curDownloadIndex].objectId,
        bucket: attachments[curDownloadIndex].objectUrl
      };
      mDownload.mutate(params);
    }
  }, [curDownloadIndex]);

  //next file - last file
  useEffect(() => {
    if (lastDownloadedIndex === -1) {
      return;
    }
    const isLastFile = lastDownloadedIndex === attachments.length - 1;
    const nextFileIndex = isLastFile ? -1 : curDownloadIndex + 1;
    setCurDownloadIndex(nextFileIndex);
    //if last, generate zip
    if (isLastFile) {
      zip.generateAsync({ type: 'blob' }).then(function (blob) {
        console.log('Blob', blob);
        saveAs(blob, `attachment_${nanoid()}.zip`);
        setIsDownloadingAll(false);
      });
      //reset
      attachments?.map((curAttachments: any, index: number) => {
        zip.remove(attachments[index].name);
      });
      setCurDownloadIndex(-1);
      setLastDownloadedIndex(-1);
    }
  }, [lastDownloadedIndex]);

  //download success
  useEffect(() => {
    //// console.log('<<< download completed useEffect >>>', mDownload);
    //reference: https://base64.guru/converter/encode/image
    if (mDownload.isSuccess && isDownloadingAll) {
      //zip

      const base64Data = mDownload.data.substring(mDownload.data.indexOf(',') + 1);
      zip.file(attachments[curDownloadIndex].name, base64Data, { base64: true });
      //next download
      setLastDownloadedIndex(curDownloadIndex);
    }
  }, [mDownload.isSuccess]);

  //download all
  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    if (attachments.length > 0) {
      if (curDownloadIndex === -1) {
        setCurDownloadIndex(lastDownloadedIndex === -1 ? 0 : lastDownloadedIndex + 1);
      }
    }
  };
  /* ================================== End Download ALL ====================================== */

  //render item
  const RenderAttachment = (item: Attachment, key: number) => {
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
    return (
      <>
        {item && (
          <Grid container sx={{ alignItems: 'center', flexWrap: 'nowrap', padding: '5px 10px', marginBottom: '3px' }}>
            <Grid container sx={{ alignItems: 'center', flexWrap: 'nowrap', flexGrow: 1 }}>
              <Box component="span" sx={{ '& svg': { width: 'auto', height: '30px' }, alignItems: 'center' }}>
                {renderAttachmentIcon()}
              </Box>
              <Box sx={{ overFlow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: '10px', flex: 1 }}>
                {item.name}
                <Typography sx={{ overFlow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#6c757d ', fontSize: '80%' }}>
                  <>({humanFileSize(item.size || 1)})</>
                </Typography>
              </Box>
            </Grid>
            <Grid container sx={{ flexShrink: 0, width: 'auto' }}>
              <Tooltip title={t('ncrm_common_download_tooltip')}>
                {mDownload.isLoading && !isDownloadingAll && downloadIndex === key ? (
                  <CircularProgress size={21} />
                ) : (
                  <IconButton onClick={() => handleDownloadFile(item, key)}>
                    <FileDownloadOutlined color="primary" fontSize="small" />
                  </IconButton>
                )}
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </>
    );
  };

  //render list
  return (
    <Box>
      <ListItemButton sx={{ pl: 0 }} onClick={() => setIsOpen(!isOpen)}>
        <ListItemText
          primary={
            <Stack direction="row">
              <Typography sx={{ fontWeight: 'medium', mr: '8px' }}>{t('ncrm_common_section_attachment_attachments')}</Typography>

              <Typography>{'(' + comment?.attachedFiles?.length}</Typography>
              <Box sx={{ display: 'flex' }} alignItems="center">
                <AttachFile sx={{ ml: '5px', fontSize: '0.875rem' }} />
              </Box>
              <Typography>{humanFileSize(getTotalSize(comment)) + ')'}</Typography>
            </Stack>
          }
          sx={{ my: 0 }}
        />
        <KeyboardArrowDown
          sx={{
            mr: -1,
            transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
            transition: '0.2s'
          }}
        />
      </ListItemButton>
      {isOpen &&
        comment?.attachedFiles.map((item: Attachment, index: number) => {
          return <Box key={index}>{RenderAttachment(item, index)}</Box>;
        })}
      {isOpen && (
        <Button
          onClick={() => {
            handleDownloadAll();
          }}
          color="primary"
          size="small"
        >
          <Grid container>
            <Typography sx={{ marginRight: '5px' }}>{Icon('file_zip')}</Typography>
            <SpanLang keyLang={'common_section_attachment_download_all'} />
            {isDownloadingAll && <CircularProgress size="1rem" sx={{ marginLeft: '10px' }} />}
          </Grid>
        </Button>
      )}
    </Box>
  );
};

export default CommentAttachment;
