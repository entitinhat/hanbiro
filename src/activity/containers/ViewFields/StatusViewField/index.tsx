import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';

import Edit from './Edit';
import View from './View';

const Status = (props: CommonViewFieldProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default Status;
