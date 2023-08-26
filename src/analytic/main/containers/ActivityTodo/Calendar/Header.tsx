import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { icons } from '@base/assets/icons/svg-icons';
import { thisMonthDayJs } from '@analytic/main/utils/date';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import IconButton from '@base/components/@extended/IconButton';
import { useTranslation } from 'react-i18next';

const ACTION_EVENT_ON_RENDERED_DATE_CHANGE = 'ACTION_EVENT_ON_RENDERED_DATE_CHANGE';

interface HeaderProps {
  calRef: any;
  onChange?: (v: any, k: string) => void;
}

const Header = (props: HeaderProps) => {
  const { calRef, onChange } = props;
  const { t } = useTranslation();
  const [renderedDate, setRenderedDate] = useState<any>(thisMonthDayJs.toDate());

  const previousView = useCallback(() => {
    const calendar = calRef.current as any;
    const api = calendar.getApi();
    api.prev();
    setRenderedDate(api.getDate());
  }, [calRef]);

  const nextView = useCallback(() => {
    const calendar = calRef.current as any;
    const api = calendar.getApi();
    api.next();
    setRenderedDate(api.getDate());
  }, [calRef]);

  const goToday = useCallback(() => {
    const calendar = calRef.current as any;
    calendar.getApi().today();
    setRenderedDate(thisMonthDayJs.toDate());
  }, [calRef]);

  const renderedDateDayJs = dayjs(renderedDate);

  const canPrevious = renderedDateDayJs.unix() > thisMonthDayJs.unix();

  const monthTitle = dayjs(renderedDate).format('YYYY-MM');

  useEffect(() => {
    onChange && onChange(renderedDate, ACTION_EVENT_ON_RENDERED_DATE_CHANGE);
  }, [renderedDate]);

  return (
    <Stack sx={{ py: 1 }} direction="row" spacing={2}>
      <Typography variant="h3">{monthTitle}</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="ncrm_common_previous">
          <Typography component="span">
            <IconButton variant="outlined" color="secondary" size="small" onClick={() => previousView()} disabled={!canPrevious}>
              {icons['calendar_arrow_previous']}
            </IconButton>
          </Typography>
        </Tooltip>
        <Tooltip title={t('ncrm_common_btn_next')}>
          <Typography component="span">
            <IconButton variant="outlined" color="secondary" size="small" onClick={() => nextView()}>
              {icons['calendar_arrow_next']}
            </IconButton>
          </Typography>
        </Tooltip>
        <Button color="warning" size="small" onClick={() => goToday()}>
          {t('ncrm_common_today')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
