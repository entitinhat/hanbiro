import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';
import Edit from './Edit';
import View from './View';

interface SwitchProps extends CommonViewFieldProps {}

const SwitchViewField = (props: SwitchProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default SwitchViewField;
