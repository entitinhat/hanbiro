import React, { useState } from 'react';
import dayjs from 'dayjs';
import Calendar, {ACTION_EVENT_CLICK} from "./Calendar";
import List from "./List";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {Box, Divider, Grid} from "@mui/material";

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const ActivityTodo = (props: ChartComponentProps) => {
  const [calendarArgs, setCalendarArgs] = useState<any>(null);

  const handleOnCalendarChange = (action: string, data: any) => {
    let start: any, end: any;

    if (action === ACTION_EVENT_CLICK) {
      const { event } = data;
      if (event?.start) {
        const startDayJs = dayjs(event.start).utc().startOf('day');
        start = startDayJs;
        if (event?.allDay) {
          end = startDayJs.endOf('day');
        }
      }
      if (event?.end) {
        end = dayjs(event.end).utc().endOf('day');
      }
    } else {
      const renderedDate = dayjs(data).utc();
      start = renderedDate.startOf('month');
      end = renderedDate.endOf('month');
    }

    setCalendarArgs({
      data: { start: start?.toDate() ?? null, end: end?.toDate() ?? null },
    });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Box p={2}>
          <Calendar onChange={handleOnCalendarChange} me />
        </Box>
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Grid item xs>
        <Box p={2}>
          <List args={calendarArgs} me />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ActivityTodo;
