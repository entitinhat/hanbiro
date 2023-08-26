import { styled } from '@mui/material';

const StatusOverdue = styled('div')({
  '&::after': {
    content: '""',
    width: '12px',
    height: '12px',
    borderRadius: '100%',
    boxShadow: '0 0 0 2px #fff',
    position: 'absolute',
    top: '8px'
  },
  ':after': {
    backgroundColor: 'red'
  }
});
export default StatusOverdue;
