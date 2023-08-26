import React, { useEffect, useState } from 'react';
import { EDisplayGridType, EDisplayModeType, EUserType } from '@analytic/main/types/enum';
import { displayModeOptions, sectionOptions as sourceSectionOptions } from '@analytic/main/config/options';
import { Autocomplete, Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material';
import { keyValueToArray } from '@analytic/main/utils';
import { sectionAll } from '@analytic/main/config/sections';
import { chartBoxes } from '@analytic/main/config/charts';
import { isEqual } from 'lodash';
import SectionChartAutocomplete from '../SectionChartAutocomplete';
import { useTranslation } from 'react-i18next';
interface ReportContentSettingProps {
  data?: {
    displayMode: EDisplayModeType;
    displayGrid: EDisplayGridType;
    selectedSections: any[];
    selectedCharts: any[];
  };
  onChange?: (v: any) => void;
  userType?: string;
}

const ReportContentSetting: React.FC<ReportContentSettingProps> = (props: ReportContentSettingProps) => {
  const { data, onChange, userType = EUserType.USER_TYPE_USER } = props;
  const { t } = useTranslation()
  const {
    displayMode: iDisplayMode,
    displayGrid: iDisplayGrid,
    selectedSections: iSelectedSections,
    selectedCharts: iSelectedCharts
  } = data ?? {};

  const [selectedSections, setSelectedSections] = useState<any[]>(iSelectedSections ?? []);
  const [selectedCharts, setSelectedCharts] = useState<any[]>(iSelectedCharts ?? []);
  const [displayMode, setDisplayMode] = useState<string>(iDisplayMode ?? EDisplayModeType.DISPLAY_MODE_PORTRAIT);
  const [displayGrid, setDisplayGrid] = useState<string>(iDisplayGrid ?? EDisplayGridType.DISPLAY_GRID_SHOW);

  useEffect(() => {
    const {
      displayMode: iDisplayMode,
      displayGrid: iDisplayGrid,
      selectedSections: iSelectedSections,
      selectedCharts: iSelectedCharts
    } = data ?? {};

    if (!!iDisplayMode && iDisplayMode != displayMode) {
      setDisplayMode(iDisplayMode);
    }
    if (!!iDisplayGrid && iDisplayGrid != displayGrid) {
      setDisplayGrid(iDisplayGrid);
    }
    if (!!iSelectedSections && JSON.stringify(iSelectedSections) != JSON.stringify(selectedSections)) {
      setSelectedSections(iSelectedSections);
    }
    if (!!iSelectedCharts && JSON.stringify(iSelectedCharts) != JSON.stringify(selectedCharts)) {
      console.log(1, iSelectedCharts);
      setSelectedCharts(iSelectedCharts);
    }
  }, [data]);

  useEffect(() => {
    onChange &&
      onChange({
        displayMode,
        displayGrid,
        selectedSections,
        selectedCharts
      });
  }, [displayMode, displayGrid, selectedSections, selectedCharts]);

  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: 2,
        height: '100%',
        backgroundColor: theme.palette.grey[50],
        border: '1px solid ' + theme.palette.grey[300],
        borderRadius: '.25rem',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box mb={1}>
        <Typography color="secondary">{t('ncrm_dashboard_report_displaymode')}</Typography>
        <FormControl>
          <RadioGroup row value={displayMode} onChange={(e: any, v: any) => setDisplayMode(v)}>
            {keyValueToArray(displayModeOptions).map((k: any, i: number) => (
              <FormControlLabel key={i} control={<Radio />} label={t(k.label)} value={k.value} sx={{ mr: 1, span: { padding: '5px' } }} />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box mb={1}>
        <Typography color="secondary">{t('ncrm_dashboard_report_displaygrid')}</Typography>
        <FormControl>
          <RadioGroup row value={displayGrid} onChange={(e: any, v: any) => setDisplayGrid(v)}>
            <FormControlLabel
              control={<Radio />}
              value={EDisplayGridType.DISPLAY_GRID_SHOW}
              label={t('ncrm_dashboard_report_displaygrid_show')}
              sx={{ mr: 1, span: { padding: '5px' } }}
            />
            <FormControlLabel
              control={<Radio />}
              value={EDisplayGridType.DISPLAY_GRID_NEVER}
              label={t('ncrm_dashboard_report_displaygrid_never')}
              sx={{ mr: 1, span: { padding: '5px' } }}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <SectionChartAutocomplete
        sections={selectedSections}
        charts={selectedCharts}
        userType={userType}
        onChange={({ sections, charts }: any) => {
          if (!isEqual(sections, selectedSections)) {
            setSelectedSections(sections);
          }
          if (!isEqual(charts, selectedCharts)) {
            setSelectedCharts(charts);
          }
        }}
      />
    </Box>
  );
};

export default ReportContentSetting;
