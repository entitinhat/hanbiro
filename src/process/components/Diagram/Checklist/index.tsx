import _ from 'lodash';
import { useRecoilValue } from 'recoil';

import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import useStatusMutation from '@process/hooks/useStatusMutation';
import statusAtom from '@process/store/atoms/status';
import { StatusForm } from '@process/types/process';

import Write from './ChecklistWrite';

interface ChecklistProps extends CommonViewFieldProps {
  metadata: Record<string, any>;
  statuses: StatusForm[];
}

function Checklist(props: ChecklistProps) {
  const { metadata, statuses } = props;
  const statusesValue = useRecoilValue(statusAtom);
  const {
    mUpdateStatus: { mutate: updateStatus }
  } = useStatusMutation(metadata.processId);

  const onSubmitHandler = () => {
    if (_.isEqual(statuses, statusesValue)) {
      return;
    }
    const status = statusesValue.find((status) => status.property.keyName == 'PROPERTY_TODO_CLOSE');

    if (status) {
      updateStatus({
        id: metadata.processId,
        stepId: metadata.stepId,
        status: {
          id: status.id,
          options: JSON.stringify(status.checklist)
        }
      });
    }
  };

  return (
    <CommonViewField
      {...props}
      componentView={Write}
      componentEdit={Write}
      value={props.value}
      onSubmitHandler={onSubmitHandler}
      checkEqual={false}
    />
  );
}

export default Checklist;
