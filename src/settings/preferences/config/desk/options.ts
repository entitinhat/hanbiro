import { BusinessHours, WeekDays } from '@settings/preferences/types/desk/common';

export const BH_OPTIONS = [
  { value: BusinessHours.BH_247, label: '24/7' },
  { value: BusinessHours.BH_246, label: '24/6' },
  { value: BusinessHours.BH_245, label: '24/5' },
  { value: BusinessHours.BH_CUSTOM, label: 'ncrm_generalsetting_preferences_desk_custom' }
];

export const WD_OPTIONS = [
  { value: WeekDays.SUN, label: 'ncrm_generalsetting_sun' },
  { value: WeekDays.MON, label: 'ncrm_generalsetting_mon' },
  { value: WeekDays.TUE, label: 'ncrm_generalsetting_tue' },
  { value: WeekDays.WED, label: 'ncrm_generalsetting_wed' },
  { value: WeekDays.THU, label: 'ncrm_generalsetting_thursday' },
  { value: WeekDays.FRI, label: 'ncrm_generalsetting_fri' },
  { value: WeekDays.SAT, label: 'ncrm_generalsetting_sat' }
];

export const WD_SETTING_OPTIONS = {
  BH_247: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  BH_246: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  BH_245: ['mon', 'tue', 'wed', 'thu', 'fri'],
  BH_CUSTOM: ['mon', 'tue', 'wed', 'thu', 'fri']
};
