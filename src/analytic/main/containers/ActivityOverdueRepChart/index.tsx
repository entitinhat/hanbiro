import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";
import {useGetActivityPerformanceCounting} from "@analytic/main/hooks/useGetActivityPerformanceCounting";

const ActivityOverdueRepChart = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetActivityPerformanceCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let chartData: any = { l: [], s: [] };
  if (!!results) {
    chartData = results?.reduce((f: any, v: any) => {
      f['l'].push(v?.user?.name ?? '-');
      f['s'].push(v?.counting?.overdue ?? 0);
      return f;
    }, chartData);
  }

  return <BarSimple series={chartData.s} categories={chartData.l} />;
};

export default ActivityOverdueRepChart;
