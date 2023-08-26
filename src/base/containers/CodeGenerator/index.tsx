import React, { useState, useEffect, useRef } from 'react';

//material
import { Box, CircularProgress, InputAdornment, OutlinedInput, useMediaQuery, useTheme } from '@mui/material';
import { Settings } from '@mui/icons-material';

//project
import { useGetNextCode } from '@base/hooks/forms/useGetNextCode';
import MuiPopper from '@base/components/@hanbiro/Popper';

//local
import CodeGeneratorSetting from './Setting';

interface CodeGeneratorProps {
  value: string;
  menu: string;
  showType?: string;
  onChange: any;
  onSettingChange?: any;
  index?: number;
  isPublic?: boolean;
  token?: string;
}

//id: for re-init code if id changes
//waste: for generating many
//value: set default value or change
const CodeGenerator = (props: CodeGeneratorProps) => {
  const {
    value, //initial code
    menu,
    showType, //'popover' or 'modal' or 'canvas'
    onChange,
    onSettingChange,
    index = 0,
    isPublic = false,
    token = ''
  } = props;
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  //state
  const [productCode, setProductCode] = useState<string>(value ?? '');
  const [isDisable, setIsDisable] = useState(value ? true : false);
  const [productCodeSetting, setProductCodeSetting] = useState(null);

  //get next code
  const { data: codeData, isLoading, refetch } = useGetNextCode(menu, index, value, isPublic, token);

  const getLoading = (): boolean => {
    return isLoading && !value;
  };
  console.log('code gen', value);
  //set new code
  useEffect(() => {
    if (value) {
      if (value !== productCode) {
        setProductCode(value);
      }
    } else {
      setProductCode('');
      // call mutation again
      refetch();
    }

    return () => {};
  }, [value]);

  //get new setting when an id changes
  useEffect(() => {
    if (codeData) {
      const newSetting = codeData.setting || { autoGenerate: false };
      setProductCodeSetting(newSetting);
      if (newSetting.autoGenerate || isPublic) {
        setIsDisable(true);
        if (!value) {
          setProductCode(codeData?.code);
          //get next ID
          onChange && onChange(codeData?.code);
        }
      } else {
        setIsDisable(false);
        setProductCode('');
        onChange && onChange('');
      }
    }
  }, [codeData]);

  //refetch new code
  const refetchCode = () => {
    refetch();
  };

  //manually input value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProductCode(value);
    //callback
    onChange && onChange(value);
  };

  //main render
  return (
    <Box>
      <OutlinedInput
        fullWidth
        sx={{ pr: 0, minWidth: 150 }}
        id="code-generator"
        disabled={isDisable}
        endAdornment={
          <InputAdornment position="end">
            {getLoading() ? (
              <CircularProgress size={20} sx={{ mr: 1 }} />
            ) : (
              <MuiPopper sx={matchesSm ? { maxWidth: '100%' } : {}} icon={<Settings fontSize="small" />}>
                <CodeGeneratorSetting menu={menu} defaultProps={productCodeSetting} saveCb={refetchCode} />
              </MuiPopper>
            )}
          </InputAdornment>
        }
        value={productCode}
        onChange={handleChange}
      />
    </Box>
  );
};

export default CodeGenerator;
