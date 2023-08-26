import Donut from "@analytic/main/components/ApexCharts/Donut";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetActivityPriorityCounting} from "@analytic/main/hooks/useGetActivityPriorityCounting";

const ActivityPriority = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetActivityPriorityCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let chartData: any = {
    l: [],
    s: [],
  };
  if (!!results && !!results?.length) {
    chartData = results.reduce((f: any, v: any) => {
      f['l'].push(v?.priority ?? '- No Priority Name -');
      f['s'].push(v?.total ?? 0);
      return f;
    }, chartData);
  }

  return <Donut series={chartData?.s} categories={chartData?.l} />;
};

export default ActivityPriority;
