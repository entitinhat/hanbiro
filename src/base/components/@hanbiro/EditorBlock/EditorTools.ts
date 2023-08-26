import Code from '@editorjs/code';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';

export const EDITOR_TOOLS = {
  code: Code,
  header: {
    class: Header,
    inlineToolbar : true
  },
  paragraph: Paragraph,
  list: List,
  table: Table
};
