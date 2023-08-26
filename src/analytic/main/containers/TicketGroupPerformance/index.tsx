import ListTable from "@base/components/@hanbiro/List/ListTable";
import NoData from "@base/components/@hanbiro/NoData";
import {makeTable8Columns} from "@base/components/@hanbiro/ReactTable8/Helper";
import {useGetTicketPerformanceCounting} from "@analytic/main/hooks/useGetTicketPerformanceCounting";
import {useEffect, useState} from "react";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";

const TicketGroupPerformance = (props: ChartComponentProps) => {
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

  const {data, isFetching} = useChartQuery(restProps, () => {
    return useGetTicketPerformanceCounting(filters ?? {});
  });

  const fields = [
    {
      keyName: 'groupName',
      languageKey: 'ncrm_dashboard_chart_field_group_name',
      canSort: true,
    },
    {
      keyName: 'assigned',
      languageKey: 'ncrm_dashboard_chart_field_assigned',
    },
    {
      keyName: 'resolved',
      languageKey: 'ncrm_dashboard_chart_field_resolved',
    },
    {
      keyName: 'unresolved',
      languageKey: 'ncrm_dashboard_chart_field_unresolved',
    },
    {
      keyName: 'avg1stResponseTimeString',
      languageKey: 'ncrm_dashboard_chart_field_avg_1st_respone',
    },
    {
      keyName: 'avgResolutionTimeString',
      languageKey: 'ncrm_dashboard_chart_field_avg_resolution_time',
    },
    {
      keyName: 'avgResolveTimeEfficiencyString',
      languageKey: 'ncrm_dashboard_chart_field_avg_resolve_time_efficiency',
    },
  ];

  const getMapColumns = () => {
    return {
      groupName(col: string, data: any) {
        return data[col] || '-No Group Name-';
      },
      assigned(col: string, data: any) {
        return data[col] || 0;
      },
      resolved(col: string, data: any) {
        return data[col] || 0;
      },
      unresolved(col: string, data: any) {
        return data[col] || 0;
      },
      avg1stResponseTimeString(col: string, data: any) {
        return data[col] || 0;
      },
      avgResolutionTimeString(col: string, data: any) {
        return data[col] || 0;
      },
      avgResolveTimeEfficiencyString(col: string, data: any) {
        return data[col] || 0;
      },
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
    loading: isFetching,
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
    <ListTable sx={{p: 0, m: 0}} {...tableProps} />
  );
};

export default TicketGroupPerformance;
