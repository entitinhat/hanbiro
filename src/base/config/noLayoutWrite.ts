import {
    ActionWriteField, AutomationWriteField, BusinessWriteField, ClosedWriteField,
    CriteriaWriteField, InstantWriteField, StageWriteField, StepWriteField, TriggerWriteField
} from '@process/config/write-field';
import {
    PlanningWriteField, ProjectWriteField, TaskTemplateWriteField, TaskWriteField
} from '@project/config/write-field';

import * as menuKeys from './menus';

export const ModuleConfig: any = {
  [menuKeys.LAYOUT_PROCESS_BUSINESS]: BusinessWriteField,
  [menuKeys.LAYOUT_PROCESS_STEP]: StepWriteField,
  [menuKeys.LAYOUT_PROCESS_STAGE]: StageWriteField,
  [menuKeys.LAYOUT_PROCESS_CLOSED]: ClosedWriteField,
  [menuKeys.LAYOUT_PROCESS_AUTOMATION]: AutomationWriteField,
  [menuKeys.LAYOUT_PROCESS_AUTOMATION_INSTANT]: InstantWriteField,
  [menuKeys.LAYOUT_PROCESS_ACTION]: ActionWriteField,
  [menuKeys.LAYOUT_PROCESS_TRIGGER]: TriggerWriteField,
  [menuKeys.LAYOUT_PROCESS_CRITERIA]: CriteriaWriteField,
  [menuKeys.LAYOUT_PROJECT_PROJECT]: ProjectWriteField,
  [menuKeys.LAYOUT_PROJECT_TASK]: TaskWriteField,
  [menuKeys.LAYOUT_PROJECT_TASK_TEMPLATE]: TaskTemplateWriteField,
  [menuKeys.LAYOUT_PROJECT_PLANNING]: PlanningWriteField,
};

export const getConfigForMenu = (menu = '') => {
  return {
    ...(ModuleConfig?.[menu] || {})
  };
};
