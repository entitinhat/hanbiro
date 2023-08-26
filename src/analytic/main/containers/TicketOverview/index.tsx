import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetTicketByDateCounting} from "@analytic/main/hooks/useGetTicketByDateCounting";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";
import { useTranslation } from "react-i18next";

const TicketOverview = (props: ChartComponentProps) => {
  const {me, filters, ...restProps} = props;
  const { t } = useTranslation()
  const {data} = useChartQuery(restProps, () => {
    return useGetTicketByDateCounting(filters ?? {});
  });

  const { results = [], period } = data ?? {};

  let oData: any = {};
  if (!!results) {
    oData = results.reduce(
      (f: any, v: any) => {
        const { resolved = 0, unresolved = 0, resolvedWithinSla = 0 } = v?.counting ?? {};
        f['categories'].push(v?.date?.name ?? '-');
        f['resolved']['data'].push(resolved);
        f['unresolved']['data'].push(unresolved);
        f['resolvedWithinSla']['data'].push(resolvedWithinSla);
        return f;
      },
      {
        categories: [],
        resolved: {
          name: t('ncrm_dashboard_chart_field_resolved'),
          data: [],
        },
        unresolved: {
          name: t('ncrm_dashboard_chart_field_unresolved'),
          data: [],
        },
        resolvedWithinSla: {
          name: t('ncrm_dashboard_chart_field_resolved_with_sla'),
          data: [],
        },
      },
    );
  }

  return (
    <BarSimple
      series={[oData.resolved, oData.unresolved, oData.resolvedWithinSla]}
      categories={oData?.categories ?? []}
      multipleColumn
    />
  );
};

export default TicketOverview;
