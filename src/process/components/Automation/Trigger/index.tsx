import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import View from './TriggerAutomation';

interface TriggerViewProps extends CommonViewFieldProps {}

function TriggerAutomationView(props: TriggerViewProps) {
  return <CommonViewField {...props} componentView={View} value={props.value} />;
}

export default TriggerAutomationView;
