import { LabelValue } from '@base/types/app';
import { days, defaultReDay } from './configs';

export const daysInMonth = (month: number) => {
  const maxDay = new Date(new Date().getFullYear(), month, 0).getDate();
  return createArrayDayInMonth(maxDay);
};

export const weeksCount = function (year: number, monthNumber: number) {
  const firstOfMonth = new Date(year, monthNumber - 1, 1);
  let day = firstOfMonth.getDay() || 6;
  day = day === 1 ? 0 : day;
  if (day) {
    day--;
  }
  let diff = 7 - day;
  const lastOfMonth = new Date(year, monthNumber, 0);
  const lastDate = lastOfMonth.getDate();
  if (lastOfMonth.getDay() === 1) {
    diff--;
  }
  const result = Math.ceil((lastDate - diff) / 7);
  return result + 1;
};

export const getWeekOfMonth = (date = new Date()) => {
  const month_number = date.getMonth() + 1;
  const year = date.getFullYear();
  return createArrayDayInMonth(weeksCount(year, month_number));
};

export const createArrayDayInMonth = (maxDay: number) => {
  return Array.from({ length: maxDay }, (_, i) => ({
    value: i + 1,
    label: String(i + 1)
  }));
};

export const getStrToReDays = (str = defaultReDay) => {
  return days.map((x, index) => {
    return {
      ...x,
      extra: str.charAt(index) === 'y'
    };
  });
};

export const getReDaysToStr = (arr: LabelValue[] = []) => {
  if (arr.length === 0) {
    return defaultReDay;
  }
  const rs: string[] = [];
  arr.forEach((_x: LabelValue) => rs.push(_x.extra ? 'y' : 'n'));
  return rs.join('');
};
