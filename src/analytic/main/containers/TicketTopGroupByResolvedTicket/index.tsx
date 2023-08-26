import BarHorizontal from "@analytic/main/components/ApexCharts/BarHorizontal";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetTicketBaseCounting} from "@analytic/main/hooks/useGetTicketBaseCounting";

const TicketTopGroupByResolvedTicket = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketBaseCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  const chartData = results?.reduce(
    (f: any, v: any) => {
      f['l'].push(v?.group?.name ?? '--No Name--');
      f['s'].push(v?.value ?? 0);
      return f;
    },
    { l: [], s: [] },
  ) ?? { l: [], s: [] };

  return <BarHorizontal categories={chartData?.l ?? []} series={chartData?.s ?? []} />;
};

export default TicketTopGroupByResolvedTicket;
