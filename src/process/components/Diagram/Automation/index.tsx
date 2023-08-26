import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import Write from './AutomationWrite';

interface AutomationProps extends CommonViewFieldProps {}

function Automation(props: AutomationProps) {
  return <CommonViewField {...props} componentView={Write} componentEdit={Write} value={props.value} />;
}

export default Automation;
