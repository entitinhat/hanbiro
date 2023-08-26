import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';

interface SkuProps extends CommonViewFieldProps {}

const SkuViewField = (props: SkuProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default SkuViewField;
