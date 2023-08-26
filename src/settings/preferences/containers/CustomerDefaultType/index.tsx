import { LabelValue } from '@base/types/app';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography, useTheme } from '@mui/material';
import CountryAutoComplete from '@settings/general/containers/FormatSetting/CountryAutoComplete';
import { useSelectionFields } from '@settings/general/hooks/useSelectionFields';
import { useSelectionUpdate } from '@settings/general/hooks/useSelectionMutations';
import { TABS } from '@settings/preferences/pages/Customer';
import { ChangeEvent, ReactHTML } from 'react';
import { useTranslation } from 'react-i18next';

interface CustomerDefaultTypeProps {
  keyRoot: string;
}

const CustomerDefaultType = (props: CustomerDefaultTypeProps) => {
  const { keyRoot } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  // // get value
  // const { data: resultPost, isLoading } = useSelectionFields({ filter: { query: `keyRoot=${keyRoot}` } });
  // console.log('🚀 ~ file: index.tsx:18 ~ resultPost:', resultPost);

  // // update value
  // const mUpdateDefault: any = useSelectionUpdate();
  // const onChange = (data: any) => {
  //   console.log("🚀 ~ file: index.tsx:25 ~ data:", data)
  //   const params = {};
  //   mUpdateDefault.mutate({ selection: params });
  // };

  const onChange = (e: ChangeEvent<HTMLInputElement>, data: any) => {
    console.log('🚀 ~ file: index.tsx:25 ~ data:', e.target.value);
  };

  return (
    <Box sx={{ mb: 2 }} border={`1px solid ${theme.palette.divider}`}>
      <Stack p={2} borderBottom={`1px solid ${theme.palette.divider}`}>
        <Typography fontWeight={'500'}>{t(TABS.find((v: LabelValue) => v.value === keyRoot)?.label || '')}</Typography>
      </Stack>
      <Box p={2}>
        <FormControl>
          <RadioGroup
            defaultValue={'account'}
            onChange={onChange}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="account" control={<Radio />} label="Account" />
            <FormControlLabel value="contact" control={<Radio />} label="Contact" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CustomerDefaultType;
