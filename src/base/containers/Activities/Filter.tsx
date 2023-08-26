import dayjs from 'dayjs';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import { AssignedTo, DateFilter } from '@base/config/constant';
import { Add, TuneRounded } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Filter } from '../Activities';
import WritePage from '@activity/pages/WritePage';
import { MENU_ACTIVITY } from '@base/config/menus';
import { ActivityTypesOptions, ACTIVITY_MENU_TASK } from '@activity/config/constants';
import { useTranslation } from 'react-i18next';
import { Source } from '@activity/types/activity';

interface Form {
  dateFilter: string;
  assignedTo: string;
  action: string[];
}

interface FilterProps {
  onChangeFilter: (val: Filter | null) => void;
  source?: Source;
}

const actions = [
  {
    label: 'ncrm_common_timeline_filter_action_created',
    value: 'created'
  },
  {
    label: 'ncrm_common_timeline_filter_action_updated',
    value: 'updated'
  },
  {
    label: 'ncrm_common_timeline_filter_action_deleted',
    value: 'deleted'
  }
];

const Filter = (props: FilterProps) => {
  const { onChangeFilter, source } = props;
  const { t } = useTranslation();
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { register, handleSubmit, watch } = useForm<Form>({
    defaultValues: {
      dateFilter: 'month',
      assignedTo: 'me',
      action: ['created', 'updated', 'deleted']
    }
  });

  const dateFilterWatch = watch('dateFilter');
  const [startDate, setStartDate] = useState<Date>(dayjs().startOf('month').toDate());
  const [endDate, setEndDate] = useState<Date>(dayjs().endOf('month').toDate());
  const [value, setValue] = React.useState('month');

  const onChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let rangeDate: { from: Date; to: Date };
    const {
      currentTarget: { value }
    } = e;
    if (value == 'week') {
      rangeDate = {
        from: dayjs().startOf('week').toDate(),
        to: dayjs().endOf('week').toDate()
      };
    } else if (value == 'month') {
      rangeDate = {
        from: dayjs().startOf('month').toDate(),
        to: dayjs().endOf('month').toDate()
      };
    } else if (value == 'year') {
      rangeDate = {
        from: dayjs().startOf('year').toDate(),
        to: dayjs().endOf('year').toDate()
      };
    } else {
      rangeDate = {
        from: dayjs().startOf('day').toDate(),
        to: dayjs().endOf('day').toDate()
      };
    }
    setStartDate(rangeDate.from);
    setEndDate(rangeDate.to);
    setValue(e.target.value);
  }, []);

  const onChangeStartDate = useCallback((date: Date) => {
    setStartDate(date);
  }, []);
  const onChangeEndDate = useCallback((date: Date) => {
    setEndDate(date);
  }, []);

  const resetData = useCallback(() => {
    onChangeFilter(null);
    // setShowFilter(false);
  }, []);

  return (
    <>
      <Box>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Add fontSize="small" />}
          sx={{ borderRadius: '2.5rem', mr: 1 }}
          onClick={() => setShowWrite(true)}
          size="small"
        >
          {t('ncrm_common_activities_activity')}
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<TuneRounded fontSize="small" />}
          sx={{ borderRadius: '2.5rem' }}
          onClick={handleClick}
          size="small"
        >
          {t('ncrm_common_timeline_filter')}
        </Button>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Grid sx={{ padding: '0.5rem 0', paddingLeft: '15px', paddingRight: '15px' }}>
          <Grid sx={{ marginBottom: '1rem' }}>
            <Typography sx={{ color: '#8392a5', display: 'block', marginBottom: '0.5rem' }}>
              {t('ncrm_common_timeline_filter_date')}
            </Typography>
            <ToggleButtonGroup
              exclusive={true}
              aria-label="Medium sizes"
              onChange={(date: any) => {
                onChangeDate(date);
              }}
              value={value}
            >
              {DateFilter.map((item) => {
                return (
                  <ToggleButton value={item.value} key={item.value} sx={{ padding: '.375rem .9375rem' }}>
                    {t(item.label)}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>

            <Grid container sx={{ alignItems: 'center', display: 'flex', marginTop: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate}
                  onChange={(date: any) => {
                    onChangeStartDate(date);
                  }}
                />
              </LocalizationProvider>
              <Typography sx={{ marginLeft: '10px', marginRight: '10px' }}>~</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={endDate}
                  onChange={(date: any) => {
                    onChangeEndDate(date);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid sx={{ marginBottom: '1rem' }}>
            <Typography sx={{ color: '#8392a5', display: 'block' }}>{t('ncrm_common_timeline_filter_assigned_to')}</Typography>
            <Grid sx={{ position: 'relative', display: 'block', paddingLeft: '1.25rem' }}>
              <FormControl>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  {AssignedTo.map((item, idx) => {
                    return <FormControlLabel key={idx} value={item.value} control={<Radio />} label={t(item.label) as string} />;
                  })}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid sx={{ marginBottom: '1rem' }}>
            <Typography sx={{ color: '#8392a5', display: 'block' }}>{t('ncrm_common_activities_activity')}</Typography>
            <Grid sx={{ position: 'relative', display: 'block', paddingLeft: '1.25rem' }}>
              <FormControl>
                <FormGroup row aria-label="position">
                  {ActivityTypesOptions.map((item, idx) => {
                    return (
                      <FormControlLabel
                        key={idx}
                        value={item.value}
                        control={<Checkbox sx={{ '& .icon.MuiBox-root': { borderRadius: '.25rem' } }} />}
                        label={item.label}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Button size="small" variant="outlined" sx={{ marginRight: '5px', flexGrow: 1 }} onClick={resetData}>
              {t('ncrm_common_timeline_filter_reset')}
            </Button>
            <Button size="small" variant="contained" sx={{ flexGrow: 1 }}>
              {t('ncrm_common_timeline_filter_apply')}
            </Button>
          </Grid>
        </Grid>
      </Menu>

      <WritePage
        isOpen={showWrite}
        onClose={() => setShowWrite(false)}
        category={MENU_ACTIVITY}
        type={ACTIVITY_MENU_TASK}
        menuApi={`${MENU_ACTIVITY}_${ACTIVITY_MENU_TASK}`}
        source={source}
        //onReload={onRefresh}
      />
    </>
  );
};

export default Filter;
