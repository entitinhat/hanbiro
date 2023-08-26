import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import MainCard from '@base/components/App/MainCard';
import { Box, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Q_IMAGE, Q_TITLE, Q_VIDEO } from '../config/constants';

interface QuestionMediaViewProps {
  //keyQ: string;
  selectedQType: number;
  title: string;
  description?: string;
  image?: any;
  video?: string;
}

const QuestionMediaView = (props: QuestionMediaViewProps) => {
  const { selectedQType, title, description, image, video } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MainCard sx={{ backgroundColor: theme.palette.background.paper }}>
      <Stack spacing={1.5}>
        <Box>
          <Typography variant="h6">{title ? title : t('ncrm_generalsetting_survey_question_untitled')}</Typography>
        </Box>
        {selectedQType === Q_TITLE && (
          <Box>
            <Typography variant="h6">{description}</Typography>
          </Box>
        )}
        {selectedQType === Q_IMAGE && image && image.url && <ImagePreview image={image.url} />}
        {selectedQType === Q_VIDEO && (
          <Box>
            <Typography variant="h6">{video}</Typography>
            {/* <ReactPlayer url={video} controls={true} /> */}
          </Box>
        )}
      </Stack>
    </MainCard>
  );
};

export default QuestionMediaView;
