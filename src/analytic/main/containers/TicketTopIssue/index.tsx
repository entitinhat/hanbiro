import {useGetTicketCategoryCounting} from "@analytic/main/hooks/useGetTicketCategoryCounting";
import BarHorizontal from "@analytic/main/components/ApexCharts/BarHorizontal";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";

const TicketTopIssue = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketCategoryCounting(props?.filters ?? {});
  });

  const { results } = data ?? {};

  let chartData: any = { l: [], s: [] };
  if (!!results && !!results?.length) {
    chartData = results?.reduce((f: any, v: any) => {
      f['l'].push(v?.category?.name ?? '-');
      f['s'].push(v?.total ?? 0);
      return f;
    }, chartData);
  }

  return <BarHorizontal categories={chartData?.l ?? []} series={chartData?.s ?? []} />
};

export default TicketTopIssue;
