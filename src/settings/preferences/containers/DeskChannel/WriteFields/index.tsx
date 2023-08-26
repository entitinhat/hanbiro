import React, { useEffect, useMemo, useRef, useState } from 'react';

// material-ui
import { Box, Button, Stack, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import FileCopyIcon from '@mui/icons-material/FileCopy';

// third-party
import _ from 'lodash';
import { Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';

// project imports
import WriteField from '@base/containers/WriteField';

//config
import * as keyNames from '@settings/preferences/config/keyNames';
import { useTranslation } from 'react-i18next';
import { useChannelMutation } from '@settings/preferences/hooks/desk/useChannelMutation';
import { DeskChannel } from '@settings/preferences/types/desk/channel';
import { ChannelType } from '@settings/preferences/types/desk/common';

import useGenerateShortUrl from '@settings/preferences/hooks/desk/shorten-url/useGenerateShortUrl';
import useSnackBar from '@base/hooks/useSnackBar';

interface WriteFieldsProps {
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  getValues: any; //hookform
  setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
  handleClose?: () => void;
  data?: any; // Data of row selected
  type?: ChannelType | string; // Get value of type option when clicking to create channel
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, watch, control, getValues, setValue, errors, handleClose, data, type } = props;
  const { t } = useTranslation();

  // Check --> If clicked data is Landing Page or Webhook => true || else => false
  const isCheck = data?.type?.keyName === ChannelType.LANDING_PAGE || data?.type?.keyName === ChannelType.WEBHOOK ? true : false;

  const { mDelete } = useChannelMutation();
  const handleDelete = (row: DeskChannel) => {
    mDelete.mutate({ ids: [row.id] });
  };

  const { mGenerateShortUrl } = useGenerateShortUrl();
  const { enqueueSuccessBar } = useSnackBar();
  const handleGeneral = () => {
    // Set shortUrl variable = value of Real URL
    const shortUrl = getValues(keyNames.KEY_NAME_CHANNEL_REAL_URL);

    mGenerateShortUrl.mutate(
      { longUrl: shortUrl }, // Passing shortUrl variable to API
      {
        onSuccess: (res: any) => {
          // Set Short URL value
          setValue(keyNames.KEY_NAME_CHANNEL_SHORT_URL, res?.url?.shortUrl);
          enqueueSuccessBar('Short URL has been generated!');
        }
      }
    );
  };

  const [copyStatus, setCopyStatus] = useState<string>('');
  const timeoutId = useRef<any>(null);
  const handleCopy = () => {
    // Clear timeout
    clearTimeout(timeoutId.current);

    // Set value variable = value of Short URL
    const value = getValues(keyNames.KEY_NAME_CHANNEL_SHORT_URL);

    // Check --> If value is not empty => Copy value to clipboard || else => alert empty
    if (value) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopyStatus('Short URL copied to clipboard');
        })
        .catch((err) => {
          setCopyStatus(`Failed to copy Short URL: ${err}`);
        });
    } else setCopyStatus('Short URL is empty');

    // Set timeout to display alert copy status
    timeoutId.current = setTimeout(() => {
      setCopyStatus('');
    }, 2000);
  };

  // Watching
  const AssignedRep = watch([keyNames.KEY_NAME_CHANNEL_USEASSIGN, keyNames.KEY_NAME_CHANNEL_ASSIGNTYPE]);
  const landingpageValue = watch(keyNames.KEY_NAME_CHANNEL_LANDINGPAGE);

  const ChannelInfoFields = useMemo(() => {
    let InfoKeys: any[] = [];
    InfoKeys = [
      keyNames.KEY_NAME_CHANNEL_NAME,
      keyNames.KEY_NAME_CHANNEL_TYPE,
      type === ChannelType.LANDING_PAGE ? keyNames.KEY_NAME_CHANNEL_LANDINGPAGE : '',
      type === ChannelType.LANDING_PAGE ? keyNames.KEY_NAME_CHANNEL_REAL_URL : '',
      type === ChannelType.LANDING_PAGE ? keyNames.KEY_NAME_CHANNEL_SHORT_URL : '',
      type === ChannelType.WEBHOOK ? keyNames.KEY_NAME_CHANNEL_INCOMING_URL : '',
      type === ChannelType.EMAIL ? keyNames.KEY_NAME_CHANNEL_EMAIL : ''
    ];
    return (
      <>
        {fields.map((_item, _index) => {
          let newComponentProps = { ..._item?.componentProps };
          if (!_.includes(InfoKeys, _item.keyName)) {
            return;
          }
          return (
            <WriteField key={_item.keyName} item={{ ..._item, componentProps: newComponentProps }} control={control} errors={errors} />
          );
        })}
      </>
    );
  }, [fields]);

  useEffect(() => {
    console.log(landingpageValue);
    if (landingpageValue) {
      const realUrl = getValues(keyNames.KEY_NAME_CHANNEL_REAL_URL);
      const realVal = realUrl != '' ? realUrl : 'https://desk.nncrm.io/landingpage';
      const addVal = landingpageValue?.id ? '/' + landingpageValue?.id : '';
      setValue(keyNames.KEY_NAME_CHANNEL_REAL_URL, realVal + addVal);
    }
  }, [landingpageValue]);

  const descriptionField = useMemo(() => {
    const description = fields.find((_item) => _item.keyName === keyNames.KEY_NAME_CHANNEL_DESCRIPTION);
    return (
      <>
        <WriteField
          key={description.keyName}
          item={{
            ...description
          }}
          control={control}
          errors={errors}
        />
      </>
    );
  }, [AssignedRep]);

  //render
  return (
    <Stack
      sx={{
        p: 3
        // height: 'calc(100vh - 182px)'
      }}
      spacing={3}
      className="scroll-box"
    >
      {/* Display Channel Fields */}
      {ChannelInfoFields}

      {/* If type is 'CTYPE_LANDING_PAGE => Display Generate and Copy buttons ' */}
      {type === ChannelType.LANDING_PAGE && (
        <Stack>
          <Stack spacing={2} direction="row" sx={{ mt: 1, mb: 1, alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
            <Button size="small" variant="contained" onClick={handleGeneral}>
              {t('ncrm_common_btn_generate')}
            </Button>
            <Button size="small" variant="contained" color="success" onClick={handleCopy}>
              {t('ncrm_common_copy')}
            </Button>
          </Stack>

          {/* Display alert copy status */}
          <Typography align="right" variant="caption" color="secondary">
            {copyStatus}
          </Typography>
        </Stack>
      )}

      {/* Display Description Field */}
      {descriptionField}

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 3, width: '100%' }}>
        {/* Display Delete button */}
        <Box>
          {isCheck && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              sx={{ mr: 2 }}
              onClick={() => {
                handleDelete(data);
              }}
            >
              {t('ncrm_common_btn_empty')}
            </Button>
          )}
        </Box>

        {/* Display Cancel and Save buttons */}
        <Box>
          <Button size="small" variant="outlined" color="secondary" sx={{ mr: 2 }} onClick={handleClose}>
            {t('ncrm_common_btn_cancel')}
          </Button>
          <Button size="small" variant="contained" color="primary" type="submit">
            {t('ncrm_common_btn_save')}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default WriteFields;
