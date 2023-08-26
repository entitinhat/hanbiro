import { sectionAll } from '@analytic/main/config/sections';
import { EDisplayGridType, EDisplayModeType, EUserType } from '@analytic/main/types/enum';
import { DisplayLandscape, DisplayPortrait } from '@analytic/report/components/DisplayMode';
import { pluck } from '@base/utils/helpers/arrayUtils';
import { Box } from '@mui/material';
import { includes } from 'lodash';
import React from 'react';

interface ReportContentPageProps {
  data?: any;
  userType?: string;
}

const ReportContentPage: React.FC<ReportContentPageProps> = (props: ReportContentPageProps) => {
  const { data, userType = EUserType.USER_TYPE_USER } = props;
  const { displayMode, displayGrid, selectedSections, selectedCharts } = data ?? {};
  const isLandscape = displayMode === EDisplayModeType.DISPLAY_MODE_LANDSCAPE;
  const isPortrait = displayMode === EDisplayModeType.DISPLAY_MODE_PORTRAIT;

  const isDisplayGrid = displayGrid === EDisplayGridType.DISPLAY_GRID_SHOW;

  const sectionKeys = pluck<any, string>(selectedSections, 'value');
  const chartKeys = pluck<any, string>(selectedCharts, 'value');
  const sections =
    sectionKeys.length > 0
      ? sectionKeys.map((section: string) => {
          return {
            section: section,
            charts: sectionAll[section][userType].filter((chart: string) => includes(chartKeys, chart))
          };
        })
      : [];

  return (
    <Box>
      {isPortrait && <DisplayPortrait sections={sections} isDisplayGrid={isDisplayGrid} isVirtualChart={true} />}
      {isLandscape && <DisplayLandscape sections={sections} isDisplayGrid={isDisplayGrid} isVirtualChart={true} />}
    </Box>
  );
};

export default ReportContentPage;
