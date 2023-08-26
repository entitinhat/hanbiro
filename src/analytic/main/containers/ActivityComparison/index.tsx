import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import ListTable, {ListTableProps} from "@base/components/@hanbiro/List/ListTable";
import React, {useEffect, useMemo, useState} from "react";
import {ASC, DESC} from "@base/config/constant";
import {ColumnDef} from "@tanstack/react-table";
import {makeTable8Columns} from "@base/components/@hanbiro/ReactTable8/Helper";
import {MENU_CATEGORY_COMPARISON} from "@activity/config/comparison";
import * as keyNames from "@activity/config/keyNames";
import {columnRenderRemap} from "@activity/pages/ComparisonPage/Helper";
import {usePageLayoutByMenu} from "@base/hooks/forms/usePageLayout";
import {useGetActivityComparison} from "@analytic/main/hooks/useGetActivityComparison";
import _ from "lodash";
import {buildListSchema} from "@base/utils/helpers/schema";

const ActivityComparison = (props: ChartComponentProps) => {
  const { data: listLayoutData } = usePageLayoutByMenu(MENU_CATEGORY_COMPARISON, 'list');

  const { listQuerySchema, fields } = useMemo(() => {
    let fields: any[] = [];
    let listQuerySchema: string = '';

    if (listLayoutData && listLayoutData.data) {
      fields = listLayoutData.data;

      fields = fields.map((_ele: any) => {
        return {
          ..._ele,
          keyName: _ele.keyName,
          languageKey: _ele.languageKey,
          disableSortBy: !_ele.sortable,
          isViewing: _ele.defaultViewInList
        };
      });

      if (!_.isEmpty(fields)) {
        listQuerySchema = buildListSchema({ fields, configFields: {}, ignore: ['id', 'user'] });
      }
    }

    return { listQuerySchema, fields };
  }, [listLayoutData]);

  const { filters, ...restProps } = props;
  const [listFilter, setListFilter] = useState<any>({
    filter: {
      ...(filters?.filter ?? {}),
    }
  });
  useEffect(() => {
    setListFilter({
      filter: {
        ...listFilter.filter,
        ...(filters?.filter ?? {}),
      }
    });
  }, [filters]);

  const setSort = (newSort: any) => {
    setListFilter({
      filter: {
        ...listFilter.filter,
        sort: { ...newSort }
      }
    });
  }

  const {data} = useChartQuery(restProps, () => {
    return useGetActivityComparison(listQuerySchema, listFilter ?? {}, {
      enabled: !!fields?.length
    });
  });

  const disableSortByColumns: string | any[] = [];
  const tableFields = fields.map((_ele: any) => {
    return {
      ..._ele,
      ...(_ele.keyName === keyNames.KEY_NAME_COMPARISON_USERNAME ? { width: '300px!important' } : {}),
      enableSorting: !disableSortByColumns.includes(_ele.keyName)
    };
  });

  const tableColumns = useMemo<ColumnDef<any>[]>(() => makeTable8Columns(
    tableFields,
    columnRenderRemap(),
    {},
    []
  ), [tableFields]);

  const listTableProps: ListTableProps = {
    rows: data?.results ?? [],
    columns: tableColumns,
    checkedIds: [],
    onRowChecked: () => {},
    onPageChange: () => {},
    onSortBy: (clName: any, isSorted: any) => {
      if (isSorted !== false) {
        let orderBy = isSorted === 'desc' ? DESC : ASC;
        setSort({ field: clName, orderBy: orderBy });
      }
    }
  };

  return (
    <ListTable
      {...listTableProps}
      sx={{
        px: 0,
        mb: 0,
        maxHeight: 'calc(100vh - 190px)',
        '& thead': {
          '& > tr': {
            position: 'sticky',
            backgroundColor: (theme) => theme.palette.grey[50],
            top: 0,
            '& > th:after': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: '-1px',
              width: '100%',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }
          }
        }
      }}
    />
  );
}

export default ActivityComparison;