import { useEffect, useState } from 'react';
import { useDeskHoursSetting } from '@settings/preferences/hooks/desk/useDeskHoursSetting';
import { Box, Button, Grid, IconButton, MenuItem, Select, Typography, useTheme } from '@mui/material';
import MuiRadioGroup from '@base/components/@hanbiro/RadioGroup';
import TimeRangePicker from '@base/components/@hanbiro/Date/TimeRangePicker';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { BH_OPTIONS, WD_OPTIONS, WD_SETTING_OPTIONS } from '@settings/preferences/config/desk/options';
import useDeskHoursMutation from '@settings/preferences/hooks/desk/useDeskHoursMutation';
import Section from '@settings/preferences/components/Section';
import { BusinessHours, DeskHours, WorkingHour } from '@settings/preferences/types/desk/common';
import { useTranslation } from 'react-i18next';

const DeskHours = () => {
  const { t } = useTranslation();
  // custom options
  const NEW_BH_OPTIONS = BH_OPTIONS.map((option) => {
    return {
      ...option,
      label: t(option.label)
    };
  });

  const [setting, setSetting] = useState<DeskHours | null>(null);
  const [businessHours, setBusinessHours] = useState(NEW_BH_OPTIONS[3]);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<any>(WD_OPTIONS[1]);
  const [wdOptions, setWDOptions] = useState<any>(WD_OPTIONS);
  const [openWorkingHours, setOpenWorkingHours] = useState<boolean>(false)
  const { data, isLoading } = useDeskHoursSetting();
  const { mUpdate } = useDeskHoursMutation();

  const onSave = (nSetting: DeskHours) => {
    const param = {
      menu: 'desk',
      key: 'desk_hours',
      value: JSON.stringify(nSetting)
    };
    mUpdate.mutate({ menuSetting: param });
  };

  // console.log('businessHours: ', businessHours);
  //change
  const handleBHOptionChange = (newOption: any) => {
    if (setting) {
      let nSetting: DeskHours = setting;
      nSetting.workingHours = [];
      switch (newOption.value) {
        case BusinessHours.BH_247:
          nSetting.workingDays = WD_SETTING_OPTIONS.BH_247;
          setOpenWorkingHours(false);
          break;
        case BusinessHours.BH_246:
          nSetting.workingDays = WD_SETTING_OPTIONS.BH_246;
          setOpenWorkingHours(false);
          break;
        case BusinessHours.BH_245:
          nSetting.workingDays = WD_SETTING_OPTIONS.BH_245;
          setOpenWorkingHours(false);
          break;
        case BusinessHours.BH_CUSTOM:
          nSetting.workingDays = WD_SETTING_OPTIONS.BH_CUSTOM;
          setOpenWorkingHours(true);
          break;
      }
      nSetting.workingHours = nSetting.workingDays.map((item) => {
        return {
          day: item,
          startTime: '09:00',
          endTime: '18:00'
        };
      });
      nSetting.businessHours = newOption.value;
      if (nSetting.workingDays) {
        const nWDOptions = WD_OPTIONS.filter((item) => {
          return nSetting.workingDays.includes(item.value);
        });
        setWDOptions(nWDOptions);
      }
      // console.log('tlog dđ', businessHours);
      setBusinessHours(newOption);
      setWorkingHours(nSetting?.workingHours ?? []);
      setSetting(nSetting);
      onSave(nSetting);
    }
  };
  const handleCopyWH = (item: WorkingHour) => {
    if (setting && setting.workingHours) {
      const nWorkingHours = setting.workingHours.map((w) => {
        return {
          day: w.day,
          startTime: item.startTime,
          endTime: item.endTime
        };
      });
      const nSetting = {
        ...setting,
        workingHours: nWorkingHours
      };
      setWorkingHours(nWorkingHours);
      setSetting(nSetting);
      onSave(nSetting);
    }
  };
  const handleChangWH = (nVal: any, day: string) => {
    if (setting && setting.workingHours) {
      const nWorkingHours = setting.workingHours.map((item) => {
        if (item.day === day) {
          return {
            day: day,
            startTime: nVal.startTime,
            endTime: nVal.endTime
          };
        }
        return item;
      });
      setWorkingHours(nWorkingHours);
      const nSetting = {
        ...setting,
        workingHours: nWorkingHours
      };
      setSetting(nSetting);
      onSave(nSetting);
    }
  };
  const handleFirstDayOfWeek = (nVal: any) => {
    if (setting) {
      setFirstDayOfWeek(nVal);
      const nSetting: DeskHours = {
        ...setting,
        firstDayOfWeek: nVal.value
      };
      setSetting(nSetting);
      onSave(nSetting);
    }
  };
  const handleWorkDay = (day: string) => {
    if (setting) {
      let nSetting = {
        ...setting,
        workingDays: [...setting.workingDays, day]
      };
      let defaultWH = {
        day: day,
        startTime: '09:00',
        endTime: '18:00'
      };
      if (setting.workingHours && setting.workingHours.length > 0) {
        defaultWH.startTime = setting.workingHours[0].startTime;
        defaultWH.endTime = setting.workingHours[0].endTime;
      } else {
        nSetting.workingHours = [];
      }
      nSetting.workingHours?.push(defaultWH);
      if (nSetting.workingDays) {
        const nWDOptions = WD_OPTIONS.filter((item) => {
          return nSetting.workingDays.includes(item.value);
        });
        setWDOptions(nWDOptions);
      }
      setSetting(nSetting);
      onSave(nSetting);
    }
  };
  useEffect(() => {
    // console.log('tlog nSetting', data);
    if (!isLoading && data?.value) {
      try {
        const nSetting: DeskHours = JSON.parse(data.value);
        // console.log('tlog nSetting', nSetting);
        if (nSetting?.businessHours) {
          const value = NEW_BH_OPTIONS.find((item) => {
            return item.value == nSetting?.businessHours;
          });
          setBusinessHours(value ?? NEW_BH_OPTIONS[3]);
          setOpenWorkingHours(value?.value === 'BH_CUSTOM' ? true : false)
        }
        if (nSetting?.workingHours) {
          setWorkingHours(nSetting.workingHours);
        }
        if (nSetting?.firstDayOfWeek != '') {
          const found = WD_OPTIONS.find((item) => {
            return item.value == nSetting?.firstDayOfWeek;
          });
          setFirstDayOfWeek(found);
        }
        if (nSetting.workingDays) {
          const nWDOptions = WD_OPTIONS.filter((item) => {
            return nSetting.workingDays.includes(item.value);
          });
          setWDOptions(nWDOptions);
        }

        setSetting(nSetting);
      } catch (err: any) { }
    }
  }, [data]);

  const theme = useTheme();

  return (
    <Section header={t('ncrm_generalsetting_preferences_desk_desk_hours')}>
      <Box sx={{ flex: '1 1 auto', padding: '15px 20px' }}>
        <Box sx={{ mb: '1rem', display: 'flex', flexDirection: 'column' }}>
          <Typography color="secondary" mb={1}>
            {t('ncrm_generalsetting_preferences_desk_business_hours')}
          </Typography>
          <MuiRadioGroup value={businessHours} options={NEW_BH_OPTIONS} onChange={handleBHOptionChange} />
        </Box>
        <Box sx={{ mb: '1rem', display: 'flex', flexDirection: 'column' }}>
          <Typography color="secondary" mb={1}>
            {t('ncrm_generalsetting_preferences_desk_working_days')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {WD_OPTIONS.map((item, idx) => {
              //active
              const active = setting?.workingDays && setting?.workingDays.length > 0 && setting?.workingDays.includes(item.value);
              const disabled =
                (businessHours.value === BusinessHours.BH_246 && item.value === 'sun') ||
                (businessHours.value === BusinessHours.BH_245 && item.value === 'sun') ||
                (businessHours.value === BusinessHours.BH_245 && item.value === 'sat');
              return (
                <Box key={idx}>
                  {disabled ? (
                    <Button
                      key={item.value}
                      color="primary"
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 0.5, borderRadius: '30px', cursor: 'inherit' }}
                      onClick={() => { }}
                    >
                      {t(item.label)}
                    </Button>
                  ) : (
                    <Button
                      key={item.value}
                      color="primary"
                      size="small"
                      variant="contained"
                      sx={{ mr: 1, mb: 0.5, borderRadius: '30px', cursor: 'pointer' }}
                      onClick={() => {
                        handleWorkDay(item.value);
                      }}
                    >
                      {t(item.label)}
                    </Button>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ mb: '1rem' }}>
          <Typography color="secondary" mb={1}>
            {t('ncrm_generalsetting_preferences_desk_first_day_of_work_week')}
          </Typography>
          <Select
            value={firstDayOfWeek?.value}
            onChange={(event: any, nVal: any) => {
              handleFirstDayOfWeek(nVal.props);
            }}
            sx={{ minWidth: 200 }}
          >
            {wdOptions.map((opt: any, idx: any) => (
              <MenuItem value={opt.value} key={idx}>
                {t(opt.label)}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {openWorkingHours &&
          <Box sx={{ mb: '1rem' }}>
            <Typography color="secondary" mb={1}>
              {t('ncrm_generalsetting_preferences_desk_working_hours')}
            </Typography>
            {workingHours?.map((item, index) => {
              const wd = WD_OPTIONS.find((d) => {
                return d.value === item.day;
              });
              const crrValue = {
                startTime: item.startTime, //'09:00',
                endTime: item.endTime //'18:00',
              };
              const now = new Date();
              const strDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
              const stDate = new Date(strDate + ' ' + item.startTime);
              const edDate = new Date(strDate + ' ' + item.endTime);
              const dHours = Math.round((Math.abs(edDate.getTime() - stDate.getTime()) / 3600000 - 1) * 100) / 100;
              return (
                <Grid
                  container
                  direction="row"
                  sx={{
                    border: '1px solid ' + theme.palette.divider,
                    py: 1,
                    borderTop: index == 0 ? '1px solid ' + theme.palette.divider : 0
                  }}
                  key={index}
                >
                  <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', pl: 2 }}>
                    <Typography>{t(wd?.label as string) || ''}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TimeRangePicker
                      value={crrValue}
                      // isShowRow={true}
                      hideTitle={true}
                      onChange={(nVal: any) => {
                        handleChangWH(nVal, item.day);
                      }}
                    />
                  </Grid>
                  <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', pl: 1 }}>
                    <Typography>{`${(dHours)} ${t('ncrm_generalsetting_preferences_desk_hrs')}`}</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pr: 2 }}>
                    {index == 0 && (
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
                        onClick={() => {
                          handleCopyWH(item);
                        }}
                      >
                        <ContentCopyOutlinedIcon sx={{ fontSize: 13 }} />
                        <Typography sx={{ ml: 0.5 }} noWrap>
                          {t('ncrm_common_copy')}
                        </Typography>
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Box>
        }
      </Box>
    </Section>
  );
};

export default DeskHours;
