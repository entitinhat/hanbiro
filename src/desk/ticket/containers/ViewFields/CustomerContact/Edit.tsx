import CustomerContact, { ValueProps } from '@customer/containers/CustomerContact';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
interface EditProps extends CommonViewFieldProps {
  value: ValueProps;
  onChange?: (val: ValueProps) => void;
  componentProps?: {
    [x: string]: any;
  };
}
const Edit = (props: EditProps) => {
  const { value, componentProps, onChange } = props;

  return <CustomerContact {...componentProps} hideCustomerLabel={true} value={value} onChange={onChange} />;
};

export default Edit;
