import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { EAREntryAssignCheckAvailable } from '@settings/assignment-rule/rule/types/rule';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EditProps extends CommonEditProps {
  value: EAREntryAssignCheckAvailable;
  onChange: (nValue: EAREntryAssignCheckAvailable) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  const { t } = useTranslation();
  const handleChange = (val: EAREntryAssignCheckAvailable) => {
    onChange && onChange(val);
  };
  return (
    <RadioGroup row value={value ?? ''} onChange={(ev) => handleChange(ev.target.value as EAREntryAssignCheckAvailable)}>
      <FormControlLabel
        value={EAREntryAssignCheckAvailable.ONLINE}
        control={<Radio />}
        label={t('ncrm_generalsetting_assignment_rule_online_status')}
      />
      <FormControlLabel
        value={EAREntryAssignCheckAvailable.WORK}
        control={<Radio />}
        label={t('ncrm_generalsetting_assignment_rule_work_day')}
      />
    </RadioGroup>
  );
};

export default Edit;
