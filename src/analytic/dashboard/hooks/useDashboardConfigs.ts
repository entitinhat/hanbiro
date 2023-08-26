import {EUserType} from "@analytic/main/types/enum";
import {useDashboardSettings} from "./useDashboardSettings";
import {useEffect, useState} from "react";
import {useInitSectionChartConfigs} from "@analytic/main/hooks/useInitSectionChartConfigs";
import {getConfigsBySetting2} from "@analytic/main/utils";
import {makeDashboardDefaultSetting} from "@analytic/dashboard/utils";

export const useDashboardConfigs = (userType = EUserType.USER_TYPE_USER) => {
  const [sectionsConfig, setSectionsConfig] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {chartBoxes, sectionAll} = useInitSectionChartConfigs();

  useEffect(() => {
    if(!!chartBoxes){
      const dashboardDefaultSetting = makeDashboardDefaultSetting(sectionAll, userType);
      const newSectionsConfig = getConfigsBySetting2(chartBoxes, dashboardDefaultSetting, userType);
      setSectionsConfig(newSectionsConfig);
      setIsLoading(false);
    }
  }, [chartBoxes]);

  return {
    isLoading,
    sections: sectionsConfig
  };
};