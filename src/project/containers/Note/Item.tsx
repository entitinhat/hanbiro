import Dropdown from '@base/components/@hanbiro/Dropdown';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { MoreHorizRounded } from '@mui/icons-material';
import { Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NoteItemProps {}

function NoteItem({}: NoteItemProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const dropdownItems = [
    { label: t('ncrm_common_btn_edit'), value: 'edit' },
    { label: t('ncrm_common_btn_delete'), value: 'delete' }
  ];

  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
        <Typography>{t('ncrm_project_feedback')}</Typography>
        <Dropdown size="small" icon={<MoreHorizRounded sx={{ fontSize: 18 }} />} items={dropdownItems} minWidth={120} />
      </Stack>
      <Typography>This is a note content for feedback content</Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <HanAvatar
          name={'DH Kim'}
          size="xs"
          // photo={}
        />
        <Typography variant="body1">2022-12-25 12:30</Typography>
      </Stack>
    </Stack>
  );
}

export default NoteItem;
