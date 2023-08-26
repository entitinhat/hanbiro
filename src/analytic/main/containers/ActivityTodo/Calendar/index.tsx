import styled from "@emotion/styled";
import React, {useRef, useState} from "react";
import FullCalendar, {EventClickArg} from "@fullcalendar/react";
import dayjs from "dayjs";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "./Header";
import {useGetActivityTodoCounting} from "@analytic/main/hooks/useGetActivityTodoCounting";
import {assignToMe} from "@analytic/main/config/defaultQueryString";
import {makeDateQueryStr} from "@analytic/main/utils/query";
import {thisMonthDayJs} from "@analytic/main/utils/date";
import {Stack, Tooltip, Typography} from "@mui/material";
import BaseCalendarStyled from "@base/containers/Calendar/CalendarStyled";
import {DeveloperBoard} from "@mui/icons-material";

export const ACTION_EVENT_CLICK = 'ACTION_EVENT_CLICK';

const CalendarStyled = styled(BaseCalendarStyled)(({theme}) => ({
  padding: 0,
  '& .fc .fc-day': {
    cursor: 'default!important',
    '&.fc-day-sat, &.fc-day-sat .fc-col-header-cell-cushion': {
      color: 'rgb(255, 64, 64)'
    }
  },
  '.fc-event.fc-event-custom': {
    width: '80%',
    margin: '0 auto !important',
    backgroundColor: `${theme.palette.magenta.main}!important`,
    cursor: 'pointer'
  }
}));

interface CalendarProps {
  me?: boolean;
  onChange?: (action: string, data: any) => void;
}

const Calendar = (props: CalendarProps) => {
  const {onChange, me = false} = props;

  const calRef = useRef(null);

  const defaultQueries = me ? [assignToMe] : [];

  const [filters, setFilters] = useState<any>({
    filter: {
      query: [
        ...defaultQueries,
        makeDateQueryStr('date', thisMonthDayJs, thisMonthDayJs.endOf('month')),
      ].join(' ')
    },
  });

  const setQuery = (query: string) => {
    let newQueries = [...defaultQueries, query];
    setFilters({
      ...filters,
      filter: {
        ...filters.filter,
        query: newQueries.join(' '),
      },
    });
  };

  const {data, isLoading, isFetching} = useGetActivityTodoCounting(filters);

  const {results = []} = data ?? {};

  const handleEventClick = (args: EventClickArg) => {
    onChange && onChange(ACTION_EVENT_CLICK, args);
  };

  const handleHeaderOnChange = (v: any, k: string) => {
    onChange && onChange(k, v);

    const renderedDate = dayjs(v).utc();
    const start = renderedDate.startOf('month');
    const end = renderedDate.endOf('month');
    setQuery(makeDateQueryStr('date', start, end));
  };

  return (
    <>
      <Header calRef={calRef} onChange={handleHeaderOnChange}/>
      <CalendarStyled>
        <FullCalendar
          ref={calRef}
          eventClick={handleEventClick}
          plugins={[dayGridPlugin]}
          timeZone={'UTC'}
          initialView="dayGridMonth"
          headerToolbar={false}
          eventContent={(args) => {
            return (
              <Tooltip title={args?.event?.title + ' Todo(s)'}>
                <Typography component="span">
                  <Stack direction="row" justifyContent="center">
                    <Typography variant="subtitle1">{args?.event?.title}</Typography>
                    <DeveloperBoard fontSize="small" sx={{width: '14px'}}/>
                  </Stack>
                </Typography>
              </Tooltip>
            );
          }}
          events={
            !!results.length
              ? results.reduce((final: any[], v: any) => {
                if (v?.counting?.total) {
                  final.push({
                    title: v?.counting?.total ?? 0,
                    date: v?.value ?? '-',
                    classNames: ['fc-event-custom'],
                  });
                }
                return final;
              }, [])
              : []
          }
        />
      </CalendarStyled>
    </>
  );
};

export default Calendar;