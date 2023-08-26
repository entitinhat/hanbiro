import { Box, IconButton, Tooltip } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { AddOutlined } from '@mui/icons-material';

const QuickAdd = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexShrink: 0 }}>
      <Tooltip title="Quick Add">
        <IconButton
          sx={{
            borderRadius: '50%',
            color: 'common.white',
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
          aria-label="tooltip"
        >
          <AddOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default QuickAdd;
