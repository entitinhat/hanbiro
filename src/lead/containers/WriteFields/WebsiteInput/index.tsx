import { useEffect, useState } from 'react';

//project
import { WebsiteType } from '@base/types/common';
import { LABEL_VALUE_COMPANY, LABEL_VALUE_CUSTOM_WEB, protocolOptions, WEBSITE_LABEL_OPTIONS } from './config';

//material
import { AddCircleOutline, CancelOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField, useTheme } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';

interface WebsiteProps {
  value: WebsiteType | WebsiteType[] | null;
  onChange: (val: WebsiteType | WebsiteType[] | null) => void;
  isMultiple?: boolean;
  isSmall?: boolean;
}

const WebsiteInput = (props: WebsiteProps) => {
  const { value, onChange, isMultiple = false, isSmall = false } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useDevice();
  //intial
  const defaultRow: any = {
    protocol: 'https://',
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
                <Grid item xs={isMobile ? 12 : isSmall ? 3 : 2}>
                  <Select
                    fullWidth
                    displayEmpty
                    IconComponent={() => null}
                    inputProps={{
                      'aria-label': 'website protocol select',
                      sx: { backgroundColor: theme.palette.secondary.lighter, pr: '12px' }
                    }}
                    value={row.protocol ? protocolOptions.find((opt) => opt.value === row.protocol)?.value : 'https://'}
                    onChange={(e: SelectChangeEvent) => {
                      const protocolValue = e.target.value as string;
                      handleValueChange(idx, 'protocol', protocolValue);
                    }}
                    sx={{ '& .MuiOutlinedInput-notchedOutline': isMobile ? {} : { borderRadius: '2px 0px 0px 2px', borderRight: 'none' } }}
                  >
                    {protocolOptions.map((_option: any) => {
                      return (
                        <MenuItem key={_option.value} value={_option.value}>
                          {_option.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={isMobile ? 12 : isSmall ? 9 : 10} sx={{ pl: isMobile ? '' : '0px !important' }}>
                  <TextField
                    sx={{ '& .MuiOutlinedInput-notchedOutline': isMobile ? {} : { borderRadius: '0px 2px 2px 0px' } }}
                    fullWidth
                    placeholder="desk.vora.com"
                    value={row.website}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(idx, 'website', e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12} lg={3}>
                  <Select
                    fullWidth
                    displayEmpty
                    inputProps={{ 'aria-label': 'website label select' }}
                    value={row.label ? (WEBSITE_LABEL_OPTIONS.find((opt: any) => opt.value === row.label?.label)?.value || '') : ''}
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
                          {_option.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid> */}
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
                <Button color="primary" size="small" startIcon={<AddCircleOutline />} onClick={handleAddMore}>
                  Add
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
