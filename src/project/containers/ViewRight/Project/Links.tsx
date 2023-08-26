import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { Add } from '@mui/icons-material';
import {
    Box, Divider, IconButton, List, ListItem, ListItemText, Stack, Typography, useTheme
} from '@mui/material';

interface LinksProps {}

function Links({}: LinksProps) {
  const theme = useTheme();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Links
        </Typography>
        <IconButton size="small" color="primary">
          <Add />
        </IconButton>
      </Stack>
      <Divider />
      <Stack spacing={1} sx={{ width: '100%', m: 0, p: 1 }}>
        <List>
          <ListItem sx={{ py: 0.5, px: 1 }} secondaryAction={<HanAvatar size="xs" name="DH Kim" />}>
            <ListItemText primary="This is invoice Link" />
          </ListItem>
          <ListItem sx={{ py: 0.5, px: 1 }} secondaryAction={<HanAvatar size="xs" name="DH Kim" />}>
            <ListItemText primary="This is project Link" />
          </ListItem>
          <ListItem sx={{ py: 0.5, px: 1 }} secondaryAction={<HanAvatar size="xs" name="DH Kim" />}>
            <ListItemText primary="This is other Link" />
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
}

export default Links;
