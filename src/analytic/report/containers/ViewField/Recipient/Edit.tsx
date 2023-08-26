import { FormControlLabel } from '@mui/material';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

interface EditProps extends CommonEditProps {
  label?: string;
  value: any[];
  onChange: (checked: boolean) => void;
}

const Edit = (props: EditProps) => {
  const { value, label='', onChange } = props;

  const handleChange = (e: any) => {
    onChange && onChange(e);
  };

  return <FormControlLabel sx={{width:'100%'}} control={<UserAutoComplete size="small" onChange={handleChange} />} value={value} label={label} />;
};

export default Edit;
