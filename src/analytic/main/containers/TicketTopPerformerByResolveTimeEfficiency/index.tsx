import BarHorizontal from "@analytic/main/components/ApexCharts/BarHorizontal";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {useGetTicketPerformanceCounting} from "@analytic/main/hooks/useGetTicketPerformanceCounting";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";

const TicketTopPerformerByResolveTimeEfficiency = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketPerformanceCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  const chartData = results?.reduce(
    (f: any, v: any) => {
      f['l'].push(v?.group?.name ?? '-');
      f['s'].push(v?.counting?.avgResolveTimeEfficiency ?? 0);
      return f;
    },
    { l: [], s: [] },
  ) ?? { l: [], s: [] };

  return <BarHorizontal categories={chartData?.l ?? []} series={chartData?.s ?? []} />;
};

export default TicketTopPerformerByResolveTimeEfficiency;
