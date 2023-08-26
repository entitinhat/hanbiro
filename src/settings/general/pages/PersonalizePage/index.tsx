import MainCard from '@base/components/App/MainCard';
import { useTheme } from '@mui/material';
import MergeField from '@settings/general/containers/MergeField';
import { useTranslation } from 'react-i18next';

interface PersonalizePageProps {}
const PersonalizePage = (props: PersonalizePageProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <MainCard
      border={false}
      sx={{
        p: 2
        // '& .MuiCardContent-root': {
        //   bgcolor: theme.palette.common.white
        // }
      }}
      title={t('ncrm_generalsetting_personalize')}
      // headerSX={{
      //   bgcolor: theme.palette.common.white
      // }}
      contentSX={{ p: 0 }}
      className="scroll-box"
    >
      <MergeField />
    </MainCard>
  );
};

export default PersonalizePage;
