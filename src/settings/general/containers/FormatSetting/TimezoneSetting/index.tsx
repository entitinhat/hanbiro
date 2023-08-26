import withLoading from '@base/hooks/hocs/withLoading';
import { formatSettingsAtom } from '@base/store/atoms';
import { TimezoneSelector } from '@base/store/selectors/app';
import { FormatSetting, Timezone } from '@settings/general/types/interface';
import Section from '@settings/preferences/components/Section';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSnackBar from '@base/hooks/useSnackBar';
import { useUpdateFormatSetting } from '@settings/general/hooks/useUpdateFormatSetting';
import TimezoneAutoComplete from '../TimezoneAutoComplete';
import AddIcon from '@mui/icons-material/Add';
// material-ui
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useTheme
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { DeleteOutlineTwoTone } from '@mui/icons-material';
import { useMemo, useState } from 'react';

interface Props {
  setLoading: (params: boolean) => void;
}

const TimezoneSetting = (props: Props) => {
  const { setLoading } = props;
  const { enqueueSuccessBar, enqueueErrorBar, enqueueWarningBar } = useSnackBar();
  const { t } = useTranslation();

  const reData: Timezone[] = useRecoilValue(TimezoneSelector);
  const [formatSettings, setFormatSettings] = useRecoilState(formatSettingsAtom);
  let timezoneValue: Timezone[] = _.cloneDeep(reData);
  const settingKey = 'timezone';
  const [numLines, setNumLines] = useState(0);
  const mUpdateFormat = useUpdateFormatSetting();
  const updateFormatSetting = (value: Timezone[]) => {
    // save to server
    timezoneValue = value;
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
  const onChange = (timezoneSelect: Timezone) => {
    const isExist = timezoneValue.find((timezone: Timezone) => timezone.tzone == timezoneSelect.tzone);
    if (isExist) {
      enqueueWarningBar('Time zone is existed');
    } else {
      setLoading(true);
      const timezones = timezoneValue.concat([timezoneSelect]);
      updateFormatSetting(timezones);
      setNumLines(numLines - 1);
    }
  };

  const onDelete = (timezoneSelect: Timezone) => {
    setLoading(true);
    const timezones = timezoneValue.filter((timezone: Timezone) => timezone.tzone != timezoneSelect.tzone);
    updateFormatSetting(timezones);
  };

  const onSetDefault = (timezoneSelect: Timezone) => {
    setLoading(true);
    const timezones = timezoneValue.map((timezone: Timezone) => ({
      ...timezone,
      isDefault: timezone.tzone == timezoneSelect.tzone
    }));
    updateFormatSetting(timezones);
  };

  const renderNewLine = useMemo(() => {
    const lines: any = [];
    for (let i = 0; i < numLines; i++) {
      lines.push(
        <TableRow key={i} sx={{}}>
          <TableCell colSpan={3}>
            <Box display="flex" justifyContent={'space-between'}>
              <Box sx={{ width: '100%' }}>
                <TimezoneAutoComplete
                  onChange={onChange}
                  value={'Select...'}
                  placeholder={t('ncrm_generalsetting_general_timezone_auto_placeholder') as string}
                />
              </Box>
              <IconButton sx={{ marginTop: '5px' }} edge="end" size="medium" color="error" onClick={() => setNumLines(numLines - 1)}>
                <ClearIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      );
    }
    return lines;
  }, [numLines]);

  const theme = useTheme();
  const Header: string[] = [t('ncrm_generalsetting_time_zone'), t('ncrm_generalsetting_default')];
  const border = '1px solid ' + theme.palette.divider;
  return (
    <Grid sx={{ my: '10px' }}>
      <Section header={t('ncrm_generalsetting_timezone_region_code')}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            borderBottom: border,
            borderTop: 0
          }}
        >
          <Table>
            <TableHead sx={{ borderTop: 0, borderBottom: border }}>
              <TableRow>
                {Header.map((headers, key) => (
                  <TableCell key={key} sx={{ textAlign: key != 0 ? 'center' : 'left' }}>
                    {headers}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timezoneValue.map((timezone, key) => (
                <TableRow
                  key={key}
                  sx={{
                    padding: 1,
                    ':hover': {
                      svg: {
                        visibility: 'visible'
                      }
                    }
                  }}
                >
                  <TableCell sx={{ borderRight: border, padding: 1 }}>{`[GMT ${timezone.sdutc}] ${timezone.tzone}`}</TableCell>
                  <TableCell align="center" sx={{ borderRight: border, padding: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <Radio
                        checked={timezone.isDefault}
                        onChange={() => onSetDefault(timezone)}
                        sx={{ ml: '42%', mr: '34%', display: 'flex', justifyContent: 'center' }}
                      />
                      <IconButton edge="end" size="medium" color="error" onClick={() => onDelete(timezone)}>
                        <DeleteOutlineTwoTone
                          fontSize="small"
                          color="error"
                          sx={{
                            my: 'auto',
                            visibility: 'hidden'
                          }}
                        />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {numLines > 0 && renderNewLine}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          size="small"
          onClick={() => setNumLines(numLines + 1)}
          sx={{ margin: 1, px: 1.5, width: 'fit-content', borderRadius: 2 }}
        >
          <AddIcon fontSize="small" />
          {t('ncrm_generalsetting_preferences_add_another_line')}
        </Button>
      </Section>
    </Grid>
  );
};
export default withLoading(TimezoneSetting);
