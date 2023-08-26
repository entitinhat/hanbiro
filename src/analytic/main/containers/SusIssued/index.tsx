import Donut from "@analytic/main/components/ApexCharts/Donut";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import useGetSusIssuedCounting from "@analytic/main/hooks/useGetSusIssuedCounting";
import {useTranslation} from "react-i18next";
import {susStatusOptions} from "@analytic/main/config/options";
import {COLOR_BRINK_PINK} from "@analytic/main/config/colors";

const SusIssued = (props: ChartComponentProps) => {
  const { t } = useTranslation();

  const {data} = useChartQuery(props, () => {
    return useGetSusIssuedCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let chartData: any = {
    l: [],
    s: [],
  };
  if (!!results && !!results?.length) {
    chartData = results.reduce((f: any, v: any) => {
      f['l'].push(v?.idName?.id && susStatusOptions?.[v.idName.id] ? (t(susStatusOptions[v.idName.id]) as string) : '- No Label -');
      f['s'].push(v?.number1 ?? 0);
      return f;
    }, chartData);
  }

  return <Donut series={chartData?.s} categories={chartData?.l} overrideOptions={{
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: t('ncrm_dashboard_sus_issued') as string,
              formatter: (w: any) => {
                return w?.globals?.seriesTotals?.reduce((a: number, b: number) => {
                  return a + b
                }, 0) ?? 0
              },
              color: COLOR_BRINK_PINK
            }
          }
        }
      }
    },
  }}/>;
};

export default SusIssued;
