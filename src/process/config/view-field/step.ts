import { TextAreaView, TextView, UserView } from '@base/config/view-field/components';
import { IdName } from '@base/types/common';
import * as keyNames from '@process/config/keyNames';
import { Automation } from '@process/types/process';
import { STEP_TYPES } from '@process/config/constants'

import {
  DiagramActionView,
  DiagramAutomationView,
  DiagramChecklistView,
  DiagramCriteriaView,
  DiagramSiteView,
  DiagramStatusView,
  DiagramWaitView
} from './components';

export const StepViewField: { [index: string]: any } = {
  [keyNames.KEY_NAME_STEP_TYPE]: {
    component: TextView,
    languageKey: 'process_step_type',
    showFullRow: false,
    getValueView: (value: any) => {
      return STEP_TYPES.find((item: any) => item.value == value)?.label || ''
    }, // get value view equal to label
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_STEP_NAME]: {
    languageKey: 'process_step_name',
    showFullRow: true,
    component: TextView,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    }
  },
  [keyNames.KEY_NAME_STEP_DESCRIPTION]: {
    languageKey: 'process_step_description',
    showFullRow: true,
    component: TextAreaView,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    }
  },
  [keyNames.KEY_NAME_STEP_DO]: {
    languageKey: 'process_step_do',
    showFullRow: false,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    component: TextView,
    componentProps: {
      steptype: ['action', 'criteria']
    },
    getValueView: (value: IdName) => {
      if (value) {
        return value.name;
      } else {
        return 'ncrm_process_action_method_manual';
      }
    }
  },
  [keyNames.KEY_NAME_STEP_ACTION]: {
    languageKey: 'process_step_action',
    showFullRow: true,
    component: DiagramActionView,
    componentProps: {
      steptype: 'action'
    }
  },
  [keyNames.KEY_NAME_STEP_SITE]: {
    languageKey: 'process_step_site',
    showFullRow: true,
    component: DiagramSiteView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    componentProps: {
      steptype: 'site'
    }
  },
  [keyNames.KEY_NAME_STEP_WAIT]: {
    showFullRow: true,
    languageKey: 'process_step_wait',
    component: DiagramWaitView,
    componentProps: {
      steptype: 'wait',
      mode: 'edit'
    },
    viewProps: {
      mode: 'view'
    },
    getMutationValue: (value: any) => {
      let wait: any = {
        type: value.type
      };
      if (value.type == 'WAIT_UNTIL_DATE_TIME') {
        wait.datetime = value.datetime;
      } else if (value.type == 'WAIT_BY_DURATION') {
        wait.duration = value.duration;
      } else if (value.type == 'WAIT_UNTIL_TRIGGER') {
        wait.trigger = value.trigger;
      } else if (value.type == 'WAIT_SCHEDULE_ATTRIBUTE') {
        wait.schedule = {
          duration: value.schedule.duration,
          when: value.schedule.when,
          attr: value.schedule.attr
        };
      }
      return {
        [keyNames.KEY_NAME_STEP_WAIT]: wait
      };
    }
  },
  [keyNames.KEY_NAME_STEP_CRITERIA]: {
    component: DiagramCriteriaView,
    showFullRow: true,
    languageKey: 'process_step_criteria_rule',
    componentProps: {
      steptype: 'criteria',
      mode: 'edit'
    },
    viewProps: {
      mode: 'view'
    }
  },
  [keyNames.KEY_NAME_STEP_CHECKLIST]: {
    component: DiagramChecklistView,
    languageKey: 'process_step_checklist',
    showFullRow: true,
    componentProps: {
      steptype: 'checklist',
      mode: 'edit'
    },
    viewProps: {
      mode: 'view'
    }
  },
  [keyNames.KEY_NAME_STEP_ASSIGN_USER]: {
    component: UserView,
    showFullRow: true,
    componentProps: {
      steptype: 'action'
    },
    languageKey: 'process_step_assign_user',
    getValueEdit: (value: any[]) => {
      return value && value.map((v) => v.id);
    },
    getMutationValue: (value: any[]) => {
      let users: any = null;
      if (value.length > 0) {
        users = value.map((v: any) => {
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

      return { [keyNames.KEY_NAME_STEP_ASSIGN_USER]: users };
    }
  },
  [keyNames.KEY_NAME_STEP_STATUSES]: {
    languageKey: 'process_step_statuses',
    component: DiagramStatusView,
    showFullRow: true,
    viewProps: {
      mode: 'view'
    },
    componentProps: {
      mode: 'edit',
      hideSave: true,
      steptype: ['action', 'simple', 'wait', 'site']
    }
  },

  [keyNames.KEY_NAME_STEP_AUTOMATION]: {
    languageKey: 'process_step_automation',
    component: DiagramAutomationView,
    showFullRow: true,
    componentProps: {
      steptype: 'action'
    },
    getValueView: (value: any) =>
      value ?? {
        useSleeping: false,
        sleeping: {
          executes: [],
          duration: {
            time: 86400,
            unit: 'UNIT_DAY'
          }
        }
      },
    getValueEdit: (value: any) =>
      value ?? {
        useSleeping: false,
        sleeping: {
          executes: [],
          duration: {
            time: 86400,
            unit: 'UNIT_DAY'
          }
        }
      },
    getMutationValue: (value: Automation) => {
      // console.log('value', value);
      const automation = !value.useSleeping
        ? null
        : {
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
      return {
        [keyNames.KEY_NAME_STEP_AUTOMATION]: automation
      };
    }
  }
};
