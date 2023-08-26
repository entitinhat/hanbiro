
export default (editor: any, config: any) => {
  const commands = editor.Commands;
  commands.add('click-action:open-modal', {
    open(content: any) {
      //alert('open');
      const { editor, title, config } = this;

      const { Modal } = editor;
      Modal.open({ title, content }).onceClose(() => editor.stopCommand(this.id));
    },
    close() {
      //alert('close');
      const { Modal } = this.editor;
      Modal && Modal.close();
    },
    run(editor: any, sender: any, opts: any) {
      const { clickAction } = opts;

      const divContainer = document.createElement('div');

      // const containerRows = document.getElementById('grapeModalID');
      const clickActionSetSelected = function (el: HTMLDivElement) {
        console.log('clickActionSetSelected', el);
        console.log('clickAction', clickAction);
        //clickAction.el = el;

        clickAction.el.innerHTML = el.innerHTML;
        //clickAction.el.innerHTML = ctas.selected();
        //alert('on clickAction');
      };
      // containerRows.className = 'modal-table-row';
      // const labelRows = document.createElement('label');
      // labelRows.innerHTML = 'No. of Rows';
      // containerRows.appendChild(labelRows);
      this.id = 'click-action:open-modal';
      this.title = 'Select CTA';
      this.editor = editor;
      this.config = config;

      console.log('this:', this);

      // if (containerRows) {
      //   divContainer.appendChild(containerRows);
      // }
      this.rendered = divContainer;

      this.open(this.rendered);
      // editor.Modal.open({
      //   title: 'Select CTA', // string | HTMLElement
      //   content: divContainer // string | HTMLElement
      // });
    },
    stop(editor: any) {
      //alert('stop');
      console.log('editor', editor);
      this.editor = editor;
      this.close();
    }
  });
};
