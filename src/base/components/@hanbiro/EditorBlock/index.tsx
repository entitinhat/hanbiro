import React, { memo, useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_TOOLS } from './EditorTools';

type Props = {
  value?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

const EditorBlock = ({ value, onChange, holder }: Props) => {
  //add a reference to editor
  const ref = useRef<EditorJS>();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holderId: holder,
        inlineToolbar: ['link', 'marker', 'bold', 'italic'],
        tools: EDITOR_TOOLS,
        data: value,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
        placeholder: 'Let`s write an awesome story!',
        autofocus: true,
        onReady: () => {
          console.log('Editor.js is ready to work!');
        }
      });
      ref.current = editor;
    }
    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} style={{width: '100%'}} />;
};

export default memo(EditorBlock);
