import React, { useCallback, useEffect, useState } from 'react';

import LoadingButton from '@base/components/@extended/LoadingButton';
import { CheckRounded, CloseOutlined, RemoveRounded } from '@mui/icons-material';
import { IconButton, Radio, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import useSettingMutation from '@project/hooks/useSettingMutation';
import { Setting } from '@project/types/setting';

interface ItemProps {
  item: Setting;
  handleChange: (item: Setting) => void;
  handleRemove: (id: string, edit: boolean) => void;
}

function Item({ item, handleChange, handleRemove }: ItemProps) {
  console.log('item', item);
  const [setting, setSetting] = useState(item);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    if (JSON.stringify(item) !== JSON.stringify(setting)) {
      setSetting(item);
    }
  }, [item]);

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newItem = { ...setting, default: true };
      setSetting(newItem);
    },
    [setting]
  );

  const handleChangeName = useCallback(
    (newVal: string) => {
      const newItem = { ...setting, name: newVal };
      setSetting(newItem);
    },
    [setting]
  );

  const handleEdit = useCallback(() => {
    const newItem = { ...setting, edit: true };
    setSetting(newItem);
  }, [setting]);

  const handleClose = useCallback(() => {
    if (setting.edit) {
      setSetting(item);
    }
    if (setting.new) {
      handleRemove && handleRemove(setting.id, false);
    }
  }, [setting, item]);

  const onChange = (success: boolean) => {
    setSaving(false);
    if (success) {
      const newSetting = { ...setting, ...{ new: false, edit: false } };
      handleChange && handleChange(newSetting);
    } else {
      handleClose();
    }
  };

  const { mutationAdd, mutationUpdate } = useSettingMutation({ onChange });
  const handleSave = useCallback(() => {
    setSaving(true);
    if (setting.new) {
      mutationAdd({
        setting: {
          id: setting.id,
          type: setting.type,
          name: setting.name,
          default: setting.default,
          fixed: setting.fixed
        }
      });
    }

    if (setting.edit) {
      mutationUpdate({
        setting: {
          id: setting.id,
          type: setting.type,
          name: setting.name,
          default: setting.default
        }
      });
    }
  }, [setting]);

  return (
    <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
      <TableCell>
        {setting.edit || setting.new ? (
          <TextField
            fullWidth
            autoComplete="off"
            defaultValue={setting.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeName(event.target.value)}
          />
        ) : (
          <Typography sx={{ cursor: 'pointer' }} onClick={handleEdit}>
            {setting.name}
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        {setting.edit || setting.new ? (
          <Radio
            value={setting.id}
            checked={setting.default}
            onChange={onChangeHandler}
            sx={{ p: 0, '&:hover': { bgcolor: 'transparent' } }}
          />
        ) : (
          <>{setting.default && <CheckRounded sx={{ fontSize: 18, color: 'primary.main' }} />}</>
        )}
      </TableCell>
      <TableCell align="center">
        {setting.edit || setting.new ? (
          <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
            <LoadingButton
              loading={isSaving}
              disabled={isSaving}
              size="small"
              color="success"
              onClick={() => handleSave()}
              sx={{ minWidth: 32, width: 32, height: 32 }}
            >
              <CheckRounded sx={{ fontSize: 18 }} />
            </LoadingButton>
            {setting.edit && (
              <IconButton color="error" size="small" onClick={() => handleRemove(setting.id, true)}>
                <RemoveRounded sx={{ fontSize: 18 }} />
              </IconButton>
            )}
            <IconButton color="secondary" size="small" onClick={() => handleClose()}>
              <CloseOutlined sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
        ) : (
          ''
        )}
      </TableCell>
    </TableRow>
  );
}

export default Item;
