import React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Box } from '@mui/material';
interface IEditorViewProps {
  value: any;
}
const EditorTemplateView: React.FC<IEditorViewProps> = (props: IEditorViewProps) => {
  const { value } = props;
  console.log('value TUi', value);
  const html = ` ${value?.content?.html}`;
  console.log('TUI style', html);
  return (
    <>
      <div style={{ left: '0px', top: '0px', position: 'relative', width: '100%', height: '60vh' }}>
        <iframe
          style={{
            height: '100%',
            width: '100%',
            border: 0,
            overflow: 'hidden'
          }}
          scrolling="no"
          srcDoc={`<!DOCTYPE html>
          <html>
            <head><style>${value?.content?.css}</style></head>
            <body>
            <div style="height: calc(100vh - 10px); overflow: auto">
              ${value?.content?.html ?? value?.content}
            </div>
          </body>

          </html>
        `}
        />
      </div>
    </>
  );
};

export default EditorTemplateView;
