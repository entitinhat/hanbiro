import { StatusFields } from '@activity/config/constants';
import { ActivityStatus } from '@activity/types/type';
import useDevice from '@base/hooks/useDevice';
import { Theme, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const TaskStage = styled('ul')(({ theme }) => ({
  listStyleType: 'none',
  marginBottom: '1.25rem',
  padding: 0,
  display: 'flex',
  justifyContent: 'center'
}));

const TaskStageItem = styled('li')(({ theme, md }: { theme: Theme; md: boolean }) => ({
  position: 'relative',
  display: 'inline-block',
  padding: md ? 8 : '0.5rem 1.2rem',
  backgroundColor: `${theme.palette.grey[200]}`,
  textIndent: '12px',
  color: `${theme.palette.text.secondary}`,
  '&::before': {
    content: '""',
    height: 0,
    position: 'absolute',
    left: 0,
    top: '50%',
    width: 0,
    marginTop: '-20px',
    borderBottom: '20px solid transparent',
    borderLeft: `12px solid ${theme.palette.grey[200]}`,
    borderTop: '20px solid transparent'
  },
  '&::after': {
    content: '""',
    height: 0,
    position: 'absolute',
    left: '100%',
    top: '50%',
    width: 0,
    marginTop: '-20px',
    borderBottom: '20px solid transparent',
    borderLeft: `12px solid ${theme.palette.grey[200]}`,
    borderTop: ' 20px solid transparent',
    zIndex: 1
  },
  '&:nth-of-type(1)': {
    marginLeft: 0,
    textIndent: 0,
    borderRadius: md ? '4px 0 0 4px' : '999px 0 0 999px',
    '&::before': {
      content: 'none'
    }
  },
  '&:nth-last-of-type(1)': {
    borderRadius: md ? '0 4px 4px 0' : '0 999px 999px 0',
    '&::after': {
      content: 'none'
    }
  },
  '&.done': {
    backgroundColor: `${theme.palette.success.main}`,
    color: `${theme.palette.common.white}`,
    '&::after': {
      borderLeftColor: `${theme.palette.success.main}`
    }
  },
  '&.current': {
    backgroundColor: `${theme.palette.primary.main}`,
    color: `${theme.palette.common.white}`,
    fontWeight: `${theme.typography.fontWeightBold}`,
    '&::after': {
      borderLeftColor: `${theme.palette.primary.main}`
    }
  }
}));

interface StatusBardProps {
  value: ActivityStatus | undefined;
}

const StatusBar = (props: StatusBardProps) => {
  const { value: status } = props;
  const statuses = StatusFields({
    todo: 'ncrm_activity_todo',
    doing: 'ncrm_activity_doing',
    hold: 'ncrm_activity_on_hold',
    done: 'ncrm_activity_done',
    cancel: 'ncrm_activity_cancel'
  });
  let done = true;
  const theme = useTheme();
  const { t } = useTranslation();
  // const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { isMobile: matchDownMd, isDesktop } = useDevice();

  return (
    <>
      <TaskStage>
        {statuses.map((o) => {
          const matched = o.value == status;
          if (matched) done = false;
          const classNames = [];
          if (done) classNames.push('done');
          if (matched) classNames.push('current');
          return (
            <TaskStageItem theme={theme} md={matchDownMd} key={o.value} className={classNames.join(' ')}>
              {t(o.label)}
            </TaskStageItem>
          );
        })}
      </TaskStage>
    </>
  );
};

export default StatusBar;
