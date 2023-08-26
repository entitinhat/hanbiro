import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {ALL_COLORS} from "@analytic/main/config/colors";
import BarMarker from "@analytic/main/components/ApexCharts/BarMarker";
import {useGetActivityDateCounting} from "@analytic/main/hooks/useGetActivityDateCounting";
import { useTranslation } from "react-i18next";

const ActivityDuration = (props: ChartComponentProps) => {
  const {me = false, filters, ...restProps} = props;
  const { t } = useTranslation()
  const {data} = useChartQuery(restProps, () => {
    return useGetActivityDateCounting(filters ?? {}, {forWhichChart: 'ActivityDuration'});
  });

  const { results = [] } = data ?? {};

  let oData: any = {
    categories: [],
    duration: {
      name: me ? t('ncrm_dashboard_chart_field_my_duration') : t('ncrm_dashboard_chart_field_duration'),
      data: [],
    },
    avgDuration: {
      name: t('ncrm_dashboard_chart_field_avg_duration'),
      data: [],
    },
  };

  if (!!results) {
    oData = results.reduce((f: any, v: any) => {
      const { duration = 0, avgDuration = 0 } = v?.counting ?? {};
      f['categories'].push(v?.date?.name ?? '-');
      f['duration']['data'].push(duration);
      f['avgDuration']['data'].push(avgDuration);
      return f;
    }, oData);
  }

  const chartData: any[] = oData.categories.map((v: string, i: number) => {
    return {
      x: v,
      y: oData.duration.data?.[i] ?? 0,
      goals: [
        {
          name: oData.avgDuration.name,
          value: oData.avgDuration.data?.[i] ?? 0,
          strokeWidth: 6,
          strokeHeight: 5,
          strokeColor: ALL_COLORS[1],
        },
      ],
    };
  });

  return (
    <BarMarker
      series={[
        {
          name: oData.duration.name,
          data: chartData,
        },
      ]}
      categories={[oData.duration.name, oData.avgDuration.name]}
    />
  );
};

export default ActivityDuration;
