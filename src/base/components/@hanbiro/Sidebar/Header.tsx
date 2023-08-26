import { CloseOutlined } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import SpanLang from '../SpanLang';

interface SidebarHeaderProps {
  title: string;
  onClose?: () => void;
}

const SidebarHeader = (props: SidebarHeaderProps) => {
  const { title, onClose } = props;

  return (
    <Stack spacing={0} sx={{ width: '100%' }}>
      <Stack sx={{ px: 2, py: 1, paddingTop: '9px' }} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">
          <SpanLang keyLang={title} textOnly />
        </Typography>
        <IconButton size="small" color="secondary" onClick={onClose}>
          <CloseOutlined fontSize="small" />
        </IconButton>
      </Stack>
      <Divider />
    </Stack>
  );
};

export default SidebarHeader;
