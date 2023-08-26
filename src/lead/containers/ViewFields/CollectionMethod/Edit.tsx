import LeadSettingSelect from '@lead/containers/SettingSelect';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { WRITE_TYPE_COLLECTION } from '@settings/preferences/config/lead/constants';
interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const handleOnChange = (newValue: any) => {
    onChange && onChange(newValue);
  };

  return <LeadSettingSelect settingKey={WRITE_TYPE_COLLECTION} {...componentProps} value={value?.value} onChange={handleOnChange} />;
};

export default Edit;
