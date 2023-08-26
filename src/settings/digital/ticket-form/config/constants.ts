import { LabelValueIcon } from '@base/types/app';
import Icon from '@base/assets/icons/svg-icons';
import { t } from 'i18next';

export const TICKET_FORM_TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
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

export const TICKET_FORM_STAGE_BUILD = 'STAGE_BUILD';
export const TICKET_FORM_STAGE_DISABLE = 'STAGE_DISABLE';
export const TICKET_FORM_STAGE_ENABLE = 'STAGE_ENABLE';

export const TICKET_FORM_STAGES: any = [
  {
    value: TICKET_FORM_STAGE_BUILD,
    label: t('ncrm_generalsetting_ticket_form_build')
  },
  {
    value: TICKET_FORM_STAGE_DISABLE,
    label: t('ncrm_generalsetting_ticket_form_disable')
  },
  {
    value: TICKET_FORM_STAGE_ENABLE,
    label: t('ncrm_generalsetting_ticket_form_enable')
  }
];

export const TICKET_FORM_LINK_TYPE_LANDING_PAGE = 'LINK_TYPE_LANDING_PAGE';
export const TICKET_FORM_LINK_TYPE_SITE = 'LINK_TYPE_SITE';
export const TICKET_FORM_LINK_TYPE_SURVEY = 'LINK_TYPE_SURVEY';

export const TICKET_FORM_LINK_TYPES: any = [
  {
    value: TICKET_FORM_LINK_TYPE_LANDING_PAGE,
    label: t('ncrm_generalsetting_landing_page')
  },
  {
    value: TICKET_FORM_LINK_TYPE_SITE,
    label: t('ncrm_generalsetting_content_type_site')
  },
  {
    value: TICKET_FORM_LINK_TYPE_SURVEY,
    label: t('ncrm_generalsetting_survey')
  }
];

export const TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE = 'LINK_TO_PAGE';
export const TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE = 'LINK_TO_RESOURCE';
