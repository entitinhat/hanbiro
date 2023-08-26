import React, { lazy } from 'react';
import { GrapeEditorValue } from '@base/types/setting';
import { useMediaQuery, useTheme } from '@mui/material';

import EditorTemplateGrapeEdit from '../EditorTemplateGrape/Edit';
import EditorEdit from '../Editor/Edit';
import { TemplateGroup } from '@base/types/app';

interface IEditorProps {
  menuSource: string;
  value: GrapeEditorValue;
  onChange: (params: any) => {};
  //Grapes props
  templateGroup: TemplateGroup;
  isFullScreen?: boolean;

  height?: string;
  width?: string;
  storageId?: string; //indexedb name
  templateType?: 'full' | 'form' | 'landingpage'; //'advance'
  children?: any;
  mode?: string;
  parentID?: string;
}
const EditorWriteResponsive: React.FC<IEditorProps> = (props: IEditorProps) => {
  const { onChange, value, menuSource, ...remainProps } = props;
  console.log('grape Value', value);
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  return matchDownMd ? (
    <EditorEdit value={value?.content?.html} onChange={onChange}></EditorEdit>
  ) : (
    <EditorTemplateGrapeEdit value={value} onChange={onChange} menuSource={menuSource} {...remainProps}></EditorTemplateGrapeEdit>
  );
};

export default EditorWriteResponsive;
