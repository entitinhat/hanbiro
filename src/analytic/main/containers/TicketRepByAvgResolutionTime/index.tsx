import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetTicketBaseCounting} from "@analytic/main/hooks/useGetTicketBaseCounting";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";

const TicketRepByAvgResolutionTime = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketBaseCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let chartData: any = {
    l: [],
    s: [],
  };
  if (!!results && !!results?.length) {
    chartData = results.reduce((f: any, v: any) => {
      f['l'].push(v?.user?.name ?? '--No Category Name--');
      f['s'].push(v?.value ?? 0);
      return f;
    }, chartData);
  }

  return <BarSimple series={chartData?.s ?? []} categories={chartData?.l ?? []} />;
};

export default TicketRepByAvgResolutionTime;
