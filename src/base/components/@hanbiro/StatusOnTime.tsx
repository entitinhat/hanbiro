import { styled } from '@mui/material';

const StatusOnTime = styled('div')({
  content: '""',
  width: '12px',
  height: '12px',
  borderRadius: '100%',
  boxShadow: '0 0 0 2px #fff',
  position: 'absolute',
  top: '8px',
  '::after': {
    backgroundColor: 'green'
  }
});
export default StatusOnTime;
