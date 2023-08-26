import Line from "@analytic/main/components/ApexCharts/Line";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetTicketByDateCounting} from "@analytic/main/hooks/useGetTicketByDateCounting";

const TicketAvgSupportPerformance = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetTicketByDateCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let oData: any = {};
  if (!!results) {
    oData = results.reduce(
      (f: any, v: any) => {
        const {
          avgAssignTime = 0,
          avg1stResponseTime = 0,
          avgResolutionTime = 0,
        } = v?.counting ?? {};
        f['categories'].push(v?.date?.name ?? '-');
        f['avgAssignedTime']['data'].push(avgAssignTime);
        f['avg1stResponseTime']['data'].push(avg1stResponseTime);
        f['avgResolutionTime']['data'].push(avgResolutionTime);
        return f;
      },
      {
        categories: [],
        avgAssignedTime: {
          name: 'Avg. Assign Time',
          data: [],
        },
        avg1stResponseTime: {
          name: 'Avg. 1st Response Time',
          data: [],
        },
        avgResolutionTime: {
          name: 'Avg. Resolution Time',
          data: [],
        },
      },
    );
  }

  return <Line
    series={[oData.avgAssignedTime, oData.avg1stResponseTime, oData.avgResolutionTime]}
    categories={oData?.categories ?? []}
  />;
};

export default TicketAvgSupportPerformance;
