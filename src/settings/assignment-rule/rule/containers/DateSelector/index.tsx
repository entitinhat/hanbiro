import { useEffect, useState } from 'react';
import { AttributesSelectOptions } from '../../config/constants';
import {
  Box,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface AttributeValue {
  dateType: string;
  dateSelectedType: string;
  dateSelectedValue: number;
}
interface DateSelectorProps {
  value: AttributeValue;
  onChange: (val: AttributeValue) => void;
}

const DateSelector = (props: DateSelectorProps) => {
  const { value, onChange } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [data, setData] = useState<AttributeValue>({
    dateType: 'AR_ATTRIBUTE_DATE_NONE',
    dateSelectedType: 'AR_ATTRIBUTE_DATE_SELECTED_ON_DATE',
    dateSelectedValue: 0
  });
  const [dateSelectMode, setDateSelectMode] = useState<string>('date');
  const [selectedValue, setSelectedValue] = useState<{ before: number; after: number }>({ before: 0, after: 0 });
  useEffect(() => {
    if (value) {
      setData(value);
      if (value.dateSelectedType == 'AR_ATTRIBUTE_DATE_SELECTED_BEFORE_DATE')
        setSelectedValue({ before: value.dateSelectedValue, after: 0 });
      else if (value.dateSelectedType == 'AR_ATTRIBUTE_DATE_SELECTED_AFFER_DATE')
        setSelectedValue({ before: 0, after: value.dateSelectedValue });
      else setSelectedValue({ before: 0, after: 0 });
    }
  }, [value]);
  //handlers
  const handleAttributeChange = (val: any) => {
    console.log('date value', val);
    setData({
      ...data,
      dateType: val
    });
    onChange &&
      onChange({
        ...data,
        dateType: val
      });
  };
  const handleConfigChange = (value: string) => {
    setData({
      ...data,
      dateSelectedType: value
    });
    setSelectedValue({ before: 0, after: 0 });
    onChange &&
      onChange({
        ...data,
        dateSelectedType: value
      });
  };
  const handleDaysChange = (value: number, type: 'before' | 'after') => {
    setData({
      ...data,
      dateSelectedValue: value
    });
    if (type == 'before') setSelectedValue({ before: value, after: 0 });
    else setSelectedValue({ before: 0, after: value });
    onChange &&
      onChange({
        ...data,
        dateSelectedValue: value
      });
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', mb: 3 }}>
        <Select
          displayEmpty
          disabled
          sx={{
            width: '150px',
            mr: 0.5,
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: theme.palette.text.primary
            }
          }}
          IconComponent={() => null}
          inputProps={{
            sx: {
              backgroundColor: theme.palette.secondary.lighter,
              pr: '12px'
            }
          }}
          value={'1'}
          onChange={(e: SelectChangeEvent) => {
            setDateSelectMode(e.target.value);
          }}
        >
          <MenuItem value={'1'}>{t(`ncrm_generalsetting_assignment_rule_date`)}</MenuItem>
        </Select>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            //label="Date Desktop"
            inputFormat={
              DateFormat.find((format) => format.value == dateSelectMode)
                ? DateFormat.find((format) => format.value == dateSelectMode)?.format
                : 'DD/MM/YYYY'
            }
            // value={value}
            onChange={handleDateChange}
            renderInput={(params) => <TextField fullWidth {...params} />}
            value={data?.date}
          />
        </LocalizationProvider> */}
        <Select
          displayEmpty
          sx={{ width: '100%' }}
          value={data.dateType}
          onChange={(e: SelectChangeEvent) => {
            handleAttributeChange(e.target.value);
          }}
        >
          {AttributesSelectOptions.map((format, indx: number) => {
            return (
              <MenuItem key={indx} value={format.value}>
                {t(format.label)}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <RadioGroup
        sx={{ flexWrap: 'wrap', gap: '10px' }}
        value={data.dateSelectedType}
        onChange={(ev, value) => handleConfigChange(value)}
        row
      >
        <FormControlLabel value="AR_ATTRIBUTE_DATE_SELECTED_ON_DATE" control={<Radio />} label={'The Day'} />
        <FormControlLabel
          value="AR_ATTRIBUTE_DATE_SELECTED_BEFORE_DATE"
          control={<Radio />}
          label={
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>before</Typography>
              <TextField
                type="number"
                disabled={data?.dateSelectedType !== 'AR_ATTRIBUTE_DATE_SELECTED_BEFORE_DATE'}
                sx={{
                  ml: 1,
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    pr: 0
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.text.primary,
                        padding: '20px 8px',
                        borderTopRightRadius: theme.shape.borderRadius + 'px',
                        borderBottomRightRadius: theme.shape.borderRadius + 'px'
                      }}
                    >
                      <Typography color="inherit">days</Typography>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => handleDaysChange(Number(e.target.value), 'before')}
                value={selectedValue.before}
              />
            </Stack>
          }
        />
        <FormControlLabel
          value="AR_ATTRIBUTE_DATE_SELECTED_AFFER_DATE"
          control={<Radio />}
          label={
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>after</Typography>
              <TextField
                sx={{
                  ml: 1,
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    pr: 0
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.text.primary,
                        padding: '20px 8px',
                        borderTopRightRadius: theme.shape.borderRadius + 'px',
                        borderBottomRightRadius: theme.shape.borderRadius + 'px'
                      }}
                    >
                      <Typography color="inherit">days</Typography>
                    </InputAdornment>
                  )
                }}
                type="number"
                onChange={(e) => handleDaysChange(Number(e.target.value), 'after')}
                disabled={data?.dateSelectedType !== 'AR_ATTRIBUTE_DATE_SELECTED_AFFER_DATE'}
                value={selectedValue.after}
              />
            </Stack>
          }
        />
      </RadioGroup>
    </Box>
  );
};
export default DateSelector;
