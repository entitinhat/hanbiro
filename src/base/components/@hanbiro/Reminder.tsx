import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch } from '@mui/material';
import React, { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type ReminderState = {
  use: boolean;
  notify: string;
  end: number;
};

export const typeOptions = [
  {
    value: 'NOTIFY_EMAIL',
    label: 'ncrm_common_email'
  },
  {
    value: 'NOTIFY_POPUP',
    label: 'ncrm_common_pop_up'
  },
  {
    value: 'NOTIFY_SMS',
    label: 'ncrm_common_sms'
  },
  {
    value: 'NOTIFY_TEAMCHANNEL',
    label: 'ncrm_common_team_channel'
  }
];

export const timeOptions = [
  {
    value: 15,
    label: 'ncrm_common_15_minutes_ago'
  },
  {
    value: 30,
    label: 'ncrm_common_30_minutes_ago'
  },
  {
    value: 45,
    label: 'ncrm_common_45_minutes_ago'
  },
  {
    value: 60,
    label: 'ncrm_common_1_hour_ago'
  },
  {
    value: 120,
    label: 'ncrm_common_2_hour_ago'
  },
  {
    value: 360,
    label: 'ncrm_common_6_hour_ago'
  },
  {
    value: 720,
    label: 'ncrm_common_12_hour_ago'
  },
  {
    value: 1440,
    label: 'ncrm_common_1_day_ago'
  },
  {
    value: 2880,
    label: 'ncrm_common_2_day_ago'
  },
  {
    value: 10080,
    label: 'ncrm_common_7_day_ago'
  }
];

interface ReminderProps {
  value: ReminderState;
  onChange: (val: ReminderState) => void;
}

const Reminder = (props: ReminderProps) => {
  let { value, onChange } = props;
  //console.log('reminder value', value);
  const { t } = useTranslation();

  //change flag
  const handleReminderChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      onChange({ ...value, use: e.currentTarget.checked });
    },
    [value]
  );

  //type
  const handleTypeChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value as string;
    onChange({ ...value, notify: selectedType });
  };

  //time
  const handleTimeChange = (event: SelectChangeEvent) => {
    const selectedTime = event.target.value as string;
    onChange({ ...value, end: parseInt(selectedTime) });
  };

  //render
  return (
    <Stack sx={{ px: 1, width: '100%' }}>
      <Stack direction="row" alignItems={'center'}>
        <InputLabel>
          <SpanLang keyLang={'ncrm_common_use'} />
        </InputLabel>
        <Switch id="reminderTaskSwitch" checked={value?.use} onChange={handleReminderChange} />
      </Stack>
      <Stack>
        {value?.use && (
          <Grid container spacing={1}>
            <Grid item xs={12} lg={6}>
              <Select
                fullWidth
                displayEmpty
                inputProps={{ 'aria-label': 'reminder type select' }}
                value={value?.notify}
                onChange={handleTypeChange}
              >
                {typeOptions.map((_option: any) => {
                  return (
                    <MenuItem
                      key={_option.value}
                      value={_option.value}
                      //style={{ fontWeight: theme.typography.fontWeightRegular }}
                    >
                      {t(_option.label)}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Select
                fullWidth
                displayEmpty
                inputProps={{ 'aria-label': 'reminder time select' }}
                value={value?.end?.toString()}
                onChange={handleTimeChange}
              >
                {timeOptions.map((_option: any) => {
                  return (
                    <MenuItem
                      key={_option.value}
                      value={_option.value}
                      //style={{ fontWeight: theme.typography.fontWeightRegular }}
                    >
                      {t(_option.label)}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Stack>
  );
};

Reminder.defaultProps = {
  value: {
    use: false,
    notify: typeOptions[0].value,
    end: timeOptions[0].value
  } as ReminderState
};

export default Reminder;
