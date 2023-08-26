import ListTable from "@base/components/@hanbiro/List/ListTable";
import NoData from "@base/components/@hanbiro/NoData";
import {makeTable8Columns} from "@base/components/@hanbiro/ReactTable8/Helper";
import {useGetActivityPerformanceCounting} from "@analytic/main/hooks/useGetActivityPerformanceCounting";
import {useEffect, useState} from "react";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";

const ActivityRepPerformance = (props: ChartComponentProps) => {
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

  const {data, isLoading, isFetching} = useChartQuery(restProps, () => {
    return useGetActivityPerformanceCounting(listFilter ?? {});
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

  const fields = [
    {
      keyName: 'repName',
      languageKey: 'ncrm_dashboard_chart_field_rep_name',
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
      languageKey: 'ncrm_dashboard_chart_field_duration',
    }
  ];

  const getMapColumns = () => {
    return {
      repName(col: string, data: any) {
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
          repName: v?.user?.name ?? '',
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
    <ListTable sx={{px: 0, mb: 0}} {...tableProps} />
  );
};

export default ActivityRepPerformance;
