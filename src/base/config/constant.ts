import { LabelValue, LanguageValue } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { Paging } from '@base/types/response';
import { t } from 'i18next';

import * as keyNames from './keyNames';

export const COLORS = [
  {
    value: 'white'
  },
  {
    value: 'primary'
  },
  {
    value: 'secondary'
  },
  {
    value: 'success'
  },
  {
    value: 'warning'
  },
  {
    value: 'danger'
  },
  {
    value: 'info'
  },
  {
    value: 'indigo'
  },
  {
    value: 'purple'
  },
  {
    value: 'pink'
  },
  {
    value: 'teal'
  },
  {
    value: 'orange'
  },
  {
    value: 'gradient-1'
  },
  {
    value: 'gradient-2'
  },
  {
    value: 'gradient-3'
  }
];

export const ASC: number = 1;
export const DESC: number = 2;
export const LIST_TABLE_PAGE_SIZE = 10;
export const LIST_GRID_PAGE_SIZE = 20;
export const NOTE_PAGE_SIZE = 15;
export const TIMELINE_PAGE_SIZE = 15;
export const SET_TIMEOUT = 500;
export const LIST_STALE_TIME = 60 * 1000;
export const LIST_TABLE_PAGE_SIZE_IAM = 200;

export const COMMON_VIEW_FIELD_READ_ONLY = [
  keyNames.KEY_NAME_CREATED_AT,
  keyNames.KEY_NAME_CREATED_BY,
  keyNames.KEY_NAME_DELETED_AT,
  keyNames.KEY_NAME_DELETED_BY,
  keyNames.KEY_NAME_UPDATED_AT,
  keyNames.KEY_NAME_UPDATED_BY
];
export const DEVICE_DESKTOP = 'desktop';
export const DEVICE_TABLET = 'tablet';
export const DEVICE_PHONE = 'mobile';

export const PRIORITY_NONE = 'PRIORITY_NONE';
export const PRIORITY_VERY_LOW = 'PRIORITY_VERY_LOW';
export const PRIORITY_LOW = 'PRIORITY_LOW';
export const PRIORITY_MEDIUM = 'PRIORITY_MEDIUM';
export const PRIORITY_HIGH = 'PRIORITY_HIGH';
export const PRIORITY_URGENT = 'PRIORITY_URGENT';

export const PRIORITIES: OptionValue[] = [
  // {
  //   keyName: PRIORITY_VERY_LOW,
  //   languageKey: 'Very Low',
  // },
  {
    keyName: PRIORITY_URGENT,
    languageKey: 'Urgent'
  },

  {
    keyName: PRIORITY_HIGH,
    languageKey: 'High'
  },

  {
    keyName: PRIORITY_MEDIUM,
    languageKey: 'Medium'
  },
  {
    keyName: PRIORITY_LOW,
    languageKey: 'Low'
  }
];

export const SRC_NO_IMAGE = 'https://www.freeiconspng.com/uploads/no-image-icon-6.png';

export const MONTHS = [
  {
    value: 1,
    label: 'January'
  },
  {
    value: 2,
    label: 'February'
  },
  {
    value: 3,
    label: 'March'
  },
  {
    value: 4,
    label: 'April'
  },
  {
    value: 5,
    label: 'May'
  },
  {
    value: 6,
    label: 'June'
  },
  {
    value: 7,
    label: 'July'
  },
  {
    value: 8,
    label: 'August'
  },
  {
    value: 9,
    label: 'September'
  },
  {
    value: 10,
    label: 'October'
  },
  {
    value: 11,
    label: 'November'
  },
  {
    value: 12,
    label: 'December'
  }
];

export const WEEK_DAYS = [
  {
    value: 0,
    label: 'ncrm_common_mon'
  },
  {
    value: 1,
    label: 'ncrm_common_tue'
  },
  {
    value: 2,
    label: 'ncrm_common_wed'
  },
  {
    value: 3,
    label: 'ncrm_common_thu'
  },
  {
    value: 4,
    label: 'ncrm_common_fri'
  },
  {
    value: 5,
    label: 'ncrm_common_sat'
  },
  {
    value: 6,
    label: 'ncrm_common_sun'
  }
];

export const DateFilter: LabelValue[] = [
  {
    label: 'ncrm_common_dateby_today',
    value: 'today'
  },
  {
    label: 'ncrm_common_dateby_thisweek',
    value: 'week'
  },
  {
    label: 'ncrm_common_dateby_thismonth',
    value: 'month'
  },
  {
    label: 'ncrm_common_dateby_thisyear',
    value: 'year'
  },
  {
    label: 'ncrm_common_dateby_custom',
    value: 'custom'
  }
];

export const AssignedTo: LabelValue[] = [
  {
    label: 'ncrm_common_assigned_to_me',
    value: 'me'
  },
  {
    label: 'ncrm_common_assigned_to_team',
    value: 'team'
  },
  {
    label: 'ncrm_common_assigned_to_specific_user',
    value: 'user'
  }
];

export const TermOptions: OptionValue[] = [
  {
    keyName: 'TERM_MONTH',
    languageKey: 'Month'
  },

  {
    keyName: 'TERM_WEEK',
    languageKey: 'Week'
  },

  {
    keyName: 'TERM_DAY',
    languageKey: 'Day'
  },
  {
    keyName: 'TERM_HOUR',
    languageKey: 'Hour'
  }
];

interface IPriorityClass {
  [key: string]: string;
}

export const PRIORITIES_CLASS: IPriorityClass = {
  PRIORITY_NONE: 'none',
  PRIORITY_URGENT: 'urgent',
  PRIORITY_HIGH: 'high',
  PRIORITY_MEDIUM: 'medium',
  PRIORITY_LOW: 'low'
};

