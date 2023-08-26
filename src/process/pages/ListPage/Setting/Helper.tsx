import React, { useMemo } from 'react';

import IconButton from '@base/components/@extended/IconButton';
import { LabelValue, SearchFilter } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { CloseOutlined, ModeEdit } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import * as keyNames from '@process/config/keyNames';
import { dateByOptions, groupByOptions, searchFields } from '@process/config/list-field/options';
import { ActionProperty, SettingType } from '@process/types/settings';

export const getSidebarSize = (type: SettingType) => {
  switch (type) {
    case 'action':
      return 600;

    case 'trigger':
      return 500;

    case 'criteria':
      return 600;

    case 'attribute':
      return 400;

    default:
      return 600;
  }
};

export const SettingTabs: ActionProperty[] = [
  {
    value: 'action',
    label: 'ncrm_process_action',
    type: 'TYPE_ACTION',
    iconPosition: 'start',
    iconType: 'icon',
    icon: 'diagram_action'
  },
  // {
  //   value: 'wait',
  //   label: 'Wait',
  //   component: 'writeWait',
  //   type: 'TYPE_WAIT',
  //   iconType: 'icon',
  //   icon: 'diagram_wait',
  // },
  {
    value: 'trigger',
    label: 'ncrm_process_trigger',
    type: 'TYPE_TRIGGER',
    iconPosition: 'start',
    iconType: 'feather',
    icon: 'Command'
  },
  {
    value: 'criteria',
    label: 'ncrm_process_criteria',
    type: 'TYPE_CRITERIA',
    iconPosition: 'start',
    iconType: 'icon',
    icon: 'diagram_criteria'
  },
  {
    value: 'attribute',
    label: 'ncrm_process_attribute',
    iconPosition: 'start',
    type: 'TYPE_ATTRIBUTE',
    iconType: 'feather',
    icon: 'Tool'
  }
];

export const ActionFields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_SETTING_ACTION_NAME,
    languageKey: 'ncrm_process_action_name'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_ACTION_MA,
    languageKey: 'ncrm_process_action_ma'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_ACTION_DESCRIPTION,
    languageKey: 'ncrm_common_description'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_ACTION_CREATED_AT,
    languageKey: 'ncrm_process_action_created_at'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_ACTION_MODE,
    languageKey: 'ncrm_process_action_action'
  }
];

export const TriggerFields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_SETTING_TRIGGER_NAME,
    languageKey: 'ncrm_process_trigger_name'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_TRIGGER_TYPE,
    languageKey: 'ncrm_process_trigger_type'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_TRIGGER_DESCRIPTION,
    languageKey: 'ncrm_common_description'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_TRIGGER_CREATED_AT,
    languageKey: 'ncrm_process_action_created_at'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_TRIGGER_MODE,
    languageKey: 'ncrm_process_action_action'
  }
];

export const CriteriaFields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_SETTING_CRITERIA_NAME,
    languageKey: 'ncrm_process_criteria_name'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_CRITERIA_TYPE,
    languageKey: 'ncrm_process_criteria_type'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_CRITERIA_DESCRIPTION,
    languageKey: 'ncrm_common_description'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_CRITERIA_CREATED_AT,
    languageKey: 'ncrm_process_action_created_at'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_CRITERIA_MODE,
    languageKey: 'ncrm_process_action_action'
  }
];

export const AttributeFields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_SETTING_ATTRIBUTE_NAME,
    languageKey: 'ncrm_process_attribute_name'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_ATTRIBUTE_TYPE,
    languageKey: 'ncrm_process_attribute_type'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_ATTRIBUTE_DESCRIPTION,
    languageKey: 'ncrm_common_description'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_ATTRIBUTE_CREATED_AT,
    languageKey: 'ncrm_process_action_created_at'
  },
  {
    keyName: keyNames.KEY_NAME_SETTING_ATTRIBUTE_MODE,
    languageKey: 'ncrm_process_action_action'
  }
];

export const getFields = (type: SettingType) => {
  switch (type) {
    case 'action':
      return ActionFields;

    case 'trigger':
      return TriggerFields;

    case 'criteria':
      return CriteriaFields;

    case 'attribute':
      return AttributeFields;

    default:
      return ActionFields;
  }
};

