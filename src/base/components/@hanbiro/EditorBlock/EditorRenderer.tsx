import EditorJsHtml from 'editorjs-html';

import { OutputData } from '@editorjs/editorjs';
import { Box } from '@mui/material';

type Props = {
  data: OutputData;
};

type ParsedContent = string | JSX.Element;
const EditorJsRenderer = ({ data }: Props) => {
  const EditorJsToHtml = EditorJsHtml();
  const html = EditorJsToHtml.parse(data) as ParsedContent[];
  return (
    <Box>
      {html.map((item, index) => {
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </Box>
  );
};

export default EditorJsRenderer;