import CommonViewField from '@base/containers/ViewField/Common';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import Edit from './Edit';
import View from './View';

interface TextProps extends CommonViewFieldProps {}

const SliderView = (props: TextProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default SliderView;
