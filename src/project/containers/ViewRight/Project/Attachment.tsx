import Attachments from '@base/containers/Attachments';
import { DownloadSharp } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';

interface AttachmentProps {}

function Attachment({}: AttachmentProps) {
  const theme = useTheme();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Attachment
        </Typography>
        <Button size="small" variant="outlined" startIcon={<DownloadSharp sx={{ fontSize: 18 }} />}>
          Download All
        </Button>
      </Stack>
      <Divider />
      <Stack spacing={1} sx={{ width: '100%', m: 0, p: 1 }}>
        <Attachments menuSource="1" menuSourceId="2" listType="list" />
      </Stack>
    </Box>
  );
}

export default Attachment;
