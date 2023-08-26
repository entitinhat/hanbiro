import { DATE_FORMATS, DATE_SEPARATORS, WEEK_DAYS } from '@base/config/constant';
import withLoading from '@base/hooks/hocs/withLoading';
import useSnackBar from '@base/hooks/useSnackBar';
import { formatSettingsAtom } from '@base/store/atoms';
import { dateSettingSelector } from '@base/store/selectors/app';
import { convertDateFormat, replaceSeparator } from '@base/utils/helpers/dateUtils';
import FirstDayOfWeek from '@settings/general/components/FirstDayOfWeek';
import { FIRST_WEEK_OF_YEARS } from '@settings/general/config/constants';
import { useUpdateFormatSetting } from '@settings/general/hooks/useUpdateFormatSetting';
import { DateSetting, FormatSetting } from '@settings/general/types/interface';
import Section from '@settings/preferences/components/Section';
import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

// material-ui
import { Box, Grid, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from '@mui/material';

// third-party
import dayjs from 'dayjs';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

interface DateSettingProps {
  setLoading: (params: boolean) => void;
  data: DateSetting | undefined;
}
const DateSetting = (props: DateSettingProps) => {
  const { setLoading } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const { t } = useTranslation();

  const data: DateSetting = useRecoilValue(dateSettingSelector);
  const [formatSettings, setFormatSettings] = useRecoilState(formatSettingsAtom);

  let dateValue: DateSetting = _.cloneDeep(data);
  const settingKey = 'date';
  const mUpdateFormat = useUpdateFormatSetting();

  const updateFormatSetting = (value: DateSetting) => {
    // save to server
    dateValue = value;
    mUpdateFormat.mutate(
      { key: settingKey, value: JSON.stringify(value) },
      {
        onSuccess: () => {
          enqueueSuccessBar('Setting saved!');
          setLoading(false);
          // update format settings
          const newSettings = formatSettings.map((item: FormatSetting) => {
            if (item.key == settingKey) {
              return {
                ...item,
                value: value
              };
            }
            return item;
          });
          setFormatSettings(newSettings);
        },
        onError: () => {
          enqueueErrorBar('Saving has failed!');
          setLoading(false);
        }
      }
    );
  };
  const { firstDayOfWeek, firstWeekOfYear, dateFormat, dateSeparator } = dateValue;

  const firstDay = useMemo(() => WEEK_DAYS.find((day) => day.value == firstDayOfWeek), [firstDayOfWeek]);

  const firstWeek = useMemo(() => FIRST_WEEK_OF_YEARS.find((week) => week.value == firstWeekOfYear), [firstWeekOfYear]);

  const dateFormatValue = useMemo(() => ({ value: dateFormat, label: dateFormat }), [dateFormat]);

  const dateSeparatorValue = useMemo(() => ({ value: dateSeparator, label: dateSeparator }), [dateSeparator]);

  const formatPreview = useMemo(() => {
    const format = convertDateFormat(dateFormat);
    const today = new Date();
    const curDate = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
    const curMonth = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`;
    const curDateStr = `${today.getFullYear()}/${curDate}/${curMonth}`;
    let formatString = dayjs(curDateStr, 'YYYY/DD/MM').format(format);
    return replaceSeparator(formatString, dateSeparator);
  }, [dateFormat, dateSeparator]);

  const onChangeData = (event: SelectChangeEvent, key: string) => {
    setLoading(true);
    const value = {
      ...dateValue,
      [key]: event.target.value
    };
    updateFormatSetting(value);
  };
  const theme = useTheme();

  return (
    <>
      <Section header={t('ncrm_generalsetting_date')}>
        <Grid sx={{ p: '20px' }}>
          <Grid sx={{ columnCount: 2 }}>
            <Box sx={{ px: '5px', mb: '1rem' }}>
              <FirstDayOfWeek value={firstDay?.value} onChange={(e) => onChangeData(e, 'firstDayOfWeek')} />
            </Box>
            <Grid sx={{ px: '5px', mb: '1rem' }}>
              <Typography color="secondary" mb={1}>
                {t('ncrm_generalsetting_date_format')}
              </Typography>
              <Select
                sx={{ minWidth: 200 }}
                // options={decimalSymbols}
                inputProps={{ fontSize: '40px' }}
                value={dateFormatValue?.value}
                onChange={(e) => onChangeData(e, 'dateFormat')}
              >
                {DATE_FORMATS.map((opt: { value: string; label: string }, idx: number) => (
                  <MenuItem value={opt.value} key={idx}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid sx={{ px: '5px', mb: '1rem' }}>
              <Typography color="secondary" mb={1}>
                {t('ncrm_generalsetting_first_week_of_year')}
              </Typography>
              <Select
                sx={{ minWidth: 200 }}
                inputProps={{ fontSize: '40px' }}
                value={firstWeek?.value.toString()}
                onChange={(e) => onChangeData(e, 'firstWeekOfYear')}
              >
                {FIRST_WEEK_OF_YEARS.map((opt: { value: number; label: string }, idx: number) => (
                  <MenuItem value={opt.value} key={idx}>
                    {t(opt.label)}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid sx={{ px: '5px', mb: '1rem' }}>
              <Typography color="secondary" mb={1}>
                {t('ncrm_generalsetting_date_separator')}
              </Typography>
              <Select
                sx={{ minWidth: 200 }}
                inputProps={{ fontSize: '40px' }}
                value={dateSeparatorValue.value}
                onChange={(e) => onChangeData(e, 'dateSeparator')}
              >
                {DATE_SEPARATORS.map((opt: { value: string; label: string }, idx: number) => (
                  <MenuItem value={opt.value} key={idx}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_preview')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                borderRadius: '0.25rem',
                p: '15px',
                border: `1px dashed ${theme.palette.secondary.light}`,
                backgroundColor: theme.palette.secondary.lighter
              }}
            >
              <Typography>{formatPreview}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Section>
    </>
  );
};

export default withLoading(DateSetting);
