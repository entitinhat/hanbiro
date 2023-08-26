import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Group } from '../../types/group';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { Typography } from '@mui/material';

export const columnRenderRemap = () => ({
  displayName(col: string, row: Group) {
    const theme = useTheme();
    const MAX_WORDS = 100;

    const name = row.displayName ?? '';
    const description = row.description ?? '';
    if (description.length > MAX_WORDS) return `${description.slice(0, MAX_WORDS)} ...`;

    return (
      <Box>
        <Typography color={theme.palette.primary.main}>{name}</Typography>
        {description}
      </Box>
    );
  },
  createdAt(col: string, row: Group) {
    let normalDate = new Date().toISOString();
    const seconds = row.createdAt?.seconds ?? 0;
    const nanos = row.createdAt?.nanos ?? 0;
    if (seconds) {
      normalDate = new Date(seconds * 1000).toISOString();
    } else {
      normalDate = new Date(nanos / Math.pow(10, 9)).toISOString();
    }

    return convertDateTimeServerToClient({ date: normalDate, humanize: true, isTime: true });
  }
});
