import MainCard from '@base/components/App/MainCard';
import { Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
interface ToolBarProps {
  center?: boolean;
  title: string | ReactNode;
}
function ToolBar(props: ToolBarProps) {
  const { title = '  Vora Works Sign-up', center = false } = props;
  const theme = useTheme();
  return (
    <MainCard
      border={false}
      sx={{
        background: theme.palette.background.paper,
        display: 'flex',
        justifyContent: center ? 'center' : 'flex-start',
        p: 0,
        '& .MuiCardContent-root': {
          py: 0
        }
      }}
    >
      <Typography variant="h3" component="div" sx={{ p: 0 }} color="primary">
        {title}
      </Typography>
    </MainCard>
  );
}
export default ToolBar;
