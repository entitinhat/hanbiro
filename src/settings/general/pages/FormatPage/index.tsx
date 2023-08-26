import MainCard from '@base/components/App/MainCard';
import { formatSettingsAtom } from '@base/store/atoms';
import { Grid, useTheme } from '@mui/material';
import CountrySetting from '@settings/general/containers/FormatSetting/CountrySetting';
import CurrencySetting from '@settings/general/containers/FormatSetting/CurrencySetting';
import DateSetting from '@settings/general/containers/FormatSetting/DateSetting';
import NumberSetting from '@settings/general/containers/FormatSetting/NumberSetting';
import TimeSetting from '@settings/general/containers/FormatSetting/TimeSetting';
import TimezoneSetting from '@settings/general/containers/FormatSetting/TimezoneSetting';
import { useFormatSettings } from '@settings/general/hooks/useFormatSetting';
import { FormatSetting } from '@settings/general/types/interface';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';

interface FormatPageProps {}
const FormatPage = (props: FormatPageProps) => {
  // const { data, isLoading } = useFormatSettings();
  // const setFormatSettings = useSetRecoilState(formatSettingsAtom);
  const theme = useTheme();
  const { t } = useTranslation();

  //===DEBUG
  // console.log('API atom data:', data);

  //==== Parse ATOM Data from API to Objects
  // useEffect(() => {
  //   if (!isLoading && data && data.results.length > 0) {
  //     if (data) {
  //       const parseData = data.results.map((item: FormatSetting) => {
  //         if (typeof item.value === 'string') {
  //           return {
  //             ...item,
  //             value: JSON.parse(item.value)
  //           };
  //         }
  //         return item;
  //       });
  //       setFormatSettings(parseData);
  //     }
  //   }
  // }, [data]);

  return (
    <MainCard
      border={false}
      sx={{
        p: 2,
        '& .MuiCardContent-root': {
          bgcolor: theme.palette.background.paper
        }
      }}
      title={t('ncrm_generalsetting_format_setting')}
      headerSX={{
        bgcolor: theme.palette.background.paper
      }}
      className="scroll-box"
    >
      <Grid sx={{ columnCount: 2, columnGap: '1.25rem', width: '100%', pb: '30px' }}>
        <NumberSetting />
        <DateSetting />
        <CountrySetting />
        <CurrencySetting />
        <TimeSetting />
        <TimezoneSetting />
      </Grid>
    </MainCard>
  );
};

export default FormatPage;
