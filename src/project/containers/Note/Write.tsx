import { useState } from 'react';

import EditorBlock from '@base/components/@hanbiro/EditorBlock';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { OutputData } from '@editorjs/editorjs';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NoteWriteProps {}

function NoteWrite({}: NoteWriteProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [data, setData] = useState<OutputData>();

  return (
    <Stack spacing={1} sx={{ p: 1 }}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography>{t('ncrm_project_category')}</Typography>
        <SelectBox sx={{ width: 150 }} onChange={() => console.log('kkk')} options={[]} value={{ keyName: '', languageKey: '' }} />
      </Stack>
      <Stack spacing={1}>
        <Typography>{t('ncrm_project_note')}</Typography>
        <Box sx={{ p: 1, border: '1px solid', borderColor: theme.palette.divider }}>
          <EditorBlock value={data} onChange={() => console.log('ddd')} holder="note-editor-container" />
        </Box>
      </Stack>
    </Stack>
  );
}

export default NoteWrite;
