import { EUserType } from '@analytic/main/types/enum';
import { keyValueToArray } from '@analytic/main/utils';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { sectionOptions as sourceSectionOptions } from '@analytic/main/config/options';
import { useEffect, useState } from 'react';
import { sectionAll } from '@analytic/main/config/sections';
import { chartBoxes } from '@analytic/main/config/charts';
import { isEqual } from 'lodash';
import { useTranslation } from 'react-i18next';
interface SectionChartProps {
  sections: any[];
  charts: any[];
  onChange?: (v: any) => void;
  userType?: string;
}

const SectionChartAutocomplete = (props: SectionChartProps) => {
  const { sections = [], charts = [], onChange, userType = EUserType.USER_TYPE_USER } = props;
  const { t } = useTranslation()
  const defaultSectionOptions: any[] = keyValueToArray(sourceSectionOptions);
  const [chartOptions, setChartOptions] = useState<any[]>([]);
  const [sectionOptions, setSectionOptions] = useState<any[]>(defaultSectionOptions);
  const [selectedSections, setSelectedSections] = useState<any[]>(sections ?? []);
  const [selectedCharts, setSelectedCharts] = useState<any[]>(charts ?? []);

  useEffect(() => {
    if (!!sections && JSON.stringify(sections) != JSON.stringify(selectedSections)) {
      setSelectedSections(sections);
    }
    if (!!charts && JSON.stringify(charts) != JSON.stringify(selectedCharts)) {
      setSelectedCharts(charts);
    }
  }, [sections, charts]);

  useEffect(() => {
    const newSectionOptions = defaultSectionOptions.filter(
      (section: any) => selectedSections.filter((selected: any) => selected.value == section.value).length == 0
    );
    let newChartOptions: any = [];
    selectedSections.map((section: any, i: number) => {
      newChartOptions = [
        ...newChartOptions,
        ...sectionAll[section.value][userType].map((chartKey: string, ii: number) => {
          return { value: chartKey, label: chartBoxes[chartKey].title };
        })
      ];
    });
    let newSelectedCharts: any = [];
    if (newChartOptions.length !== 0) {
      newSelectedCharts = selectedCharts.filter(
        (selected: any) => newChartOptions.filter((chart: any) => chart.value == selected.value).length > 0
      );
    }
    if (!isEqual(newSectionOptions, sectionOptions)) {
      setSectionOptions(newSectionOptions);
      setSelectedCharts(newSelectedCharts);
      setChartOptions(
        newChartOptions.filter((chart: any) => newSelectedCharts.filter((selected: any) => selected.value == chart.value).length == 0)
      );
    }
    if (!isEqual(selectedCharts, newSelectedCharts)) {
      setSelectedCharts(newSelectedCharts);
      setChartOptions(
        newChartOptions.filter((chart: any) => newSelectedCharts.filter((selected: any) => selected.value == chart.value).length == 0)
      );
    }
    onChange &&
      onChange({
        sections:selectedSections,
        charts:newSelectedCharts
      });
  }, [selectedSections, selectedCharts]);

  return (
    <>
      <Box mb={1}>
        <Typography color="secondary">{t('ncrm_dashboard_section')}</Typography>
        <Autocomplete
          multiple
          options={sectionOptions}
          getOptionLabel={(option: any) => t(option.label)}
          renderInput={(params) => <TextField {...params} placeholder={t('ncrm_common_select') as string} />}
          value={selectedSections}
          onChange={(e: any, v: any) => setSelectedSections(v)}
        />
      </Box>
      <Box mb={1}>
        <Typography color="secondary">{t('ncrm_dashboard_chart')}</Typography>
        <Autocomplete
          multiple
          options={chartOptions}
          renderOption={(props, option: any) => (
            <li {...props} key={option.value}>
              {t(option.label)}
            </li>
          )}
          getOptionLabel={(option: any) => t(option.label)}
          renderInput={(params) => <TextField {...params} placeholder={t('ncrm_common_select') as string} />}
          value={selectedCharts}
          onChange={(e: any, v: any) => setSelectedCharts(v)}
        />
      </Box>
    </>
  );
};

export default SectionChartAutocomplete;
