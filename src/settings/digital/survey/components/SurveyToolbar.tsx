import IconButton from '@base/components/@extended/IconButton';
import { AddAPhotoOutlined, AddCircleOutline, PlaylistAddOutlined, TextIncreaseOutlined } from '@mui/icons-material';
import { Stack, styled, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Q_TITLE, Q_VIDEO } from '../config/constants';

const ToolbarContainer = styled('div')(({ top }: { top: number }) => ({
  top: top === 0 ? '8px' : top,
  right: '-70px',
  position: 'absolute',
  //'-webkit-transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
}));

const ToolbarBox = styled('div')(({ theme }) => ({
  boxShadow: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.141), 0 1px 3px 0 rgba(0, 0, 0, 0.122)',
  transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: '#fff',
  border: '1px solid #dadce0',
  //'-webkit-border-radius': '8px',
  borderRadius: '8px',
  //'-webkit-box-align': 'center',
  boxAlign: 'center',
  //'-webkit-align-items': 'center',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  //'-webkit-flex-direction': 'column',
  flexDirection: 'column',
  width: '52px'
}));

interface SurveyToolbarProps {
  focusS: number;
  focusQ: number;
  scrollTop?: number;
  onAddNewQuestion: (e: any) => void;
  onAddNewQuestionMedia: (type: number) => void;
  onAddNewSection: (e: any) => void;
}

const SurveyToolbar = (props: SurveyToolbarProps) => {
  const { focusS, focusQ, scrollTop = 0, onAddNewQuestion, onAddNewQuestionMedia, onAddNewSection } = props;
  const { t } = useTranslation();

  const addNormalQEleId = 'q-addnormal-' + focusS + '-' + focusQ;
  const addTitleQEleId = 'q-addtitle-' + focusS + '-' + focusQ;
  const addImageQEleId = 'q-addimage-' + focusS + '-' + focusQ;
  const addVideoQEleId = 'q-addvideo-' + focusS + '-' + focusQ;
  const addSectionQEleId = 'q-addsection-' + focusS + '-' + focusQ;

  return (
    <ToolbarContainer top={scrollTop}>
      <ToolbarBox>
        <Stack spacing={1} sx={{ my: 1 }}>
          <Tooltip title={t('ncrm_generalsetting_survey_tooltip_add_question')} placement="left">
            <IconButton id={addNormalQEleId} color="secondary" onClick={onAddNewQuestion}>
              <AddCircleOutline color="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('ncrm_generalsetting_survey_tooltip_add_title')} placement="left">
            <IconButton id={addTitleQEleId} color="secondary" onClick={() => onAddNewQuestionMedia(Q_TITLE)}>
              <TextIncreaseOutlined color="inherit" />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Add image" placement="left">
          <IconButton id={addImageQEleId} color="secondary" size="small" onClick={() => onAddNewQuestionMedia(Q_IMAGE)}>
            <AddCircleOutline color="inherit" />
          </IconButton>
        </Tooltip> */}
          <Tooltip title={t('ncrm_generalsetting_survey_tooltip_add_video')} placement="left">
            <IconButton id={addVideoQEleId} color="secondary" onClick={() => onAddNewQuestionMedia(Q_VIDEO)}>
              <AddAPhotoOutlined color="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('ncrm_generalsetting_survey_tooltip_add_section')} placement="left">
            <IconButton id={addSectionQEleId} color="secondary" onClick={onAddNewSection}>
              <PlaylistAddOutlined color="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      </ToolbarBox>
    </ToolbarContainer>
  );
};

export default SurveyToolbar;
