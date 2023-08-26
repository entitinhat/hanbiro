/* eslint-disable no-control-regex */
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default (editor: any, opts: any) => {
  let pfx = editor.getConfig('stylePrefix');
  let btnExp = document.createElement('button');
  let commandName = 'export-zip';

  let config: any = {
    addExportBtn: 1,
    btnLabel: 'Export to ZIP',
    filenamePfx: 'crm_template',
    filename: null,
    root: {
      css: {
        'style.css': (ed: any) => ed.getCss(),
      },
      'index.html': (ed: any) =>
        `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="./css/style.css">
          </head>
          <body>${ed.getHtml()}</body>
        <html>`,
    },
    isBinary: null,
    ...opts,
  };

  btnExp.innerHTML = config.btnLabel;
  btnExp.className = `${pfx}btn-prim`;

  // Add command
  editor.Commands.add(commandName, {
    createFile(zip: any, name: string, content: any) {
      const opts: any = {};
      // eslint-disable-next-line prefer-destructuring
      const ext = name.split('.')[1];
      const isBinary = config.isBinary
        ? config.isBinary(content, name)
        : !(ext && ['html', 'css'].indexOf(ext) >= 0) && !/^[\x00-\x7F]*$/.test(content);

      if (isBinary) {
        opts.binary = true;
      }

      editor.log(['Create file', { name, content, opts }], { ns: 'plugin-export' });

      zip.file(name, content, opts);
    },

    async createDirectory(zip: any, root: any) {
      root = typeof root === 'function' ? await root(editor) : root;
      for (const name in root) {
        //if(root?.name) --> this wrong, not exist attribute name
        if (root[name]) {
          let content = root[name];
          content = typeof content === 'function' ? await content(editor) : content;
          const typeOf = typeof content;
          if (typeOf === 'string') {
            this.createFile(zip, name, content);
          } else if (typeOf === 'object') {
            const dirRoot = zip.folder(name);
            await this.createDirectory(dirRoot, content);
          }
        }
      }
    },

    run(editor: any) {
      const zip = new JSZip();
      this.createDirectory(zip, config.root).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          const filenameFn = config.filename;
          let filename = filenameFn
            ? filenameFn(editor)
            : `${config.filenamePfx}_${Date.now()}.zip`;
          FileSaver.saveAs(content, filename);
        });
      });
    },
  });

  // Add button inside export dialog
  if (config.addExportBtn) {
    editor.on('run:export-template', () => {
      editor.Modal.getContentEl().appendChild(btnExp);
      btnExp.onclick = () => {
        editor.runCommand(commandName);
      };
    });
  }
};
