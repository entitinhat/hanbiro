import React, { lazy } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import { GrapeEditorValue, Template } from '@base/types/setting';
import { useMediaQuery, useTheme } from '@mui/material';
import EditorTemplateGrape from '../EditorTemplateGrape';
import EditorTemplate from '../EditorTemplate';

import EditorTemplateGrapeEdit from '../EditorTemplateGrape/Edit';
import EditorTemplateEdit from '../EditorTemplate/Edit';

interface IEditorProps {
  isWriteOnly: boolean;
  value: any;
  onSave: (params: any) => {};
  keyName: string;
  menuSourceId: string;
  menuSource: string;
}
const EditorTemplateResponsive: React.FC<IEditorProps> = (props: IEditorProps) => {
  const { onSave, value, menuSourceId, menuSource, keyName, isWriteOnly, ...remainProps } = props;
  console.log('grape Value', value);
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return matchDownMd ? (
    <EditorTemplate
      value={value}
      onSave={onSave}
      keyName={keyName}
      menuSourceId={menuSourceId}
      menuSource={menuSource}
      {...remainProps}
    ></EditorTemplate>
  ) : (
    <EditorTemplateGrape
      value={value}
      onSave={onSave}
      keyName={keyName}
      menuSourceId={menuSourceId}
      menuSource={menuSource}
      {...remainProps}
    ></EditorTemplateGrape>
  );
};

export default EditorTemplateResponsive;
