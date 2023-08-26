import React, { useEffect, useState } from 'react';
//project
import LoadingButton from '@base/components/@extended/LoadingButton';
import useNextCodeSettingUpdate from '@base/hooks/forms/useNextCodeSettingUpdate';

//material
import { FormControl, FormControlLabel, InputLabel, Radio, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 *
 * @param {*} props
 */
interface CodeGeneratorSettingProps {
  menu: string;
  defaultProps: any;
  saveCb?: () => void;
}

//check is number input
const isNumeric = (value: string) => {
  return /^-?\d+$/.test(value);
};

const CodeGeneratorSetting = (props: CodeGeneratorSettingProps) => {
  const { menu, defaultProps, saveCb } = props;
  const { t } = useTranslation();

  //state
  const [showErr, setShowErr] = useState(false);
  const [errorData, setErrorData] = useState<string>('');
  const [autoGenerate, setAutoGenerate] = useState(false); //true/false
  const [nextNumber, setNextNumber] = useState('');
  const [prefixString, setPrefixString] = useState('');

  //create mutation
  const mUpdate: any = useNextCodeSettingUpdate();

  //init data
  useEffect(() => {
    if (defaultProps) {
      setAutoGenerate(defaultProps?.autoGenerate);
      setNextNumber(defaultProps?.nextNumber);
      setPrefixString(defaultProps?.prefixString);
    }
  }, [defaultProps]);

  //success update
  useEffect(() => {
    if (mUpdate.isSuccess) {
      saveCb && saveCb(); //get new next ID
      //onSettingChange && onSettingChange({ autoGenerate, prefixString, nextNumber }); //WHAT FOR?
      //onClose();
    }
  }, [mUpdate.isSuccess]);

  //next number changes
  const handleNextNumberChange = (e: any) => {
    const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$');
    let { value } = e.target; //e.target.value.replace(/\,/g, '');
    //just accept Number
    if (value === '' || floatRegExp.test(value)) {
      setNextNumber(value);
    }
  };

  //save setting
  const handleSave = () => {
    //validate
    if (autoGenerate && !isNumeric(nextNumber)) {
      setErrorData('Please enter a valid next number');
      return setShowErr(true);
    }
    if (showErr) setShowErr(false);
    //start saving
    const params = {
      menu,
      value: JSON.stringify({ autoGenerate, nextNumber, prefixString })
    };
    mUpdate.mutate(params);
  };

  //render content
  return (
    <Stack sx={{ p: 1 }}>
      <Stack>
        <Typography variant="h6" sx={{ whiteSpace: 'pre-wrap' }}>
          {autoGenerate ? t('ncrm_common_CodeGeneratorSetting_intro_auto') : t('ncrm_common_CodeGeneratorSetting_intro_manual')}
        </Typography>
      </Stack>
      <Stack sx={{ pt: 1 }}>
        <FormControlLabel
          sx={{ whiteSpace: 'pre-wrap' }}
          value="auto"
          control={<Radio id="autoRadio" name="codeRadio" checked={autoGenerate} onChange={() => setAutoGenerate(true)} />}
          label={t('ncrm_common_CodeGeneratorSetting_options_auto') as string}
        />
        {autoGenerate && (
          <Stack direction="row" spacing={1}>
            <Stack spacing={1}>
              <InputLabel>{t('ncrm_common_prefix')}</InputLabel>
              <TextField value={prefixString} onChange={(e) => setPrefixString(e.target.value)} />
            </Stack>
            <Stack spacing={1}>
              <InputLabel>{t('ncrm_common_btn_next_number')}</InputLabel>
              <TextField value={nextNumber} onChange={handleNextNumberChange} />
            </Stack>
          </Stack>
        )}
      </Stack>
      <Stack sx={{ pt: 1 }}>
        <FormControlLabel
          value="manual"
          control={<Radio id="manualRadio" name="codeRadio" checked={!autoGenerate} onChange={() => setAutoGenerate(false)} />}
          label={t('ncrm_common_CodeGeneratorSetting_options_manual')}
          sx={{ whiteSpace: 'normal' }}
        />
      </Stack>
      <Stack direction="row" justifyContent={'end'}>
        <LoadingButton variant="contained" size="small" onClick={handleSave} loading={mUpdate.isLoading} disabled={mUpdate.isLoading}>
          {t('ncrm_common_btn_save')}
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default CodeGeneratorSetting;
