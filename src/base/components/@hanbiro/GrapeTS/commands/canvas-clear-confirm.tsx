import {
  cmdClear
} from './../constants';

export default (editor: any, config: any) => {
  const pfx = editor.getConfig('stylePrefix');
  const modal = editor.Modal;

  const btnOK = document.createElement('button');
  btnOK.type = 'button';
  btnOK.innerHTML = 'Yes';
  btnOK.className = `${pfx}btn-confirm-yes ${pfx}btn-prim`;

  const btnNo = document.createElement('button');
  btnNo.type = 'button';
  btnNo.innerHTML = 'No';
  btnNo.className = `${pfx}btn-confirm-no ${pfx}btn-prim`;

  const container = document.createElement('div');
  const labelEl = document.createElement('div');

  btnOK.onclick = () => {
    editor.runCommand('core:canvas-clear');
    modal.close();
  };

  btnNo.onclick = () => {
    modal.close();
  };

  return {
    run(editor: any) {
      modal.setTitle(config.textClearTitle);
      labelEl.className = `${pfx}confirm-label`;
      labelEl.innerHTML = config.textCleanCanvas;
      container.appendChild(labelEl);
      container.appendChild(btnNo);
      container.appendChild(btnOK);

      modal.setContent(container);
      modal
        .open({
          attributes: {
            class: 'gjs-modal-sm',
          }
        })
        .getModel()
        .once('change:open', () => editor.stopCommand(cmdClear)); //this.id
    },

    stop() {
      modal.close();
    },
  };
}