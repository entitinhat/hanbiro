// https://github.com/mike182uk/timestring
/**
 * Default options to use when parsing a timestring
 */

interface TimeOption {
  hoursPerDay?: number,
  daysPerWeek?: number,
  weeksPerMonth?: number,
  monthsPerYear?: number,
  daysPerYear?: number
}

const DEFAULT_OPTS: TimeOption = {
  hoursPerDay: 24,
  daysPerWeek: 7,
  weeksPerMonth: 4,
  monthsPerYear: 12,
  daysPerYear: 365.25
};

/**
 * Map of accepted strings to unit
 */

const UNIT_MAP: Record<string, string[]> = {
  ms: ['ms', 'milli', 'millisecond', 'milliseconds'],
  s: ['s', 'sec', 'secs', 'second', 'seconds'],
  m: ['m', 'min', 'mins', 'minute', 'minutes'],
  h: ['h', 'hr', 'hrs', 'hour', 'hours'],
  d: ['d', 'day', 'days'],
  w: ['w', 'week', 'weeks'],
  mth: ['mon', 'mth', 'mths', 'month', 'months'],
  y: ['y', 'yr', 'yrs', 'year', 'years']
};

/**
 * Parse a timestring
 */

export function parseTimestring(str: string, returnUnit?: string, opts?: TimeOption) {
  opts = Object.assign({}, DEFAULT_OPTS, opts || {});

  let totalSeconds = 0;
  const unitValues = getUnitValues(opts);
  const groups = str
    .toLowerCase()
    .replace(/[^.\w+-]+/g, '')
    .match(/[-+]?[0-9.]+[a-z]+/g);

  if (groups === null) {
    return 0;
  }

  groups.forEach((group) => {
    const value = group.match(/[0-9.]+/g)!!;
    const unit = group.match(/[a-z]+/g)!!;

    totalSeconds += getSeconds(Number(value[0]), unit[0], unitValues);
  });

  if (returnUnit) {
    return convert(totalSeconds, returnUnit, unitValues);
  }

  return totalSeconds;
}

/**
 * Get unit values based on the passed options
 */

function getUnitValues(opts: any) {
  const unitValues: Record<string, number> = {
    ms: 0.001,
    s: 1,
    m: 60,
    h: 3600
  };

  unitValues.d = opts.hoursPerDay * unitValues.h;
  unitValues.w = opts.daysPerWeek * unitValues.d;
  unitValues.mth = (opts.daysPerYear / opts.monthsPerYear) * unitValues.d;
  unitValues.y = opts.daysPerYear * unitValues.d;

  return unitValues;
}

/**
 * Get the key for a unit
 */

function getUnitKey(unit: string) {
  for (const key of Object.keys(UNIT_MAP)) {
    if (UNIT_MAP[key].indexOf(unit) > -1) {
      return key;
    }
  }

  throw new Error(`The unit [${unit}] is not supported`);
}

/**
 *  Get the number of seconds for a value, based on the unit
 */

function getSeconds(value: number, unit: string, unitValues: Record<string, number>) {
  return value * unitValues[getUnitKey(unit)];
}

/**
 * Convert a value from its existing unit to a new unit
 */

function convert(value: number, unit: string, unitValues: Record<string, number>) {
  return value / unitValues[getUnitKey(unit)];
}
