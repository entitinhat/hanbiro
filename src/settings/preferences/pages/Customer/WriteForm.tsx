import LangInput from '@base/components/@hanbiro/LangInput';
import MainCard from '@base/components/App/MainCard';
import { InputLabel, Radio, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface WriteFormProps {
  keyRoot: string;
  value: any;
  onChange: (key: string, value: any) => void;
  error?: any;
}

const WriteForm = (props: WriteFormProps) => {
  const { keyRoot, value, onChange, error } = props;
  const { t } = useTranslation();

  return (
    <MainCard>
      <LangInput
        uid={keyRoot} //DOM unique key in one page
        disabled={false}
        value={value?.langNames || []} //ex: [{id, value}]
        onChange={(data: any) => onChange('langNames', data)}
      />
      {error.name && (
        <Typography variant="h6" color="error">
          {t('ncrm_generalsetting_preferences_name_is_required')}
        </Typography>
      )}
      <Stack direction={'row'} alignItems="center">
        <InputLabel>{t('ncrm_generalsetting_default')}</InputLabel>
        <Radio
          id={keyRoot + '-add-radio-default'}
          checked={value?.isDefault}
          onChange={(e: any) => onChange('isDefault', e.target.checked)}
        />
      </Stack>
    </MainCard>
  );
};

export default WriteForm;
