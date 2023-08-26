import {Grid, useMediaQuery, Theme} from "@mui/material";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import TrendGridItem from "@analytic/main/components/TrendGridItem";
import TrendItem from "@analytic/main/components/TrendItem";
import {useGetSatisfactionTrendCounting} from "@analytic/main/hooks/useGetSatisfactionTrendCounting";
import { useTranslation } from "react-i18next";

const SatisfactionAvgCustomerSatisfaction = (props: ChartComponentProps) => {
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const { t } = useTranslation()
  const {data} = useChartQuery(props, () => {
    return useGetSatisfactionTrendCounting(props?.filters ?? {});
  });

  const {firstCounting = {}, lastCounting = {}} = data ?? {};

  return (
    <Grid spacing={0} container>
      <TrendGridItem>
        <TrendItem
          title={t('ncrm_generalsetting_survey_satisfaction_column_highly_satisfied')}
          newValue={firstCounting?.highlySatisfied ?? 0}
          oldValue={lastCounting?.highlySatisfied ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem>
        <TrendItem
          title={t('ncrm_generalsetting_survey_satisfaction_column_satisfied')}
          newValue={firstCounting?.satisfied ?? 0}
          oldValue={lastCounting?.satisfied ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem isDivider={lg}>
        <TrendItem
          title={t('ncrm_generalsetting_survey_satisfaction_column_neutral')}
          newValue={firstCounting?.neutral ?? 0}
          oldValue={lastCounting?.neutral ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem>
        <TrendItem
          title={t('ncrm_generalsetting_survey_satisfaction_column_dissatisfied')}
          newValue={firstCounting?.dissatisfied ?? 0}
          oldValue={lastCounting?.dissatisfied ?? 0}
        />
      </TrendGridItem>
      <TrendGridItem xs={8} lg={4} isDivider={false}>
        <TrendItem
          title={t('ncrm_generalsetting_survey_satisfaction_column_highly_dissatisfied')}
          newValue={firstCounting?.highlyDissatisfied ?? 0}
          oldValue={lastCounting?.highlyDissatisfied ?? 0}
        />
      </TrendGridItem>
    </Grid>
  );
}

export default SatisfactionAvgCustomerSatisfaction;