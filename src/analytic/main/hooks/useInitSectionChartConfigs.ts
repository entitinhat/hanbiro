import {EChartType, ESectionType, EUserType} from "@analytic/main/types/enum";
import {useEffect} from "react";
import {makeSatisfactionConfigs} from "@analytic/main/utils";
import {useGetSatisfactionQuestionList} from "@analytic/main/hooks/useGetSatisfactionQuestionList";
import {IdName} from "@base/types/common";
import {cloneDeep, keys} from "lodash";
import {sectionAll as baseSectionAll} from "@analytic/main/config/sections";
import {chartBoxes as baseChartBoxes} from "@analytic/main/config/charts";
import {useRecoilState} from "recoil";
import {dashboardChartAtom} from "@analytic/main/store/atoms";

export const useInitSectionChartConfigs = () => {
  const [
    dashboardChart,
    setDashboardChart
  ] = useRecoilState(dashboardChartAtom);

  const {data, isLoading} = useGetSatisfactionQuestionList();

  const {results = ([] as IdName[])} = data ?? {};

  useEffect(() => {
    if(!isLoading && !!results?.length){
      let newChartBoxes = cloneDeep(baseChartBoxes);
      const questionCharts = makeSatisfactionConfigs(results);
      newChartBoxes = {...newChartBoxes, ...questionCharts};
      delete newChartBoxes[EChartType.CHART_SATISFACTION_QUESTION];

      const questionChartKeys = keys(questionCharts);
      const satisfactionSection = {
        [EUserType.USER_TYPE_USER]: [
          EChartType.CHART_SATISFACTION_AVG_CUSTOMER_SATISFACTION,
          ...questionChartKeys
        ],
        [EUserType.USER_TYPE_ADMIN]: [
          EChartType.CHART_SATISFACTION_AVG_CUSTOMER_SATISFACTION,
          ...questionChartKeys
        ]
      };

      const newSectionAll = {
        ...baseSectionAll,
        [ESectionType.SECTION_SATISFACTION]: satisfactionSection
      };

      setDashboardChart({
        chartBoxes: newChartBoxes,
        sectionAll: newSectionAll
      });
    }
  }, [isLoading]);

  return {
    chartBoxes: dashboardChart.chartBoxes,
    sectionAll: dashboardChart.sectionAll,
    isLoading
  };
};