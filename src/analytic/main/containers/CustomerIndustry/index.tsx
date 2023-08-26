import {t} from "i18next";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import TreeMap from "@analytic/main/components/ApexCharts/TreeMap";
import {useGetCustomerIndustryCounting} from "@analytic/main/hooks/useGetCustomerIndustryCounting";

const CustomerIndustry = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetCustomerIndustryCounting(props?.filters);
  });

  const {results} = data ?? {};

  let aSeries: any = [];
  if (!!results && !!results?.length) {
    aSeries = [
      {
        data: results?.map((v: any) => {
          return {
            x: t(v?.industry?.languageKey) || '',
            y: v?.counting.total || 0
          }
        }) ?? []
      }
    ];
  }

  return (
    <TreeMap series={aSeries}/>
  );
}

export default CustomerIndustry;