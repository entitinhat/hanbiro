import { useEffect, useState } from 'react';

//third-party
import { Box, TextField, Typography } from '@mui/material';
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

//menu
import { CAMPAIGN_MAIL_SCHEDULE, CAMPAIGN_MAIL_SEND_NOW } from '@campaign/config/constants';
interface SendScheduleProps {
  value: any;
  onChange: (newVal: any) => void;
}

const SendSchedule = (props: SendScheduleProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();

  const defaultValue = {
    type: CAMPAIGN_MAIL_SEND_NOW, //or 'schedule
    sendBatch: false,
    interval: 1
  };
  const [scheduleValue, setScheduleValue] = useState(defaultValue);

  //init data
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(scheduleValue)) {
        setScheduleValue(value);
      }
    } else {
      setScheduleValue(defaultValue);
    }
  }, []);

  //value change
  const handleValueChange = (keyName: any, keyValue: any) => {
    const newSchedule: any = { ...scheduleValue };
    newSchedule[keyName] = keyValue;
    setScheduleValue(newSchedule);
    //callback
    onChange && onChange(newSchedule);
  };

  return (
    <Box sx={{ p: 0 }}>
      <FormControl sx={{ mr: 'auto' }}>
        <RadioGroup
          value={scheduleValue.type}
          onChange={(e: any, v: any) => {
            handleValueChange('type', v);
          }}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel control={<Radio />} value={CAMPAIGN_MAIL_SEND_NOW} label={t('Send Now')} />
          <FormControlLabel control={<Radio />} value={CAMPAIGN_MAIL_SCHEDULE} label={t('Schedule')} />
        </RadioGroup>
      </FormControl>
      <Stack direction={'row'} alignItems="center">
        <FormControlLabel
          value="start"
          control={<Checkbox checked={scheduleValue.sendBatch} onChange={(e) => handleValueChange('sendBatch', e.target.checked)} />}
          label={t('Send in batches: interval')}
        />
        <TextField
          //variant="filled"
          type="number"
          sx={{ px: 0.5 }}
          disabled={!scheduleValue.sendBatch}
          value={scheduleValue.interval}
          onChange={(e) => handleValueChange('interval', e.target.value)}
        />
        <Typography>minutes</Typography>
      </Stack>
    </Box>
  );
};

export default SendSchedule;
