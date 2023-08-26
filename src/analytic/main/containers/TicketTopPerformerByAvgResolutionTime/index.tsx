import BarHorizontal from "@analytic/main/components/ApexCharts/BarHorizontal";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {useGetTicketPerformanceCounting} from "@analytic/main/hooks/useGetTicketPerformanceCounting";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";

const TicketTopPerformerByAvgResolutionTime = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketPerformanceCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let chartData: any = {
    l: [],
    s: [],
  };
  if (!!results && !!results?.length) {
    chartData = results.reduce((f: any, v: any) => {
      f['l'].push(v?.group?.name ?? '-');
      f['s'].push(v?.counting?.avgResolutionTime ?? 0);
      return f;
    }, chartData);
  }

  return <BarHorizontal categories={chartData?.l ?? []} series={chartData?.s ?? []} />;
};

export default TicketTopPerformerByAvgResolutionTime;