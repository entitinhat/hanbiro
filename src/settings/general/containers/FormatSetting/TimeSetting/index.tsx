import { DATE_FORMATS, TIME_FORMATS } from '@base/config/constant';
import withLoading from '@base/hooks/hocs/withLoading';
import useSnackBar from '@base/hooks/useSnackBar';
import { formatSettingsAtom } from '@base/store/atoms';
import { timeSettingSelector } from '@base/store/selectors/app';
import { useUpdateFormatSetting } from '@settings/general/hooks/useUpdateFormatSetting';
import { FormatSetting, TimeSetting } from '@settings/general/types/interface';
import Section from '@settings/preferences/components/Section';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// third-party
import dayjs from 'dayjs';

// material-ui
import { Box, Grid, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

interface Props {
  setLoading: (params: boolean) => void;
  data: TimeSetting | undefined;
}

// const timeSeparators = [{ value: ':', label: ':' }];
// const getRegex = () => {
//   const separators = timeSeparators.reduce((oldV, value) => oldV + value.value, '');
//   return new RegExp(`[${separators}]`);
// };
// const regexReplace = getRegex();

const TimeSetting = (props: Props) => {
  const { setLoading } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const { t } = useTranslation();

  const data: TimeSetting = useRecoilValue(timeSettingSelector);
  const [formatSettings, setFormatSettings] = useRecoilState(formatSettingsAtom);
  let timeValue: TimeSetting = _.cloneDeep(data);

  const { timeFormat, timeSeperator } = timeValue;
  const timeFormatValue = useMemo(() => ({ value: timeFormat, label: timeFormat }), [timeFormat]);
  const timeSeparatorValue = useMemo(() => ({ value: timeSeperator, label: timeSeperator }), [timeSeperator]);

  const formatPreview = useMemo(() => {
    let formatString = timeFormat.replace('tt', 'a');
    formatString = dayjs(new Date()).format(formatString);
    // formatString = formatString.replace(regexReplace, timeSeperator);
    return formatString;
  }, [timeFormat, timeSeperator]);

  const mUpdateFormat = useUpdateFormatSetting();
  const updateFormatSetting = (value: TimeSetting) => {
    // save to server
    timeValue = value;
    mUpdateFormat.mutate(
      { key: 'time', value: JSON.stringify(value) },
      {
        onSuccess: () => {
          enqueueSuccessBar('Setting saved!');
          setLoading(false);
          // update format settings
          const newSettings = formatSettings.map((item: FormatSetting) => {
            if (item.key == 'time') {
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

  const onChangeData = (event: SelectChangeEvent, key: string) => {
    setLoading(true);
    const value = {
      ...timeValue,
      [key]: event.target.value
    };
    updateFormatSetting(value);
  };
  const theme = useTheme();
  return (
    <Section header={t('ncrm_generalsetting_time')}>
      <Grid sx={{ padding: '20px' }}>
        <Grid sx={{ columnCount: 1 }}>
          <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_time_format')}
            </Typography>
            <Select sx={{ minWidth: 200 }} value={timeFormatValue?.value} onChange={(e) => onChangeData(e, 'timeFormat')}>
              {TIME_FORMATS.map((opt: { value: string; label: string }, idx: number) => (
                <MenuItem value={opt.value} key={idx}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {/* <Grid sx={{ px: '5px', mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_time_seperator')}
            </Typography>
            <Select
              sx={{ minWidth: 200 }}
              className="wd-150-f"
              inputProps={{ fontSize: '40px' }}
              value={timeSeparatorValue?.value}
              onChange={(e) => onChangeData(e, 'timeSeperator')}
            >
              {timeSeparators.map((opt: { value: string; label: string }, idx: number) => (
                <MenuItem value={opt.value} key={idx}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </Grid> */}
        </Grid>

        <Grid sx={{ p: '12px 20px', mb: '1rem', border: '1px solid ' + theme.palette.divider }}>
          <Typography>
            {t('ncrm_generalsetting_notations_mean')}
            <br />
            {/* h = hour m = minute t = am or pm */}
            {`h = ${t('ncrm_generalsetting_notation_hour')}, m = ${t('ncrm_generalsetting_notation_minute')}, t = am or pm`}
            <br />
            {/* h/H = 12/24 hour */}
            {`h/H = 12/24 ${t('ncrm_generalsetting_notation_hour')}`}
            <br />
            {/* hh, mm =&quot;display leading zero&quot; */}
            {`hh, mm = "${t('ncrm_generalsetting_time_display_leading_zero')}"`}
            <br />
            {/* h, m = &quot;do not display leading zero&quot; */}
            {`h, m = "${t('ncrm_generalsetting_time_do_not_display_leading_zero')}"`}
          </Typography>
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
            <Typography sx={{ flex: '0 0 50%' }}> {formatPreview}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};

export default withLoading(TimeSetting);
