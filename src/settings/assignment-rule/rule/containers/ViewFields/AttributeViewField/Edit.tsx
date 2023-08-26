import DateSelector, { AttributeValue } from '../../DateSelector';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';

interface EditProps extends CommonEditProps {
  value: AttributeValue;
  onChange: (nValue: AttributeValue) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return <DateSelector value={value} onChange={onChange} />;
};

export default Edit;
