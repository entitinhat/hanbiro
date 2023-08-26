import Icon from '@base/assets/icons/svg-icons';
import { LabelValueIcon } from '@base/types/app';
import { LabelValue } from '@base/types/app';
import { LabelData } from '@settings/digital/landing-page/type/template';
import { t } from 'i18next';

export const LANDING_PAGE_TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
  {
    label: t('ncrm_common_import'),
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: t('ncrm_common_export'),
    value: 'export',
    icon: Icon('download')
  }
];

export const LANDING_PAGE_STAGE_BUILD = 'STAGE_BUILD';
export const LANDING_PAGE_STAGE_PUBLISHED = 'STAGE_PUBLISHED';
export const LANDING_PAGE_STAGE_SCHEDULED = 'STAGE_SCHEDULED';
export const LANDING_PAGE_STAGE_UNPUBLISH = 'STAGE_UNPUBLISH';
export const LANDING_PAGE_STAGE_ARCHIVED = 'STAGE_ARCHIVED';

export const LANDING_PAGE_STAGE_OPTIONS: any[] = [
  {
    value: LANDING_PAGE_STAGE_BUILD,
    label: t('ncrm_generalsetting_landing_page_stage_build')
  },
  {
    value: LANDING_PAGE_STAGE_PUBLISHED,
    label: t('ncrm_generalsetting_landing_page_stage_published')
  },
  {
    value: LANDING_PAGE_STAGE_SCHEDULED,
    label: t('ncrm_generalsetting_landing_page_stage_scheduled')
  },
  {
    value: LANDING_PAGE_STAGE_UNPUBLISH,
    label: t('ncrm_generalsetting_landing_page_stage_unpublish')
  },
  {
    value: LANDING_PAGE_STAGE_ARCHIVED,
    label: t('ncrm_generalsetting_landing_page_stage_archived')
  }
];

export const LANDING_PAGE_PUBLISH_BUILD = 'PUBLISH_BUILD';
export const LANDING_PAGE_PUBLISH_PUBLISHED = 'PUBLISH_NOW';
export const LANDING_PAGE_PUBLISH_SCHEDULED = 'PUBLISH_SCHEDULED';
export const LANDING_PAGE_PUBLISH_UNPUBLISH = 'PUBLISH_UNBLISH';
export const LANDING_PAGE_PUBLISH_LATER = 'PUBLISH_LATER';

export const LANDING_PAGE_PUBLISH_OPTIONS: any[] = [
  {
    value: LANDING_PAGE_PUBLISH_BUILD,
    label: t('ncrm_generalsetting_landing_page_publish_build')
  },
  {
    value: LANDING_PAGE_PUBLISH_PUBLISHED,
    label: t('ncrm_generalsetting_landing_page_publish_published')
  },
  {
    value: LANDING_PAGE_PUBLISH_SCHEDULED,
    label: t('ncrm_generalsetting_landing_page_publish_scheduled')
  },
  {
    value: LANDING_PAGE_PUBLISH_UNPUBLISH,
    label: t('ncrm_generalsetting_landing_page_publish_unpublish')
  },
  {
    value: LANDING_PAGE_PUBLISH_LATER,
    label: t('ncrm_generalsetting_landing_page_publish_scheduled_later')
  }
];

export const LANDING_PAGE_FORM_PUBLISH_TYPE_OPTIONS: any[] = [
  {
    languageKey: 'ncrm_generalsetting_landing_page_publish_type_unpublish',
    value: LANDING_PAGE_PUBLISH_UNPUBLISH
  },
  {
    languageKey: 'ncrm_generalsetting_landing_page_publish_type_published',
    value: LANDING_PAGE_PUBLISH_PUBLISHED
  },
  {
    languageKey: 'ncrm_generalsetting_landing_page_publish_type_schedule',
    value: LANDING_PAGE_PUBLISH_LATER
  }
];

export const LANDING_PAGE_PUBLISH_FIELDS_OPTIONS: any[] = [
  {
    value: LANDING_PAGE_PUBLISH_PUBLISHED,
    label: t('ncrm_generalsetting_landing_page_publish_field_published')
  },
  {
    value: LANDING_PAGE_PUBLISH_UNPUBLISH,
    label: t('ncrm_generalsetting_landing_page_publish_field_unpublish')
  },
  {
    value: LANDING_PAGE_PUBLISH_LATER,
    label: t('ncrm_generalsetting_landing_page_publish_field_schedule')
  }
];

export const LANDING_PAGE_TYPE_TICKET_FORM = 'TYPE_TICKET_FORM';
export const LANDING_PAGE_TYPE_ABOUT_US = 'TYPE_ABOUT_US';
export const LANDING_PAGE_TYPE_THANK_YOU = 'TYPE_THANK_YOU';
export const LANDING_PAGE_TYPE_LEARN_MORE = 'TYPE_LEARN_MORE';
export const LANDING_PAGE_TYPE_LEAN_MORE = 'TYPE_LEAN_MORE';
export const LANDING_PAGE_TYPE_TESTIMONIALS = 'TYPE_TESTIMONIALS';
export const LANDING_PAGE_TYPE_CORPORATE_MAGAZINE = 'TYPE_CORPORATE_MAGAZINE';
export const LANDING_PAGE_TYPE_DIGITAL_REPORT = 'TYPE_DIGITAL_REPORT';

export const LANDING_PAGE_TYPE_OPTIONS: any[] = [
  {
    label: t('ncrm_generalsetting_landing_page_type_ticket_form'),
    value: LANDING_PAGE_TYPE_TICKET_FORM,
    languageKey: 'ncrm_generalsetting_landing_page_type_ticket_form'
  },
  {
    label: t('ncrm_generalsetting_landing_page_type_about_us'),
    value: LANDING_PAGE_TYPE_ABOUT_US,
    languageKey: 'ncrm_generalsetting_landing_page_type_about_us'
  },
  {
    label: t('ncrm_generalsetting_landing_page_type_thank_you'),
    value: LANDING_PAGE_TYPE_THANK_YOU,
    languageKey: 'ncrm_generalsetting_landing_page_type_thank_you'
  },
  {
    label: t('ncrm_generalsetting_landing_page_type_learn_more'),
    value: LANDING_PAGE_TYPE_LEARN_MORE,
    languageKey: 'ncrm_generalsetting_landing_page_type_learn_more'
  },
  {
    label: t('ncrm_generalsetting_landing_page_type_testimonials'),
    value: LANDING_PAGE_TYPE_TESTIMONIALS,
    languageKey: 'ncrm_generalsetting_landing_page_type_testimonials'
  },
  {
    label: t('ncrm_generalsetting_landing_page_type_corporate_magazine'),
    value: LANDING_PAGE_TYPE_CORPORATE_MAGAZINE,
    languageKey: 'ncrm_generalsetting_landing_page_type_corporate_magazine'
  },
  {
    label: t('ncrm_generalsetting_landing_page_type_digital_report'),
    value: LANDING_PAGE_TYPE_DIGITAL_REPORT,
    languageKey: 'ncrm_generalsetting_landing_page_type_digital_report'
  }
];

export const LANDING_PAGE_OPTIONS: LabelData[] = [
  {
    value: 'LANDING_PAGE_ACTIVE',
    label: 'Active',
    name: 'Active',
    id: 'Active'
  },
  {
    value: 'LANDING_PAGE_INACTIVE',
    label: 'Inactive',
    name: 'Inactive',
    id: 'Inactive'
  }
];

export const TEMPLATE_TYPE_OPTIONS: LabelValue[] = [
  {
    label: 'All',
    value: 'ALL'
  },
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
