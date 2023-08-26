import React, { useEffect, useRef, useState } from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { useTheme } from '@mui/material';

export interface OptionParam {
  code: string;
  name: string;
}

interface TuiEditorProps {
  value: string;
  placeholder?: string;
  onChange: (nVal: string) => void;
  editorProps?: EditorProps;
  paramsOpt?: OptionParam[];
  extraToolbars?: [];
}

function createParamsButton(onClick: any) {
  const button = document.createElement('button');
  button.className = 'toastui-editor-toolbar-icons last dropdown-toggle';
  button.style.backgroundImage = 'none';
  button.style.margin = '0';
  button.style.width = '50px';
  button.innerHTML = `%P%`;
  button.addEventListener('click', (ev: any) => {
    onClick && onClick(ev);
  });

  return button;
}
const TuiEditor = (props: TuiEditorProps) => {
  const theme = useTheme();
  const { value, onChange, editorProps, paramsOpt, placeholder, extraToolbars = [] } = props;

  // state
  const [content, setContent] = useState<string | undefined>(value);
  const editorRef = useRef<any>(null);
  const [showPopover, setShowPopover] = useState(false);

  // // console.log('TuiEditor initShowPopover', showPopover);
  // // console.log('TuiEditor initValue', value, 'content=>', content);
  // let paramsOpt: IParam[] = [
  //   {
  //     code: '%companyName%',
  //     name: 'Company Name',
  //   },
  //   {
  //     code: '%phone%',
  //     name: 'Phone',
  //   },
  // ];

  const handleClick = (ev: any) => {
    //// console.log('showPopover', showPopover);
    setShowPopover(!showPopover);
  };
  const butonParams = createParamsButton(handleClick);
  const customToolbarItems = paramsOpt
    ? [
        {
          el: butonParams,
          command: 'insertParams',
          tooltip: 'Insert Params',
          name: 'insertParams'
        }
      ]
    : [];
  const defaultProps: EditorProps = {
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    toolbarItems: [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol'],
      ['table'],
      // ['ul', 'ol', 'task', 'indent', 'outdent'],
      // ['table', 'image', 'link'],
      // ['code', 'codeblock'],
      // Using Option: Customize the last button
      extraToolbars,
      customToolbarItems
    ]
  };
  const initEditorProps: EditorProps = editorProps
    ? {
        ...defaultProps,
        ...editorProps
      }
    : defaultProps;

  //init value
  useEffect(() => {
    if (JSON.stringify(value) != JSON.stringify(content)) {
      setContent(value);
      console.log('!!~~ input value', value);
      if (editorRef?.current) {
        editorRef.current.getInstance().setHTML(value, false);
      }
    }
  }, [value]);

  //value change
  const handleOnChange = () => {
    let newValue = editorRef?.current?.getInstance() && editorRef.current.getInstance().getHTML();
    // setContent(newValue);
    // //callback
    console.log('!!~~ mewValue TUI', newValue);
    onChange && onChange(newValue);
  };

  //focus on
  const handleFocus = () => {
    editorRef?.current?.getInstance() && editorRef.current.getInstance().moveCursorToStart(true);
  };

  console.log('initEditorProps', initEditorProps);
  return (
    <>
      <Editor
        theme={theme.palette.mode}
        initialValue={content != '' ? content : ''}
        ref={editorRef}
        onChange={(editorType: any) => {
          handleOnChange();
        }}
        placeholder={placeholder}
        usageStatistics={false}
        useCommandShortcut={true}
        // previewStyle={'vertical'}
        // initialEditType={'wysiwyg'}
        autofocus={false}
        {...initEditorProps}
        onFocus={handleFocus}
      />
    </>
  );
};

export default TuiEditor;
