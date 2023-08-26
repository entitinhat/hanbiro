import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import View from '@base/containers/ViewField/Text/View';
import { LabelValue } from '@base/types/app';

import Edit from './MethodWrite';

export const MethodOptions: LabelValue[] = [
  {
    label: 'ncrm_process_action_method_manual',
    value: 'ACTION_METHOD_MANUAL'
  },
  {
    label: 'Automatic',
    value: 'ACTION_METHOD_AUTO'
  }
];

interface TextProps extends CommonViewFieldProps {}

const TextViewField = (props: TextProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default TextViewField;
