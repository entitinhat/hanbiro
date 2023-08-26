import {useGetKbDateCounting} from "@analytic/main/hooks/useGetKbDateCounting";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";

const KbOverview = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetKbDateCounting(props?.filters ?? {});
  });

  const { results = [] } = data ?? {};

  let oData: any = {
    categories: [],
    published: {
      name: 'Published',
      data: [],
    },
    inserted: {
      name: 'Inserted',
      data: [],
    },
    viewed: {
      name: 'Viewed',
      data: [],
    },
  };
  if (!!results && !!results?.length) {
    oData = results.reduce((f: any, v: any) => {
      const { published = 0, viewed = 0, inserted = 0 } = v?.counting ?? {};
      f['categories'].push(v?.date?.name ?? '-');
      f['published']['data'].push(published);
      f['viewed']['data'].push(viewed);
      f['inserted']['data'].push(inserted);
      return f;
    }, oData);
  }

  return <BarSimple
    series={[oData.published, oData.viewed, oData.inserted]}
    categories={oData.categories}
    multipleColumn
  />;
};

export default KbOverview;
