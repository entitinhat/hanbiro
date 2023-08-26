import _ from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';

import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import { LabelValue } from '@base/types/app';
import useStatusMutation from '@process/hooks/useStatusMutation';
import statusAtom from '@process/store/atoms/status';
import { StatusForm } from '@process/types/process';

import Write from './CriteriaWrite';

export const CRITERIA_TYPES: LabelValue[] = [
  { value: 'boolean', label: 'Boolean' },
  { value: 'simple', label: 'Simple' }
];

interface CriteriaProps extends CommonViewFieldProps {
  metadata: Record<string, any>;
  statuses: StatusForm[];
}

function Criteria(props: CriteriaProps) {
  const { metadata, statuses } = props;
  const statusesValue = useRecoilValue(statusAtom);
  const {
    mUpdateStatuses: { mutate: updateStatuses }
  } = useStatusMutation(metadata.processId);

  const onSubmitHandler = (formValue: any) => {
    console.log('criteria edit');
    if (_.isEqual(statuses, statusesValue)) {
      return;
    }

    const updateData = {
      id: metadata.processId,
      stepId: metadata.stepId,
      statuses: statusesValue.map((status) => {
        return {
          id: status.id,
          button: status.button,
          name: status.name,
          options: JSON.stringify(status.criteria)
        };
      })
    };
    console.log('updateData', updateData);
    updateStatuses(updateData);
  };

  return (
    <>
      <CommonViewField
        {...props}
        onSubmitHandler={onSubmitHandler}
        checkEqual={false}
        componentView={Write}
        componentEdit={Write}
        // value={value}
        value={props.value}
      />
    </>
  );
}

export default Criteria;
