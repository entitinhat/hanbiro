import { DownloadSharp, ListAltSharp, WindowSharp } from '@mui/icons-material';
import { Button, Divider, Stack, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import TimeAttachment from '@base/containers/Attachments/TimeAttachment';

interface FilesProps {}

function Files({}: FilesProps) {
  const theme = useTheme();
  const [view, setView] = useState('list');

  const handleView = useCallback((event: React.MouseEvent<HTMLElement>, value: any) => {
    setView(value);
  }, []);

  return (
    <Stack spacing={1} sx={{ p: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ToggleButtonGroup value={view} exclusive onChange={handleView}>
          <ToggleButton size="small" value="list" aria-label="list">
            <ListAltSharp sx={{ fontSize: 18 }} />
          </ToggleButton>
          <ToggleButton size="small" value="grid" aria-label="grid">
            <WindowSharp sx={{ fontSize: 18 }} />
          </ToggleButton>
        </ToggleButtonGroup>
        <Button size="small" variant="outlined" startIcon={<DownloadSharp sx={{ fontSize: 18 }} />}>
          Download All
        </Button>
      </Stack>
      <Divider />
      <TimeAttachment menuSource="1" menuSourceId="2" listType={view} />
    </Stack>
  );
}

export default Files;
