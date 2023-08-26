import { cmdImport } from './../constants';

export default (editor: any, config: any) => {
  const pfx = editor.getConfig('stylePrefix');
  const modal = editor.Modal;
  const codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
  const container = document.createElement('div');
  const importLabel = config.modalImportLabel;
  const importCnt = config.modalImportContent;
  let viewerEditor = codeViewer.editor;

  //cancel btn
  const btnCancel = document.createElement('button');
  btnCancel.type = 'button';
  btnCancel.innerHTML = 'Close';
  btnCancel.className = `${pfx}btn-confirm-no ${pfx}btn-prim`;

  // Init import button
  const btnImp = document.createElement('button');
  btnImp.type = 'button';
  btnImp.innerHTML = config.modalImportButton;
  btnImp.className = `${pfx}btn-prim ${pfx}btn-import`;
  btnImp.onclick = () => {
    editor.DomComponents.getWrapper().set('content', '');
    editor.setComponents(viewerEditor.getValue().trim());
    // editor.setStyle(viewerEditor.getValue().trim()); //fix add style when import local html
    modal.close();
  };

  btnCancel.onclick = () => {
    modal.close();
  };

  // Init code viewer
  codeViewer.set({
    ...{
      codeName: 'htmlmixed',
      theme: 'hopscotch',
      readOnly: 0,
    },
    ...config.importViewerOptions,
  });

  return {
    run(editor: any) {
      if (!viewerEditor) {
        const txtarea = document.createElement('textarea');

        if (importLabel) {
          const labelEl = document.createElement('div');
          labelEl.className = `${pfx}import-label`;
          labelEl.innerHTML = importLabel;
          container.appendChild(labelEl);
        }

        container.appendChild(txtarea);
        container.appendChild(btnImp);
        container.appendChild(btnCancel);
        codeViewer.init(txtarea);
        viewerEditor = codeViewer.editor;
      }

      modal.setTitle(config.modalImportTitle);
      modal.setContent(container);
      const cnt = typeof importCnt == 'function' ? importCnt(editor) : importCnt;
      codeViewer.setContent(cnt || '');
      modal
        .open()
        .getModel()
        .once('change:open', () => editor.stopCommand(cmdImport)); //this.id
      viewerEditor.refresh();
    },

    stop() {
      modal.close();
    },
  };
};
