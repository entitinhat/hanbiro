import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
const View = lazy(() => import('./View'));
const Edit = lazy(() => import('@analytic/report/containers/FormAssignmentGroup'));

interface AssignmentGroupProps {
  value: any;
  onSave: (params: any) => void;
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}

const AssignmentGroup: React.FC<AssignmentGroupProps> = (props: AssignmentGroupProps) => {
  const { onSave, value, menuSourceId, menuSource, keyName, ...remainProps } = props;
  return (
    <CommonViewField
      keyName={keyName}
      menuSourceId={menuSourceId}
      menuSource={menuSource}
      {...remainProps}
      onSave={onSave}
      componentView={View}
      componentEdit={Edit}
      value={value}
    />
  );
};

export default AssignmentGroup;
