import { LabelValue } from '@base/types/app';
import { Box, Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import CountryAutoComplete from '@settings/general/containers/FormatSetting/CountryAutoComplete';
import { useSelectionFields } from '@settings/general/hooks/useSelectionFields';
import { useSelectionUpdate } from '@settings/general/hooks/useSelectionMutations';
import { TABS } from '@settings/preferences/pages/Customer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { DeleteOutlineTwoTone } from '@mui/icons-material';
interface CustomerDefaultCountryProps {
  keyRoot: string;
}

const CustomerDefaultCountry = (props: CustomerDefaultCountryProps) => {
  const { keyRoot } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const [isOpenCountry, setIsOpenCountry] = useState<boolean>(false);
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

  const onChange = (data: any) => {
    console.log('🚀 ~ file: index.tsx:25 ~ data:', data);
  };

  return (
    <>
      <Box sx={{ mb: 2 }} border={`1px solid ${theme.palette.divider}`}>
        <Stack p={2} borderBottom={`1px solid ${theme.palette.divider}`}>
          <Typography fontWeight={'500'}>{t(TABS.find((v: LabelValue) => v.value === keyRoot)?.label || '')}</Typography>
        </Stack>
        {isOpenCountry && (
          <Box padding={2} display="flex" justifyContent={'space-between'}>
            <Box sx={{ width: '100%' }}>
              <CountryAutoComplete
                value={''}
                onChange={onChange}
                placeholder={t('ncrm_generalsetting_general_country_auto_placeholder') as string}
              />
            </Box>
            <IconButton sx={{ marginTop: '5px' }} edge="end" size="medium" color="error" onClick={() => setIsOpenCountry(false)}>
              <DeleteOutlineTwoTone fontSize="small" color="error" />
            </IconButton>
          </Box>
        )}
      </Box>
      <Button
        variant="contained"
        onClick={() => setIsOpenCountry(true)}
        sx={{ height: '32px', fontSize: '14px', px: 1.5, width: 'fit-content', borderRadius: '4px', marginTop: 1 }}
      >
        <AddIcon fontSize="medium" />
        Add another line
      </Button>
    </>
  );
};

export default CustomerDefaultCountry;
