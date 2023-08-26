import BarHorizontal from "@analytic/main/components/ApexCharts/BarHorizontal";
import {useGetActivityPerformanceCounting} from "@analytic/main/hooks/useGetActivityPerformanceCounting";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";

const ActivityTopPerformerByTask = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetActivityPerformanceCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let chartData: any = { l: [], s: [] };
  if (!!results) {
    chartData = results.reduce((f: any, v: any) => {
      f['l'].push(v?.user?.name ?? '-');
      f['s'].push(v?.counting?.task ?? 0);
      return f;
    }, chartData);
  }

  return <BarHorizontal categories={chartData?.l ?? []} series={chartData?.s ?? []} />;
};

export default ActivityTopPerformerByTask;
