import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import ProductCategory, { ValueProps } from '@desk/ticket/containers/ProductCategory';
import AssignUserAutoComplete, { AssignUserValue } from '@settings/preferences/containers/AssignUserAutocomplete';

interface EditProps extends CommonEditProps {
  value?: AssignUserValue | null;
  onChange?: (nVal: AssignUserValue | AssignUserValue[] | null) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return <AssignUserAutoComplete single {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
