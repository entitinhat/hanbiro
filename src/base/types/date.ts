import dayjs from "dayjs";

export interface RangeDayJs {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}

export interface RangeString {
  startDate: string;
  endDate: string;
}

export interface RangeDate {
  startDate: Date;
  endDate: Date;
}