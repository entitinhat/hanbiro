export const DEFAULT_CATEGORY = 'dashboard';
import { isUndefined } from 'lodash';
import { Link } from 'react-router-dom';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import { MAIN_MENU, NAME_KEY, PRIMARY_KEY } from '@settings/site/config/pages/mainPage';
import { useSites } from '@settings/site/services/service';
import { SiteTemplate } from '@settings/site/types/site';

/** LIST PAGE CONFIG */
export const ListPageConfig = {
  primaryKey: PRIMARY_KEY,
  nameKey: NAME_KEY,
  useFectchList: useSites,
  getTitle: (row: any, isSplitMode: boolean): string => {
    const name = row && isUndefined(row[NAME_KEY]) ? '' : row[NAME_KEY];
    return name;
  },
  searchFields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      defaultValue: '',
    },
  ],
  groupByOptions: [],
  dateByOptions: [
    // { label: 'Created', value: 'createdAt' },
    // { label: 'Updated', value: 'updatedAt' },
  ],
  filterByOptions: [],
  getColumnRenderRemap: (extraParams: any) => {
    const { category } = extraParams;
    // console.log(extraParams, category);
    return {
      name(col: string, row: SiteTemplate) {
        // console.log('name', category);
        return <Link to={`/settings/${MAIN_MENU}/${category}/${row.id}`}>{row.name}</Link>;
      },
    };
  },
  getColumns: () => {
    let columns: any = [
      { name: 'id', title: 'id' },
      { name: 'name', title: 'name' },
      { name: 'siteGroup', title: 'siteGroup' },
      { name: 'description', title: 'Description' },
      { name: 'thumbnail', title: 'thumbnail' },
      { name: 'createdAt', title: <SpanLang keyLang="desk_knowledge_field_createdat" /> },
      { name: 'createdBy', title: <SpanLang keyLang="desk_knowledge_field_createdby" /> },
    ];
    return columns;
  },
  getFields: () => {
    let fields: any = [
      { keyName: 'id', languageKey: 'id' },
      { keyName: 'name', languageKey: 'name' },
      { keyName: 'siteGroup', languageKey: 'siteGroup' },
      { keyName: 'description', languageKey: 'Description' },
      { keyName: 'thumbnail', languageKey: 'thumbnail' },
      { keyName: 'createdAt', languageKey: 'desk_knowledge_field_createdat' },
      { keyName: 'createdBy', languageKey: 'desk_knowledge_field_createdby' },
    ];
    return fields;
  },
  getHideColumns: () => {
    let columns: string[] = ['id', 'thumbnail', 'name'];
    return columns;
  },
};
