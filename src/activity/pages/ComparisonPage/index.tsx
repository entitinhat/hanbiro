import _ from 'lodash';
import React, { memo, useEffect, useMemo, useState } from 'react';

import { CATEGORY_COMPARISON, MENU_CATEGORY_COMPARISON } from '@activity/config/comparison';
import { useComparisonUsers } from '@activity/hooks/useComparisonUsers';
import PageBody from '@activity/pages/ComparisonPage/Body';
import PageHeader from '@activity/pages/ComparisonPage/Header';
import PageToolbar from '@activity/pages/ComparisonPage/Toolbar';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { LIST_STALE_TIME } from '@base/config/constant';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { FilterInput } from '@base/types/common';
import { ColumnSetting } from '@base/types/setting';
import { buildListSchema, generateFilterQuery } from '@base/utils/helpers/schema';
import { getParseFilterQuery } from './Helper';
import { comparisonGroup, comparisonUser } from '@activity/config/list-field/comparison-column';

let undifinedPatern = /undefined/g;
interface ComparisonPageProps {}

const ComparisonPage = (props: ComparisonPageProps) => {
  let category = CATEGORY_COMPARISON;
  const { settingColumns, sort, filterQuery, setFilter, setSettingColumns, filterValues } = useListPageSettings(MENU_CATEGORY_COMPARISON);

  const { data: listLayoutData } = usePageLayoutByMenu(MENU_CATEGORY_COMPARISON, 'list');

  const [filterDateQuery, setFilterDateQuery] = useState<string>('');

  const groupBy = ['user', 'group'].includes(filterValues?.groupBy) ? filterValues?.groupBy : 'user';

  const { listQuerySchema, fields } = useMemo(() => {
    let fields: any[] = [];
    let listQuerySchema: string = '';

    if (listLayoutData && listLayoutData.data) {
      // fields = listLayoutData.data;
      if (groupBy == 'user') {
        fields = comparisonUser;
      } else {
        fields = comparisonGroup;
      }
      fields = fields.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          disableSortBy: !_ele.sortable
        };
      });

      if (!_.isEmpty(fields)) {
        listQuerySchema = buildListSchema({ fields, configFields: {}, ignore: ['id', 'user', 'group'] });
      }
    }

    return { listQuerySchema, fields };
  }, [listLayoutData, groupBy]);

  const filtersQuery: FilterInput = {
    sort: sort,
    query: [filterDateQuery, filterQuery].join(' ')
    // query:'(period>="2022-11-01T00:00:00.000Z" period<="2022-11-30T23:59:59.999Z") (lastPeriod>="2022-10-01T00:00:00.000Z" lastPeriod<="2022-10-31T23:59:59.999Z")'
  };

  const { results: data, refetch }: any = useComparisonUsers(
    listQuerySchema,
    {
      filter: filtersQuery
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME,
      enabled: !!fields?.length && !undifinedPatern.test(filterDateQuery)
    }
  );

  const setHeaderFilters = (headerFilters: any) => {
    //lastPeriod period
    if (_.has(headerFilters, 'lastPeriod') && _.has(headerFilters, 'period')) {
      const nFilterDateQuery = getParseFilterQuery(headerFilters);
      setFilterDateQuery(nFilterDateQuery);
    }
    setFilter({ ...filterValues, ...headerFilters });
  };

  useEffect(() => {
    // in case the menu doesn't user setting, do update setting columns.
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns(fields);
    }
  }, [fields]);

  const columnsSettingProps: ColumnsSettingProps = {
    columns: settingColumns,
    onChange: (newColumns: ColumnSetting[]) => {
      const nColumns = newColumns.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          disableSortBy: !_ele.sortable
        };
      });
      setSettingColumns(nColumns);
    }
  };

  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar category={category} onRefresh={refetch} />;
  }, [category]);

  const PageHeaderMemo = useMemo(() => {
    return <PageHeader columnsSettingProps={columnsSettingProps} onChange={setHeaderFilters} />;
  }, [data, settingColumns, category]);

  const PageBodyMemo = useMemo(() => {
    return <PageBody category={category} fields={fields || []} data={data ?? {}} />;
  }, [data, settingColumns, fields, category]);

  return (
    <>
      <ListContainer>
        {PageToolbarMemo}
        {PageHeaderMemo}
        {PageBodyMemo}
      </ListContainer>
    </>
  );
};

export default memo(ComparisonPage);
