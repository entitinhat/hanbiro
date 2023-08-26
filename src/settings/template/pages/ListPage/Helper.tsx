import { useMemo } from 'react';
import { Link, Link as RouteLink } from 'react-router-dom';
import * as keyNames from '@settings/template/config/key-names';
import { dateByOptions, groupByOptions, searchFields } from '@activity/config/list-field/options';
import { LabelValue, SearchFilter } from '@base/types/app';

import { Switch, Typography } from '@mui/material';
import {
  TEMPLATE_MESSAGE_TYPE_OPTIONS,
  TEMPLATE_STAGE_ACTIVE,
  TEMPLATE_TASK_TYPE_OPTIONS,
  TEMPLATE_TYPE_OPTIONS
} from '@settings/template/config/constants';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import RouteName from '@base/components/@hanbiro/RouteName';

export const columnRenderRemap = (menu: string, avaiLanguages: any, t: any) => ({
  [keyNames.KEY_MENU_TEMPLATE_NAME](col: string, data: any) {
    let name = data[col] ? data[col] : '';
    let sourceId = data.id ? data.id : '';
    let url = `/settings/${keyNames.KEY_MENU_TEMPLATE_TEMPLATE}/${menu}/${sourceId}`;
    return <RouteName name={name} url={url} component="h6" />;
  },

  [keyNames.KEY_MENU_TEMPLATE_TYPE](col: string, data: any) {
    const result = TEMPLATE_TYPE_OPTIONS?.find((v) => v.value === data[col])?.label ?? '(none)';
    return t(result);
  },
  [keyNames.KEY_MENU_TEMPLATE_LANGUAGE](col: string, data: any) {
    const result = avaiLanguages.find((language: any) => language.value == data[col])?.label || '(none)';
    return result;
  },
  [keyNames.KEY_MENU_TEMPLATE_DESCRIPTION](col: string, data: any) {
    return data[col] || '(none)';
  },
  [keyNames.KEY_MENU_TEMPLATE_STAGE](col: string, data: any) {
    const checked = data?.[col] === TEMPLATE_STAGE_ACTIVE;
    return <Switch checked={checked} size="small" readOnly disabled />;
  },
  [keyNames.KEY_MENU_TEMPLATE_SUB_TYPE](col: string, data: any) {
    const result =
      TEMPLATE_TASK_TYPE_OPTIONS?.find((v) => v.value === data[col])?.label ??
      TEMPLATE_MESSAGE_TYPE_OPTIONS?.find((v) => v.value === data[col])?.label ??
      '(none)';
    return t(result);
  },
  [keyNames.KEY_MENU_TEMPLATE_CREATED_AT](col: string, data: any) {
    return data?.[col] ? convertDateTimeServerToClient({ date: data?.[col], humanize: true }) : '';
    //<TextView value="" />
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
