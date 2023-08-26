import { useEffect, useState } from 'react';
import _ from 'lodash';

//project
import { AnniversaryType } from '@base/types/common';
import {
  ANNIVERSARY_LABEL_OPTIONS,
  LABEL_VALUE_BIRTHDAY,
  LABEL_VALUE_CUSTOM,
  LABEL_VALUE_CUSTOM_ANNI,
  LABEL_VALUE_PRIMARY,
  PERSONAL_LABEL_OPTIONS
} from '@base/config/constant';

//material
import { AddCircleOutline, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';
import DatePicker from '../Date/DatePicker';

interface AnniversaryInputProps {
  value: AnniversaryType | AnniversaryType[] | null;
  onChange: (val: AnniversaryType | AnniversaryType[] | null) => void;
  isMultiple?: boolean;
  onlyBirthdayOption?: boolean;
}

const AnniversaryInput = (props: AnniversaryInputProps) => {
  const { value, onChange, isMultiple = false, onlyBirthdayOption } = props;
  const { t } = useTranslation();
  const phoneCodes: any[] = []; //useRecoilValue(phonesAtom);

  //intial
  const defaultRow: AnniversaryType = {
    label: {
      languageKey: t('ncrm_common_birthday'),
      label: LABEL_VALUE_BIRTHDAY
    },
    labelValue: '',
    anniversary: ''
  };
  //state
  const [rows, setRows] = useState<AnniversaryType[]>([defaultRow]);

  //init rows
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          if (JSON.stringify(value) !== JSON.stringify(rows)) {
            setRows(value);
          }
        } else {
          setRows([_.cloneDeep(defaultRow)]);
        }
      } else {
        setRows([value]);
      }
    } else {
      setRows([_.cloneDeep(defaultRow)]);
    }
  }, [value]);

  //add more email
  const handleAddMore = () => {
    let newRows = [...rows, defaultRow];
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  //remove email
  const handleRemove = (i: number) => {
    let newRows = [...rows];
    newRows.splice(i, 1);
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  //value change
  const handleValueChange = (index: number, keyAttribute: string, keyValue: any) => {
    const newRows = [...rows];
    newRows[index][keyAttribute] = keyValue;
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  // parse language options
  const parseOptions = (options: any) => {
    return options.map((_opt: any) => ({ ..._opt, label: t(_opt.label) }));
  };

  return (
    <Box>
      {rows.map((row, idx) => {
        return (
          <Stack key={idx} spacing={0.5}>
            <Stack spacing={0.5}>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={8}>
                  <DatePicker
                    value={row.anniversary ? new Date(row.anniversary) : new Date()}
                    onChange={(date: Date | null) => {
                      handleValueChange(idx, 'anniversary', date ? date.toISOString() : '');
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Select
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'anniversary option select' }}
                    value={
                      onlyBirthdayOption
                        ? parseOptions(ANNIVERSARY_LABEL_OPTIONS).find((opt: any) => opt.value === LABEL_VALUE_BIRTHDAY)?.value
                        : row.label
                        ? parseOptions(ANNIVERSARY_LABEL_OPTIONS).find((opt: any) => opt.value === row.label?.label)?.value || ''
                        : ''
                    }
                    onChange={(e: SelectChangeEvent) => {
                      const labelValue = e.target.value as string;
                      const newLabel = parseOptions(ANNIVERSARY_LABEL_OPTIONS).find((opt: any) => opt.value === labelValue);
                      if (newLabel) {
                        handleValueChange(idx, 'label', { label: newLabel.value, languageKey: newLabel.label });
                      }
                    }}
                    disabled={onlyBirthdayOption}
                  >
                    <MenuItem value="" disabled>
                      <em>{t('ncrm_common_select_placeholder')}</em>
                    </MenuItem>
                    {parseOptions(ANNIVERSARY_LABEL_OPTIONS).map((_option: any) => {
                      return (
                        <MenuItem key={_option.value} value={_option.value}>
                          {_option.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </Grid>
            </Stack>
            {row.label?.label === LABEL_VALUE_CUSTOM_ANNI && (
              <Stack sx={{ mt: 1 }}>
                <TextField
                  placeholder={t('label').toString()}
                  value={row.labelValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(idx, 'labelValue', e.target.value)}
                />
              </Stack>
            )}
            <Stack direction="row">
              {isMultiple && idx !== 0 && (
                <Button size="small" color="error" startIcon={<CancelOutlined />} onClick={() => handleRemove(idx)}>
                  {t('ncrm_common_btn_delete')}
                </Button>
              )}
              {/* {isMultiple && idx != rows.length - 1 && (
                <Divider />
              )} */}
              {isMultiple && idx === rows.length - 1 && (
                <Button color="primary" size="small" startIcon={<AddCircleOutline />} onClick={handleAddMore}>
                  {t('ncrm_common_btn_add')}
                </Button>
              )}
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );
};

export default AnniversaryInput;