export const WHEN_OPTIONS: OptionValue[] = [
  { keyName: 'WHEN_BEFORE', languageKey: 'Before' },
  { keyName: 'WHEN_AFTER', languageKey: 'After' }
];

export const DATE_FORMATS = [
  { value: 'M/D/YYYY', label: 'M/D/YYYY' },
  { value: 'M/D/YY', label: 'M/D/YY' },
  { value: 'MM/DD/YY', label: 'MM/DD/YY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YY/MM/DD', label: 'YY/MM/DD' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  { value: 'DD-MMM-YY', label: 'DD-MMM-YY' }
];

export const TIME_FORMATS = [
  { value: 'h:mm ZZ', label: 'h:mm ZZ' },
  { value: 'hh:mm ZZ', label: 'hh:mm ZZ' },
  { value: 'H:mm', label: 'H:mm' },
  { value: 'HH:mm', label: 'HH:mm' }
];

export const DATE_SEPARATORS = [
  { value: '/', label: '/' },
  { value: '-', label: '-' },
  { value: '.', label: '.' }
];

export const IMAGE_SIZE_S = 's';
export const IMAGE_SIZE_M = 'm';
export const IMAGE_SIZE_L = 'l';
export const IMAGE_SIZE_XL = 'xl';

export const LABEL_VALUE_PRIMARY = 'LABEL_PRIMARY';
export const LABEL_VALUE_OTHER = 'LABEL_OTHER';
export const LABEL_VALUE_CUSTOM = 'LABEL_CUSTOM';
export const LABEL_VALUE_WORK = 'LABEL_WORK';
export const LABEL_VALUE_PERSONAL = 'LABEL_PERSONAL';

export const PERSONAL_LABEL_OPTIONS = [
  {
    label: `ncrm_common_label_primary`,
    value: LABEL_VALUE_PRIMARY
  },
  {
    label: 'ncrm_common_label_work',
    value: LABEL_VALUE_WORK
  },
  {
    label: `ncrm_common_label_personal`,
    value: LABEL_VALUE_PERSONAL
  },
  {
    label: `ncrm_common_label_custom`,
    value: LABEL_VALUE_CUSTOM
  }
];

export const LABEL_VALUE_BIRTHDAY = 'ANNIVERSARY_LABEL_BIRTHDAY';
export const LABEL_VALUE_WEDDING = 'ANNIVERSARY_LABEL_WEDDING';
export const LABEL_VALUE_CUSTOM_ANNI = 'ANNIVERSARY_LABEL_CUSTOM';

export const LABEL_VALUE_HOME = 'WEBSITE_LABEL_PERSONAL';
export const LABEL_VALUE_COMPANY = 'WEBSITE_LABEL_COMPANY';
export const LABEL_VALUE_CUSTOM_WEB = 'WEBSITE_LABEL_CUSTOM';

export const ANNIVERSARY_LABEL_OPTIONS = [
  {
    label: 'ncrm_common_birthday',
    value: LABEL_VALUE_BIRTHDAY
  },
  {
    label: 'ncrm_common_wedding',
    value: LABEL_VALUE_WEDDING
  },
  {
    label: 'ncrm_common_custom',
    value: LABEL_VALUE_CUSTOM_ANNI
  }
];

export const defaultPaging: Paging = {
  currentPage: 1,
  nextPage: null,
  previousPage: 0,
  totalItems: 0,
  totalPage: 1
};

export const WARRANTY_PERIOD_OPTIONS: LabelValue[] = [
  { value: 'd', label: 'day(s)' },
  { value: 'w', label: 'week(s)' },
  { value: 'm', label: 'month(s)' },
  { value: 'y', label: 'year(s)' }
];

export const WEIGHT_UNIT_OPTIONS: LabelValue[] = [
  { value: 'kg', label: 'kg' },
  { value: 'lb', label: 'lb' },
  { value: 'g', label: 'g' },
  { value: 'oz', label: 'oz' }
];

export const DIMENSION_UNIT_OPTIONS: LabelValue[] = [
  { value: 'cm', label: 'cm' },
  { value: 'in', label: 'in' }
];

export const LANGUAGES: LanguageValue[] = [
  { key: 'en', label: 'English', value: 'en', icon: 'gb' },
  { key: 'ko', label: '한국어', value: 'ko', icon: 'kr' },
  { key: 'vi', label: 'Tiếng Việt', value: 'vi', icon: 'vn' },
  { key: 'jp', label: '日本語', value: 'jp', icon: 'jp' },
  { key: 'zh', label: '中文', value: 'zh', icon: 'cn' },
  { key: 'ido', label: 'Indonesian', value: 'ido', icon: 'id' }
];

export const WRITE_FIELDS_MAX_LENGTH: { [key: string]: number } = {
  displayName: 32,
  fullName: 32,
  urlName: 63
};

export const RecordedBy: LabelValue[] = [
  {
    label: 'ncrm_common_filter_assigned_rep',
    value: 'rep'
  },
  {
    label: 'ncrm_common_filter_owner',
    value: 'owner'
  },
  {
    label: 'ncrm_common_filter_specific_user',
    value: 'user'
  },
  {
    label: 'ncrm_common_filter_auto',
    value: 'auto'
  }
];

export const RecordedType: LabelValue[] = [
  {
    label: 'ncrm_common_timeline_filter_action_created',
    value: 'created'
  },
  {
    label: 'ncrm_common_timeline_filter_action_updated',
    value: 'updated'
  },
  {
    label: 'ncrm_common_timeline_filter_action_used',
    value: 'used'
  },
  {
    label: 'ncrm_common_timeline_filter_action_deleted',
    value: 'deleted'
  }
];
