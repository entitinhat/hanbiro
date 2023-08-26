import { StatusFields } from '@activity/config/constants';
import { useActivityUpdate } from '@activity/hooks/useActivityUpdate';
import { ActivityStatus } from '@activity/types/type';
import useDevice from '@base/hooks/useDevice';
import { Box, Theme, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
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
  menuSourceId: string;
  menuSource: string;
}

const StatusBar = (props: StatusBardProps) => {
  const { value: status, menuSource, menuSourceId } = props;
  //mutation
  const mutation = useActivityUpdate();
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
  const onChangeStatus = (value: string) => {
    const Params = {
      activity: {
        status: value,
        id: menuSourceId
      }
    };
    mutation(Params);
  };
  return (
    <Box sx={{ px: 6 }}>
      <ToggleButtonGroup
        exclusive={true}
        aria-label="Medium sizes"
        onChange={(ev: any) => {
          onChangeStatus(ev.target.value);
        }}
        size="small"
        color="secondary"
        value={status}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto auto auto',
          gridGap: '0px',
          padding: '0px',
          '& .MuiToggleButton-root': {
            border: 'none',
            fontSize: '14px',
            px: 0
          },
          backgroundColor: theme.palette.secondary.lighter,
          '& .MuiButtonBase-root.MuiToggleButton-root.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
          }
        }}
      >
        {statuses.map((o) => {
          return (
            <ToggleButton value={o.value} key={o.value} sx={{ padding: '.375rem .9375rem' }}>
              {t(o.label)}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};

export default StatusBar;
