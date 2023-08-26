import NoData from "@base/components/@hanbiro/NoData";
import {makeTable8Columns} from "@base/components/@hanbiro/ReactTable8/Helper";
import ListTable from "@base/components/@hanbiro/List/ListTable";
import {useGetActivityPerformanceCounting} from "@analytic/main/hooks/useGetActivityPerformanceCounting";
import {useEffect, useState} from "react";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";

const ActivityGroupPerformance = (props: ChartComponentProps) => {
  const { filters, ...restProps } = props;

  const [listFilter, setListFilter] = useState<any>({
    filter: {
      ...(filters?.filter ?? {}),
    }
  });

  const setSort = (sort: any) => {
    let newFilter = {
      ...listFilter,
      filter: {
        ...listFilter.filter,
        sort: sort,
      },
    };
    setListFilter(newFilter);
  };

  useEffect(() => {
    setListFilter({
      filter: {
        ...listFilter.filter,
        ...(filters?.filter ?? {}),
      }
    });
  }, [filters]);

  const {data, isLoading, isFetching} = useChartQuery(restProps, () => {
    return useGetActivityPerformanceCounting(listFilter ?? {});
  });

  const fields = [
    {
      keyName: 'groupName',
      languageKey: 'ncrm_dashboard_chart_field_group_name',
      canSort: true,
    },
    {
      keyName: 'total',
      languageKey: 'ncrm_dashboard_chart_field_total',
    },
    {
      keyName: 'email',
      languageKey: 'ncrm_dashboard_chart_field_email',
    },
    {
      keyName: 'call',
      languageKey: 'ncrm_dashboard_chart_field_call',
    },
    {
      keyName: 'task',
      languageKey: 'ncrm_dashboard_chart_field_task',
    },
    {
      keyName: 'sms',
      languageKey: 'ncrm_dashboard_chart_field_sms',
    },
    {
      keyName: 'avgDuration',
      languageKey: 'ncrm_dashboard_chart_field_avg_duration',
    }
  ];

  const getMapColumns = () => {
    return {
      groupName(col: string, data: any) {
        return data[col] || '';
      },
      total(col: string, data: any) {
        return data[col] || 0;
      },
      email(col: string, data: any) {
        return data[col] || 0;
      },
      call(col: string, data: any) {
        return data[col] || 0;
      },
      task(col: string, data: any) {
        return data[col] || 0;
      },
      sms(col: string, data: any) {
        return data[col] || 0;
      },
      avgDuration(col: string, data: any) {
        return data[col] || 0;
      }
    };
  };

  const { results = [] } = data ?? {};

  const tableProps = {
    nodata: <NoData />,
    rows:
      results?.map((v: any) => {
        return {
          ...(v?.counting ?? {}),
          groupName: v?.group?.name ?? '',
        };
      }) ?? [],
    loading: isLoading || isFetching,
    columns: makeTable8Columns(fields, getMapColumns(), {}, []),
    initialState: {
      pageSize: 0,
      pageIndex: 1,
      selectedIds: [],
    },
    onCheckedRow: () => null,
    onSortBy: (clName: any, isSortedDesc: boolean) => {
      let orderBy = isSortedDesc ? 1 : 2;
      setSort({ field: clName, orderBy: orderBy });
    },
    isCheckboxTable: false,
    className: 'rounded-0 bd-l-0 bd-r-0 bd-b-0',
  };

  return (
    <ListTable {...tableProps} />
  );
};

export default ActivityGroupPerformance;
