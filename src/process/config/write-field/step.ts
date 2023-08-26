import { SelectBox } from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import * as keyNames from '@process/config/keyNames';
import { stepDoCustom } from '@process/containers/Diagram/Step/StepWrite';
import { Automation } from '@process/types/process';

import {
  ActionWrite,
  AutomationWrite,
  ChecklistWrite,
  CriteriaWrite,
  SiteWrite,
  StatusWrite,
  UserAutoComplete,
  WaitWrite
} from './components';

const StepWriteField = {
  [keyNames.KEY_NAME_STEP_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    showFullRow: true,
    languageKey: 'process_step_name',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_STEP_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    showFullRow: true,
    languageKey: 'process_step_description',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_STEP_DO]: {
    component: SelectBox,
    showFullRow: false,
    languageKey: 'process_step_do',
    defaultValue: stepDoCustom,
    componentProps: {
      options: null,
      steptype: ['action', 'criteria']
    },
    validate: {
      required: validators.required
    },
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_STEP_ACTION]: {
    languageKey: 'process_step_action',
    component: ActionWrite,
    showFullRow: true,
    componentProps: {
      steptype: 'action'
    },
    defaultValue: {
      method: 'ACTION_METHOD_MANUAL',
      sendEmail: false,
      duration: {
        time: 86400,
        unit: 'UNIT_DAY'
      }
    },
    parseParam: (value: any) => {
      if (value.template) {
        return { ...value, template: value.template.id };
      } else {
        delete value.template;
        return value;
      }
    }
  },
  [keyNames.KEY_NAME_STEP_ASSIGN_USER]: {
    component: UserAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true,
      placement: 'left',
      steptype: 'action'
    },
    showFullRow: true,
    defaultValue: [],
    languageKey: 'process_step_assign_user',
    parseParam: (value: any) => {
      if (value.length == 0) {
        return null;
      } else {
        return value.map((v: any) => {
          const group = v.properties?.crmGroups?.length > 0 ? v.properties.crmGroups[0] : { id: '', name: '' };
          return {
            user: {
              id: v.id,
              name: v.name
            },
            group: {
              id: group?.id ?? '',
              name: group?.name ?? ''
            }
          };
        });
      }
    }
  },
  [keyNames.KEY_NAME_STEP_WAIT]: {
    languageKey: 'process_step_wait',
    component: WaitWrite,
    showFullRow: true,
    defaultValue: {
      type: 'WAIT_UNTIL_TRIGGER',
      datetime: null,
      schedule: {
        duration: {
          time: 86400,
          unit: 'UNIT_DAY'
        },
        when: 'WHEN_BEFORE',
        attr: ''
      },
      duration: {
        time: 86400,
        unit: 'UNIT_DAY'
      },
      trigger: ''
    },
    useTooltip: false,
    componentProps: {
      steptype: 'wait',
      mode: 'edit'
    },
    parseParam: (value: any) => {
      let wait: any = {
        type: value.type
      };
      if (value.type == 'WAIT_UNTIL_DATE_TIME') {
        wait.datetime = value.datetime;
      } else if (value.type == 'WAIT_BY_DURATION') {
        wait.duration = {
          term: wait.duration.term,
          unit: wait.duration.unit
        };
      } else if (value.type == 'WAIT_UNTIL_TRIGGER') {
        wait.trigger = value.trigger;
      } else if (value.type == 'WAIT_SCHEDULE_ATTRIBUTE') {
        wait.schedule = {
          duration: {
            term: wait.schedule.duration.term,
            unit: wait.schedule.duration.unit
          },
          when: wait.schedule.when,
          attr: wait.schedule.attr
        };
      } else {
        return null;
      }
      return wait;
    }
  },
  [keyNames.KEY_NAME_STEP_CRITERIA]: {
    component: CriteriaWrite,
    showFullRow: true,
    defaultValue: null,
    useTooltip: false,
    languageKey: 'process_step_criteria_rule',
    componentProps: {
      steptype: 'criteria',
      mode: 'edit',
      options: null
    }
  },
  [keyNames.KEY_NAME_STEP_SITE]: {
    languageKey: 'process_step_site',
    component: SiteWrite,
    showFullRow: true,
    defaultValue: null,
    useTooltip: false,
    componentProps: {
      steptype: 'site',
      mode: 'edit'
    }
  },
  [keyNames.KEY_NAME_STEP_CHECKLIST]: {
    languageKey: 'process_step_checklist',
    component: ChecklistWrite,
    showFullRow: true,
    defaultValue: null,
    useTooltip: false,
    componentProps: {
      steptype: 'checklist',
      mode: 'edit'
    }
  },
  [keyNames.KEY_NAME_STEP_STATUSES]: {
    languageKey: 'process_step_statuses',
    component: StatusWrite,
    showFullRow: true,
    defaultValue: null,
    useTooltip: false,
    componentProps: {
      steptype: ['action', 'simple', 'wait', 'site']
    }
  },
  [keyNames.KEY_NAME_STEP_AUTOMATION]: {
    languageKey: 'process_step_automation',
    component: AutomationWrite,
    componentProps: {
      steptype: 'action',
      mode: 'edit'
    },
    defaultValue: {
      useSleeping: false,
      sleeping: {
        executes: [],
        duration: {
          time: 86400,
          unit: 'UNIT_DAY'
        }
      }
    },
    showFullRow: true,
    parseParam: (value: Automation) => {
      if (!value.useSleeping) return null;
      else {
        return {
          useSleeping: value.useSleeping,
          sleeping: {
            duration: value.sleeping.duration,
            executes: value.sleeping.executes.map((execute) => {
              return {
                useNotify: execute.useNotify,
                notifyId: execute.notify.id,
                statusId: execute.status.id,
                useChangeStep: execute.useChangeStep,
                changeStepId: execute.changeStep.id,
                useMywork: execute.useMywork
              };
            })
          }
        };
      }
    }
  }
};

export default StepWriteField;
