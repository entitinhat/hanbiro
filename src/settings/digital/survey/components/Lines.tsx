import { styled } from '@mui/material/styles';

export const PinkLine1 = styled('div')(({ bgcolor }: { bgcolor: string }) => ({
  color: 'rgba(255, 255, 255, 1)',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  height: '10px',
  left: '-1px',
  position: 'absolute',
  top: '-1px',
  width: 'calc(100% + 2px)',
  backgroundColor: bgcolor
}));

export const PinkLine2 = styled('div')(({ bgcolor }: { bgcolor: string }) => ({
  color: 'rgba(255, 255, 255, 1)',
  borderTopRightRadius: '8px',
  height: '10px',
  left: '-1px',
  position: 'absolute',
  top: '-1px',
  width: 'calc(100% + 2px)',
  backgroundColor: bgcolor
}));

export const VerticalLine = styled('div')(({ theme }) => ({
  display: 'flex',
  height: 'calc(100% + 3px)',
  left: '-1px',
  paddingRight: '6px',
  position: 'absolute',
  bottom: '-1px',
  width: '7px',
  borderTopLeftRadius: '8px',
  borderBottomLeftRadius: '8px',
  backgroundColor: theme.palette.primary.main
}));
