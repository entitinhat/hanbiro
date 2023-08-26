import { useMemo } from 'react';
import * as keyNames from '../../config/key-names';
import { dateByOptions, groupByOptions, searchFields } from '@activity/config/list-field/options';
import { LabelValue, SearchFilter } from '@base/types/app';
import { SITE_MESSAGE_TYPE_OPTIONS, SITE_STAGE_OPTIONS, SITE_TASK_TYPE_OPTIONS, SITE_TYPE_OPTIONS } from '../../config/constants';
import RouteName from '@base/components/@hanbiro/RouteName';
// import { avaiLanguages } from '@base/containers/LanguageSelect';

export const columnRenderRemap = (menu: string) => ({
  [keyNames.KEY_MENU_SITE_NAME](col: string, data: any) {
    let name = data[col] ? data[col] : '';
    let sourceId = data.id ? data.id : '';
    let url = `/settings/sites/${menu}/${sourceId}`;
    return <RouteName name={name} url={url} component="h6" />;
  },

  [keyNames.KEY_MENU_SITE_TYPE](col: string, data: any) {
    return SITE_TYPE_OPTIONS?.find((v: any) => v.value === data[col])?.label ?? '(none)';
  },
  [keyNames.KEY_MENU_SITE_SUB_TYPE](col: string, data: any) {
    return SITE_MESSAGE_TYPE_OPTIONS?.find((v: any) => v.value === data[col])?.label ?? '(none)';
  },
  [keyNames.KEY_MENU_SITE_DESCRIPTION](col: string, data: any) {
    return data[col] || '(none)';
  },
  [keyNames.KEY_MENU_SITE_STAGE](col: string, data: any) {
    return SITE_STAGE_OPTIONS?.find((v: any) => v.value === data[col])?.label ?? 'none';
  },
  [keyNames.KEY_MENU_SITE_SUB_TYPE](col: string, data: any) {
    return SITE_TASK_TYPE_OPTIONS?.find((v: any) => v.value === data[col])?.label ?? '(none)';
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
