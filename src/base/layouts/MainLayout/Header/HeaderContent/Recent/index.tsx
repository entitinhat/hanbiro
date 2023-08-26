import { Box, IconButton, Tooltip } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { HistoryOutlined } from '@mui/icons-material';

const Recent = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexShrink: 0 }}>
      <Tooltip title="Recent">
        <IconButton
          sx={{
            borderRadius: '50%',
            color: 'common.white',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.15) : alpha(theme.palette.primary.light, 0.15)
            }
          }}
          aria-label="tooltip"
        >
          <HistoryOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Recent;
