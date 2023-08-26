import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";
import useGetSusClickCounting from "@analytic/main/hooks/useGetSusClickCounting";
import {max} from "lodash";
import {useTranslation} from "react-i18next";

const SusClickTime = (props: ChartComponentProps) => {
  const {t} = useTranslation();

  const {data} = useChartQuery(props, () => {
    return useGetSusClickCounting(props?.filters ?? {});
  });

  const {results = []} = data ?? {};

  let chartData: any = {l: [], s: []};
  if (!!data) {
    chartData = results.reduce((f: any, data: any) => {
      f['l'].push(data?.date?.name ?? '-');
      f['s'].push(data?.number ?? 0);
      return f;
    }, chartData);
  }

  const maxValue: number = max([...chartData.s, 10]);

  return <BarSimple series={[{name: (t('ncrm_sus_status_clicked') as string), data: chartData?.s ?? []}]} categories={chartData.l} multipleColumn={true} overrideOptions={{
    yaxis: {
      labels: {
        formatter: (value) => {
          return value.toFixed(0)
        }
      },
      max: maxValue
    }
  }} />;
};

export default SusClickTime;
