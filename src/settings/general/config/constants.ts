import { NavItemType } from '@base/types/menu';

export const FIRST_WEEK_OF_YEARS = [
  {
    value: 1,
    label: 'ncrm_generalsetting_starts_on_Jan_1'
  },
  {
    value: 2,
    label: 'ncrm_generalsetting_first_4_day_week'
  },
  {
    value: 3,
    label: 'ncrm_generalsetting_first_full_week'
  }
];

export const DECIMAL_SYMBOL = [
  {
    value: '.',
    label: '.'
  },
  {
    value: ',',
    label: ','
  },
  {
    value: "'",
    label: "'"
  }
];
export const CURRENCY_FORMAT = [
  { value: '1,234,567.89', label: '1,234,567.89' },
  { value: '1.234.567,89', label: '1.234.567,89' },
  { value: '1 234 567,89', label: '1 234 567,89' }
];
export const NEGATIVE_CURRENCY_FORMAT = [
  { value: '-1,234,567.89', label: '-1,234,567.89' },
  { value: '-1.234.567,89', label: '-1.234.567,89' },
  { value: '-1 234 567,89', label: '-1 234 567,89' }
];

export const DIGIT_GROUPING_SYMBOLS = [
  {
    value: '.',
    label: '.'
  },
  {
    value: ',',
    label: ','
  },
  {
    value: "'",
    label: "'"
  }
];

export const DIGIT_GROUPS = [
  {
    value: '123456789',
    label: '123456789',
    alias: 'none'
  },
  {
    value: '123,456,789',
    label: '123,456,789',
    alias: 'thousand'
  },
  {
    value: '1,23456,789',
    label: '1,23456,789',
    alias: 'wan'
  },
  {
    value: '12,34,56,789',
    label: '12,34,56,789',
    alias: 'lakh'
  }
];

export const NEGATIVE_NUMBER_FORMATS = [
  {
    value: '1.1',
    label: '1.1'
  },
  {
    value: '-1.1',
    label: '-1.1'
  },
  {
    value: '- 1.1',
    label: '- 1.1'
  },
  {
    value: '1.1-',
    label: '1.1-'
  },
  {
    value: '1.1 -',
    label: '1.1 -'
  }
];

export const GENERAL_MENUS: NavItemType[] = [
  {
    id: 'general',
    title: 'ncrm_generalsetting_general',
    type: 'group',
    children: [
      {
        id: 'general-format-setting',
        title: 'ncrm_generalsetting_general_format_setting',
        license: 'admin_settings_general_format',
        type: 'item',
        url: '/settings/general/format-setting',
        icon: {
          icon: 'Settings',
          iconType: 'material',
          fontSize: 'small'
        }
      },
      // {
      //   id: 'general-selection-fields',
      //   title: 'ncrm_generalsetting_general_selections_fields',
      //   license:'admin_settings_general_selections_fields',
      //   type: 'collapse',
      //   url: '/settings/general/selection-fields',
      //   icon: {
      //     icon: 'CheckBoxOutlined',
      //     iconType: 'material',
      //     fontSize: 'small'
      //   },
      //   children: [
      //     {
      //       id: 'general-selection-fields-fields',
      //       title: 'ncrm_generalsetting_general_manage_fields',
      //       type: 'item',
      //       url: '/settings/general/selection-fields/fields'
      //     },
      //     {
      //       id: 'general-selection-fields-group',
      //       title: 'ncrm_generalsetting_general_manage_group_fields',
      //       type: 'item',
      //       url: '/settings/general/selection-fields/groups'
      //     }
      //   ]
      // },
      {
        id: 'general-personalize',
        title: 'ncrm_generalsetting_general_personalize',
        license: 'admin_settings_general_personalize',
        type: 'item',
        url: '/settings/general/personalize',
        icon: {
          icon: 'BuildOutlined',
          iconType: 'material',
          fontSize: 'small'
        }
      },
      {
        id: 'general-sus',
        title: 'Simple URL Shortener',
        license: 'admin_settings_general_sus',
        type: 'item',
        url: '/settings/general/sus',
        icon: {
          icon: 'LinkOutlined',
          iconType: 'material',
          fontSize: 'small'
        }
      }
    ]
  }
];
