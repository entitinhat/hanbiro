import { Button, Color, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses, CircularProgressProps } from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Icon from '@base/assets/icons/svg-icons';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const FacebookCircularProgress = (props: CircularProgressProps) => {
  return (
    <Box sx={{ pb: 2, position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
};

const LinearProgressWithLabel = (props: any) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

interface LinearWithValueLabelProps {
  progress?: number;
}

const LinearWithValueLabel = (props: LinearWithValueLabelProps) => {
  const { progress } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

interface CustomizedProgressBarsProps {
  type?: string;
  label?: string;
  progress?: number;
  onClick?: () => void;
}

const CustomizedProgressBars = (props: CustomizedProgressBarsProps) => {
  const { type = 'export', label, progress = 0, onClick } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let delayProgress: any;
    if (progress >= 100) {
      setIsLoading(false);
    }

    return () => clearTimeout(delayProgress);
  }, [progress]);

  return (
    <Stack direction="column" alignItems="center" height="100%">
      {!isLoading ? (
        <>
          <CheckCircleIcon color="success" fontSize="large" />
          <Typography sx={{ py: 3, fontSize: '24px' }}>
            {type === 'export' ? 'Export File Successfully!' : 'Import File Successfully!'}
          </Typography>

          {type === 'export' && (
            <Button size="small" onClick={() => onClick && onClick()} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography color="primary">{Icon('download')}</Typography>
              <Typography color="primary">Download file export</Typography>
            </Button>
          )}
        </>
      ) : (
        <>
          <FacebookCircularProgress />
          <Typography color="primary" sx={{ py: 3, fontSize: '24px' }}>
            {label}
          </Typography>
          <LinearWithValueLabel progress={progress} />
        </>
      )}
    </Stack>
  );
};

export default CustomizedProgressBars;
