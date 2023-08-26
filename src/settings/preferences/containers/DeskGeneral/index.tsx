import { Box, useMediaQuery, useTheme } from '@mui/material';
import AutoCloseTicket from './AutoCloseTicket';
import DeskHours from './DeskHours';
import PrioritySetting from './PrioritySetting';

import TicketClassification from './TicketClassification';

const DeskGeneral = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const width = matches ? '50%' : '100%';

  return (
    <>
      <Box sx={{ p: 2, height: 'calc(100vh-156px)' }} className="scroll-box">
        <Box sx={{ mx: '-5px', display: 'flex', flexWrap: 'wrap' }}>
          <Box sx={{ px: 1, flex: '0 0 ' + width, maxWidth: width }}>
            <DeskHours />
            <AutoCloseTicket />
          </Box>

          <Box sx={{ px: 1, flex: '0 0 ' + width, maxWidth: width }}>
            <PrioritySetting />
            <TicketClassification />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DeskGeneral;
