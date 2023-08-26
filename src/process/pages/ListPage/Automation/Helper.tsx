import React, { useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import IconButton from '@base/components/@extended/IconButton';
import { LabelValue, SearchFilter } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { CloseOutlined, ModeEdit } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import * as keyNames from '@process/config/keyNames';
import { dateByOptions, groupByOptions, searchFields } from '@process/config/list-field/options';
import { AUTOMATION_TYPE } from '@process/config/constants';
import { t } from 'i18next';

export const fields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_AUTOMATION_NAME,
    languageKey: 'ncrm_process_automation_rule_field_basic_name'
  },
  {
    keyName: keyNames.KEY_NAME_AUTOMATION_TYPE,
    languageKey: 'ncrm_process_automation_rule_field_basic_type'
  },
  {
    keyName: keyNames.KEY_NAME_AUTOMATION_TRIGGER,
    languageKey: 'ncrm_process_automation_rule_field_basic_trigger'
  },
  {
    keyName: keyNames.KEY_NAME_AUTOMATION_CRITERIA,
    languageKey: 'ncrm_process_automation_rule_field_basic_criteria'
  },
  {
    keyName: keyNames.KEY_NAME_AUTOMATION_DESCRIPTION,
    languageKey: 'ncrm_process_automation_rule_field_basic_description'
  },
  {
    keyName: keyNames.KEY_NAME_AUTOMATION_CREATED_AT,
    languageKey: 'ncrm_process_automation_rule_field_more_created_at'
  },
  {
    keyName: keyNames.KEY_NAME_AUTOMATION_MODE,
    languageKey: 'ncrm_process_automation_rule_field_basic_mode'
  }
];

export const columnRenderRemap = (EditFn?: (data: any) => void, DeleteFn?: (id: string) => void) => {
  return {
    name(col: string, data: any) {
      const name = data[col] ? data[col] : '';
      // const id = data.id ? data.id : '';
      // const url = `/process/automation/${id}`;
      return (
        <Typography noWrap color="grey.700" onClick={() => EditFn && EditFn(data)}>
          {name}
        </Typography>
      );
    },
    createdAt(col: string, data: any) {
      const createdAt = data[col] ? data[col] : '';
      return convertDateTimeServerToClient({ date: createdAt, isTime: false });
    },
    type(col: string, data: any) {
      const type = data[col] ? data[col] : null;
      return t(AUTOMATION_TYPE[type]);
    },
    trigger(col: string, data: any) {
      const trigger = data[col] ? data[col] : null;
      return trigger?.name;
    },
    criteria(col: string, data: any) {
      const criteria = data[col] ? data[col] : null;
      return criteria?.name;
    },
    description(col: string, data: any) {
      const description = data[col] ? data[col] : null;
      return description;
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
