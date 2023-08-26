import {Grid, useMediaQuery, Theme} from "@mui/material";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import TrendGridItem from "@analytic/main/components/TrendGridItem";
import TrendItem from "@analytic/main/components/TrendItem";
import {useGetActivityTrendCounting} from "@analytic/main/hooks/useGetActivityTrendCounting";
import { useTranslation } from "react-i18next";

const ActivityTrend = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetActivityTrendCounting(props?.filters ?? {});
  });
  const { t } = useTranslation()

  const {firstCounting = {}, lastCounting = {}} = data ?? {};

  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <Grid spacing={0} container>
      <TrendGridItem>
        <TrendItem
          title={t('ncrm_dashboard_chart_field_total')}
          newValue={firstCounting?.total ?? 0}
          oldValue={lastCounting?.total ?? 0}
        />
      </TrendGridItem>
      {/*<TrendGridItem>
        <TrendItem
          title='Overdue'
          newValue={firstCounting?.overDue ?? 0}
          oldValue={lastCounting?.overDue ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem>
        <TrendItem
          title='Due Today'
          newValue={firstCounting?.dueToday ?? 0}
          oldValue={lastCounting?.dueToday ?? 0}
        />
      </TrendGridItem>*/}
      <TrendGridItem>
        <TrendItem
          title='ncrm_dashboard_chart_field_email'
          newValue={firstCounting?.email ?? 0}
          oldValue={lastCounting?.email ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem isDivider={lg}>
        <TrendItem
          title={t('ncrm_dashboard_chart_field_call')}
          newValue={firstCounting?.call ?? 0}
          oldValue={lastCounting?.call ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem>
        <TrendItem
          title={t('ncrm_dashboard_chart_field_task')}
          newValue={firstCounting?.task ?? 0}
          oldValue={lastCounting?.task ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem>
        <TrendItem
          title={t('ncrm_dashboard_chart_field_sms')}
          newValue={firstCounting?.sms ?? 0}
          oldValue={lastCounting?.sms ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem isDivider={lg}>
        <TrendItem
          title={t('ncrm_dashboard_chart_field_avg_duration')}
          newValue={firstCounting?.avgDurationString ?? 0}
          oldValue={lastCounting?.avgDurationString ?? 0}
        />
      </TrendGridItem>
    </Grid>
  );
}

export default ActivityTrend;