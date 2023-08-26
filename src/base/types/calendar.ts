// third-party
import { EventInput } from '@fullcalendar/common';

// ==============================|| CALENDAR TYPES  ||============================== //

export type DateRange = { start: number | Date; end: number | Date };
export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export type CalendarProps = {
  calendarView: CalendarView;
  error: boolean;
  events: EventInput[];
  isLoader: boolean;
  isModalOpen: boolean;
  selectedEventId: null | string;
  selectedRange: null | { start: Date; end: Date };
};

export type CalendarStructureProps = {
  name: string;
  initialState: CalendarProps;
  actions: {
    loading: Function;
    hasError: Function;
    setEvents: Function;
    createEvent: Function;
    selectEvent: Function;
    updateEvent: Function;
    deleteEvent: Function;
    selectRange: Function;
    toggleModal: Function;
    updateCalendarView: Function;
  };
};

export type CalendarEvent = {
  id: string;
  allDay: boolean;
  color: string;
  description: string;
  start: string;
  end: string;
  title: string;
};

export type Attribute = {
  required: boolean;
  showCreate: boolean;
  showUpdate: boolean;
};
export type Option = {
  key: string | number;
  languageKey: string;
};
export type Field = {
  keyName: string;
  defaultValue: string;
  dataType: string;
  componentType: string;
  options?: Option[];
  attributes: Attribute;
  languageKey: string;
};
