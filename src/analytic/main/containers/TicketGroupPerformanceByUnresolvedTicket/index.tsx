import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {useGetTicketPerformanceCounting} from "@analytic/main/hooks/useGetTicketPerformanceCounting";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";

const TicketGroupPerformanceByUnresolvedTicket = (props: ChartComponentProps) => {
  const {me, filters, ...restProps} = props;

  const {data} = useChartQuery(restProps, () => {
    return useGetTicketPerformanceCounting(filters ?? {});
  });

  const { results = [] } = data ?? {};

  const chartData = results?.reduce(
    (f: any, v: any) => {
      f['l'].push((me ? v?.user?.name : v?.group?.name) ?? '-');
      f['s'].push(v?.counting?.unresolved ?? 0);
      return f;
    },
    { l: [], s: [] },
  ) ?? { l: [], s: [] };

  return <BarSimple categories={chartData?.l ?? []} series={chartData?.s ?? []} />;
};

export default TicketGroupPerformanceByUnresolvedTicket;
