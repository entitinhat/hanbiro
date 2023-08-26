//third-party
import dayjs from 'dayjs';
import _ from 'lodash';

//project import
import {
  ActivityCallTypeOptions,
  ActivityDirectionOptions,
  ActivitySendTypeOptions,
  ActivitySmsTypeOptions,
  ActivityTaskTypeOptions,
  ACTIVITY_MENU_CALL,
  ACTIVITY_MENU_EMAIL,
  ACTIVITY_MENU_SMS,
  ACTIVITY_MENU_TASK,
  ACTIVITY_STATUS_TODO,
  defaultReDay,
  RECURRENCE_EVERY_TYPE,
  RECURRENCE_TYPE,
  StatusFields
} from '@activity/config/constants';
import * as keyNames from '@activity/config/keyNames';
import * as components from '@activity/config/write-field/components';
import * as baseComponents from '@base/config/write-field/components';
import { RelatedValue } from '@activity/containers/RelatedItem';
import { Repeat, UserOrCustomer } from '@activity/types/activity';
import { TaskChecklist, TaskSequence } from '@activity/types/task';
import { ActivityType, ReminderState } from '@activity/types/type';
import { LabelValue } from '@base/types/app';
import { DurationValue } from '@base/types/common';
import { DurationOptions } from '@base/utils/helpers/dateUtils';
import validators from '@base/utils/validation/fieldValidator';
import { Selection } from '@settings/general/types/interface';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { Product } from '@product/product/types/product';

//material
import { TextField } from '@mui/material';
import { User } from '@base/types/user';

