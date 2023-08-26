import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import View from './StatusView';

interface StatusProps extends CommonViewFieldProps {}

function Status(props: StatusProps) {
  return <CommonViewField {...props} componentView={View} componentEdit={View} value={props.value} />;
}

export default Status;
