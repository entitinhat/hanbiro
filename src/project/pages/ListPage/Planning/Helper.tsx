import React, { useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { LabelValue, SearchFilter } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Stack, Typography } from '@mui/material';
import * as keyNames from '@project/config/keyNames';
import { dateByOptions, groupByOptions, searchFields } from '@project/config/list-field/options';

export const fields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_PLANNING_MAIN_PROJECT,
    languageKey: 'ncrm_project_planning_main_project'
  },
  {
    keyName: keyNames.KEY_NAME_PLANNING_SUB_PROJECT,
    languageKey: 'ncrm_project_planning_sub_project'
  },
  {
    keyName: keyNames.KEY_NAME_PLANNING_PAGE_TYPE,
    languageKey: 'ncrm_project_planning_page_type'
  },
  {
    keyName: keyNames.KEY_NAME_PLANNING_NAME,
    languageKey: 'ncrm_project_planning_name'
  },
  {
    keyName: keyNames.KEY_NAME_PLANNING_NUMBER_DEV_TASK,
    languageKey: 'ncrm_project_planning_number_dev_task'
  },
  {
    keyName: keyNames.KEY_NAME_PLANNING_STAGE,
    languageKey: 'ncrm_project_planning_stage'
  },
  {
    keyName: keyNames.KEY_NAME_PLANNING_CREATED_BY,
    languageKey: 'ncrm_project_planning_created_by'
  }

  // {
  //   keyName: keyNames.KEY_NAME_PROJECT_CREATED_AT,
  //   languageKey: 'ncrm_project_planning_created_at'
  // }
];

export const columnRenderRemap = () => {
  return {
    [keyNames.KEY_NAME_PLANNING_NAME](col: string, data: any) {
      const name = data[col] ? data[col] : '';
      const id = data.id ? data.id : '';
      const url = `/project/planning/${id}`;
      return (
        <RouteLink to={url} style={{ textDecoration: 'none' }}>
          <Typography noWrap color="grey.700">
            {name}
          </Typography>
        </RouteLink>
      );
    },
    [keyNames.KEY_NAME_PLANNING_NUMBER_DEV_TASK](col: string, data: any) {
      return data[col] ? data[col] : null;
    },
    [keyNames.KEY_NAME_PLANNING_MAIN_PROJECT](col: string, data: any) {
      return data[col] ? data[col] : null;
    },

    [keyNames.KEY_NAME_PLANNING_SUB_PROJECT](col: string, data: any) {
      return data[col] ? data[col] : null;
    },
    [keyNames.KEY_NAME_PLANNING_PAGE_TYPE](col: string, data: any) {
      const pageType = data[col] ? data[col] : null;
      return pageType?.name;
    },
    [keyNames.KEY_NAME_PLANNING_CREATED_BY](col: string, data: any) {
      const createdBy = data[col] ?? null;
      return (
        <Stack spacing={1.5} sx={{ minWidth: 160 }} direction="row" alignItems="center">
          <HanAvatar
            key={createdBy.id}
            name={createdBy.name}
            size="sm"
            // photo={}
          />
          <Stack spacing={0}>
            <Typography variant="body1" noWrap>
              {createdBy.name}
            </Typography>
            {data.createdAt && (
              <Typography variant="caption" color="textSecondary" noWrap>
                {convertDateTimeServerToClient({ date: data.createdAt, isTime: true, humanize: false })}
              </Typography>
            )}
          </Stack>
        </Stack>
      );
    },
    // [keyNames.KEY_NAME_PROJECT_CREATED_AT](col: string, data: any) {
    //   const createdAt = data[col] ? data[col] : '';
    //   return convertDateTimeServerToClient({ date: createdAt, isTime: false });
    // },
    [keyNames.KEY_NAME_PLANNING_STAGE](col: string, data: any) {
      const stage = data[col] ? data[col] : null;
      return stage;
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
