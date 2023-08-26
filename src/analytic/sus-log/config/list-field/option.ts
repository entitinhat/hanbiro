import { KEY_NAME_CREATED_AT, KEY_NAME_UPDATED_AT } from '@base/config/keyNames';

export const groupByOptions = [
  {label: 'All Logs', value: 'all'},
  {label: 'Email Logs', value: 'email'},
  {label: 'SMS Logs', value: 'sms'},
  {label: 'CTA Logs', value: 'cta'},
  {label: 'Campaign Logs', value: 'campaign'},
];

export const dateByOptions = [
  { label: 'Created', value: KEY_NAME_CREATED_AT },
  { label: 'Updated', value: KEY_NAME_UPDATED_AT }
];


