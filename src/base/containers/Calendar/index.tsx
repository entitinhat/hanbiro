import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

// third-party
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/common';
import { Box, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';

import CalendarStyled from './CalendarStyled';
import Toolbar from './Toolbar';
import { useNavigate } from 'react-router-dom';
import { ACTIVITY_MENU_KEYS } from '@activity/config/constants';

export type calendarProps = {
  events: EventInput[];
  currentDate: string;
  setCurrentDate: (date: string) => void;
  ViewComponent?: any;
  onEventChange?: (selectedEvent: EventInput) => void;
};

function Calendar(props: calendarProps) {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { events, currentDate, setCurrentDate, ViewComponent, onEventChange } = props;
  const calendarRef = useRef<FullCalendar>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventInput>();
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const navigate = useNavigate();

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setCalendarView(newView);
    }
  }, [matchDownSM]);

  const handleDateToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setCurrentDate(calendarApi.getDate().toISOString());
    }
  };

  const handleViewChange = (newView: string) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setCalendarView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setCurrentDate(calendarApi.getDate().toISOString());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setCurrentDate(calendarApi.getDate().toISOString());
    }
  };

  const handleEventSelect = (arg: EventClickArg) => {
    console.log('>>>>>>>>> handleEventSelect', arg);
    arg.jsEvent.preventDefault();

    setSelectedEvent({
      ...arg.event.extendedProps,
      pageX: arg.jsEvent.pageX,
      pageY: arg.jsEvent.pageY
    });

    onEventChange &&
      onEventChange({
        ...arg.event.extendedProps,
        pageX: arg.jsEvent.pageX,
        pageY: arg.jsEvent.pageY
      });
  };

  const handleClose = () => {
    setSelectedEvent(undefined);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CalendarStyled>
        <Toolbar
          date={dayjs(currentDate).toDate()}
          view={calendarView}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
        />
        <FullCalendar
          weekends
          editable
          droppable
          selectable
          events={events}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={currentDate}
          initialView={calendarView}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          eventClick={handleEventSelect}
          height={matchDownSM ? 'auto' : 720}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyled>
      {selectedEvent && ViewComponent && <ViewComponent event={selectedEvent} onClose={handleClose} />}
    </Box>
  );
}

export default Calendar;
