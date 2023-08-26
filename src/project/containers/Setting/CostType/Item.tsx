import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import LoadingButton from '@base/components/@extended/LoadingButton';
import NumberField from '@base/components/@hanbiro/NumberField';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { currencySettingSelector } from '@base/store/selectors/app';
import { OptionValue } from '@base/types/common';
import { numberFormat } from '@base/utils/helpers/generalUtils';
import { CheckRounded, CloseOutlined, RemoveRounded } from '@mui/icons-material';
import { IconButton, Radio, Stack, TableCell, TableRow, Typography } from '@mui/material';
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
  const settingCurrency = useRecoilValue(currencySettingSelector);

  const currencies: OptionValue[] = useMemo(() => {
    if (settingCurrency && settingCurrency.usedCurrencies) {
      return settingCurrency.usedCurrencies.map((v) => {
        return {
          keyName: v.code as string,
          languageKey: v.code as string,
          extra: v.currencySymbol
        };
      });
    }
    return [];
  }, [settingCurrency]);

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
    (newVal: OptionValue) => {
      const newItem = { ...setting, name: newVal.keyName };
      setSetting(newItem);
    },
    [setting]
  );

  const handleChangeCost = useCallback(
    (newVal: number | string) => {
      console.log(newVal, typeof newVal);
      if (typeof newVal === 'string') {
        const newItem = { ...setting, meta: { cost: Number(newVal) } };
        setSetting(newItem);
      }
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
          meta: {
            cost: setting.meta?.cost
          },
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
          meta: {
            cost: setting.meta?.cost
          },
          default: setting.default
        }
      });
    }
  }, [setting]);

  const currency = useMemo(() => {
    return currencies.find((v) => v.keyName == setting.name)!!;
  }, [setting]);

  return (
    <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
      <TableCell align="center">
        {setting.edit || setting.new ? (
          <SelectBox value={currency} options={currencies} onChange={handleChangeName} />
        ) : (
          <Typography sx={{ cursor: 'pointer' }} onClick={handleEdit}>
            {currency.languageKey} ({currency.extra})
          </Typography>
        )}
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-end">
          {setting.edit || setting.new ? (
            <NumberField value={item.meta?.cost as number} onChange={handleChangeCost} />
          ) : (
            <Typography>{numberFormat(Number(item.meta?.cost))}</Typography>
          )}
          <Typography sx={{ whiteSpace: 'nowrap' }}>/ a hour</Typography>
        </Stack>
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
