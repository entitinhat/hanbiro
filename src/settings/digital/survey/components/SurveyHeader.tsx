//project
import IconButton from '@base/components/@extended/IconButton';
import LoadingButton from '@base/components/@extended/LoadingButton';

//material
import { DeleteOutline, SettingsOutlined } from '@mui/icons-material';
import { Tooltip, Typography, Box, Stack } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';

//menu
import { deleteSurveyFromStorage } from '@settings/digital/survey/store/storage';

interface SurveyHeaderProps {
  isPreview?: boolean;
  isLoading?: boolean;
  storageId?: string;
  surveyId?: string;
  surveyTitle?: string;
  setShowSideBar?: (isShow: boolean) => void;
  onReset?: () => void;
  onSave?: () => void;
}

const SurveyHeader = (props: SurveyHeaderProps) => {
  const { isPreview = false, isLoading = false, surveyId, storageId, surveyTitle, setShowSideBar, onReset, onSave } = props;
  const { t } = useTranslation();
  //local state
  // const [show, setShow] = useState<boolean>(false);

  //delete data from indexeddb
  async function deleteStoreSurvey(id: string) {
    return await deleteSurveyFromStorage(id);
  }

  //empty content
  const handleConfirmEmpty = () => {
    const curStorageId = surveyId ? surveyId : storageId;
    if (curStorageId) {
      deleteStoreSurvey(curStorageId);
      onReset && onReset();
    }
  };

  return (
    <Box>
      <Stack direction="row" alignItems={'center'} justifyContent="space-between">
        <Typography variant="h3">{surveyTitle ? surveyTitle : t('ncrm_generalsetting_survey_untitled_survey')}</Typography>
        <Stack direction="row" alignItems={'center'}>
          {!isPreview && (
            <>
              <Tooltip title={t('ncrm_generalsetting_survey_tooltip_empty_editor')}>
                <IconButton color="error" size="small" sx={{ mr: 2 }} onClick={handleConfirmEmpty}>
                  <DeleteOutline color="inherit" fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('ncrm_generalsetting_survey_tooltip_theme_setting')}>
                <IconButton size="small" sx={{ mr: 2 }} onClick={() => setShowSideBar && setShowSideBar(true)}>
                  <SettingsOutlined color="inherit" fontSize="small" />
                </IconButton>
              </Tooltip>
              {surveyId && (
                <Tooltip title={t('ncrm_generalsetting_survey_tooltip_save_new')}>
                  <LoadingButton variant="contained" color="success" size="small" onClick={onSave} disabled={isLoading} loading={isLoading}>
                    {t('ncrm_common_btn_save')}
                  </LoadingButton>
                </Tooltip>
              )}
            </>
          )}
        </Stack>
      </Stack>
      {/* send modal */}
      {/* {show &&
        <SendModal
          isOpen={show}
          onClose={() => setShow(false)}
          defaultSubject={surveyTitle}
        />
      } */}
    </Box>
  );
};

export default SurveyHeader;
