import MainCard from '@base/components/App/MainCard';
import { useTheme } from '@mui/material';
import ManageFieldsPage from '@settings/general/containers/ManageFields';
import { useTranslation } from 'react-i18next';

interface SelectionFieldsPageProps {}
const SelectionFieldsPage = (props: SelectionFieldsPageProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <MainCard
      border={false}
      sx={{
        p: 2
        // '& .MuiCardContent-root': {
        //   bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.common.white
        // }
      }}
      title={t('ncrm_generalsetting_general_manage_fields')}
      // headerSX={{
      //   bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.common.white
      // }}
    >
      <ManageFieldsPage />
    </MainCard>
  );
};

export default SelectionFieldsPage;
