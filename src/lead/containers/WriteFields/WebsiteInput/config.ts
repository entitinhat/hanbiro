export const LABEL_VALUE_HOME = 'WEBSITE_LABEL_PERSONAL';
export const LABEL_VALUE_COMPANY = 'WEBSITE_LABEL_COMPANY';
export const LABEL_VALUE_CUSTOM_WEB = 'WEBSITE_LABEL_CUSTOM';
import { t } from 'i18next';

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
