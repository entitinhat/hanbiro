import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetTicketBaseCounting} from "@analytic/main/hooks/useGetTicketBaseCounting";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";

const TicketRepByResolvedTicket = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketBaseCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  const chartData = results?.reduce(
    (f: any, v: any) => {
      f['l'].push(v?.user?.name ?? '--No Category Name--');
      f['s'].push(v?.value ?? 0);
      return f;
    },
    { l: [], s: [] },
  ) ?? { l: [], s: [] };

  return <BarSimple series={chartData?.s ?? []} categories={chartData?.l ?? []} />;
};

export default TicketRepByResolvedTicket;
