import { Box, LinearProgress, Stack, Typography } from '@mui/material';

interface ProgressProps {
  star?: number;
  starPosition?: 'start' | 'end' | undefined;
  value: number;
  textColor?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
}

// progress
export default function LinearProgressWithLabel({ star, starPosition = 'start', color, textColor, value, ...others }: ProgressProps) {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        {star && starPosition === 'start' && (
          <Stack sx={{ minWidth: '30px' }}>
            <Typography variant="h6" color={textColor} textAlign="right">{`${Math.round(star)}`}</Typography>
          </Stack>
        )}
        <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
          <LinearProgress
            value={value}
            variant="determinate"
            color={color}
            {...others}
            sx={{ height: '26px', width: '100%', bgcolor: 'secondary.lighter', borderRadius: '5px' }}
          />
          <Box
            sx={{
              top: 0,
              left: Math.round(value / 2),
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center'
              //justifyContent: 'center'
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {`${Math.round(value)}%`}
            </Typography>
          </Box>
        </Box>
        {star && starPosition === 'end' && (
          <Stack sx={{ minWidth: '30px' }}>
            <Typography variant="h6" color={textColor} textAlign="right">{`${Math.round(star)}`}</Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
}
