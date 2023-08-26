import { AddRounded } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import NoteItem from '@project/containers/Note/Item';
import NoteWrite from '@project/containers/Note/Write';
import { useTranslation } from 'react-i18next';

interface NoteProps {}

function Note({}: NoteProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [showWrite, setShowWrite] = useState(false);

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('ncrm_project_note')}
        </Typography>
        <IconButton size="small" onClick={() => setShowWrite(true)}>
          <AddRounded sx={{ color: 'primary.main', fontSize: 18 }} />
        </IconButton>
      </Stack>
      <Divider />
      <NoteItem />
      <Divider />
      {showWrite && <NoteWrite />}
    </Box>
  );
}

export default Note;
