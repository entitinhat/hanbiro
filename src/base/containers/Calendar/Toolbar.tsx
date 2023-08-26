import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import IconButton from '@base/components/@extended/IconButton';
import { Button, ButtonGroup, GridProps, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const viewOptions = [
  {
    label: 'ncrm_common_month',
    value: 'dayGridMonth'
  },
  {
    label: 'ncrm_common_week',
    value: 'timeGridWeek'
  },
  {
    label: 'ncrm_common_day',
    value: 'timeGridDay'
  }
];

// ==============================|| CALENDAR - TOOLBAR ||============================== //

export interface ToolbarProps {
  date: number | Date;
  view: string;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickToday: () => void;
  onChangeView: (s: string) => void;
  sx?: GridProps['sx'];
}

const Toolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, sx, ...others }: ToolbarProps) => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const [viewFilter, setViewFilter] = useState(viewOptions);

  useEffect(() => {
    if (matchDownSM) {
      const filter = viewOptions.filter((item) => item.value !== 'dayGridMonth' && item.value !== 'timeGridWeek');
      setViewFilter(filter);
    } else {
      setViewFilter(viewOptions);
    }
  }, [matchDownSM]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={matchDownSM ? 1 : 3} {...others} sx={{ mb: 2 }}>
      <Button variant="outlined" onClick={onClickToday} size="small">
        {t('ncrm_common_today')}
      </Button>
      <Stack direction="row" alignItems="center" spacing={matchDownSM ? 1 : 3}>
        <IconButton onClick={onClickPrev} size="small">
          <LeftOutlined />
        </IconButton>
        <Typography variant={matchDownSM ? 'h5' : 'h3'} color="textPrimary">
          {format(date, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={onClickNext} size="small">
          <RightOutlined />
        </IconButton>
      </Stack>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {viewFilter.map((viewOption) => {
          return (
            <Tooltip title={viewOption.label} key={viewOption.value}>
              <Button
                size="small"
                disableElevation
                variant={viewOption.value === view ? 'contained' : 'outlined'}
                onClick={() => onChangeView(viewOption.value)}
              >
                {t(viewOption.label)}
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </Stack>
  );
};

export default Toolbar;
