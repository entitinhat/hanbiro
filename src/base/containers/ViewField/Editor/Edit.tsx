import TuiEditor from '@base/components/@hanbiro/TuiEditor';
import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  value: string;
  onChange: (nValue: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;
  // const onValueChange = (value: string) => {
  //   onChange && onChange({ content: { html: value } });
  // };
  return <TuiEditor value={value} onChange={onChange} />;
};

export default Edit;
