import React, { useState } from 'react';

//material
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@mui/lab';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const DEFAULT_INITIAL_DATA = () => {
  return {
    events: [
      {
        time: 'Time',
        description: 'Description'
      }
    ]
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '8px',
    backgroundColor: '#efefef'
  },
  timelinedot: {
    boxShadow: 'none',
    marginTop: '20px'
  },
  time: {
    flex: '0.2',
    padding: '8px',
    marginTop: '6px',
    textOverflow: 'ellipsis'
  },
  oppositeInButton: {
    flex: '0.14'
  },
  addButton: {
    boxShadow: 'none',
    paddingLeft: '14px',
    paddingRight: '14px'
  },
  description: {
    padding: '8px',
    maxWidth: '400px',
    textOverflow: 'ellipsis',
    display: 'flex',
    flexGrow: 1
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: '1.3rem'
  }
}));

const EventTimeline = (props: any) => {
  const { readOnly, onDataChange, data } = props;
  const classes = useStyles();
  const [timelineData, setTimelineData] = useState(data.events.length > 0 ? data : DEFAULT_INITIAL_DATA);
  //console.log('timeline data', data);

  const updateTimelineData = (newData: any) => {
    setTimelineData(newData);
    if (onDataChange) {
      // Inform editorjs about data change
      onDataChange(newData);
    }
  };

  const onAddEvent = (e: any) => {
    const newData = {
      ...timelineData
    };
    newData.events.push({
      time: 'Time',
      description: 'Description'
    });
    updateTimelineData(newData);
  };

  const onRemoveEvent = (index: number) => {
    const newData = {
      ...timelineData
    };
    newData.events.splice(index, 1);
    updateTimelineData(newData);
  };

  const onContentChange = (index: number, fieldName: string) => {
    return (e: any) => {
      const newData = {
        ...timelineData
      };
      newData.events[index][fieldName] = e.currentTarget.textContent;
      updateTimelineData(newData);
    };
  };

  //console.log('render timelineData', timelineData);
  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Timeline onResize={undefined} onResizeCapture={undefined}>
          {timelineData.events.map((event: any, index: number) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent className={classes.time}>
                <Typography
                  color="textSecondary"
                  onBlur={onContentChange(index, 'time')}
                  suppressContentEditableWarning={!readOnly}
                  contentEditable={!readOnly}
                >
                  {event.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot className={classes.timelinedot} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Stack direction={'row'}>
                  <Paper elevation={3} className={classes.description}>
                    <Typography
                      color="primary"
                      onBlur={onContentChange(index, 'description')}
                      suppressContentEditableWarning={!readOnly}
                      contentEditable={!readOnly}
                    >
                      {event.description}
                    </Typography>
                  </Paper>
                  <IconButton color="error" onClick={() => onRemoveEvent(index)}>
                    <RemoveOutlined />
                  </IconButton>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          ))}
          {!readOnly && (
            <TimelineItem>
              <TimelineOppositeContent className={classes.oppositeInButton} />
              <TimelineSeparator>
                <IconButton color="primary" onClick={onAddEvent} sx={{ mr: 0 }}>
                  <AddOutlined />
                </IconButton>
              </TimelineSeparator>
              <TimelineContent />
            </TimelineItem>
          )}
        </Timeline>
      </Box>
    </React.Fragment>
  );
};

export default EventTimeline;
