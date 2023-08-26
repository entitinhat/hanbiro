import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import View from './ActionView';
import Write from './ActionWrite';

interface ActionProps extends CommonViewFieldProps {}

function Action(props: ActionProps) {
  return <CommonViewField {...props} componentView={View} componentEdit={Write} value={props.value} />;
}

export default Action;
