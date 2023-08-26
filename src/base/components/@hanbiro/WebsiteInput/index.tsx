import { useEffect, useState } from 'react';

//project
import { WebsiteType } from '@base/types/common';
import {
  LABEL_VALUE_COMPANY,
  LABEL_VALUE_CUSTOM_WEB,
  WEBSITE_LABEL_OPTIONS,
  WEBSITE_PROTOCOL_HTTPS,
  WEBSITE_PROTOCOL_OPTIONS
} from './config';

//material
import { AddOutlined, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';

interface WebsiteProps {
  value: WebsiteType | WebsiteType[] | null;
  onChange: (val: WebsiteType | WebsiteType[] | null) => void;
  isMultiple?: boolean;
}

const WebsiteInput = (props: WebsiteProps) => {
  const { value, onChange, isMultiple = false } = props;
  const { t } = useTranslation();

  //intial
  const defaultRow: WebsiteType = {
    label: {
      languageKey: 'Company',
      label: LABEL_VALUE_COMPANY
    },
    labelValue: '',
    protocol: WEBSITE_PROTOCOL_HTTPS,
    website: ''
  };
  //state
  const [rows, setRows] = useState<WebsiteType[]>([defaultRow]);

  //init rows
  useEffect(() => {
    //console.log('init value', value);
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          if (JSON.stringify(value) !== JSON.stringify(rows)) {
            setRows(value);
          }
        } else {
          setRows([defaultRow]);
        }
      } else {
        //single object
        setRows([value]);
      }
    } else {
      setRows([defaultRow]);
    }
  }, [value]);

  //new row
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

  //set value change
  const handleValueChange = (idx: number, keyAttribute: string, keyValue: any) => {
    const newRows = [...rows];
    newRows[idx][keyAttribute] = keyValue;
    setRows(newRows);
    //callback
    onChange && onChange(isMultiple ? newRows : newRows[0]);
  };

  return (
    <Box>
      {rows.map((row, idx) => {
        return (
          <Stack key={idx} spacing={0.5}>
            <Stack spacing={0.5}>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={3}>
                  <Select
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'website protocol select' }}
                    value={row.protocol ? WEBSITE_PROTOCOL_OPTIONS.find((opt) => opt.value === row.protocol)?.value : ''}
                    onChange={(e: SelectChangeEvent) => {
                      const protocolValue = e.target.value as string;
                      handleValueChange(idx, 'protocol', protocolValue);
                    }}
                  >
                    {WEBSITE_PROTOCOL_OPTIONS.map((_option: any) => {
                      return (
                        <MenuItem key={_option.value} value={_option.value}>
                          {_option.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} lg={isMultiple ? 6 : 9}>
                  <TextField
                    fullWidth
                    placeholder="desk.vora.com"
                    value={row.website}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(idx, 'website', e.target.value)}
                  />
                </Grid>
                {isMultiple && (
                  <Grid item xs={12} lg={3}>
                    <Select
                      fullWidth
                      displayEmpty
                      inputProps={{ 'aria-label': 'website label select' }}
                      value={row.label ? WEBSITE_LABEL_OPTIONS.find((opt: any) => opt.value === row.label?.label)?.value || '' : ''}
                      onChange={(e: SelectChangeEvent) => {
                        const labelValue = e.target.value as string;
                        const newLabel = WEBSITE_LABEL_OPTIONS.find((opt: any) => opt.value === labelValue);
                        if (newLabel) {
                          handleValueChange(idx, 'label', { label: newLabel.value, languageKey: newLabel.label });
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select...</em>
                      </MenuItem>
                      {WEBSITE_LABEL_OPTIONS.map((_option: any) => {
                        return (
                          <MenuItem key={_option.value} value={_option.value}>
                            {t(_option.label)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                )}
              </Grid>
            </Stack>
            {row.label?.label === LABEL_VALUE_CUSTOM_WEB && (
              <Stack sx={{ mt: 1 }}>
                <TextField
                  placeholder={t('description').toString()}
                  value={row.labelValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(idx, 'labelValue', e.target.value)}
                />
              </Stack>
            )}
            <Stack direction="row">
              {isMultiple && idx !== 0 && (
                <Button size="small" color="error" startIcon={<CancelOutlined />} onClick={() => handleRemove(idx)}>
                  Delete
                </Button>
              )}
              {/* {isMultiple && idx != rows.length - 1 && (
                <Divider />
              )} */}
              {isMultiple && idx === rows.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
                  startIcon={<AddOutlined />}
                  onClick={handleAddMore}
                >
                  {t('Add another line')}
                </Button>
              )}
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );
};

export default WebsiteInput;
