import React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
interface SectionEmptyProps {
  isWriteMode?: boolean;
}

const SectionEmpty = (props: SectionEmptyProps) => {
  const { isWriteMode = false } = props;
  const { t } = useTranslation()
  const message = isWriteMode ? 'ncrm_dashboard_report_form_msg_select_chart_to_create' : 'ncrm_dashboard_report_form_msg_nothing_to_display';
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
      <Box sx={{ mb: 1, padding: 1, border: '1px dashed ' + theme.palette.grey[300] }}>
        <BarChartIcon sx={{ color: theme.palette.grey[300] }} />
      </Box>
      {t(message)}
    </Box>
  );
};

export default SectionEmpty;
