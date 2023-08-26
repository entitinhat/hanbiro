import { ArrowForwardIos, CloseOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@mui/styles/styled';
import { Stack } from '@mui/system';
import toast from 'react-hot-toast';

const SnackbarContainer = styled(Box)(({ color, bgcolor }: { color: string; bgcolor: string }) => ({
  padding: '8px 12px',
  minWidth: '200px',
  maxWidth: '400px',
  borderRadius: '4px',
  background: bgcolor,
  color: color
}));

export default function useSnackBar() {
  const theme = useTheme();

  const enqueueDefaultBar = (message: string) => {
    toast.custom(
      (t) => (
        <SnackbarContainer color={theme.palette.common.white} bgcolor={theme.palette.success.main}>
          <DefaultSnackBar status={'Default'} message={message} id={t.id} />
        </SnackbarContainer>
      ),
      {
        duration: 3000,
        position: 'top-center'
      }
    );
  };

  const enqueueSuccessBar = (message: string) => {
    toast.custom(
      (t) => (
        <SnackbarContainer color={theme.palette.common.white} bgcolor={theme.palette.success.main}>
          <DefaultSnackBar status={'Success'} message={message} id={t.id} />
        </SnackbarContainer>
      ),
      {
        duration: 3000,
        position: 'top-right'
      }
    );
  };

  const enqueueErrorBar = (message: string) => {
    toast.custom(
      (t) => (
        <SnackbarContainer color={theme.palette.common.white} bgcolor={theme.palette.error.main}>
          <DefaultSnackBar status={'Error'} message={message} id={t.id} />
        </SnackbarContainer>
      ),
      {
        duration: 3000
      }
    );
  };

  const enqueueWarningBar = (message: string) => {
    toast.custom(
      (t) => (
        <SnackbarContainer color={theme.palette.common.white} bgcolor={theme.palette.warning.main}>
          <DefaultSnackBar status={'Warning'} message={message} id={t.id} />
        </SnackbarContainer>
      ),
      {
        duration: 3000
      }
    );
  };

  const enqueueInfoBar = (message: string) => {
    toast.custom(
      (t) => (
        <SnackbarContainer color={theme.palette.common.white} bgcolor={theme.palette.info.main}>
          <DefaultSnackBar status={'Info'} message={message} id={t.id} />
        </SnackbarContainer>
      ),
      {
        duration: 3000,
        position: 'top-center'
      }
    );
  };
  const enqueuePushBar = (user: string, title: string, message: string) => {
    toast.custom(
      (t) => (
        <SnackbarContainer color={theme.palette.common.white} bgcolor={theme.palette.grey[500]}>
          <PushSnackBar user={user} title={title} message={message} id={t.id} />
        </SnackbarContainer>
      ),
      {
        duration: 3000,
        position: 'top-right'
      }
    );
  };

  const enqueueBarWithType = (message: string, type: 'default' | 'success' | 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'default': {
        enqueueDefaultBar(message);
        return;
      }
      case 'success': {
        enqueueSuccessBar(message);
        return;
      }
      case 'error': {
        enqueueErrorBar(message);
        return;
      }
      case 'warning': {
        enqueueWarningBar(message);
        return;
      }
      case 'info': {
        enqueueInfoBar(message);
        return;
      }
      default: {
        enqueueDefaultBar(message);
        return;
      }
    }
  };

  return {
    enqueueDefaultBar,
    enqueueSuccessBar,
    enqueueErrorBar,
    enqueueWarningBar,
    enqueueInfoBar,
    enqueuePushBar,
    enqueueBarWithType
  };
}

interface DefaultSnackBarProps {
  id: string;
  status: string;
  message: string;
}

const DefaultSnackBar = ({ id, status, message }: DefaultSnackBarProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyConent: 'flex-start', mr: '0.5rem' }}>
        {status !== 'Default' && (
          <Typography variant="subtitle1" sx={{ mr: '10px' }}>
            {status}
          </Typography>
        )}
        <Typography variant="body1">{message}</Typography>
      </Box>
      <IconButton sx={{ color: 'white' }} onClick={() => toast.dismiss(id)}>
        <CloseOutlined fontSize="small" />
      </IconButton>
    </Box>
  );
};

interface PushSnackBarProps {
  id: string;
  user: string;
  title: string;
  message: string;
}

const PushSnackBar = ({ id, user, title, message }: PushSnackBarProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyConent: 'flex-start', mr: '0.5rem' }}>
        <Avatar alt="Ted talk" src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
        <Stack sx={{ ml: '0.5rem' }}>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography sx={{ color: theme.palette.grey[100] }} variant="body1">
            {message}
          </Typography>
        </Stack>
      </Box>
      <IconButton sx={{ color: theme.palette.common.white }} onClick={() => toast.dismiss(id)}>
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
};
