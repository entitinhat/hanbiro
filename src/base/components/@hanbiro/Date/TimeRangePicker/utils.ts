import { setHours, setMinutes, setSeconds } from 'date-fns';

export function parseStrTimeToDate(value = '') {
  return new Date(`${new Date().toISOString().slice(0, 10)} ${value}`);
}

export function getItemMinMax(date: Date) {
  return {
    sec: date.getSeconds(),
    min: date.getMinutes(),
    hour: date.getHours(),
  };
}

export function getHour(second = 0, minutes = 0, hours = 0) {
  return setHours(setMinutes(setSeconds(new Date(), second), minutes), hours);
}

export function getMinMax(start: string, end: string) {
  let rs = {};
  if (start != '') {
    rs = {
      ...rs,
      minMaxEnd: {
        minTime: getItemMinMax(parseStrTimeToDate(start)),
        maxTime: null,
      },
    };
  } else {
    rs = {
      ...rs,
      minMaxEnd: {
        minTime: null,
        maxTime: null,
      },
    };
  }

  if (end != '') {
    rs = {
      ...rs,
      minMaxStart: {
        minTime: null,
        maxTime: getItemMinMax(parseStrTimeToDate(end)),
      },
    };
  } else {
    rs = {
      ...rs,
      minMaxStart: {
        minTime: null,
        maxTime: null,
      },
    };
  }
  return rs;
}
