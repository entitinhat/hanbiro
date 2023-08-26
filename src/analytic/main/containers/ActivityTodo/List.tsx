import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import ListTable, {ListTableProps} from "@base/components/@hanbiro/List/ListTable";
import {makeTable8Columns} from "@base/components/@hanbiro/ReactTable8/Helper";
import {LIST_TABLE_PAGE_SIZE} from "@base/config/constant";
import {useGetActivityTodoList} from "@analytic/main/hooks/useGetActivityTodoList";
import {assignToMe} from "@analytic/main/config/defaultQueryString";
import {makeDateQueryStr} from "@analytic/main/utils/query";
import {thisMonthDayJs} from "@analytic/main/utils/date";
import {ListPaginationProps} from "@base/components/@hanbiro/List/ListPagination";

interface ListProps {
  me?: boolean;
  args?: {
    action: string;
    data: any;
  };
}

const List = (props: ListProps) => {
  const { args, me = false } = props;

  const defaultQueries = me
    ? [assignToMe, 'classification=CLASSIFICATION_TODO']
    : ['classification=CLASSIFICATION_TODO'];

  const [filters, setFilters] = useState<any>({
    filter: {
      query: [
        ...defaultQueries,
        makeDateQueryStr('date', thisMonthDayJs, thisMonthDayJs.endOf('month')),
      ].join(' '),
      paging: {
        page: 1,
        size: 10,
      },
    },
  });

  const setQuery = (query: string) => {
    let newQueries = [...defaultQueries, query];
    setFilters({
      ...filters,
      filter: {
        ...filters.filter,
        query: newQueries.join(' '),
      },
    });
  };

  const setPaging = (paging: any) => {
    setFilters({
      ...filters,
      filter: {
        ...filters.filter,
        paging: {
          ...filters.filter.paging,
          ...paging,
        },
      },
    });
  };

  useEffect(() => {
    if (!!args && !!args?.data) {
      const { start, end } = args.data;

      let newQueries: string[] = [];

      if (start) {
        const startDayJs = dayjs(start);
        newQueries = [...newQueries, 'date>="' + startDayJs.toISOString() + '"'];
      }

      if (end) {
        const endDayJs = dayjs(end);
        newQueries = [...newQueries, 'date<="' + endDayJs.toISOString() + '"'];
      }

      setQuery(newQueries.join(' '));
    }
  }, [args]);

  const { data: todoData, isLoading, isFetching } = useGetActivityTodoList(filters);

  const { results: todos = [], paging = {} } = todoData ?? {};

  const getMapColumns = () => {
    return {
      type(col: string, data: any) {
        return data[col] || '-';
      },
      priority(col: string, data: any) {
        return data[col] || '-';
      },
      subject(col: string, data: any) {
        return data[col] || '-';
      },
      customers(col: string, data: any) {
        return data[col] || '-';
      }
      /*status(col: string, data: any) {
        return data[col] || '-';
      },
      startTime(col: string, data: any) {
        return data?.[col]
          ? convertDateTimeServerToClient({
              date: data[col],
              humanize: false,
            })
          : '-';
      },
      endTime(col: string, data: any) {
        return data?.[col]
          ? convertDateTimeServerToClient({
              date: data[col],
              humanize: false,
            })
          : '-';
      },*/
    };
  };

  const fields = [
    {
      keyName: 'type',
      languageKey: 'ncrm_dashboard_chart_field_type',
      canSort: true,
    },
    {
      keyName: 'priority',
      languageKey: 'ncrm_dashboard_chart_field_priority',
    },
    {
      keyName: 'subject',
      languageKey: 'ncrm_dashboard_chart_field_subject',
    },
    {
      keyName: 'customer',
      languageKey: 'ncrm_dashboard_chart_field_customer',
    }
    /*{
      keyName: 'status',
      languageKey: 'Status',
    },
    {
      keyName: 'startTime',
      languageKey: 'Start Date',
    },
    {
      keyName: 'endTime',
      languageKey: 'End Date',
    },*/
  ];

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const tableProps: ListTableProps = {
    rows: todos ?? [],
    columns: makeTable8Columns(fields, getMapColumns(), {}, []),
    onPageChange: handlePagingChange
  };

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: paging?.itemPerPage || LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  return (
    <ListTable sx={{px: 0, mb: 0}} {...tableProps} pagingProps={pagingProps}/>
  );
};

export default List;