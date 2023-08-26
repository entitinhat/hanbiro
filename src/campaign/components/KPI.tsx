import { CAMPAIGN_MAIL_SCHEDULE, CAMPAIGN_MAIL_SEND_NOW } from '@campaign/config/constants';
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface KeyPerformanceIndicatorProps {
  value: any;
  onChange: (newVal: any) => void;
}

const KeyPerformanceIndicator = (props: KeyPerformanceIndicatorProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();

  const defaultValue = {
    clickThroughRate: 0, //%
    totalPageView: 0 //%
  };
  const [kpiValue, setKpiValue] = useState(defaultValue);

  //init data
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(kpiValue)) {
        setKpiValue(value);
      }
    } else {
      setKpiValue(defaultValue);
    }
  }, []);

  //value change
  const handleValueChange = (keyName: string, keyValue: number) => {
    const newKpi: any = { ...kpiValue };
    newKpi[keyName] = keyValue;
    setKpiValue(newKpi);
    //callback
    onChange && onChange(newKpi);
  };

  return (
    <Box sx={{ p: 0 }}>
      <Grid container alignItems={'center'} sx={{ mb: 1 }}>
        <Grid item xs={3} lg={3}>
          <Typography>Click through rate</Typography>
        </Grid>
        <Grid item xs={9} lg={9}>
          <TextField
            //variant="filled"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
            type="number"
            value={kpiValue.clickThroughRate}
            onChange={(e) => handleValueChange('clickThroughRate', Number(e.target.value))}
          />
        </Grid>
      </Grid>
      <Grid container alignItems={'center'}>
        <Grid item xs={3} lg={3}>
          <Typography>Total page views</Typography>
        </Grid>
        <Grid item xs={9} lg={9}>
          <TextField
            //variant="filled"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
            type="number"
            value={kpiValue.totalPageView}
            onChange={(e) => handleValueChange('totalPageView', Number(e.target.value))}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default KeyPerformanceIndicator;
