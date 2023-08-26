import {useGetKbRepCounting} from "@analytic/main/hooks/useGetKbRepCounting";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";

const KbRepViewedArticle = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetKbRepCounting(props.filters, 'viewed', {forWhichChart: 'KbRepViewedArticle'});
  });

  const { results } = data ?? {};

  let chartData: any = { l: [], s: [] };
  if (!!results && !!results?.length) {
    chartData = results?.reduce((f: any, v: any) => {
      f['l'].push(v?.user?.name ?? '--No Name--');
      f['s'].push(v?.counting?.viewed ?? 0);
      return f;
    }, chartData);
  }

  return <BarSimple series={chartData.s} categories={chartData.l} />;
};

export default KbRepViewedArticle;
