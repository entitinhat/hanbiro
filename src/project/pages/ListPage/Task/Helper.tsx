import React, { useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import { LabelValue, SearchFilter } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Chip, Stack, Typography } from '@mui/material';
import * as keyNames from '@project/config/keyNames';
import { dateByOptions, groupByOptions, searchFields } from '@project/config/list-field/options';

export const fields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_TASK_PROJECT,
    languageKey: 'project_project_name'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_NAME,
    languageKey: 'project_task_name'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_PAGE_TYPE,
    languageKey: 'project_task_page_type'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_ESTIMATED_TIME,
    languageKey: 'project_task_estimate_time'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_STATUS,
    languageKey: 'project_task_status'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_ASSIGN_TO,
    languageKey: 'project_task_assign_to'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_START_DATE,
    languageKey: 'project_task_start_date'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_DUE_DATE,
    languageKey: 'project_task_due_date'
  }
];

export const columnRenderRemap = () => {
  return {
    [keyNames.KEY_NAME_TASK_PROJECT](col: string, data: any) {
      const project = data[col] ? data[col] : '';
      return project?.name;
    },
    [keyNames.KEY_NAME_TASK_NAME](col: string, data: any) {
      const name = data[col] ? data[col] : '';
      const id = data.id ? data.id : '';
      const url = `/project/task/${id}`;
      return (
        <RouteLink to={url} style={{ textDecoration: 'none' }}>
          <Typography noWrap color="grey.700">
            {name}
          </Typography>
        </RouteLink>
      );
    },
    [keyNames.KEY_NAME_TASK_START_DATE](col: string, data: any) {
      const startDate = data[col] ? data[col] : '';
      return convertDateTimeServerToClient({ date: startDate });
    },
    [keyNames.KEY_NAME_TASK_DUE_DATE](col: string, data: any) {
      const dueDate = data[col] ? data[col] : '';
      return convertDateTimeServerToClient({ date: dueDate });
    },
    [keyNames.KEY_NAME_TASK_ASSIGN_TO](col: string, data: any) {
      const assigned = data[col] ? data[col] : null;
      const total = assigned?.length;

      return total > 0 ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography noWrap>{assigned[0].name}</Typography>
          {total > 1 && <Chip size="small" label={`+ ${total - 1}`} />}
        </Stack>
      ) : (
        ''
      );
    },
    [keyNames.KEY_NAME_TASK_PAGE_TYPE](col: string, data: any) {
      const pageType = data[col] ? data[col] : null;
      return pageType?.name;
    },
    [keyNames.KEY_NAME_TASK_ESTIMATED_TIME](col: string, data: any) {
      const devTime = data[col] ? data[col] : null;
      return devTime;
    },
    [keyNames.KEY_NAME_TASK_STATUS](col: string, data: any) {
      const status = data[col] ? data[col] : null;
      return status;
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
