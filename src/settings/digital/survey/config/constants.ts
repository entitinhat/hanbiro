import { LabelValueIcon } from '@base/types/app';
import {
  AccessTimeOutlined,
  BallotOutlined,
  CalendarMonthOutlined,
  CheckBoxOutlined,
  ListOutlined,
  NotesOutlined,
  RadioButtonCheckedOutlined,
  ShortTextOutlined,
  SummarizeOutlined
} from '@mui/icons-material';
import Icon from '@base/assets/icons/svg-icons';
import { OptionValue } from '@base/types/common';
import { t } from 'i18next';

//survey types
export const SURVEY_TYPE_GENERAL = 'TYPE_GENERAL';
export const SURVEY_TYPE_SATISFACTION = 'TYPE_SATISFACTION';

export const SURVEY_TYPES: OptionValue[] = [
  {
    keyName: SURVEY_TYPE_GENERAL,
    languageKey: 'ncrm_generalsetting_survey_type_general'
  },
  {
    keyName: SURVEY_TYPE_SATISFACTION,
    languageKey: 'ncrm_generalsetting_survey_type_satisfaction'
  }
];

//survey status
export const SURVEY_STATUS_PUBLISHED = 'STATUS_PUBLISHED';
export const SURVEY_STATUS_UNPUBLISH = 'STATUS_UNPUBLISH';

//question types
export const Q_MULTI_CHOICES = 1;
export const Q_CHECKBOXES = 2;
export const Q_DROPDOWN = 3;
export const Q_SHORT_ANSWER = 4;
export const Q_PARAGRAPH = 5;
export const Q_FILE_UPLOAD = 6;
export const Q_DATE = 7;
export const Q_TIME = 8;
export const Q_MULTI_CHOICES_GRID = 9;
export const Q_TICK_BOX_GRID = 10;
export const Q_TITLE = 11;
export const Q_IMAGE = 12;
export const Q_VIDEO = 13;

export const QUESTION_TYPES = [
  {
    type: Q_MULTI_CHOICES,
    languageKey: t('ncrm_generalsetting_survey_question_type_multiple_choices'),
    icon: RadioButtonCheckedOutlined
  },
  {
    type: Q_CHECKBOXES,
    languageKey: t('ncrm_generalsetting_survey_question_type_checkboxes'),
    icon: CheckBoxOutlined
  },
  {
    type: Q_DROPDOWN,
    languageKey: t('ncrm_generalsetting_survey_question_type_dropdown'),
    icon: ListOutlined
  },
  {
    type: Q_SHORT_ANSWER,
    languageKey: t('ncrm_generalsetting_survey_question_type_short_answer'),
    icon: ShortTextOutlined
  },
  {
    type: Q_PARAGRAPH,
    languageKey: t('ncrm_generalsetting_survey_question_type_paragraph'),
    icon: NotesOutlined
  },
  // {
  //   type: Q_FILE_UPLOAD,
  //   languageKey: 'File upload',
  //   icon: Upload,
  // },
  {
    type: Q_DATE,
    languageKey: t('ncrm_generalsetting_survey_question_type_date'),
    icon: CalendarMonthOutlined
  },
  {
    type: Q_TIME,
    languageKey: t('ncrm_generalsetting_survey_question_type_time'),
    icon: AccessTimeOutlined
  },
  {
    type: Q_MULTI_CHOICES_GRID,
    languageKey: t('ncrm_generalsetting_survey_question_type_multi_choices_grid'),
    icon: SummarizeOutlined
  },
  {
    type: Q_TICK_BOX_GRID,
    languageKey: t('ncrm_generalsetting_survey_question_type_tick_box_grid'),
    icon: BallotOutlined
  }
];

export const SURVEY_TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
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
