import {times, keys} from "lodash";
import BarStacked from "@analytic/main/components/ApexCharts/BarStacked";
import {useGetTicketPriorityCounting} from "@analytic/main/hooks/useGetTicketPriorityCounting";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";

const TicketPriority = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketPriorityCounting(props?.filters);
  });

  const {results} = data ?? {};

  let chartData: any = {
    categories: [],
    data: {}
  };
  if (!!results) {
    chartData = results.reduce((f: any, v: any, i: number) => {
      const {date: {name}, countings} = v ?? {}
      f['categories'].push(name ?? '-');
      for (const ii in countings) {
        const counting = countings[ii];
        if(!f['data'][counting.priority]){
          f['data'][counting.priority] = {
            name: counting.priority,
            data: times(results?.length ?? 0, () => 0)
          };
        }
        f['data'][counting.priority].data[i] = counting.total
      }
      return f;
    }, chartData)
  }

  const series = keys(chartData.data).map((k) => chartData.data[k]) ?? []

  return <BarStacked categories={chartData?.categories ?? []} series={series}/>;
}

export default TicketPriority;