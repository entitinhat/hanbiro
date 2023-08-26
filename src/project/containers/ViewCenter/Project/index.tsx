import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { Grid, Stack, Typography, useTheme } from '@mui/material';

interface NoteProps {}

function Note({}: NoteProps) {
  const theme = useTheme();

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={6}>
        <Stack spacing={1} sx={{ p: 1, border: '1px solid', borderColor: theme.palette.divider, borderRadius: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="textSecondary">Category</Typography>
            <Typography>Feedback</Typography>
          </Stack>
          <Typography>This is a note content for feedback content</Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <HanAvatar
              name={'DH Kim'}
              size="xs"
              // photo={}
            />
            <Typography variant="caption">2022-12-25 12:30</Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={1} sx={{ p: 1, border: '1px solid', borderColor: theme.palette.divider, borderRadius: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="textSecondary">Category</Typography>
            <Typography>Feedback</Typography>
          </Stack>
          <Typography>This is a note content for feedback content</Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <HanAvatar
              name={'DH Kim'}
              size="xs"
              // photo={}
            />
            <Typography variant="caption">2022-12-25 12:30</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Note;
