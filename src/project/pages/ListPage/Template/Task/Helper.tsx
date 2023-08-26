import React, { useMemo } from 'react';

import IconButton from '@base/components/@extended/IconButton';
import { LabelValue, SearchFilter } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { CloseOutlined, ModeEdit } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import * as keyNames from '@project/config/keyNames';
import { dateByOptions, searchFields } from '@project/config/list-field/options';

export const fields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_TASK_NAME,
    languageKey: 'project_task_name'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_PAGE_TYPE,
    languageKey: 'project_task_page_type'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_DEV_TYPE,
    languageKey: 'project_task_dev_type'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_DEV_SOURCE,
    languageKey: 'project_task_dev_source'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_ESTIMATED_TIME,
    languageKey: 'project_task_estimated_time'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_CREATED_AT,
    languageKey: 'project_task_created_at'
  },
  {
    keyName: keyNames.KEY_NAME_TASK_MODE,
    languageKey: 'project_task_mode'
  }
];

export const columnRenderRemap = (EditFn?: (data: any) => void, DeleteFn?: (id: string) => void) => {
  return {
    [keyNames.KEY_NAME_TASK_NAME](col: string, data: any) {
      const name = data[col] ? data[col] : '';
      return (
        <Typography noWrap color="grey.700" onClick={() => EditFn && EditFn(data)}>
          {name}
        </Typography>
      );
    },
    [keyNames.KEY_NAME_TASK_CREATED_AT](col: string, data: any) {
      const createdAt = data[col] ? data[col] : '';
      return convertDateTimeServerToClient({ date: createdAt, isTime: false });
    },
    [keyNames.KEY_NAME_TASK_PAGE_TYPE](col: string, data: any) {
      const pageType = data[col] ? data[col] : null;
      return pageType?.name;
    },
    [keyNames.KEY_NAME_TASK_DEV_TYPE](col: string, data: any) {
      const devType = data[col] ? data[col] : null;
      return devType?.name;
    },
    [keyNames.KEY_NAME_TASK_DEV_SOURCE](col: string, data: any) {
      const devSource = data[col] ? data[col] : null;
      return devSource?.name;
    },
    [keyNames.KEY_NAME_TASK_ESTIMATED_TIME](col: string, data: any) {
      const estimatedTime = data[col] ? data[col] : null;
      return estimatedTime;
    },
    [keyNames.KEY_NAME_TASK_MODE](col: string, data: any) {
      // edit / delete
      return (
        <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
          <IconButton size="small" color="secondary" onClick={() => EditFn && EditFn(data.id)}>
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
