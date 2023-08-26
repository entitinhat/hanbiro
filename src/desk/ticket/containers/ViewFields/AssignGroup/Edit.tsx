import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import ProductCategory, { ValueProps } from '@desk/ticket/containers/ProductCategory';
import AssignGroupAutoComplete from '@settings/preferences/containers/AssignGroupAutocomplete';
import AssignUserAutoComplete, { AssignUserValue } from '@settings/preferences/containers/AssignUserAutocomplete';

interface EditProps extends CommonEditProps {
  value?: IdName | IdName[] | null;
  onChange?: (nVal: IdName | IdName[] | null) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return <AssignGroupAutoComplete {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
