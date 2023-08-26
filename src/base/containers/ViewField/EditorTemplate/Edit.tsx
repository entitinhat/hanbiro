import React, { useEffect, useRef, useState } from 'react';
import { Template } from '@base/types/setting';
import TuiEditor from '@base/components/@hanbiro/TuiEditor';
import { BaseTemplateData } from '@base/utils/helpers/templatesUtils';
import SelectTemplate from '../SelectTemplate';
import { TemplateGroup } from '@base/types/app';
import { Grid } from '@mui/material';

interface EditorEditProps {
  value: any;
  onChange: (params: any) => {};
  menuSource: string;
  templateGroup: TemplateGroup;
}
const EditorTemplateEdit: React.FC<EditorEditProps> = (props: EditorEditProps) => {
  const { value, onChange, menuSource, templateGroup } = props;
  // const defaultTplValue =
  //   value && value.tpl
  //     ? {
  //         id: value.tpl.id,
  //         name: value.tpl.name
  //       }
  //     : {
  //         id: '',
  //         name: 'ncrm_common_template_auto_no_selected'
  //       };
  // const [templateSelected, setTemplateSelected] = useState<Template>(defaultTplValue);

  const [content, setContent] = useState<string>('');
  useEffect(() => {
    const initContentValue = value && value.content ? value.content.html : '';
    setContent(initContentValue);
  }, [value]);
  // const handleSelectTemplateChange = (tpl: BaseTemplateData) => {
  //   let sTpl: Template = {
  //     id: tpl.id,
  //     name: tpl.name
  //   };
  //   setTemplateSelected(sTpl);
  //   // do setconent
  //   if (tpl.html) {
  //     const htmlJson = JSON.parse(tpl.html ?? '{}');
  //     const cssStr = `<style>${htmlJson?.css ?? ''}</style>`;

  //     const htmlString = htmlJson?.html ?? '';
  //     const nContent = htmlString + cssStr;
  //     setContent(nContent);
  //   }
  //   let newValue = {
  //     tpl: {
  //       id: tpl.id,
  //       name: tpl.name
  //     },
  //     content: tpl.html ?? ''
  //   };
  //   onChange && onChange(newValue);
  // };
  console.log('TUi edit value', value);
  console.log('content:', content);
  return (
    <>
      {/* <Grid sx={{ mb: '10px' }}>
        <SelectTemplate
          useSelectBox={true}
          // menuSource={menuSource}
          templateGroup={templateGroup}
          options={[]}
          value={templateSelected}
          onChange={(item) => handleSelectTemplateChange(item)}
        />
      </Grid> */}
      {/* <TextArea value={value} onChange={(data: any) => onChange(data)} /> */}
      <TuiEditor
        value={content}
        onChange={(newContent: string) => {
          let newValue = value
            ? {
                ...value,
                content: { html: newContent, css: value?.content?.css, body: value?.content?.body }
              }
            : {
                tpl: null,
                content: { html: newContent, css: value?.content?.css, body: value?.content?.body }
              };
          console.log('payloadParams: ', newValue);
          onChange && onChange(newValue);
        }}
      />
    </>
  );
};

export default EditorTemplateEdit;
