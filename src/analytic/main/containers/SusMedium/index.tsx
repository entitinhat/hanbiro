import Pie from "@analytic/main/components/ApexCharts/Pie";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import useGetSusMediumCounting from "@analytic/main/hooks/useGetSusMediumCounting";
import {mediumOptions} from "@analytic/main/config/options";
import {useTranslation} from "react-i18next";

const SusMedium = (props: ChartComponentProps) => {
  const { t } = useTranslation();

  const {data} = useChartQuery(props, () => {
    return useGetSusMediumCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let chartData: any = {
    l: [],
    s: [],
  };
  if (!!results && !!results?.length) {
    chartData = results.reduce((f: any, v: any) => {
      f['l'].push(v?.idName?.name && mediumOptions?.[v.idName.name] ? (t(mediumOptions[v.idName.name]) as string) : '- No Label -');
      f['s'].push(v?.number1 ?? 0);
      return f;
    }, chartData);
  }

  return <Pie series={chartData?.s} categories={chartData?.l}/>;
};

export default SusMedium;
