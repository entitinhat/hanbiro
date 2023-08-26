declare module '@editorjs/*' {
  const plugin: any;
  export default plugin;
}

declare module 'editorjs-html' {
  import EditorJsHtml from 'editorjs-html';
  export = EditorJsHtml;
}

declare module '@calumk/editorjs-columns' {
  import EditorjsColumns from '@calumk/editorjs-columns';
  export = EditorjsColumns;
}

declare module 'editorjs-alert' {
  import EditorjsAlert from 'editorjs-alert';
  export = EditorjsAlert;
}
