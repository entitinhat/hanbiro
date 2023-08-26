import { Customer } from '@customer/types/interface';
import { TextField } from '@mui/material';

interface EditProps {
  value: Customer;
  onChange: (nVal: Customer) => void;
}
const Edit = (props: EditProps) => {
  const { value, onChange = () => {} } = props;
  console.log('Edit', value);
  const handleChange = (nName: string) => {
    const nVal = {
      ...value,
      name: nName
    };
    onChange && onChange(nVal);
  };
  return (
    <>
      <TextField fullWidth value={value.name} onChange={(event) => handleChange(event.target.value)} />
    </>
  );
};

export default Edit;
