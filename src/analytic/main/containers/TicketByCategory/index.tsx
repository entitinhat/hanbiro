import Donut from "@analytic/main/components/ApexCharts/Donut";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {useGetTicketBaseCounting} from "@analytic/main/hooks/useGetTicketBaseCounting";

const TicketByCategory = (props: any) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketBaseCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  const chartData = results?.reduce(
    (f: any, v: any) => {
      f['l'].push(v?.category?.name ?? '--No Category Name--');
      f['s'].push(v?.value ?? 0);
      return f;
    },
    { l: [], s: [] },
  ) ?? { l: [], s: [] };

  return <Donut series={chartData.s} categories={chartData.l} />;
};

export default TicketByCategory;
