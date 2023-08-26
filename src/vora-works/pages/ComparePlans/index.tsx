import ToolBar from './ToolBar';
import { Box, useTheme } from '@mui/material';
import useDevice from '@base/hooks/useDevice';
import Pricing from './Pricing';
import { CenterLayout } from '@vora-works/pages/SignUp';

export default function ComparePlans() {
  const theme = useTheme();
  const { isMobile } = useDevice();

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, height: '100vh' }} className="scroll-box">
      <CenterLayout sx={{ maxWidth: isMobile ? '100%' : '80%' }}>
        {/* <ToolBar center={true} /> */}
        <Pricing />
      </CenterLayout>
    </Box>
  );
}
