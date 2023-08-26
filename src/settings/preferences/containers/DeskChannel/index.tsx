import { Box } from '@mui/material';
import Toolbar from './Toolbar';
import ChannelTable from './ChannelTable';

const containStyle = {
  height: 'calc(100vh - 174px)'
};

function DeskChannel() {
  return (
    <Box sx={containStyle} className="scroll-box">
      <Box sx={{ padding: '20px' }}>
        <ChannelTable />
      </Box>
    </Box>
  );
}

export default DeskChannel;
