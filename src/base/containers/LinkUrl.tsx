// import { Checkbox, Input, Switch } from "@base/components/form";
import { Checkbox, FormControlLabel, FormGroup, TextField, InputAdornment, useTheme  } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState, useLayoutEffect } from 'react';

const CtaLinkUrl: React.FC<any> = (props) => {
  const { value, onChange } = props;

  //state
  const [curValue, setCurValue] = useState<any>({ link: '', openNewWindow: false });
  const theme = useTheme()

  //init
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(curValue)) {
        setCurValue(value);
      }
    } else {
      setCurValue({ link: '', openNewWindow: false });
    }
  }, [value]);

  //open file dialog
  const handleValueChange = (keyName: string, keyValue: any) => {
    const newValue = { ...curValue };
    newValue[keyName] = keyValue;
    setCurValue(newValue);
  };

  const handleCheckedValueChange = (keyName: string, keyValue: any) => {
    const newValue = { ...curValue };
    newValue[keyName] = keyValue;
    setCurValue(newValue);
    onChange && onChange(newValue);
  };

  const handleOnBlur = () => {
    handleValueChange('link', curValue.link.replace('http://', '').replace('https://', ''))
    const nValue = { 
      ...curValue,
      link: ('https://').concat(curValue.link.replace('http://', '').replace('https://', ''))
    }
    onChange && onChange(nValue);
  }

  return (
    <>
      <TextField
        sx={{ 
          width: '100%',
          '& .MuiInputBase-input, .MuiOutlinedInput-input' : {
            pl: 0,
            backgroundColor: theme.palette.background.paper,
          }
        }}
        type="text"
        value={curValue.link.replace('http://', '').replace('https://', '')}
        onChange={(e: any) => handleValueChange('link', e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">https://</InputAdornment>,
        }}
        onBlur={() => handleOnBlur()}
      />

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={curValue.openNewWindow} onChange={(e: any) => {
              handleCheckedValueChange('openNewWindow', e.target.checked)
            }} />
          }
          label={t('ncrm_setting_cta_open_new_window')}
        />
      </FormGroup>
    </>
  );
};

export default CtaLinkUrl;
