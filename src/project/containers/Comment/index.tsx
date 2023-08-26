import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { DeleteOutlineRounded, EditRounded, ReplyRounded } from '@mui/icons-material';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import IconButton from '../../../base/components/@extended/IconButton';

interface CommentProps {}

function Comment({}: CommentProps) {
  return (
    <Grid container spacing={3} sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
          <HanAvatar name={'DH Kim'} />
          <Stack spacing={2}>
            <Stack>
              <Stack spacing={5} direction="row" alignItems="center">
                <Typography
                  variant="subtitle1"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                >
                  Planning / Phuong Dofu (Manager)
                </Typography>
                <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
                  <IconButton size="small" color="success">
                    <EditRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <ReplyRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteOutlineRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Stack>
              <Typography variant="caption" color="textSecondary">
                2022-12-22 16:00
              </Typography>
            </Stack>
            <Typography variant="body1">I updated some information about dev task view</Typography>
          </Stack>
        </Stack>
        <Divider sx={{ py: 1 }} />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1} sx={{ ml: 3 }}>
          <HanAvatar name={'DH Kim'} />
          <Stack spacing={2}>
            <Stack>
              <Stack spacing={5} direction="row" alignItems="center">
                <Typography
                  variant="subtitle1"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                >
                  Planning / Phuong Dofu (Manager)
                </Typography>
                <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
                  <IconButton size="small" color="success">
                    <EditRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <ReplyRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteOutlineRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Stack>
              <Typography variant="caption" color="textSecondary">
                2022-12-22 16:00
              </Typography>
            </Stack>
            <Typography variant="body1">I updated some information about dev task view</Typography>
          </Stack>
        </Stack>
        <Divider sx={{ py: 1 }} />
      </Grid>
    </Grid>
  );
}

export default Comment;
