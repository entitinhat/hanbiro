import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
const View = lazy(() => import('@analytic/report/containers/ReportingContentView'));
const Edit = lazy(() => import('@analytic/report/containers/ReportingContent'));

interface ReportingContentProps {
  value: any;
  onSave: (params: any) => void;
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}
const ReportingContent: React.FC<ReportingContentProps> = (props: ReportingContentProps) => {
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
      clickIconToEdit
      value={value}
    />
  );
};

export default ReportingContent;
