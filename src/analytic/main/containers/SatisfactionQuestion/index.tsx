import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";
import {useChartQuery} from "@analytic/main/hooks/useChartQuery";
import {useGetQuestionSatisfactionCounting} from "@analytic/main/hooks/useGetQuestionSatisfactionCounting";
import {keys} from "lodash";
import {KeyedObject} from "@base/types/root";
import { useTranslation } from "react-i18next";

const satisfactionRefer: KeyedObject = {
  highlySatisfied: 'ncrm_generalsetting_survey_satisfaction_column_highly_satisfied',
  satisfied: 'ncrm_generalsetting_survey_satisfaction_column_satisfied',
  neutral: 'ncrm_generalsetting_survey_satisfaction_column_neutral',
  dissatisfied: 'ncrm_generalsetting_survey_satisfaction_column_dissatisfied',
  highlyDissatisfied: 'ncrm_generalsetting_survey_satisfaction_column_highly_dissatisfied'
};

const SatisfactionQuestion = (props: ChartComponentProps) => {
  const {data} = useChartQuery(props, () => {
    return useGetQuestionSatisfactionCounting(/*props?.filters ?? */{query: 'question="Product/Service Quality"'});
  });

  const { t } = useTranslation()

  let chartData: any = { l: [], s: [] };
  if (!!data) {
    chartData = keys(data).reduce((f: any, k: any) => {
      f['l'].push(satisfactionRefer?.[k] ?? '-');
      f['s'].push(data?.[k] ?? 0);
      return f;
    }, chartData);
  }

  return <BarSimple series={chartData.s} categories={chartData.l.map((item: string) => t(item))} />;
};

export default SatisfactionQuestion;
