import dayjs from 'dayjs';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import { TuneRounded, Visibility, VisibilityOutlined } from '@mui/icons-material';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, Grid, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import EastIcon from '@mui/icons-material/East';
import RadioGroup from '@mui/material/RadioGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { RecordedBy, RecordedType } from '@lead/config/constants';
import CheckboxGroup from '@base/components/@hanbiro/CheckboxGroup';
import { LabelValue } from '@base/types/app';
import { DateFilter } from '@base/config/constant';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';
export interface Filter {
  createdAt: {
    from: Date;
    to: Date;
  };
  createdBy: string;
  action: string[];
}
interface Form {
  dateFilter: string;
  recordedBy: string;
  user?: any;
  recordedType: LabelValue[];
}

interface FilterProps {
  onChangeFilter: (val: Filter | null) => void;
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
  const { onChangeFilter } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const { register, handleSubmit, watch, getValues, control } = useForm<Form>({
    defaultValues: {
      dateFilter: 'month',
      recordedBy: '',
      user: '',
      recordedType: []
    }
  });

  const dateFilterWatch = watch('dateFilter');
  const recordedByWatch = watch('recordedBy');
  const [startDate, setStartDate] = useState<Date>(dayjs().startOf('month').toDate());
  const [endDate, setEndDate] = useState<Date>(dayjs().endOf('month').toDate());
  const [value, setValue] = React.useState('today');
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
    setIsOpen(false);
    // setShowFilter(false);
  }, []);

  const border = '1px solid ' + theme.palette.divider + ' !important';

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form isValid', isValid); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  // console.log('setActiveTab', activeTab);
  // console.log('setMenuApi', menuApi);

  //======================== End Debug ========================//

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<TuneRounded fontSize="small" />}
        sx={{ borderRadius: '6px', mr: '10px' }}
        onClick={handleClick}
        size="small"
      >
        {t('ncrm_common_timeline_filter')}
      </Button>
      <Button
        variant={isViewAll ? 'contained' : 'outlined'}
        color={isViewAll ? 'primary' : 'secondary'}
        startIcon={<VisibilityOutlined fontSize="small" />}
        sx={{
          borderRadius: '6px',
          // border: isViewAll ? 0 : '2px solid' + theme.palette.divider
          borderColor: theme.palette.divider
        }}
        onClick={() => {
          setIsViewAll(!isViewAll);
        }}
        size="small"
      >
        {t('View all')}
      </Button>

      <Dialog open={isOpen} onClose={handleClose}>
        <form>
          <DialogContent dividers sx={{ width: isMobile ? '100%' : '700px' }}>
            <Grid sx={{ marginBottom: 3 }}>
              <Typography sx={{ marginBottom: '0.5rem' }}>{t('ncrm_common_timeline_filter_date')}</Typography>
              <ToggleButtonGroup
                {...register('dateFilter')}
                exclusive={true}
                aria-label="Medium sizes"
                onChange={(date: any) => {
                  onChangeDate(date);
                }}
                value={value}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'auto auto auto' : 'auto auto auto auto auto',
                  gridGap: '8px',
                  padding: '0px',
                  '& .MuiToggleButton-root': { border: border, borderRadius: '4px !important', color: 'inherit', fontWeight: 400 }
                }}
              >
                {DateFilter.map((item) => {
                  return (
                    <ToggleButton value={item.value} key={item.value} sx={{ padding: '.375rem .9375rem' }}>
                      {t(item.label)}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>

              {value === 'custom' && (
                <Grid container sx={{ alignItems: 'center', display: 'flex', marginTop: 2 }}>
                  <DatePicker
                    value={startDate}
                    onChange={(date: any) => {
                      onChangeStartDate(date);
                    }}
                    fullWidth={false}
                    inputSx={{ flexGrow: 1 }}
                  />
                  <Typography sx={{ marginLeft: '10px', marginRight: '10px', display: 'flex' }} color="secondary" alignItems="center">
                    <EastIcon fontSize="small" />
                  </Typography>
                  <DatePicker
                    value={endDate}
                    onChange={(date: any) => {
                      onChangeEndDate(date);
                    }}
                    fullWidth={false}
                    inputSx={{ flexGrow: 1 }}
                  />
                </Grid>
              )}
            </Grid>
            <Grid sx={{ marginBottom: 3 }}>
              <Typography>{t('Recorded by')}</Typography>
              <Grid sx={{ position: 'relative', display: 'block', my: 1, pl: 1 }}>
                <Controller
                  name="recordedBy"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    console.log('value', value);
                    return (
                      <RadioGroup row value={value}>
                        {RecordedBy.map((item, idx) => {
                          console.log('isChecked checking', value === item.value, value, item.value);
                          return (
                            <FormControlLabel
                              key={idx}
                              value={item.value}
                              control={
                                <Checkbox
                                  checked={value === item.value}
                                  onChange={(e, isChecked) => {
                                    onChange(e.target.value);
                                  }}
                                />
                              }
                              label={t(item.label)}
                            />
                          );
                        })}
                      </RadioGroup>
                    );
                  }}
                />
              </Grid>
              {recordedByWatch === 'user' && (
                <Controller
                  name="user"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => <UserAutoComplete single={true} onChange={onChange} value={value} />}
                />
              )}
            </Grid>
            <Grid sx={{ marginBottom: 2 }}>
              <Typography>{t('Record Type')}</Typography>
              <Grid sx={{ position: 'relative', mt: 1, pl: 1 }}>
                <Controller
                  name="recordedType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CheckboxGroup onChange={onChange} value={value} options={RecordedType} isVertical={false} />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 1 }}>
            <Grid container alignItems="center" justifyContent="flex-end">
              <Button
                variant="outlined"
                sx={{ marginRight: '5px', borderColor: theme.palette.divider, p: '4px 13.5px' }}
                color="inherit"
                onClick={resetData}
                size="small"
              >
                {t('ncrm_common_btn_cancel')}
              </Button>
              <Button variant="contained" onClick={resetData} size="small" sx={{ p: '4px 13.5px' }}>
                {t('ncrm_common_btn_update')}
              </Button>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Filter;
