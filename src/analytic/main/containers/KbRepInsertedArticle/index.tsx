import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";
import {useGetKbRepCounting} from "@analytic/main/hooks/useGetKbRepCounting";

const KbRepInsertedArticle = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetKbRepCounting(props?.filters ?? {}, '', {forWhichChart: 'KbRepInsertedArticle'});
  });

  const { results } = data ?? {};

  let chartData: any = { l: [], s: [] };
  if (!!results && !!results?.length) {
    chartData = results?.reduce((f: any, v: any) => {
      f['l'].push(v?.user?.name ?? '--No Name--');
      f['s'].push(v?.counting?.inserted ?? 0);
      return f;
    }, chartData);
  }

  return <BarSimple series={chartData.s} categories={chartData.l} />;
};

export default KbRepInsertedArticle;
