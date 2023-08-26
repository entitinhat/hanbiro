// import components
import DragDropFiles from '../DragDropFiles';
import { InputLabel, TextField, Typography, useTheme, Stack } from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';

const YourLogo: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack spacing={1}>
      <InputLabel sx={{ display: 'flex', alignItems: 'center', color: theme.palette.secondary.main, overflow: 'visible' }}>
        <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Your Logo'} />
      </InputLabel>
      <DragDropFiles />
      <Typography className="text" style={{ marginTop: '10px' }}>
        This logo will appear on the many documents.
      </Typography>
    </Stack>
  );
};

export default YourLogo;
