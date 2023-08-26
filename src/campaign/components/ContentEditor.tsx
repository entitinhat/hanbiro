import { useEffect, useState } from 'react';

//third-party
import { Box, Stack, Typography } from '@mui/material';

//project
import SelectTemplate from '@base/containers/ViewField/SelectTemplate';
import { Template } from '@base/types/setting';
import { BaseTemplateData } from '@base/utils/helpers/templatesUtils';
import { TemplateGroup } from '@base/types/app';
import GrapesTS from '@base/components/@hanbiro/GrapeTS';

interface ContentEditorProps {
  templateType: any;
  value: any;
  onChange: (newVal: any) => void;
}

const ContentEditor = (props: ContentEditorProps) => {
  const { templateType = 'basic', value, onChange } = props;
  const defaultTplValue = {
    id: '',
    name: 'No Selected'
  };
  const [selectedTpl, setSelectedTpl] = useState<Template>(defaultTplValue);
  const [content, setContent] = useState<any>(null); //={html, css}

  //init value
  useEffect(() => {
    if (value) {
      if (value.tpl && value.tpl.id !== selectedTpl?.id) {
        setSelectedTpl(value.tpl);
      }
      try {
        setContent(JSON.parse(value.content));
      } catch (e) {
        setContent(null);
      }
    } else {
      setSelectedTpl(defaultTplValue);
      setContent(null);
    }
  }, [value]);

  //template change
  const handleSelectTemplateChange = (tpl: BaseTemplateData) => {
    let sTpl: Template = {
      id: tpl.id,
      name: tpl.name
    };
    setSelectedTpl(sTpl);
    //set content
    if (tpl.html) {
      const htmlJson = JSON.parse(tpl.html ?? '{}');
      const cssStr = `<style>${htmlJson?.css ?? ''}</style>`;

      const htmlString = htmlJson?.html ?? '';
      const newHtml = { html: htmlString, css: cssStr };
      setContent((prev: any) => {
        return { ...prev, ...newHtml };
      });

      //callback
      onChange && onChange({ content: newHtml, tpl: sTpl });
    }
  };

  //content change
  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
    //callback
    onChange && onChange({ content: newContent, tpl: selectedTpl });
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Stack spacing={1}>
        <Stack direction={'row'} alignItems="center" spacing={1}>
          <Typography>Select a template</Typography>
          <SelectTemplate
            useSelectBox={true}
            templateGroup={TemplateGroup.EMAIL}
            options={[]}
            value={selectedTpl}
            onChange={(item) => handleSelectTemplateChange(item)}
          />
        </Stack>
        <Box sx={{ minWidth: '980px' }}>
          <GrapesTS
            isFullScreen={true}
            height={'calc(100vh - 360px)'}
            storageId={'grapes-ts'}
            value={content}
            onChange={handleEditorChange}
            templateType={templateType}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ContentEditor;
