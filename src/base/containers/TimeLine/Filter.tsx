import dayjs from 'dayjs';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import { TuneRounded, Visibility, VisibilityOutlined } from '@mui/icons-material';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, Grid, Menu, Stack, useTheme } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import EastIcon from '@mui/icons-material/East';
import RadioGroup from '@mui/material/RadioGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import CheckboxGroup from '@base/components/@hanbiro/CheckboxGroup';
import { LabelValue } from '@base/types/app';
import { DateFilter, RecordedBy, RecordedType } from '@base/config/constant';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useRecoilValue } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import { User } from '@base/types/user';
import _ from 'lodash';

export interface IFilter {
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
  user: string;
  recordedType: LabelValue[];
}

interface FilterProps {
  onChangeFilter: (val: IFilter | null) => void;
  getAssignRep?: () => User | undefined;
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
    label: 'ncrm_common_timeline_filter_action_used',
    value: 'used'
  },
  {
    label: 'ncrm_common_timeline_filter_action_deleted',
    value: 'deleted'
  }
];

const Filter = (props: FilterProps) => {
  const { onChangeFilter, getAssignRep } = props;

  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useDevice();
  const { user } = useRecoilValue(authAtom);

  const [isViewAll, setIsViewAll] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    setValue: setValueForm,
    reset,
    formState: { errors, isValid }
  } = useForm<Form>({
    defaultValues: {
      dateFilter: 'month',
      recordedBy: 'auto',
      user: '',
      recordedType: actions
    }
  });

  const dateFilterWatch = watch('dateFilter');
  const recordedByWatch = watch('recordedBy');

  const [startDate, setStartDate] = useState<Date>(dayjs().startOf('month').toDate());
  const [endDate, setEndDate] = useState<Date>(dayjs().endOf('month').toDate());
  const [value, setValue] = React.useState(dateFilterWatch);

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
    setValueForm('dateFilter', e.target.value);
  }, []);

  const onChangeStartDate = useCallback((date: Date) => {
    setStartDate(date);
  }, []);

  const onChangeEndDate = useCallback((date: Date) => {
    setEndDate(date);
    onChangeFilter;
  }, []);

  const resetData = () => {
    handleClose();
    onChangeFilter(null);
    reset && reset();
  };

  const onSubmit = (formData: any) => {
    onChangeFilter &&
      onChangeFilter({
        ...formData,
        createdAt: {
          from: startDate,
          to: endDate
        },
        action: formData?.recordedType?.reduce((acc: any, cur: any) => {
          return acc.concat(cur?.value);
        }, []),
        createdBy:
          formData?.recordedBy === 'user'
            ? formData?.user?.id
            : formData?.recordedBy === 'owner'
            ? user?.id ?? ''
            : formData?.recordedBy === 'rep'
            ? getAssignRep
              ? getAssignRep()?.id ?? 'unassigned'
              : ''
            : ''
      });
    handleClose();
  };

  useEffect(() => {
    if (isViewAll) {
      onChangeFilter && onChangeFilter(null);
    }
  }, [isViewAll]);

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  const border = '1px solid ' + theme.palette.divider + ' !important';

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  // console.log('form errors', errors); //get form values when inputing
  // console.log('form isValid', isValid); //get form values when inputing
  // console.log('form fields', fields); //All fields from pagelayout
  // console.log('setActiveTab', activeTab);
  // console.log('setMenuApi', menuApi);
  //======================== End Debug ========================//

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Stack spacing={1} direction={'row'} sx={{ p: 2 }}>
        <Button size="small" variant="contained" color="primary" startIcon={<TuneRounded fontSize="small" />} onClick={handleClick}>
          {t('ncrm_common_timeline_filter')}
        </Button>
        <Button
          variant={isViewAll ? 'contained' : 'outlined'}
          color={isViewAll ? 'primary' : 'secondary'}
          startIcon={<VisibilityOutlined fontSize="small" />}
          sx={{
            borderColor: theme.palette.secondary.light
          }}
          onClick={() => {
            setIsViewAll(!isViewAll);
          }}
          size="small"
        >
          <SpanLang keyLang={'ncrm_common_view_all'} />
        </Button>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogContent
            dividers
            sx={{
              width: isMobile ? '100%' : '700px',
              '&.MuiDialogContent-dividers': {
                borderTop: 0
              }
            }}
          >
            <Grid sx={{ marginBottom: 3 }}>
              <Typography sx={{ marginBottom: '0.5rem' }}>
                <SpanLang keyLang={'ncrm_common_timeline_filter_date'} />
              </Typography>
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
              <Typography>
                <SpanLang keyLang={'ncrm_common_timeline_filter_recordedby'} />
              </Typography>
              <Grid sx={{ position: 'relative', display: 'block', my: 1, pl: 1 }}>
                <Controller
                  name="recordedBy"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <RadioGroup row value={value}>
                        {RecordedBy?.map((item: LabelValue, idx: number) => {
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
                                  disabled={!_.isFunction(getAssignRep) && item?.value === 'rep'}
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
              <Typography>
                <SpanLang keyLang={'ncrm_common_timeline_filter_record_type'} />
              </Typography>
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
                sx={{ marginRight: '5px', borderColor: theme.palette.divider, p: '4px 13.5px' }}
                variant="outlined"
                color="secondary"
                onClick={() => resetData()}
                size="small"
              >
                {t('ncrm_common_btn_cancel')}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSubmit((data) => onSubmit(data), onError)()}
                size="small"
                sx={{ p: '4px 13.5px' }}
                disabled={!isValid}
              >
                {t('ncrm_common_btn_update')}
              </Button>
            </Grid>
          </DialogActions>
        </form>
      </Menu>
    </>
  );
};

export default Filter;
