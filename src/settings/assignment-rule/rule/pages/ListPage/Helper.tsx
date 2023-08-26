import { useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import { dateByOptions, groupByOptions, searchFields } from '@activity/config/list-field/options';
import { LabelValue, SearchFilter } from '@base/types/app';
import { Typography, Switch } from '@mui/material';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { AssignRule } from '@settings/assignment-rule/rule/types/rule';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import { AssignmentTypeOptions } from '@settings/assignment-rule/rule/config/constants';

export const columnRenderRemap = (menu: string) => ({
  name(col: string, row: AssignRule) {
    const name = row.name ?? '';
    let url = `/settings/assignment/rule/${row.id}`;

    return (
      <RouteLink to={url} style={{ textDecoration: 'none' }}>
        <Typography color="primary" component="h6">
          {name}
        </Typography>
      </RouteLink>
    );
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_MODULE](col: string, data: any) {
    let tmpData = AssignmentTypeOptions.filter((item) => item.value === data?.[col])[0];
    return tmpData.label;
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_ACTIVE](col: string, data: any) {
    return <Switch checked={data?.[col] || false} size="small" readOnly />;
  },
  createdAt(col: string, data: any) {
    return data[col] ? convertDateTimeServerToClient({ date: data[col], humanize: true }) : '';
  },
  createdBy(col: string, data: any) {
    const createdBy = data[col] ?? null;
    return createdBy?.name;
  },
  updatedAt(col: string, data: any) {
    // console.log('data[col]: ', data[col] ? convertDateTimeServerToClient({ date: data[col], humanize: true }) : '')
    return data[col] ? convertDateTimeServerToClient({ date: data[col], humanize: true }) : '';
  }

});

export const getQuery = (filter: SearchFilter | undefined) => {
  // filters query
  const groupBy = filter?.headerFilters?.groupBy;
  const groupByValue = useMemo(() => groupByOptions?.find((v: LabelValue) => v.value === groupBy), [groupBy]);

  const query = useMemo(() => {
    let queries: string[] = [];
    Object.keys(filter?.headerFilters).forEach((key) => {
      const value = filter?.headerFilters[key];
      const isDateTime = dateByOptions?.findIndex((v: LabelValue) => v.value === key) > -1;
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

  return query;
};
