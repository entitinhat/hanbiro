import dayjs from 'dayjs';

import {
  ActivityCallTypeOptions,
  ActivityDirectionOptions,
  ActivitySendTypeOptions,
  ActivityTaskTypeOptions
} from '@activity/config/constants';
import * as keyNames from '@activity/config/keyNames';
import * as components from '@activity/config/view-field/components';
import { Activity } from '@activity/types/activity';
import {
  defaultReDay,
  RECURRENCE_EVERY_TYPE,
  RECURRENCE_EVERY_TYPE_REVERSE,
  RECURRENCE_TYPE
} from '@base/components/@hanbiro/RepeatTime/configs';
import {
  DataSourceView,
  DateTimeView,
  DurationView,
  EditorView,
  LookUpView,
  PriorityView,
  ReminderView,
  RepeatTimeView,
  TagsView,
  TextAreaView,
  TextView
} from '@base/config/view-field/components';
import { useMenuTemplates } from '@base/services/settingService';
import { Duration, DurationValue, IdName } from '@base/types/common';
import { FieldConfig } from '@base/types/pagelayout';
import { useSelectionFields } from '@settings/general/hooks/useSelectionFields';
import { Product } from '@product/product/types/product';

export default {
  [keyNames.KEY_NAME_ACTIVITY_TASK_TYPE]: {
    component: TextView,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (v: string) => ActivityTaskTypeOptions.find((e) => e.value == v)?.label
  },
  [keyNames.KEY_NAME_SEQUENCE_DONE_TIME]: {
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_STATUS]: {
    component: components.StatusView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
    // componentProps: {}
  },
  [keyNames.KEY_NAME_ACTIVITY_DURATION]: {
    component: DurationView,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    schema: `
      duration {
        time
        unit
      }
    `,
    getValueView: (v: Duration) => {
      return (
        v?.unit != 'UNIT_NONE' && {
          duration: v.time,
          durationUnit: v.unit
        }
      );
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_EDURATION]: {
    component: DurationView,
    componentProps: {},
    schema: `
      eduration {
        time
        unit
      }
    `,
    getValueView: (v: Duration) => ({
      duration: v.time,
      durationUnit: v.unit
    }),
    getValueEdit: (v: Duration) => ({
      duration: v.time,
      durationUnit: v.unit
    }),
    getMutationValue: (v: DurationValue) => ({
      [keyNames.KEY_NAME_ACTIVITY_EDURATION]: {
        time: v.duration,
        unit: v.durationUnit
      }
    }),
    getDefaultValue: (v: any) => ({
      time: v.duration,
      unit: v.durationUnit
    })
  },
  [keyNames.KEY_NAME_ACTIVITY_START_TIME]: {
    component: DateTimeView,
    componentProps: {
      showTimeInput: true,
      dateFormat: 'yyyy/MM/dd H:m'
    },
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_END_TIME]: {
    component: DateTimeView,
    componentProps: {
      showTimeInput: true,
      dateFormat: 'yyyy/MM/dd H:m'
    },
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    // optimisticQueryKey: [queryKeys.viewActivity], // Ref config > write-field
    getExtraMutationParam: (data: Activity, val: any) => {
      const endTime = dayjs(val);
      const startTime = dayjs(data.startTime);
      return {
        [keyNames.KEY_NAME_ACTIVITY_DURATION]: {
          time: endTime.diff(startTime, 'second'),
          unit: 'UNIT_DAY'
        }
      };
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_DUE_DATE]: {
    component: DateTimeView,
    componentProps: {}
  },
  [keyNames.KEY_NAME_ACTIVITY_SUBJECT]: {
    // component: TextView,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    // It has to get as basic value.
    schema: `
      type
      subject
      startTime
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_FROM]: {
    component: components.FromUserView,
    componentProps: {
      single: true
    },
    schema: `
      from {
        current {
          code
          name
          phones {
            phoneNumber
          }
          emails {
            email
          }
        }
        type
        id
        name
        phone
        email
        typeEmail
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_TO]: {
    component: components.ToCustomerView,
    componentProps: {},
    schema: `
      to {
        current {
          code
          name
          phones {
            phoneNumber
          }
          emails {
            email
          }
          mobiles {
            mobileNumber
          }
        }
        type
        id
        name
        phone
        email
        typeEmail
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_PRIORITY]: {
    // component: LookUpView,
    // componentProps: {
    //   fetchList: useSelectionFields,
    //   fieldLabel: 'languageKey',
    //   fieldValue: 'id',
    //   extraParams: { filter: { query: 'keyRoot=priority' } },
    //   isMultiple: false
    // },
    component: PriorityView,
    schema: `
      priority {
        id
        keyName
        languageKey
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_PURPOSE]: {
    // component: LookUpView,
    // componentProps: {
    //   fetchList: useSelectionFields,
    //   fieldLabel: 'languageKey',
    //   fieldValue: 'id',
    //   extraParams: { filter: { query: 'keyRoot=activity_purpose' } },
    //   isMultiple: false
    // },
    component: DataSourceView, // Ref config > write-field
    componentProps: {
      sourceKey: 'activity_purpose',
      sourceType: 'field',
      single: true
    },
    schema: `
      purpose {
        id
        languageKey
      }
    `,
    getMutationValue: (componentData: any) => {
      return {
        [keyNames.KEY_NAME_ACTIVITY_PURPOSE]: {
          id: componentData?.id
          // languageKey: componentData?.languageKey
        }
      };
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_DESCRIPTION]: {
    component: TextAreaView,
    componentProps: {},
    showFullRow: true
  },
  [keyNames.KEY_NAME_ACTIVITY_CONTENT]: {
    component: EditorView,
    componentProps: {},
    showFullRow: true,
    getValueView: (val: any) => {
      console.log(`~~!! contentVal`, val?.content?.html);
      return val?.content?.html ? val?.content?.html : val;
    },
    getValueEdit: (val: any) => {
      console.log(`~~!! contentValEdit`, val);

      return val?.content?.html ? val?.content?.html : val;
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_TASK_CHECKLIST]: {
    component: components.ChecklistView,
    componentProps: {
      mode: 'view'
    },
    showFullRow: true
  },
  [keyNames.KEY_NAME_ACTIVITY_TASK_SEQUENCE]: {
    component: components.TaskSequenceView,
    componentProps: {
      mode: 'view'
    },
    showFullRow: true
  },
  [keyNames.KEY_NAME_ACTIVITY_RELATED_TO]: {
    component: components.RelatedToViewField,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    schema: `
      relatedTo {
        type
        id
        name
      }
    `,
    showFullRow: true
  },
  [keyNames.KEY_NAME_ACTIVITY_PRODUCTS]: {
    component: components.ProductViewField,
    viewProps: { disableChip: true },
    schema: `
      products {
        id
        name
      }
    `,
    showFullRow: true,
    getMutationValue: (v: Product[]) => ({
      [keyNames.KEY_NAME_ACTIVITY_PRODUCTS]: v.map((product: Product) => ({ id: product?.id, name: product?.name }))
    })
  },
  [keyNames.KEY_NAME_ACTIVITY_CALL_RESULT]: {
    component: LookUpView,
    componentProps: {
      fetchList: useSelectionFields,
      fieldLabel: 'languageKey',
      fieldValue: 'id',
      extraParams: { filter: { query: 'keyRoot=activity_call_result' } },
      isMultiple: false
    },
    schema: `
      callResult {
        id 
        languageKey
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_CALL_TYPE]: {
    // component: TextView,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (v: string) => {
      console.log(`~~~~calType`, v);
      return ActivityCallTypeOptions.find((e) => e.value == v)?.label ?? 'ncrm_activity_call_type_none';
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_TPL]: {
    component: LookUpView,
    componentProps: {
      fetchList: useMenuTemplates,
      fieldLabel: 'name',
      fieldValue: 'id',
      extraParams: {},
      schema: `
        results {
          id
          name
        }
      `,
      isMultiple: false
    },
    schema: `
      tpl {
        id
        name
      }
    `,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_DIRECTION]: {
    component: TextView,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (v: string) => ActivityDirectionOptions.find((e) => e.value == v)?.label
  },
  [keyNames.KEY_NAME_ACTIVITY_SEND_TYPE]: {
    component: TextView,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (v: string) => ActivitySendTypeOptions.find((e) => e.value == v)?.label
  },
  [keyNames.KEY_NAME_ACTIVITY_SMS_TYPE]: {
    // component: TextView,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_TAGS]: {
    component: TagsView,
    componentProps: {}
  },
  [keyNames.KEY_NAME_ACTIVITY_REPEAT]: {
    component: RepeatTimeView,
    componentProps: {},
    schema: `
      repeat {
        use
        type
        days
        startTime
        endTime
        every
        times
        yearNth
        monthNth
        weekNth
        monthDay
      }
    `,
    // optimisticQueryKey: [queryKeys.viewActivity], // see activity > pages > ViewPage > Left
    getValueView: (v: any) => {
      const params: Record<string, any> = {
        use: v?.use ?? false
      };
      if (v?.use) {
        params.type = v.type;
        if (v.type == 'TYPE_HOURLY') {
          params.startTime = v.startTime;
          params.endTime = v.endTime;
          params.weekdays = v.days;
        } else if (v.type == 'TYPE_DAILY') {
          params.weekdays = v.days;
        } else if (v.type == 'TYPE_WEEKLY') {
          params.everyNr = v.times;
          params.weekdays = v.days;
        } else if (v.type == 'TYPE_MONTHLY') {
          params.everyNr = v.times;
          params.monthlyOption = RECURRENCE_EVERY_TYPE_REVERSE[v.every];
          if (params.monthlyOption == 'week') {
            params.weekdays = v.days;
            params.monthlyWeek = v.weekNth;
          } else if (params.monthlyOption == 'day') {
            params.monthlyDay = v.monthDay;
          } else {
            // last
          }
        } else {
          // yearly
          params.everyNr = v.times;
          params.yearlyOption = RECURRENCE_EVERY_TYPE_REVERSE[v.every];
          if (params.yearlyOption == 'week') {
            params.weekdays = v.days;
            params.yearlyWeek = v.weekNth;
            params.yearlyWeekMonth = v.monthNth;
          } else if (params.yearlyOption == 'day') {
            params.yearlyDayMonth = v.monthNth;
            params.yearlyDay = v.monthDay;
          }
        }
      }
      return { ...params, ...v };
    },
    getValueEdit: (v: any) => {
      const params: Record<string, any> = {
        use: v?.use ?? false
      };
      if (v?.use) {
        params.type = v.type;
        if (v.type == 'TYPE_HOURLY') {
          params.startTime = v.startTime;
          params.endTime = v.endTime;
          params.weekdays = v.days;
        } else if (v.type == 'TYPE_DAILY') {
          params.weekdays = v.days;
        } else if (v.type == 'TYPE_WEEKLY') {
          params.everyNr = v.times;
          params.weekdays = v.days;
        } else if (v.type == 'TYPE_MONTHLY') {
          params.everyNr = v.times;
          params.monthlyOption = RECURRENCE_EVERY_TYPE_REVERSE[v.every];
          if (params.monthlyOption == 'week') {
            params.weekdays = v.days;
            params.monthlyWeek = v.weekNth;
          } else if (params.monthlyOption == 'day') {
            params.monthlyDay = v.monthDay;
          } else {
            // last
          }
        } else {
          // yearly
          params.everyNr = v.times;
          params.yearlyOption = RECURRENCE_EVERY_TYPE_REVERSE[v.every];
          if (params.yearlyOption == 'week') {
            params.weekdays = v.days;
            params.yearlyWeek = v.weekNth;
            params.yearlyWeekMonth = v.monthNth;
          } else if (params.yearlyOption == 'day') {
            params.yearlyDayMonth = v.monthNth;
            params.yearlyDay = v.monthDay;
          }
        }
      } else {
        params.type = RECURRENCE_TYPE.hourly;
        params.startTime = '0:5';
        params.endTime = '23:55';
        params.everyNr = '1';
        params.weekdays = defaultReDay;
        //monthly
        params.monthlyOption = 'week'; //or 'day', 'last'
        params.monthlyWeek = 1;
        params.monthlyDay = 1;
        //yearly
        params.yearlyOption = 'week'; //or 'day'
        params.yearlyWeekMonth = 1;
        params.yearlyDayMonth = 1;
        params.yearlyWeek = 1;
        params.yearlyDay = 1;
      }
      return { ...v, ...params };
    },
    getMutationValue: (v: any) => {
      console.log(`~~~~ Repeat mutation value`, v);
      const params: Record<string, any> = {
        use: v.use
      };
      if (v.use) {
        params.type = v.type;
        params.typeEnd = v?.typeEnd;
        params.endAfterTimes = Number(v?.endAfterTimes);
        if (v.type == 'TYPE_HOURLY') {
          params.startTime = v.startTime;
          params.endTime = v.endTime;
          params.days = v.weekdays;
        } else if (v.type == 'TYPE_DAILY') {
          params.days = v.weekdays;
        } else if (v.type == 'TYPE_WEEKLY') {
          params.times = Number(v.monthlyWeek);
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
      }
      return { [keyNames.KEY_NAME_ACTIVITY_REPEAT]: params };
    },
    getDefaultValue: (v: any) => {
      return { ...v, days: v.weekdays };
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_REMINDER]: {
    component: ReminderView,
    componentProps: {},
    schema: `
      reminder {
        use
        notify
        end
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_CREATED_BY]: {
    component: TextView,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    schema: `
      createdBy {
        id
        name
      }
    `,
    getValueView: (v: IdName) => v.name
  },
  [keyNames.KEY_NAME_ACTIVITY_CREATED_AT]: {
    component: DateTimeView,
    componentProps: {
      // format: 'datetime'
    },
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_ACTIVITY_UPDATED_BY]: {
    component: TextView,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    schema: `
      updatedBy {
        id
        name
      }
    `,
    getValueView: (v: IdName) => v.name
  },
  [keyNames.KEY_NAME_ACTIVITY_UPDATED_AT]: {
    component: DateTimeView,
    componentProps: {
      // format: 'datetime'
    },
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  //fix unknown field
  [keyNames.KEY_NAME_ACTIVITY_DATE]: {
    schema: ``
  }
} as FieldConfig;

export const comparisonFieldsConfig: FieldConfig = {
  [keyNames.KEY_NAME_COMPARISON_USERNAME]: {
    schema: `user {
      id
      name
    }`
  }
};
