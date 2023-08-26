import { useMemo } from 'react';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DrawerContent from './DrawerContent';

interface Props {
  open: boolean;
  window?: () => Window;
  handleDrawerToggle?: () => void;
}

const MainDrawer = ({ open, handleDrawerToggle, window }: Props) => {
  const theme = useTheme();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        anchor={'top'}
        ModalProps={{ keepMounted: true }}
        sx={{
          top: 48,
          '& .MuiBackdrop-root': { top: 48 },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            height: '100%',
            borderRight: 'none',
            backgroundImage: 'none',
            boxShadow: 'none',
            bgcolor: theme.palette.mode == 'dark' ? theme.palette.background.paper : theme.palette.header,
            top: 48
          }
        }}
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
};

export default MainDrawer;
