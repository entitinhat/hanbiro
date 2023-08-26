// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project imports
import HanAvatar from '@base/components/@hanbiro/HanAvatar';

// ==============================|| DETAILS - FEEDBACK ||============================== //

interface ReviewProps {
  avatar: string;
  date: string;
  name: string;
  review: string;
}

const Feedback = ({ avatar, date, name, review }: ReviewProps) => (
  <Grid item xs={12}>
    <Stack direction="row" spacing={1}>
      <HanAvatar key={name} name={name} size="xs" />
      <Stack spacing={2}>
        <Stack>
          <Typography variant="subtitle1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {date}
          </Typography>
        </Stack>
        <Typography variant="body2">{review}</Typography>
      </Stack>
    </Stack>
  </Grid>
);

export default Feedback;
