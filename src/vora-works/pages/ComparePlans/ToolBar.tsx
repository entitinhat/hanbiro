import { ListToolbar } from '@base/components/@hanbiro/List';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import { Typography, useTheme } from '@mui/material';
interface ToolBarProps {
  center?: boolean;
}
function ToolBar(props: ToolBarProps) {
  const { center = false } = props;
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
          p: 1
        }
      }}
    >
      <Typography
        sx={{
          marginBottom: 0,
          fontSize: '1rem',
          fontWeight: 400,
          textTransform: 'uppercase'
        }}
        component="h1"
      >
        <Typography variant="h3" component="div" sx={{ p: 0 }}>
          Compare plans
        </Typography>
      </Typography>
    </MainCard>
  );
}
export default ToolBar;
