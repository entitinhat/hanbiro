import { t } from 'i18next';

export const LABEL_VALUE_HOME = 'WEBSITE_LABEL_PERSONAL';
export const LABEL_VALUE_COMPANY = 'WEBSITE_LABEL_COMPANY';
export const LABEL_VALUE_CUSTOM_WEB = 'WEBSITE_LABEL_CUSTOM';

export const protocolOptions = [
  {
    value: 'http://',
    label: 'http://'
  },
  {
    value: 'https://',
    label: 'https://'
  }
];

export const WEBSITE_LABEL_OPTIONS = [
  {
    label: t(`ncrm_common_label_home`),
    value: LABEL_VALUE_HOME
  },
  {
    label: t(`ncrm_common_label_company`),
    value: LABEL_VALUE_COMPANY
  },
  {
    label: t(`ncrm_common_label_custom`),
    value: LABEL_VALUE_CUSTOM_WEB
  }
];

//website protocol
export const WEBSITE_PROTOCOL_HTTP = 'PROTOCOL_HTTP';
export const WEBSITE_PROTOCOL_HTTPS = 'PROTOCOL_HTTPS';

export const WEBSITE_PROTOCOL_OPTIONS = [
  {
    label: 'http://',
    value: WEBSITE_PROTOCOL_HTTP
  },
  {
    label: 'https://',
    value: WEBSITE_PROTOCOL_HTTPS
  }
];
