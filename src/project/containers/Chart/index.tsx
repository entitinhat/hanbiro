import { BarChartRounded, PieChartRounded } from '@mui/icons-material';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectBox from '../../../base/components/@hanbiro/SelectBox';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';

interface ChartProps {}

function Chart({}: ChartProps) {
  const { t } = useTranslation();
  const [view, setView] = useState('column');

  const handleView = useCallback((event: React.MouseEvent<HTMLElement>, value: any) => {
    setView(value);
  }, []);

  const dateOptions = [
    {
      keyName: 'this_week',
      languageKey: t('ncrm_common_dateby_thisweek')
    },
    {
      keyName: 'this_month',
      languageKey: t('ncrm_common_dateby_thismonth')
    }
  ];

  return (
    <Stack spacing={2} sx={{ p: 1 }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
        <ToggleButtonGroup value={view} exclusive onChange={handleView}>
          <ToggleButton size="small" value="column" aria-label="timesheet">
            <BarChartRounded sx={{ fontSize: 18 }} />
          </ToggleButton>
          <ToggleButton size="small" value="pie" aria-label="list">
            <PieChartRounded sx={{ fontSize: 18 }} />
          </ToggleButton>
        </ToggleButtonGroup>
        <SelectBox size="small" sx={{ width: 100 }} value={dateOptions[0]} options={dateOptions} onChange={() => console.log('kkk')} />
      </Stack>
      {view == 'column' && <ColumnChart />}
      {view == 'pie' && <PieChart />}
    </Stack>
  );
}

export default Chart;
