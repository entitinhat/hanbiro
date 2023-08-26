import {Grid, useMediaQuery, Theme} from "@mui/material";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useGetTicketTrendCounting} from "@analytic/main/hooks/useGetTicketTrendCounting";
import TrendGridItem from "@analytic/main/components/TrendGridItem";
import TrendItem from "@analytic/main/components/TrendItem";
import { useTranslation } from "react-i18next";

const TicketTrend = (props: ChartComponentProps) => {
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const { t } = useTranslation()
  const {data} = useChartQuery(props, () => {
    return useGetTicketTrendCounting(props?.filters ?? {});
  });

  const {firstCounting = {}, lastCounting = {}} = data ?? {};

  return (
    <Grid spacing={0} container>
      <TrendGridItem>
        <TrendItem
          title={t('ncrm_dashboard_chart_field_new')}
          newValue={firstCounting?.new}
          oldValue={lastCounting?.new}
        />
      </TrendGridItem>
      <TrendGridItem>
        <TrendItem
          title='ncrm_dashboard_chart_field_unassigned'
          newValue={firstCounting?.unassigned}
          oldValue={lastCounting?.unassigned}
        />
      </TrendGridItem>
      <TrendGridItem isDivider={lg}>
        <TrendItem
          title='ncrm_dashboard_chart_field_overdue'
          newValue={firstCounting?.overdue}
          oldValue={lastCounting?.overdue}
        />
      </TrendGridItem>
      <TrendGridItem>
        <TrendItem
          title='ncrm_dashboard_chart_field_due_today'
          newValue={firstCounting?.dueToday}
          oldValue={lastCounting?.dueToday}
        />
      </TrendGridItem>
      <TrendGridItem>
        <TrendItem
          title='ncrm_dashboard_chart_field_unresolved'
          newValue={firstCounting?.unresolved}
          oldValue={lastCounting?.unresolved}
        />
      </TrendGridItem>
      <TrendGridItem isDivider={false}>
        <TrendItem
          title='ncrm_dashboard_chart_field_resolved'
          newValue={firstCounting?.resolved}
          oldValue={lastCounting?.resolved}
        />
      </TrendGridItem>
      <TrendGridItem lg={6}>
        <TrendItem
          title='ncrm_dashboard_chart_field_avg_1st_respone_time'
          newValueView={firstCounting?.avg1stResponseTimeString}
          newValue={firstCounting?.avg1stResponseTime}
          oldValueView={lastCounting?.avg1stResponseTimeString}
          oldValue={lastCounting?.avg1stResponseTime}
        />
      </TrendGridItem>
      <TrendGridItem xs={8} lg={6} isDivider={false}>
        <TrendItem
          title='ncrm_dashboard_chart_field_avg_resolution_time'
          newValueView={firstCounting?.avgResolutionTimeString}
          newValue={firstCounting?.avgResolutionTime}
          oldValueView={lastCounting?.avgResolutionTimeString}
          oldValue={lastCounting?.avgResolutionTime}
        />
      </TrendGridItem>
      {/*<TrendGridItem>
        <TrendItem
          title='Avg. Resolve Time Efficiency'
          newValueView={firstCounting?.avgResolveTimeEfficiencyString}
          newValue={firstCounting?.avgResolveTimeEfficiency}
          oldValueView={lastCounting?.avgResolveTimeEfficiencyString}
          oldValue={lastCounting?.avgResolveTimeEfficiency}
        />
      </TrendGridItem>*/}
    </Grid>
  );
}

export default TicketTrend;