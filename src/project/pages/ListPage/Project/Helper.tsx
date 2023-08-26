import React, { useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import { LabelValue, SearchFilter } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Chip, Stack, Typography } from '@mui/material';
import * as keyNames from '@project/config/keyNames';
import { dateByOptions, groupByOptions, searchFields } from '@project/config/list-field/options';
import { AssignRole, Field } from '@project/types/project';

export const fields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_PROJECT_NAME,
    languageKey: 'ncrm_project_project_name'
  },
  {
    keyName: keyNames.KEY_NAME_PROJECT_ACCOUNT,
    languageKey: 'Customer'
  },
  {
    keyName: keyNames.KEY_NAME_PROJECT_MEMBERS,
    languageKey: 'PM'
  },
  {
    keyName: keyNames.KEY_NAME_PROJECT_STAGE,
    languageKey: 'Stage'
  },
  {
    keyName: keyNames.KEY_NAME_PROJECT_DUE_DATE,
    languageKey: 'Due Date'
  },
  {
    keyName: keyNames.KEY_NAME_PROJECT_CREATED_AT,
    languageKey: 'Created At'
  }
];

export const columnRenderRemap = () => {
  return {
    [keyNames.KEY_NAME_PROJECT_NAME](col: string, data: any) {
      const name = data[col] ? data[col] : '';
      const id = data.id ? data.id : '';
      const url = `/project/project/${id}`;
      return (
        <RouteLink to={url} style={{ textDecoration: 'none' }}>
          <Typography noWrap color="grey.700">
            {name}
          </Typography>
        </RouteLink>
      );
    },
    [keyNames.KEY_NAME_PROJECT_CREATED_AT](col: string, data: any) {
      const createdAt = data[col] ? data[col] : '';
      return convertDateTimeServerToClient({ date: createdAt, isTime: false });
    },
    [keyNames.KEY_NAME_PROJECT_DUE_DATE](col: string, data: any) {
      const dueDate = data[col] ? data[col] : '';
      return convertDateTimeServerToClient({ date: dueDate });
    },
    [keyNames.KEY_NAME_PROJECT_ACCOUNT](col: string, data: any) {
      const account = data[col] ? data[col] : null;
      return account?.name;
    },
    [keyNames.KEY_NAME_PROJECT_MEMBERS](col: string, data: any) {
      const members = data[col] ? data[col] : null;
      const pm = members?.find((v: AssignRole) => v.role == 'ROLE_PM');
      let total = 0;
      pm?.fields?.forEach((v: Field) => (total += v.assignTo?.length));

      return total > 0 ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography noWrap>{pm.fields[0].assignTo[0]?.name}</Typography>
          {total > 1 && <Chip size="small" label={`+ ${total - 1}`} />}
        </Stack>
      ) : (
        ''
      );
    },
    [keyNames.KEY_NAME_PROJECT_STAGE](col: string, data: any) {
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