export default {
  [keyNames.KEY_NAME_ACTIVITY_TASK_TYPE]: {
    component: baseComponents.MuiRadioGroup,
    componentProps: {
      size: 'md',
      options: ActivityTaskTypeOptions
    },
    // showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: ActivityTaskTypeOptions[0],
    parseParam: (v: LabelValue) => v.value
  },
  [keyNames.KEY_NAME_ACTIVITY_STATUS]: {
    component: baseComponents.SelectBox,
    componentProps: {
      options: StatusFields({
        todo: 'ncrm_activity_todo',
        doing: 'ncrm_activity_doing',
        hold: 'ncrm_activity_on_hold',
        done: 'ncrm_activity_done',
        cancel: 'ncrm_activity_cancel'
      }).map((status) => {
        return {
          keyName: status.value,
          languageKey: status.label
        };
      })
    },

    // showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: { keyName: ACTIVITY_STATUS_TODO, languageKey: 'ncrm_activity_todo' },
    parseParam: (v: any) => v.keyName
  },
  [keyNames.KEY_NAME_ACTIVITY_DIRECTION]: {
    component: baseComponents.MuiRadioGroup,
    componentProps: {
      options: ActivityDirectionOptions
    },
    validate: {
      required: validators.required
    },
    defaultValue: ActivityDirectionOptions[1],
    parseParam: (v: LabelValue) => v.value
  },
  [keyNames.KEY_NAME_ACTIVITY_START_TIME]: {
    component: baseComponents.DateTimePicker2,
    componentProps: {
      inputFormat: 'YYYY/MM/dd HH:mm'
    },
    // showFullRow: true,
    // hideTitle: true,
    defaultValue: dayjs(),
    parseParam: (v: Date) => (v ? v.toISOString() : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_END_TIME]: {
    component: baseComponents.DateTimePicker2,
    componentProps: {
      inputFormat: 'YYYY/MM/dd HH:mm'
    },
    defaultValue: dayjs(),
    parseParam: (v: Date) => (v ? v.toISOString() : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_DUE_DATE]: {
    component: baseComponents.DateTimePicker2,
    componentProps: {
      inputFormat: 'YYYY/MM/DD'
    },
    validate: {
      required: validators.date
    },
    defaultValue: dayjs(),
    parseParam: (v: Date) => {
      console.log('v date format', v);
      return v ? v.toISOString() : null;
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_SUBJECT]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    defaultValue: '',
    showFullRow: true,
    validate: {
      required: validators.required
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      rows: 3,
      multiline: true
    },
    defaultValue: '',
    showFullRow: true
  },
  [keyNames.KEY_NAME_ACTIVITY_CONTENT]: {
    component: baseComponents.TuiEditor,
    componentProps: {
      editorProps: {
        height: '200px'
      }
    },
    showFullRow: true,
    defaultValue: ''
  },
  [keyNames.KEY_NAME_ACTIVITY_PRIORITY]: {
    component: baseComponents.PrioritySelect,
    componentProps: {
      //fullWidth: true
    },
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (v: Selection) => (v ? { id: v.id, name: v.languageKey } : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_DURATION]: {
    component: baseComponents.DurationSelect,
    componentProps: {
      options: _.clone(DurationOptions).splice(1, 6)
    },
    defaultValue: {
      duration: 86400,
      durationUnit: 'UNIT_DAY'
    },
    parseParam: (v: DurationValue) => ({
      time: v.duration,
      unit: v.durationUnit
    })
  },
  [keyNames.KEY_NAME_ACTIVITY_EDURATION]: {
    component: baseComponents.DurationSelect,
    componentProps: {
      options: _.clone(DurationOptions).splice(1, 6)
    },
    defaultValue: {
      duration: 86400,
      durationUnit: 'UNIT_DAY'
    },
    validate: {
      required: validators.required
    },
    showFullRow: false,
    parseParam: (v: DurationValue) => ({
      time: v.duration,
      unit: v.durationUnit
    })
  },
  [keyNames.KEY_NAME_ACTIVITY_FROM]: {
    component: components.FromUser,
    componentProps: {
      single: true,
      showAvatar: true
    },
    // showFullRow: true,
    defaultValue: null,
    parseParam: (value: User[]) => {
      const rValues: UserOrCustomer[] = [];
      if (value && value.length > 0) {
        value.map((item) => {
          const temp = {
            id: value[0].id,
            name: value[0].name,
            type: 'TYPE_USER',
            email: value[0].primaryEmail ?? '',
            phone: value[0].primaryPhone ?? ''
            // group @Todo
          } as UserOrCustomer;
          rValues.push(temp);
        });
      }
      return rValues;
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_MAIL_SHOW_CC]: {
    component: components.ShowMailCc,
    componentProps: {},
    showFullRow: true,
    hideTitle: true,
    defaultValue: { cc: false, bcc: false }
  },
  [keyNames.KEY_NAME_ACTIVITY_TO]: {
    component: components.ToCustomer,
    componentProps: {
      single: true,
      showAvatar: true,
      mode:'none'
    },
    validate: {
      required: validators.required
    },
    // showFullRow: true,
    defaultValue: []
  },
  [keyNames.KEY_NAME_ACTIVITY_PRODUCTS]: {
    component: components.ProductAutoComplete,
    componentProps: {
      single: false
    },
    // showFullRow: true,
    defaultValue: [],
    parseParam: (v: Product[]) =>
      v.map((_v) => ({
        id: _v.id,
        name: _v.name
      }))
  },
  [keyNames.KEY_NAME_ACTIVITY_TPL]: {
    component: baseComponents.TemplateSelect,
    componentProps: {
      sourceType: 'template'
    },
    // showFullRow: true,
    defaultValue: null,
    parseParam: (v: Selection) => {
      console.log('v template', v);
      return v ? { id: v.id, name: v.name } : null;
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_PURPOSE]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      sourceType: 'field',
      sourceKey: 'activity_purpose',
      //sourceMenu: 'activity',
      single: true
    },
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (v: Selection) => (v ? { id: v.id, name: v.languageKey } : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_CALL_RESULT]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      sourceType: 'field',
      sourceKey: 'activity_call_result',
      //sourceMenu: 'activity',
      single: true
    },
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (v: Selection) => (v ? { id: v.id, name: v.languageKey } : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_CALL_TYPE]: {
    component: baseComponents.MuiRadioGroup,
    componentProps: {
      options: ActivityCallTypeOptions
    },
    validate: {
      required: validators.required
    },
    defaultValue: ActivityCallTypeOptions[0],
    parseParam: (v: LabelValue) => v.value || null
  },
  [keyNames.KEY_NAME_ACTIVITY_SEND_TYPE]: {
    component: baseComponents.MuiRadioGroup,
    componentProps: {
      options: ActivitySendTypeOptions
    },
    showFullRow: true,
    defaultValue: ActivitySendTypeOptions[0],
    parseParam: (v: LabelValue) => v.value || null
  },
  [keyNames.KEY_NAME_ACTIVITY_TAGS]: {
    component: components.Tags,
    componentProps: {
      open: true,
      fieldValue: 'id',
      fieldLabel: 'name'
    },
    validate: {},
    defaultValue: [],
    showFullRow: true,
    parseParam: (value: any) => {
      return value ? value : [];
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_TASK_KNOWLEDGE]: {
    component: components.KBAutoComplete,
    componentProps: {
      // single: false
    },
    // showFullRow: true,
    defaultValue: [],
    parseParam: (v: KnowledgeBase[]) =>
      v.map((_v) => ({
        id: _v.id,
        name: _v.subject
      }))
  },
  [keyNames.KEY_NAME_ACTIVITY_TASK_CHECKLIST]: {
    component: components.TaskChecklist,
    componentProps: {
      fullWidth: true
    },
    showFullRow: true,
    defaultValue: [], //{ title: 'Default item', duration: { time1: 1, unit: 'UNIT_DAY' }, workers: [] }
    parseParam: (v: TaskChecklist[]) => (v.length > 0 ? v : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_TASK_SEQUENCE]: {
    component: components.TaskSequence,
    componentProps: {
      fullWidth: true
    },
    showFullRow: true,
    defaultValue: [],
    parseParam: (v: TaskSequence[]) => (v.length > 0 ? v : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_RELATED_TO]: {
    component: components.RelatedItem,
    componentProps: {},
    // showFullRow: true,
    defaultValue: [],
    parseParam: (v: RelatedValue[]) => (v.length > 0 ? v : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_REPEAT]: {
    component: baseComponents.RepeatTime,
    componentProps: {},
    showFullRow: false,
    defaultValue: {
      use: false,
      type: RECURRENCE_TYPE.daily,
      startTime: '0:5',
      endTime: '23:55',
      everyNr: '1',
      weekdays: defaultReDay,
      //monthly
      monthlyOption: 'week', //or 'day', 'last'
      monthlyWeek: 1,
      monthlyDay: 1,
      //yearly
      yearlyOption: 'week', //or 'day'
      yearlyWeekMonth: 1,
      yearlyDayMonth: 1,
      yearlyWeek: 1,
      yearlyDay: 1,

      typeEnd: 'END_NERVER',
      endOnTime: null,
      endAfterTimes: 0
    },

    parseParam: (v: Repeat) => {
      const params: Record<string, any> = {
        use: v.use
      };
      if (v.use) {
        params.type = v.type;
        if (v.type == 'TYPE_HOURLY') {
          params.startTime = v.startTime;
          params.endTime = v.endTime;
          params.days = v.weekdays;
        } else if (v.type == 'TYPE_DAILY') {
          params.days = v.weekdays;
        } else if (v.type == 'TYPE_WEEKLY') {
          params.times = Number(v.everyNr);
          params.days = v.weekdays;
        } else if (v.type == 'TYPE_MONTHLY') {
          params.times = Number(v.everyNr);
          params.every = RECURRENCE_EVERY_TYPE[v.monthlyOption];
          if (v.monthlyOption == 'week') {
            params.days = v.weekdays;
            params.weekNth = v.monthlyWeek;
          } else if (v.monthlyOption == 'day') {
            params.monthDay = v.monthlyDay;
          } else {
            // last
          }
        } else {
          // yearly
          params.times = Number(v.everyNr);
          params.every = RECURRENCE_EVERY_TYPE[v.yearlyOption];
          if (v.yearlyOption == 'week') {
            params.days = v.weekdays;
            params.weekNth = v.yearlyWeek;
            params.monthNth = v.yearlyWeekMonth;
          } else if (v.yearlyOption == 'day') {
            params.monthNth = v.yearlyDayMonth;
            params.monthDay = v.yearlyDay;
          }
        }
        if (v.typeEnd == 'END_NERVER') {
          params.typeEnd = v.typeEnd;
        } else if (v.typeEnd == 'END_AFTER_TIMES') {
          params.typeEnd = v.typeEnd;
          params.endAfterTimes = Number(v.endAfterTimes);
        } else if (v.typeEnd == 'END_ON_DATE') {
          params.typeEnd = v.typeEnd;
          params.endOnTime = v.endOnTime;
        }
      }
      return params;
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_REMINDER]: {
    component: baseComponents.Reminder,
    componentProps: {},
    defaultValue: {
      use: false,
      notify: 'NOTIFY_POPUP',
      end: 1440
    },
    parseParam: (v: ReminderState) => {
      const reminder: Record<string, any> = {
        use: v.use
      };
      if (v.use) {
        reminder.notify = v.notify;
        reminder.end = v.end;
      }
      return reminder;
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_SMS_TYPE]: {
    component: baseComponents.MuiRadioGroup,
    componentProps: {
      options: ActivitySmsTypeOptions
    },
    validate: {
      required: validators.required
    },
    showFullRow: true,
    defaultValue: ActivitySmsTypeOptions[0],
    parseParam: (v: LabelValue) => v.value || null
  },
  [keyNames.KEY_NAME_ACTIVITY_CC]: {
    component: components.CustomerAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true,
      showEmail: true
    },
    showFullRow: true,
    defaultValue: [],
    parseParam: (v: any[]) => (v.length > 0 ? v : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_BCC]: {
    component: components.CustomerAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true,
      showEmail: true
    },
    showFullRow: true,
    defaultValue: [],
    parseParam: (v: any[]) => (v.length > 0 ? v : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_MAIL_SEND_INDIVIDUAL]: {
    component: baseComponents.MuiCheckbox,
    componentProps: {
      label: 'ncrm_activity_send_individually',
      labelPlacement: 'end'
    },
    hideTitle: true,
    showFullRow: true,
    defaultValue: false,
    parseParam: (v: boolean) => v || false
  },
  [keyNames.KEY_NAME_ACTIVITY_ATTACHMENTS]: {
    component: baseComponents.S3UploadFiles,
    componentProps: {
      keyName: keyNames.KEY_NAME_ACTIVITY_ATTACHMENTS
    },
    showFullRow: true,
    defaultValue: [],
    parseParam: (v: any[]) => (v.length > 0 ? v : null)
  },
  [keyNames.KEY_NAME_ACTIVITY_SMS_IMAGE]: {
    component: baseComponents.SingleFileUpload,
    componentProps: {
      acceptedImage: true
      //maxSize: 1000000,
    },
    showFullRow: true,
    defaultValue: null,
    parseParam: (v: any[]) => (v.length > 0 ? v : null)
  }
};

export const taskWriteFields = [
  keyNames.KEY_NAME_ACTIVITY_SUBJECT,
  keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
  keyNames.KEY_NAME_ACTIVITY_TO, //customer
  keyNames.KEY_NAME_ACTIVITY_EDURATION,
  keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
  keyNames.KEY_NAME_ACTIVITY_STATUS,
  keyNames.KEY_NAME_ACTIVITY_FROM, //Assigned Rep
  keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
  keyNames.KEY_NAME_ACTIVITY_PRIORITY,
  keyNames.KEY_NAME_ACTIVITY_PURPOSE,
  keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
  keyNames.KEY_NAME_ACTIVITY_TASK_KNOWLEDGE, //knowledge
  keyNames.KEY_NAME_ACTIVITY_REPEAT,
  keyNames.KEY_NAME_ACTIVITY_TPL, //template
  keyNames.KEY_NAME_ACTIVITY_CONTENT,
  keyNames.KEY_NAME_ACTIVITY_TASK_CHECKLIST,
  keyNames.KEY_NAME_ACTIVITY_TASK_SEQUENCE,
  keyNames.KEY_NAME_ACTIVITY_TAGS,
  keyNames.KEY_NAME_ACTIVITY_DESCRIPTION
];
export const callWriteFields = [
  keyNames.KEY_NAME_ACTIVITY_SUBJECT,
  keyNames.KEY_NAME_ACTIVITY_CALL_TYPE,
  keyNames.KEY_NAME_ACTIVITY_DIRECTION,
  keyNames.KEY_NAME_ACTIVITY_TO, //customer
  keyNames.KEY_NAME_ACTIVITY_START_TIME,
  keyNames.KEY_NAME_ACTIVITY_DURATION,
  keyNames.KEY_NAME_ACTIVITY_FROM, //Assigned Rep
  keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
  keyNames.KEY_NAME_ACTIVITY_PURPOSE,
  keyNames.KEY_NAME_ACTIVITY_PRIORITY,
  keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
  keyNames.KEY_NAME_ACTIVITY_TPL, //template
  keyNames.KEY_NAME_ACTIVITY_CONTENT,
  keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
  keyNames.KEY_NAME_ACTIVITY_TAGS,
  keyNames.KEY_NAME_ACTIVITY_DESCRIPTION
];
export const smsWriteFields = [
  keyNames.KEY_NAME_ACTIVITY_SUBJECT,
  keyNames.KEY_NAME_ACTIVITY_SEND_TYPE,
  keyNames.KEY_NAME_ACTIVITY_START_TIME,
  keyNames.KEY_NAME_ACTIVITY_FROM,
  keyNames.KEY_NAME_ACTIVITY_TO,
  keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
  keyNames.KEY_NAME_ACTIVITY_PURPOSE,
  keyNames.KEY_NAME_ACTIVITY_PRIORITY,
  keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
  keyNames.KEY_NAME_ACTIVITY_TPL,
  keyNames.KEY_NAME_ACTIVITY_CONTENT,
  keyNames.KEY_NAME_ACTIVITY_TAGS,
  keyNames.KEY_NAME_ACTIVITY_DESCRIPTION
];
export const emailWriteFields = [
  keyNames.KEY_NAME_ACTIVITY_SUBJECT,
  keyNames.KEY_NAME_ACTIVITY_SEND_TYPE,
  keyNames.KEY_NAME_ACTIVITY_START_TIME,
  keyNames.KEY_NAME_ACTIVITY_FROM,
  keyNames.KEY_NAME_ACTIVITY_TO,
  keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
  keyNames.KEY_NAME_ACTIVITY_PURPOSE,
  keyNames.KEY_NAME_ACTIVITY_PRIORITY,
  // keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
  keyNames.KEY_NAME_ACTIVITY_TPL,
  keyNames.KEY_NAME_ACTIVITY_CONTENT,
  keyNames.KEY_NAME_ACTIVITY_ATTACHMENTS,
  // keyNames.KEY_NAME_ACTIVITY_TAGS,
  keyNames.KEY_NAME_ACTIVITY_DESCRIPTION
];
export const typeField: { [x: string]: string[] } = {
  [ACTIVITY_MENU_TASK]: taskWriteFields,
  [ACTIVITY_MENU_CALL]: callWriteFields,
  [ACTIVITY_MENU_SMS]: smsWriteFields,
  [ACTIVITY_MENU_EMAIL]: emailWriteFields
};
export const getItemWriteFields = (type: string, paylayoutFields: any) => {
  let columns: any[] = [];
  switch (type) {
    case ACTIVITY_MENU_TASK:
      taskWriteFields.forEach((keyName: string) => {
        const field = paylayoutFields.find((field: any) => field.keyName == keyName);
        if (field) {
          columns.push(field);
        }
      });
      break;
    case ACTIVITY_MENU_CALL:
      callWriteFields.forEach((keyName: string) => {
        const field = paylayoutFields.find((field: any) => field.keyName == keyName);
        if (field) {
          columns.push(field);
        }
      });
      break;
    case ACTIVITY_MENU_SMS:
      smsWriteFields.forEach((keyName: string) => {
        const field = paylayoutFields.find((field: any) => field.keyName == keyName);
        if (field) {
          columns.push(field);
        }
      });
      break;
    case ACTIVITY_MENU_EMAIL:
      emailWriteFields.forEach((keyName: string) => {
        const field = paylayoutFields.find((field: any) => field.keyName == keyName);
        if (field) {
          columns.push(field);
        }
      });
      break;
    default:
      columns = [];
      break;
  }
  return columns;
};
