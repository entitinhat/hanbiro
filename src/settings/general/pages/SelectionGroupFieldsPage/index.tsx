import MainCard from '@base/components/App/MainCard';
import { useTheme } from '@mui/material';
import ManageGroupFieldsPage from '@settings/general/containers/ManageGroupFields';
import { useTranslation } from 'react-i18next';

interface SelectionGroupFieldsPageProps {}

const SelectionGroupFieldsPage = (props: SelectionGroupFieldsPageProps) => {
  const theme = useTheme();
  console.log('theme.palette.mode', theme.palette.mode);
  const { t } = useTranslation();
  return (
    <>
      <MainCard
        border={false}
        sx={{
          p: 2,
          '& .MuiCardContent-root': {
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.common.white
          }
        }}
        title={t('ncrm_generalsetting_general_manage_group_fields')}
        headerSX={{
          bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.common.white
        }}
      >
        <ManageGroupFieldsPage />
      </MainCard>
    </>
  );
};
export default SelectionGroupFieldsPage;
