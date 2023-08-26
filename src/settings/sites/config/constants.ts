import { MENU_SETTING_SITE_DESK } from '@base/config/menus';
import { t } from 'i18next';

import { dateByOptionsDesk, filterByOptionsDesk, groupByOptionsDesk } from '../desk/config/list-fields/options';
import configViewDesk from '../desk/config/view-field';
import { parseFieldsListDesk } from '../desk/pages/MainPage/Helper';

import { SiteConfig } from '../types/site';
import * as keyNames from '@settings/sites/config/key-names';
import { LabelValue } from '@base/types/app';
import { SiteGroup } from '@settings/sites/types/site';

export const SITE_GROUP_KEY: { [index: string]: string } = {
  SITE_GROUP_DESK: 'desk'
};
export const SITE_GROUP_OPTION: { [index: string]: SiteGroup } = {
  desk: SiteGroup.DESK
};

export const SITE_TYPE_OPTIONS: LabelValue[] = [
  /*{
    value: 'TYPE_NONE',
    label: 'None',
  },*/
  {
    label: 'General',
    value: 'TYPE_GENERAL'
  },
  {
    label: 'Survey',
    value: 'TYPE_SURVEY'
  },
  {
    label: 'Thank You',
    value: 'TYPE_THANK_YOU'
  },
  {
    label: 'Follow Up',
    value: 'TYPE_FOLLOW_UP'
  }
];
export const SITE_TYPE_OPTIONS_ENUM: LabelValue[] = [
  {
    value: 1,
    label: t('TYPE_GENERAL')
  },
  {
    value: 2,
    label: t('TYPE_SURVEY')
  },
  {
    value: 3,
    label: t('TYPE_THANK_YOU')
  },
  {
    value: 4,
    label: t('TYPE_FOLLOW_UP')
  }
];
export const SITE_MESSAGE_TYPE_OPTIONS_ENUM: LabelValue[] = [
  /*{
    value: 0,
    label: t('SUB_TYPE_NONE'),
  },*/
  {
    value: 1,
    label: t('SMS')
  },
  {
    value: 2,
    label: t('MMS')
  }
];

export const SITE_STAGE_ACTIVE = 'STAGE_ACTIVE';
export const SITE_STAGE_INACTIVE = 'STAGE_INACTIVE';
export const SITE_STAGE_PREPARE = 'STAGE_PREPARE';
export const SITE_STAGE_NONE = 'STAGE_NONE';

export const SITE_STAGE_OPTIONS: LabelValue[] = [
  {
    value: SITE_STAGE_NONE,
    label: 'None'
  },
  {
    value: SITE_STAGE_ACTIVE,
    label: 'Active'
  },
  {
    value: SITE_STAGE_INACTIVE,
    label: 'Inactive'
  },
  {
    value: SITE_STAGE_PREPARE,
    label: 'Prepare'
  }
];

export const SITE_MESSAGE_TYPE_OPTIONS: LabelValue[] = [
  {
    value: 'SUB_TYPE_NONE',
    label: 'None'
  },
  {
    label: 'SMS',
    value: 'SUB_TYPE_MESSAGE_SMS'
  },
  {
    label: 'MMS',
    value: 'SUB_TYPE_MESSAGE_MMS'
  }
];

export const SITE_TASK_TYPE_OPTIONS: LabelValue[] = [
  /*{
    value: 'SUB_TYPE_NONE',
    label: 'None',
  },*/
  {
    label: 'Manual',
    value: 'SUB_TYPE_TASK_MANUAL'
  },
  {
    label: 'Check list',
    value: 'SUB_TYPE_TASK_CHECK_LIST'
  },
  {
    label: 'Sequence',
    value: 'SUB_TYPE_TASK_SEQUENCE'
  }
];

export const SITE_TASK_TYPE_OPTIONS_ENUM: LabelValue[] = [
  {
    label: t('SUB_TYPE_TASK_MANUAL'),
    value: 3
  },
  {
    label: t('SUB_TYPE_TASK_CHECK_LIST'),
    value: 4
  },
  {
    label: t('SUB_TYPE_TASK_SEQUENCE'),
    value: 5
  }
];

export const SITES_GROUP: SiteConfig = {
  [keyNames.KEY_MENU_SETTING_SITE_DESK]: {
    path: 'desk',
    label: 'ncrm_generalsetting_site_desk_title',
    group: 'group=1',
    title: 'Create Desk Site',
    menu: MENU_SETTING_SITE_DESK,
    configView: configViewDesk,
    groupByOptions: groupByOptionsDesk,
    dateByOptions: dateByOptionsDesk,
    filterByOptions: filterByOptionsDesk,
    parseFieldsList: parseFieldsListDesk
  }
};
