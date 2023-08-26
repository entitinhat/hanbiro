// import DiagramContainer from '@process/containers/Diagram/DiagramFlow2';
import { Box, styled } from '@mui/material';
import DiagramFlow from '@process/containers/Diagram/DiagramFlow';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
}
const SimpleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  padding: '24px',
  position: 'relative',
  height: '100%'
}));

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId } = props;

  return (
    <SimpleContainer>
      {/* <DiagramContainer /> */}
      <DiagramFlow />
    </SimpleContainer>
  );
};

export default Center;
