import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import { Template } from '@base/types/setting';

const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));
interface IEditorProps {
  value: any;
  onSave: (params: any) => {};
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}
const EditorTemplate: React.FC<IEditorProps> = (props: IEditorProps) => {
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

export default EditorTemplate;
