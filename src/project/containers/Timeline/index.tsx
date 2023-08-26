import { useTimelinesLimit } from '@base/hooks/timeline/useTimelines';
import { TrendingFlat } from '@mui/icons-material';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineSeparator } from '@mui/lab';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { queryKeys } from '@base/config/queryKeys';

interface TimelineProps {}

function TimelineContainer({}: TimelineProps) {
  const theme = useTheme();

  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0
          }
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="error" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Stack spacing={1}>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Typography color="primary">Phoung Dofu(Manager)</Typography>
                <Typography>added a note</Typography>
              </Stack>
              <Box sx={{ p: 1, border: '1px solid', borderColor: theme.palette.divider, borderRadius: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Box>
              <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
                <Chip size="small" variant="combined" color="primary" label="Note" />
                <Typography color="textSecondary" textAlign="right">
                  2022-12-20 12:30
                </Typography>
              </Stack>
            </Stack>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Stack spacing={1}>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Typography color="primary">Phoung Dofu(Manager)</Typography>
                <Typography>added assigned reps</Typography>
              </Stack>
              <Box sx={{ p: 1, border: '1px solid', borderColor: theme.palette.divider, borderRadius: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-around">
                  <Typography>PE</Typography>
                  <Stack spacing={1} textAlign="right">
                    <Typography>SGPark (Manager)</Typography>
                    <Typography color="textSecondary">Backend</Typography>
                    <Typography>Thien (Staff)</Typography>
                    <Typography color="textSecondary">Frontend</Typography>
                  </Stack>
                </Stack>
              </Box>
              <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
                <Chip size="small" variant="combined" color="info" label="Assigned" />
                <Typography color="textSecondary" textAlign="right">
                  2022-12-20 12:30
                </Typography>
              </Stack>
            </Stack>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Stack spacing={1}>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Typography color="primary">Phoung Dofu(Manager)</Typography>
                <Typography>updated status</Typography>
              </Stack>
              <Box sx={{ p: 1, border: '1px solid', borderColor: theme.palette.divider, borderRadius: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-around">
                  <Typography>Todo</Typography>
                  <TrendingFlat />
                  <Typography>Progress</Typography>
                </Stack>
              </Box>
              <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
                <Chip size="small" variant="combined" color="info" label="status" />
                <Typography color="textSecondary" textAlign="right">
                  2022-12-20 12:30
                </Typography>
              </Stack>
            </Stack>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Stack spacing={1}>
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Typography color="primary">Phoung Dofu(Manager)</Typography>
                <Typography>updated progress</Typography>
              </Stack>
              <Box sx={{ p: 1, border: '1px solid', borderColor: theme.palette.divider, borderRadius: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-around">
                  <Typography>50%</Typography>
                  <TrendingFlat />
                  <Typography>100%</Typography>
                </Stack>
              </Box>
              <Stack spacing={0} direction="row" alignItems="center" justifyContent="space-between">
                <Chip size="small" variant="combined" color="warning" label="progress" />
                <Typography color="textSecondary" textAlign="right">
                  2022-12-20 12:30
                </Typography>
              </Stack>
            </Stack>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Stack>
  );
}

export default TimelineContainer;
