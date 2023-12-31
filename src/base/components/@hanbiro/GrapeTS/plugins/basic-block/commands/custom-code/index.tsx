import { commandNameCustomCode, keyCustomCode } from '../../constants';

export default (editor: any, opts: any) => {
  const cmd = editor.Commands;
  const { modalTitle, codeViewOptions, commandCustomCode } = opts;

  const appendToContent = (target: any, content: any) => {
    if (content instanceof HTMLElement) {
      target.appendChild(content);
    } else if (content) {
      target.insertAdjacentHTML('beforeend', content);
    }
  };

  // Add the custom code command
  cmd.add(commandNameCustomCode, {
    keyCustomCode,

    run(editor: any, sender: any, opts: any) {
      this.editor = editor;
      this.options = opts;
      this.target = opts.target || editor.getSelected();
      const { target } = this;

      if (target && target.get('editable')) {
        this.showCustomCode(target);
      }
    },

    stop(editor: any) {
      editor.Modal.close();
    },

    /**
     * Method which tells how to show the custom code
     * @param  {Component} target
     */
    showCustomCode(target: any) {
      const { editor, options } = this;
      const title = options.title || modalTitle;
      const content = this.getContent();
      const code = target.get(keyCustomCode) || '';
      editor.Modal.open({ title, content })
        .getModel()
        .once('change:open', () => editor.stopCommand(this.id));
      this.getCodeViewer().setContent(code);
    },

    /**
     * Custom pre-content. Can be a simple string or an HTMLElement
     */
    getPreContent() {
      //return;
    },

    /**
     * Custom post-content. Can be a simple string or an HTMLElement
     */
    getPostContent() {
      //return;
    },

    /**
     * Get all the content for the custom code
     * @return {HTMLElement}
     */
    getContent(): HTMLElement {
      const { editor } = this;
      const content = document.createElement('div');
      const codeViewer = this.getCodeViewer();
      const pfx = editor.getConfig('stylePrefix');
      content.className = `${pfx}custom-code`;
      appendToContent(content, this.getPreContent());
      content.appendChild(codeViewer.getElement());
      appendToContent(content, this.getPostContent());
      appendToContent(content, this.getContentActions());
      codeViewer.refresh();
      setTimeout(() => codeViewer.focus(), 0);

      return content;
    },

    /**
     * Get the actions content. Can be a simple string or an HTMLElement
     * @return {HTMLElement|String}
     */
    getContentActions(): HTMLElement | string {
      const { editor } = this;
      const btn = document.createElement('button');
      const pfx = editor.getConfig('stylePrefix');
      btn.innerHTML = opts.buttonLabel;
      btn.className = `${pfx}btn-prim ${pfx}btn-import__custom-code`;
      btn.onclick = () => this.handleSave();

      return btn;
    },

    /**
     * Handle the main save task
     */
    handleSave() {
      const { editor, target } = this;
      const code = this.getCodeViewer().getContent();
      target.set(keyCustomCode, code);
      editor.Modal.close();
    },

    /**
     * Return the code viewer instance
     * @return {CodeViewer}
     */
    getCodeViewer(): any {
      const { editor } = this;

      if (!this.codeViewer) {
        this.codeViewer = editor.CodeManager.createViewer({
          codeName: 'htmlmixed',
          theme: 'hopscotch',
          readOnly: 0,
          ...codeViewOptions,
        });
      }

      return this.codeViewer;
    },

    ...commandCustomCode,
  });
};
