import { LabelValue, LabelValueData } from '@base/types/app';
import dayjs from 'dayjs';

export const SELECT_DATA: LabelValueData[] = [
  { value: 'all', label: 'All Data' },
  { value: 'custom', label: 'Specific Period', data: { start: dayjs(new Date()).format(), end: dayjs(new Date()).format() } }
];

export const FORMAT_FILE_OPTIONS: LabelValue[] = [
  { value: 'csv', label: 'CSV (comma Separated Value)' },
  { value: 'xls', label: 'XLS (Microsoft Excel 1997-2004 Compatible)' },
  { value: 'xlsx', label: 'XLSX (Microsoft Excel)' }
];
