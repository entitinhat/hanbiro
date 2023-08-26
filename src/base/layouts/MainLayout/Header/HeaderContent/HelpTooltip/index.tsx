import { Box, IconButton, Tooltip } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { HelpOutlineOutlined } from '@mui/icons-material';
import { headerFontColor } from '@base/config/config';

const HelpTooltip = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexShrink: 0 }}>
      <Tooltip title="Tooltip">
        <IconButton
          sx={{
            borderRadius: '50%',
            color: 'grey.400',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.15) : alpha(theme.palette.primary.light, 0.15)
            }
          }}
          aria-label="tooltip"
        >
          <HelpOutlineOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default HelpTooltip;
