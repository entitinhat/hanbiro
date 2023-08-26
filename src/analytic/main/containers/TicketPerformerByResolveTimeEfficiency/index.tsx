import BarMarker from "@analytic/main/components/ApexCharts/BarMarker";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetTicketByDateCounting} from "@analytic/main/hooks/useGetTicketByDateCounting";
import {ALL_COLORS} from "@analytic/main/config/colors";
import { useTranslation } from "react-i18next";

const TicketPerformerByResolveTimeEfficiency = (props: ChartComponentProps) => {
  const {me, filters, ...restProps} = props;
  const { t } = useTranslation()
  const {data} = useChartQuery(restProps, () => {
    return useGetTicketByDateCounting(filters ?? {});
  });

  const { results = [] } = data ?? {};

  let oData: any = {
    categories: [],
    resolveTimeEfficiency: {
      name: me ? t('ncrm_dashboard_chart_field_my_resolve_time') : t('ncrm_dashboard_chart_field_resolve_time'),
      data: [],
    },
    avgResolveTimeEfficiency: {
      name: t('ncrm_dashboard_chart_field_avg_resolve_time'),
      data: [],
    },
  };

  if (!!results) {
    oData = results.reduce((f: any, v: any) => {
      const { resolutionTime = 0, avgResolutionTime = 0 } = v?.counting ?? {};
      f['categories'].push(v?.date?.name ?? '-');
      f['resolveTimeEfficiency']['data'].push(resolutionTime);
      f['avgResolveTimeEfficiency']['data'].push(avgResolutionTime);
      return f;
    }, oData);
  }

  const chartData: any[] = oData.categories.map((v: string, i: number) => {
    return {
      x: v,
      y: oData.resolveTimeEfficiency.data?.[i] ?? 0,
      goals: [
        {
          name: oData.avgResolveTimeEfficiency.name,
          value: oData.avgResolveTimeEfficiency.data?.[i] ?? 0,
          strokeWidth: 6,
          strokeHeight: 5,
          strokeColor: ALL_COLORS[1],
        },
      ],
    };
  });

  return <BarMarker
    series={[
      {
        name: oData.resolveTimeEfficiency.name,
        data: chartData,
      },
    ]}
    categories={[oData.resolveTimeEfficiency.name, oData.avgResolveTimeEfficiency.name]}
  />;
};

export default TicketPerformerByResolveTimeEfficiency;
