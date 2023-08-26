import React, { useState } from 'react';
import { GrapeEditorValue, Template } from '@base/types/setting';

import { BaseTemplateData } from '@base/utils/helpers/templatesUtils';
import SelectTemplate from '../SelectTemplate';
import { TemplateGroup } from '@base/types/app';
import { Grid } from '@mui/material';
import GrapesTS from '@base/components/@hanbiro/GrapeTS';

interface EditorEditProps {
  menuSource: string;
  templateGroup: TemplateGroup;

  //Grapes props
  isFullScreen?: boolean;
  value?: GrapeEditorValue;
  height?: string;
  width?: string;
  storageId?: string; //indexedb name
  templateType?: 'full' | 'form' | 'landingpage'; //'advance'
  children?: any;
  onChange?: (params: any) => {};
  mode?: string;
  parentID?: string;
}
const EditorTemplateEdit: React.FC<EditorEditProps> = (props: EditorEditProps) => {
  const { value, onChange, menuSource, templateGroup, isFullScreen = false, templateType = 'full', parentID } = props;
  const defaultTplValue =
    value && value.tpl
      ? {
          id: value.tpl.id,
          name: value.tpl.name
        }
      : {
          id: '',
          name: 'No Selected'
        };
  const [templateSelected, setTemplateSelected] = useState<Template>(defaultTplValue);
  const initContentValue = {
    html: value?.content?.html ? value.content.html : '',
    css: value?.content?.css ? value.content?.css : ''
  };
  const [content, setContent] = useState(initContentValue);
  const handleSelectTemplateChange = (tpl: BaseTemplateData) => {
    let sTpl: Template = {
      id: tpl.id,
      name: tpl.name
    };
    setTemplateSelected(sTpl);
    // do setconent
    if (tpl.html) {
      const htmlJson = JSON.parse(tpl.html ?? '{}');
      const cssStr = `<style>${htmlJson?.css ?? ''}</style>`;

      const htmlString = htmlJson?.html ?? '';
      const newHtml = { html: htmlString, css: cssStr };
      setContent((prev) => {
        return { ...prev, ...newHtml };
      });
    }
  };

  const handleOnChangeContent = (params: any) => {
    console.log('payload params', params);
    onChange && onChange({ content: params, tpl: templateSelected });
  };
  console.log('parentID', parentID);
  return (
    <>
      <Grid sx={{ mb: '10px' }}>
        <SelectTemplate
          useSelectBox={true}
          // menuSource={menuSource}
          templateGroup={templateGroup}
          options={[]}
          value={templateSelected}
          onChange={(item) => handleSelectTemplateChange(item)}
        />
      </Grid>

      <GrapesTS
        mode="select"
        isFullScreen={isFullScreen}
        parentID={parentID}
        //Incorrect mouse position on HTML canvas when having a navigation bar
        height={'calc(100vh - 400px)'}
        storageId={'grapes-ts'}
        value={content}
        onChange={handleOnChangeContent}
        templateType={templateType}
      />
    </>
  );
};

export default EditorTemplateEdit;
