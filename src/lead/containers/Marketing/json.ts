export interface TableHeaders {
  value: string;
  label: string;
}
export interface TableFields {
  [x: string]: any;
}

export const LastTouchHeaders: TableHeaders[] = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'source', label: 'Source' },
  { value: 'activity', label: 'Activity' },
  { value: 'behavior', label: 'Behavior' }
];

export const LastTouchFields: TableFields[] = [
  {
    id: '01',
    createdAt: '2020-04-01',
    source: 'Campaign',
    activity: 'Email',
    behavior: 'Open'
  },
  {
    id: '02',
    createdAt: '2020-04-01',
    source: 'Campaign',
    activity: 'Email',
    behavior: 'Open'
  }
];

