import React, { useEffect, useMemo, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import RouteName from '@base/components/@hanbiro/RouteName';
import { useAttachmentsByMenu } from '@base/hooks/attachment/useAttachmentsByMenu';
import { useDownloadObjectMutation, useDeleteObjectMutation, useUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { Typography, Checkbox, Box, Grid, Stack, useTheme, Button, IconButton, Tooltip } from '@mui/material';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ColumnDef } from '@tanstack/react-table';
import useSnackBar from '@base/hooks/useSnackBar';
import CircularProgress from '@mui/material/CircularProgress';
import * as keyNames from '@desk/ticket/config/keyNames';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { convertDateTimeServerToClient, getFileIcon, humanFileSize } from '@base/utils/helpers/generalUtils';
import NoData from '@base/components/@hanbiro/NoData';
import FilesUploadProgress from '@base/components/@hanbiro/Dropzone/FilesUploadProgress';
import UploadMultiFile from '@base/components/@hanbiro/Dropzone/MultiFile';
import { BaseMutationResponse } from '@base/types/response';
import { nanoid } from '@base/utils/helpers';
import useAttachmentMutation from '@base/hooks/attachment/useAttachmentMutation';
import { DownloadObjectRequest } from '@base/types/s3';
import Icon from '@base/assets/icons/svg-icons';
import { DeleteOutline, FileDownloadOutlined } from '@mui/icons-material';
import { MENU_SOURCE } from '@base/config/menus';
interface AttachmentsTab {
  listType?: string;
  menuSource: string;
  menuSourceId: string;
}

const zip = new JSZip();
const LIMIT = 100;

/**
 *
 * @param props
 * @returns
 */
const Attachment = (props: AttachmentsTab) => {
  let { listType = 'list', menuSource, menuSourceId } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  // state
  const [attachments, setAttachments] = useState<any>([]);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any[]>([]);
  const [curFileIndex, setCurFileIndex] = useState<number>(-1);
  const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState<number>(-1);
  const [curDownloadIndex, setCurDownloadIndex] = useState<number>(-1);
  const [lastDownloadedIndex, setLastDownloadedIndex] = useState<number>(-1);
  const [progressParts, setProgressParts] = useState<any>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  // update menusource
  menuSource = MENU_SOURCE[menuSource] ?? menuSource;

  /** ================================= HOOK ====================================== */
  const { data, isLoading, refetch } = useAttachmentsByMenu(menuSource, menuSourceId, LIMIT);
  const [list, setList] = useState(false);
  const [downloadItem, setDownloadItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const { mDeleteAttachment } = useAttachmentMutation(menuSource, menuSourceId);
  // const resetUploadIndexInError = () => {
  //   const nUploadFiles = uploadFiles.filter((_item, index) => index !== curFileIndex);
  //   const nCurFileIndex = nUploadFiles.length > 0 && curFileIndex < nUploadFiles.length ? curFileIndex : -1;
  //   const nLastUploadedFileIndex = nUploadFiles.length > 0 && lastUploadedFileIndex < nUploadFiles.length ? lastUploadedFileIndex : -1;
  //   setUploadFiles(nUploadFiles);
  //   setCurFileIndex(nCurFileIndex);
  //   setLastUploadedFileIndex(nLastUploadedFileIndex);
  //   reUploadFromIndex(nCurFileIndex);
  // };
  // const reUploadFromIndex = (nIdx: number) => {
  //   mUpload.mutate(uploadFiles[nIdx].file);
  // };
  //set list state
  useEffect(() => {
    if (data?.results) {
      //// console.log('data hook', data?.results);
      setAttachments(data?.results);
    } else {
      setAttachments([]); //TEST_DATA
    }
  }, [data]);

  /* ================================== mutations ====================================== */
  // upload
  const mUpload: any = useUploadMutation<BaseMutationResponse>(
    {
      onSuccess: (data: any, variables: any, context: any) => {
        //toast.success('Uploaded successfully!');
      },
      onError: (error: any, variables: any, context: any) => {
        //// console.log('mutation error', error);
        enqueueErrorBar('Uploaded failed: ' + JSON.parse(error).message);
      }
    },
    (pEvent: ProgressEvent, partsNumber: number, partIndex: number, extraParam?: any) =>
      uploadProgressHandler(pEvent, partsNumber, partIndex, extraParam)
  );

  //save to db
  const { mAddAttachment } = useAttachmentMutation(menuSource, menuSourceId);

  //download mutation
  const mDownload: any = useDownloadObjectMutation<BaseMutationResponse>({
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      console.log('Uploaded successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
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

  //upload success
  useEffect(() => {
    if (mUpload.isSuccess) {
      console.log('<<< completed useEffect >>>', mUpload);
      //set progress to 100
      const newUploadFiles = [...uploadFiles];
      newUploadFiles[curFileIndex].percentCompleted = 100;

      //save to DB
      // uploading has Error
      if (mUpload.data.key === '') {
        newUploadFiles[curFileIndex].stopped = true;
        console.log('File has error', curFileIndex);
        setLastUploadedFileIndex(curFileIndex);
      }
      setUploadFiles(newUploadFiles);
      if (mUpload.data.key !== '') {
        const params = {
          source: {
            menu: menuSource,
            id: menuSourceId
          },
          objectId: mUpload.data.key, //upload id
          objectUrl: mUpload.data.bucket, //download url
          name: newUploadFiles[curFileIndex].file.name,
          size: newUploadFiles[curFileIndex].file.size,
          contentType: newUploadFiles[curFileIndex].file.type
        };
        console.log('mAddAttachment', params);
        mAddAttachment.mutate({ attachment: params });
      }
    }
  }, [mUpload.isSuccess]);

  //update db success
  useEffect(() => {
    if (mAddAttachment.isSuccess) {
      //refetch(); //load list
      //insert new to state
      const newAttachments = [...attachments];
      newAttachments.push({
        id: mAddAttachment.data.id,
        name: uploadFiles[curFileIndex].file.name,
        size: uploadFiles[curFileIndex].file.size,
        contentType: uploadFiles[curFileIndex].file.type,
        objectId: mUpload.data.key, //upload id
        objectUrl: mUpload.data.bucket, //download url
        createdAt: new Date().toISOString() //'2022-08-08'
      });
      setAttachments(newAttachments);

      //next file uploading
      setLastUploadedFileIndex(curFileIndex);
    }
  }, [mAddAttachment.isSuccess]);

  /* ================================== END mutations ====================================== */

  /* ================================== Download ALL ====================================== */
  useEffect(() => {
    if (curDownloadIndex !== -1) {
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
        saveAs(blob, `attachment_${nanoid()}.zip`);
        setIsDownloadingAll(false);
      });
      //reset
      setCurDownloadIndex(-1);
      setLastDownloadedIndex(-1);
    }
  }, [lastDownloadedIndex]);

  //download success
  useEffect(() => {
    //// console.log('<<< download completed useEffect >>>', mDownload);
    //reference: https://base64.guru/converter/encode/image
    if (mDownload.isSuccess) {
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
  /* ================================== End ALL ====================================== */

  /* ================================== HANDLER ====================================== */
  //calculate progress for parts
  const uploadProgressHandler = async (progressEvent: ProgressEvent, numberParts: number, partIndex: number, extraParam: any) => {
    const { uploadId, bucket } = extraParam;
    if (progressEvent.loaded >= progressEvent.total) return;
    const currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //set parts upload progress
    setProgressParts((progressParts: any[]) => {
      progressParts[partIndex] = currentProgress;
      const sum = progressParts.reduce((acc: any, curr: any) => acc + curr);

      //set file progress
      const newUploadFiles = [...uploadFiles];
      if (!newUploadFiles[curFileIndex].stopped) {
        newUploadFiles[curFileIndex].percentCompleted = Math.round(sum / numberParts);
        newUploadFiles[curFileIndex].uploadId = uploadId || '';
        newUploadFiles[curFileIndex].bucket = bucket || '';
        //@TODO need to improve rerender
        setUploadFiles(newUploadFiles);
      }

      return progressParts;
    });
  };

  //upload files change, start upload files
  useEffect(() => {
    if (uploadFiles.length > 0) {
      if (curFileIndex === -1) {
        setCurFileIndex(lastUploadedFileIndex === -1 ? 0 : lastUploadedFileIndex + 1);
      }
    }
  }, [uploadFiles]);

  //upload current file
  useEffect(() => {
    if (curFileIndex !== -1) {
      mUpload.mutate(uploadFiles[curFileIndex].file);
    }
  }, [curFileIndex]);

  //next file - last file
  useEffect(() => {
    if (lastUploadedFileIndex === -1) {
      return;
    }
    const isLastFile = lastUploadedFileIndex === uploadFiles.length - 1;
    const nextFileIndex = isLastFile ? -1 : curFileIndex + 1;
    setCurFileIndex(nextFileIndex);
    console.log('nextFileIndex', nextFileIndex);
  }, [lastUploadedFileIndex]);

  //files select
  const handleFileChange = (files: any) => {
    // reset upload
    setLastUploadedFileIndex(-1);
    const newFiles = files.map((_file: any) => ({ file: _file, percentCompleted: 0, stopped: false }));
    setUploadFiles(newFiles);
  };
  //download
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

  const handleDeleteFile = (item: any) => {
    setDeleteItem(item);
    const params = { key: item.objectId, bucket: item.objectUrl };
    mDeleteUpload.mutate(params);
  };

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

  const mapColumns = {
    [keyNames.KEY_TICKET_FILE_NAME](col: string, data: any) {
      let fileName = data[col] ? data[col] : <em>{t('ncrm_common_none')}</em>;
      return <RouteName name={fileName} url={'#'} variant="h6" />;
    },
    [keyNames.KEY_TICKET_FILE_SIZE](col: string, data: any) {
      return data?.[col] ? <Typography>{humanFileSize(data?.[col])}</Typography> : <em>(none)</em>;
    },

    [keyNames.KEY_TICKET_FILE_UPDATED_BY](col: string, data: any) {
      return data?.[col] ? <Typography>{data?.[col].name}</Typography> : <em>(none)</em>;
    },
    [keyNames.KEY_TICKET_FILE_UPDATED_AT](col: string, data: any) {
      return data?.[col] ? <Typography>{convertDateTimeServerToClient({ date: data?.[col] })}</Typography> : <em>(none)</em>;
    }
  };

  const fields = useMemo(() => {
    return [
      { languageKey: 'File Name', keyName: keyNames.KEY_TICKET_FILE_NAME, enableSorting: true, width: 'auto' },
      { languageKey: 'Size', keyName: keyNames.KEY_TICKET_FILE_SIZE, enableSorting: true, width: 'auto' },
      { languageKey: 'Update By', keyName: keyNames.KEY_TICKET_FILE_UPDATED_BY, enableSorting: true, width: 'auto' },
      { languageKey: 'Update Date', keyName: keyNames.KEY_TICKET_FILE_UPDATED_AT, enableSorting: true, width: 'auto' }
    ];
  }, []);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        header: ({ table }) => (
          <Checkbox
            {...{
              color: 'secondary',
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
            sx={{ p: 0 }}
          />
        ),
        cell: ({ row }) => (
          <Box>
            <Checkbox
              {...{
                color: 'secondary',
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
              sx={{ p: 0 }}
            />
          </Box>
        )
      },
      ...makeTable8Columns(fields, mapColumns, {}, []),
      {
        id: 'function',
        cell: ({ row }) => (
          <Box>
            <Grid container sx={{ flexShrink: 0, width: 'auto' }}>
              <Tooltip title="Download">
                {mDownload.isLoading ? (
                  <CircularProgress size="small" />
                ) : (
                  <IconButton
                    onClick={() => {
                      const attachment = row.original;
                      handleDownloadFile(attachment);
                    }}
                  >
                    <FileDownloadOutlined color="primary" fontSize="small" /> 
                  </IconButton>
                )}
              </Tooltip>
              <Tooltip title="Delete">
                {mDeleteUpload.isLoading || mDeleteAttachment.isLoading ? (
                  <CircularProgress size="small" />
                ) : (
                  <IconButton
                    onClick={() => {
                      const attachment = row.original;
                      handleDeleteFile(attachment);
                    }}
                  >
                    <DeleteOutline color="error" fontSize="small" /> 
                  </IconButton>
                )}
              </Tooltip>
            </Grid>
          </Box>
        ),
        row: true
      }
    ],
    [fields]
  );
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: attachments,
      columns: columns,
      checkedIds,
      onRowChecked: (checkedIds: string[]) => {
        setCheckedIds(checkedIds);
      },
      sx: { p: 0, mb: 0 }
    };
    return <ListTable {...listTableProps} />;
  }, [attachments, columns]);
  return (
    <>
      <Box sx={{ p: 0, m: '-16px !important' }}>
        {!isLoading && attachments.length > 0 && (
          <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
            <Button
              onClick={() => {
                handleDownloadAll();
              }}
              variant="outlined"
              sx={{
                '&:hover': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main
                },
                margin: '10px'
              }}
              color="secondary"
            >
              <Grid container>
                <Typography sx={{ marginRight: '5px' }}>{Icon('file_zip')}</Typography>
                <SpanLang keyLang={'common_section_attachment_download_all'} />
                {isDownloadingAll && <CircularProgress size="1rem" sx={{ marginLeft: '10px' }} />}
              </Grid>
            </Button>
          </Stack>
        )}
        {attachments.length === 0 || isLoading ? <NoData icon={'FileText'} iconType={'feather'} /> : TableMemo}{' '}
        <Box component="div" sx={{ margin: '10px' }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack alignItems="center">
                <UploadMultiFile
                  sx={{ padding: 0, borderColor: theme.palette.secondary.light }}
                  showList={list}
                  setFieldValue={(field: string, nFiles: any[]) => {
                    handleFileChange(nFiles);
                  }}
                  simplePlaceholder={true}
                  autoUpload={true}
                />
                {uploadFiles.length > 0 && <FilesUploadProgress uploadFiles={uploadFiles} />}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Attachment);
