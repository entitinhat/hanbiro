import MainCard from '@base/components/App/MainCard';
import { Box, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SurveyTitleViewProps {
  title: string;
  description?: string;
}

const SurveyTitleView = (props: SurveyTitleViewProps) => {
  const { title = '', description = '' } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MainCard sx={{ backgroundColor: theme.palette.background.paper }}>
      <Stack spacing={1}>
        <Typography variant="h3">{title ? title : t('ncrm_generalsetting_survey_section_untitled')}</Typography>
        <Typography variant="h6">{description}</Typography>
      </Stack>
    </MainCard>
  );
};

export default SurveyTitleView;