export const columnRenderRemap = (type: SettingType, EditFn?: (data: any) => void, DeleteFn?: (id: string) => void) => {
  switch (type) {
    case 'action':
      return {
        name(col: string, data: any) {
          const name = data[col] ? data[col] : '';
          return (
            <Typography noWrap color="link" onClick={() => EditFn && EditFn(data)}>
              {name}
            </Typography>
          );
        },
        ma(col: string, data: any) {
          if (data.setting) {
            return data.setting.method;
          }
          return 'ACTION_METHOD_MANUAL';
        },
        description(col: string, data: any) {
          const description = data[col] ? data[col] : null;
          return description;
        },
        createdAt(col: string, data: any) {
          const createdAt = data[col] ? data[col] : '';
          return convertDateTimeServerToClient({ date: createdAt, isTime: false });
        },
        mode(col: string, data: any) {
          // edit / delete
          return (
            <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
              <IconButton size="small" color="secondary" onClick={() => EditFn && EditFn(data)}>
                <ModeEdit sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" color="secondary" onClick={() => DeleteFn && DeleteFn(data.id)}>
                <CloseOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          );
        }
      };
    case 'trigger':
      return {
        name(col: string, data: any) {
          const name = data[col] ? data[col] : '';
          return (
            <Typography noWrap color="link" onClick={() => EditFn && EditFn(data)}>
              {name}
            </Typography>
          );
        },
        type(col: string, data: any) {
          if (data.trigger) {
            return data.trigger.trigger;
          }
          return '';
        },
        description(col: string, data: any) {
          const description = data[col] ? data[col] : null;
          return description;
        },
        createdAt(col: string, data: any) {
          const createdAt = data[col] ? data[col] : '';
          return convertDateTimeServerToClient({ date: createdAt, isTime: false });
        },
        mode(col: string, data: any) {
          // edit / delete
          return (
            <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
              <IconButton size="small" color="secondary" onClick={() => EditFn && EditFn(data)}>
                <ModeEdit sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" color="secondary" onClick={() => DeleteFn && DeleteFn(data.id)}>
                <CloseOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          );
        }
      };

    case 'criteria':
      return {
        name(col: string, data: any) {
          const name = data[col] ? data[col] : '';
          return (
            <Typography noWrap color="link" onClick={() => EditFn && EditFn(data)}>
              {name}
            </Typography>
          );
        },
        type(col: string, data: any) {
          const field = data[col] ? data[col] : null;
          return field;
        },
        description(col: string, data: any) {
          const description = data[col] ? data[col] : null;
          return description;
        },
        createdAt(col: string, data: any) {
          const createdAt = data[col] ? data[col] : '';
          return convertDateTimeServerToClient({ date: createdAt, isTime: false });
        },
        mode(col: string, data: any) {
          // edit / delete
          return (
            <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
              <IconButton size="small" color="secondary" onClick={() => EditFn && EditFn(data)}>
                <ModeEdit sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" color="secondary" onClick={() => DeleteFn && DeleteFn(data.id)}>
                <CloseOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          );
        }
      };

    case 'attribute':
      return {
        name(col: string, data: any) {
          const name = data[col] ? data[col] : '';
          return (
            <Typography noWrap color="link" onClick={() => EditFn && EditFn(data)}>
              {name}
            </Typography>
          );
        },
        type(col: string, data: any) {
          const field = data[col] ? data[col] : null;
          return field;
        },
        description(col: string, data: any) {
          const description = data[col] ? data[col] : null;
          return description;
        },
        createdAt(col: string, data: any) {
          const createdAt = data[col] ? data[col] : '';
          return convertDateTimeServerToClient({ date: createdAt, isTime: false });
        },
        mode(col: string, data: any) {
          // edit / delete
          return (
            <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
              <IconButton size="small" color="secondary" onClick={() => EditFn && EditFn(data)}>
                <ModeEdit sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" color="secondary" onClick={() => DeleteFn && DeleteFn(data.id)}>
                <CloseOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          );
        }
      };
  }
};

export const getQuery = (filter: SearchFilter | undefined) => {
  // filters query
  const groupBy = filter?.headerFilters?.groupBy;
  const groupByValue = useMemo(() => groupByOptions?.find((v: LabelValue) => v.value === groupBy), [groupBy]);

  const query = useMemo(() => {
    let queries: string[] = [];
    Object.keys(filter?.headerFilters).forEach((key) => {
      const value = filter?.headerFilters[key];
      const isDateTime = dateByOptions?.findIndex((v: LabelValue) => v.value === key) > -1;
      if (isDateTime) {
      }
    });

    // search query
    if (filter?.keyword != '') {
      if (searchFields?.length > 0) {
        const orQueries = searchFields?.map((field: LabelValue) => {
          return [field?.value, ':', '"' + filter?.keyword + '"'].join('');
        });
        queries.push('{' + orQueries.join(' ') + '}');
      }
    }

    if (queries?.length) {
      return '(' + queries.join(' ') + ')';
    }
    return '';
  }, [filter]);

  console.log('query', query);

  return query;
};
