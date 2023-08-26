import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import View from './CriteriaView';
import Write from './CriteriaWrite';

interface CriteriaProps extends CommonViewFieldProps {}

function Criteria(props: CriteriaProps) {
  return <CommonViewField {...props} componentView={View} componentEdit={Write} value={props.value} />;
}

export default Criteria;
