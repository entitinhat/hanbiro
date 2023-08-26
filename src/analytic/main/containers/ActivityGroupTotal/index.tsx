import { ChartComponentProps } from "@analytic/main/components/ChartBox";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";
import {useGetActivityPerformanceCounting} from "@analytic/main/hooks/useGetActivityPerformanceCounting";

const ActivityGroupTotal = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetActivityPerformanceCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let oData: any = {
    categories: [],
    total: [],
  };

  if (!!results) {
    oData = results.reduce((f: any, v: any) => {
      const { total = 0 } = v?.counting ?? {};
      f['categories'].push(v?.user?.name ?? '-');
      f['total'].push(total);
      return f;
    }, oData);
  }

  return <BarSimple series={oData.total} categories={oData.categories} />;
};

export default ActivityGroupTotal;
