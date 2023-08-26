import {
  MENU_TEMPLATE_CALL,
  MENU_TEMPLATE_EMAIL,
  MENU_TEMPLATE_KNOWLEDGEBASE,
  MENU_TEMPLATE_QUOTE,
  MENU_TEMPLATE_SMS,
  MENU_TEMPLATE_TASK
} from '@base/config/menus';

import { dateByOptionsCall, filterByOptionsCall, groupByOptionsCall } from '../call/config/list-fields/options';
import { dateByOptionsEmail, filterByOptionsEmail, groupByOptionsEmail } from '../email/config/list-fields/options';
import { dateByOptionsKB, filterByOptionsKB, groupByOptionsKB } from '../kb/config/list-fieds/options';
import { dateByOptionsSMS, filterByOptionsSMS, groupByOptionsSMS } from '../sms/config/list-fields/options';
import { dateByOptionsTask, filterByOptionsTask, groupByOptionsTask } from '../task/config/list-fields/options';
import {
  dateByOptions as dateByOptionsQuote,
  filterByOptions as filterByOptionsQuote,
  groupByOptions as groupByOptionsQuote
} from '../quote/config/list-fieds/options';

import configViewCall from '../call/config/view-fields';
import configViewEmail from '../email/config/view-field';
import configViewKB from '../kb/config/view-fields';
import configViewSMS from '../sms/config/view-fields';
import configViewTask from '../task/config/view-fields';
import configViewQuote from '../quote/config/view-fields';

import { parseFieldsListCall, parseFieldsCallView } from '../call/pages/Helper';
import { parseFieldsListEmail, parseFieldsEmailView } from '../email/pages/Helper';
import { parseFieldsListKB, parseFieldsKBView } from '../kb/pages/Helper';
import { parseFieldsListSMS, parseFieldsSMSView } from '../sms/pages/Helper';
import { parseFieldsListTask, parseFieldsTaskView } from '../task/pages/Helper';
import {
  parseFieldsList as parseFieldsListQuote,
  parseFieldsView as parseFieldsViewQuote
} from "@settings/template/quote/pages/Helper";

import { TemplateConfig } from '../types/template';
import * as keyNames from '@settings/template/config/key-names';

export const groupTemplates: TemplateConfig = {
  [keyNames.KEY_MENU_TEMPLATE_SMS]: {
    path: 'sms',
    label: 'SMS',
    group: 'group=3',
    title: 'ncrm_setting_template_create_sms_template',
    menu: MENU_TEMPLATE_SMS,
    //This is For List Page
    groupByOptions: groupByOptionsSMS,
    dateByOptions: dateByOptionsSMS,
    filterByOptions: filterByOptionsSMS,
    parseFieldsList: parseFieldsListSMS,
    //This is For View Page
    configView: configViewSMS,
    parseFieldsView: parseFieldsSMSView,
    ignoreFields: [keyNames.KEY_MENU_TEMPLATE_SUBJECT, keyNames.KEY_MENU_TEMPLATE_NAME]
  },
  [keyNames.KEY_MENU_TEMPLATE_EMAIL]: {
    path: 'email',
    label: 'EMAIL',
    group: 'group=2',
    title: 'ncrm_setting_template_create_email_template',
    menu: MENU_TEMPLATE_EMAIL,
    //This is For List Page
    groupByOptions: groupByOptionsEmail,
    dateByOptions: dateByOptionsEmail,
    filterByOptions: filterByOptionsEmail,
    parseFieldsList: parseFieldsListEmail,
    //This is For View Page
    configView: configViewEmail,
    parseFieldsView: parseFieldsEmailView,
    ignoreFields: [keyNames.KEY_MENU_TEMPLATE_SUBJECT, keyNames.KEY_MENU_TEMPLATE_NAME]
  },
  [keyNames.KEY_MENU_TEMPLATE_CALL]: {
    path: 'call',
    label: 'CALL',
    group: 'group=5',
    title: 'ncrm_setting_template_create_call_template',
    menu: MENU_TEMPLATE_CALL,
    //This is For List Page
    groupByOptions: groupByOptionsCall,
    dateByOptions: dateByOptionsCall,
    filterByOptions: filterByOptionsCall,
    parseFieldsList: parseFieldsListCall,
    //This is For View Page
    configView: configViewCall,
    parseFieldsView: parseFieldsCallView,
    ignoreFields: [keyNames.KEY_MENU_TEMPLATE_SUBJECT, keyNames.KEY_MENU_TEMPLATE_NAME]
  },
  [keyNames.KEY_MENU_TEMPLATE_TASK]: {
    path: 'task',
    label: 'TASK',
    group: 'group=4',
    title: 'ncrm_setting_template_create_task_template',
    menu: MENU_TEMPLATE_TASK,
    //This is For List Page
    groupByOptions: groupByOptionsTask,
    dateByOptions: dateByOptionsTask,
    filterByOptions: filterByOptionsTask,
    parseFieldsList: parseFieldsListTask,
    //This is For View Page
    configView: configViewTask,
    parseFieldsView: parseFieldsTaskView,
    ignoreFields: [keyNames.KEY_MENU_TEMPLATE_SUBJECT, keyNames.KEY_MENU_TEMPLATE_NAME]
  },
  [keyNames.KEY_MENU_TEMPLATE_KB]: {
    path: 'knowledgebase',
    label: 'KNOWLEDGE BASE',
    group: 'group=1',
    title: 'ncrm_setting_template_create_knowledge_base_template',
    menu: MENU_TEMPLATE_KNOWLEDGEBASE,
    //This is For List Page
    groupByOptions: groupByOptionsKB,
    dateByOptions: dateByOptionsKB,
    filterByOptions: filterByOptionsKB,
    parseFieldsList: parseFieldsListKB,
    //This is For View Page
    configView: configViewKB,
    parseFieldsView: parseFieldsKBView,
    ignoreFields: [keyNames.KEY_MENU_TEMPLATE_SUBJECT, keyNames.KEY_MENU_TEMPLATE_NAME]
  },
  [keyNames.KEY_MENU_TEMPLATE_QUOTE]: {
    path: 'quote',
    label: 'QUOTE',
    group: 'group=6',
    title: 'ncrm_setting_template_create_quote_template',
    menu: MENU_TEMPLATE_QUOTE,

    groupByOptions: groupByOptionsQuote,
    dateByOptions: dateByOptionsQuote,
    filterByOptions: filterByOptionsQuote,
    parseFieldsList: parseFieldsListQuote,

    configView: configViewQuote,
    parseFieldsView: parseFieldsViewQuote,
    ignoreFields: [keyNames.KEY_MENU_TEMPLATE_SUBJECT, keyNames.KEY_MENU_TEMPLATE_NAME]
  }
};
