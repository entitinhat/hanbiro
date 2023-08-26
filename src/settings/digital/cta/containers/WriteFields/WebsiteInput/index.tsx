import { useEffect, useState } from 'react';

//project
import { protocolOptions } from './config';

//material
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface WebsiteProps {
  value: any;
  onChange: (val: any) => void;
}

const WebsiteInput = (props: WebsiteProps) => {
  const { value, onChange } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const defaultRow: any = {
    protocol: 'https://',
    link: '',
    openNewWindow: false
  };

  const [row, setRow] = useState<any>(defaultRow);

  useEffect(() => {
    if (value) {
      //single object
      const protocol = value?.link?.includes('http://') ? 'http://' : 'https://';
      setRow({
        ...value,
        protocol: protocol,
        link: value?.link?.replace(protocol, '')
      });
    } else {
      setRow(defaultRow);
    }
  }, [value]);

  //set value change
  const handleValueChange = (keyAttribute: string, keyValue: any) => {
    const newRow = { ...row };
    newRow[keyAttribute] = keyValue;
    setRow(newRow);
    //callback
    onChange &&
      onChange({
        link: [newRow.protocol, newRow.link].join(''),
        openNewWindow: newRow.openNewWindow
      });
  };

  return (
    <Stack spacing={0.5}>
      <Stack spacing={0.5}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Select
              fullWidth
              displayEmpty
              IconComponent={() => null}
              inputProps={{
                'aria-label': 'website protocol select',
                sx: {
                  backgroundColor: theme.palette.secondary.lighter
                }
              }}
              value={row.protocol ? protocolOptions.find((opt) => opt.value === row.protocol)?.value : 'https://'}
              onChange={(e: SelectChangeEvent) => {
                const protocolValue = e.target.value as string;
                handleValueChange('protocol', protocolValue);
              }}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '2px 0px 0px 2px', borderRight: 'none' } }}
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
          <Grid item xs={10} sx={{ pl: '0px !important' }}>
            <TextField
              autoComplete="off"
              sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '0px 2px 2px 0px' } }}
              fullWidth
              placeholder="example.com"
              value={row.website}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange('link', e.target.value)}
            />
          </Grid>
        </Grid>
      </Stack>
      <FormGroup sx={{ pl: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={row.openNewWindow}
              onChange={(e: any) => {
                handleValueChange('openNewWindow', e.target.checked);
              }}
            />
          }
          label={t('ncrm_setting_cta_open_new_window')}
        />
      </FormGroup>
    </Stack>
  );
};

export default WebsiteInput;
