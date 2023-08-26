import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import Write from './TriggerWrite';

interface TriggerProps extends CommonViewFieldProps {}

function Trigger(props: TriggerProps) {
  return (
    <CommonViewField {...props} componentView={Write} componentEdit={Write} value={props.value} />
  );
}

export default Trigger;
