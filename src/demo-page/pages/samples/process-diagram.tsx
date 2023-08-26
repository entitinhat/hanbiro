import { ReactElement } from 'react';

// material-ui import
import { Box, styled } from '@mui/material';

import DiagramContainer from '@process/containers/Diagram/DiagramFlow2';

const SimpleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  padding: '24px',
  position: 'relative',
  height: '100%'
}));

// ==============================|| SAMPLE PAGE ||============================== //

const DiagramPage = (): ReactElement => {
  return (
    <SimpleContainer>
      <DiagramContainer />
    </SimpleContainer>
  );
};

export default DiagramPage;
