import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import View from './CriteriaAutomation';

interface CriteriaViewProps extends CommonViewFieldProps {}

function CriteriaAutomationView(props: CriteriaViewProps) {
  return <CommonViewField {...props} componentView={View} value={props.value} />;
}

export default CriteriaAutomationView;
