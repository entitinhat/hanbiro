import juice from 'juice';
import { cmdExport } from './../constants';

const svgLeftArrow =
  '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="#ffffff"></path> </g></svg>';
const svgRightArrow =
  '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#ffffff"></path> </g></svg>';
export default (editor: any, config: any) => {
  const pfx = editor.getConfig('stylePrefix');
  const modal = editor.Modal;
  const codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
  const codeViewerCss = editor.CodeManager.getViewer('CodeMirror').clone();

  const container = document.createElement('div');
  const juiceOpts = config.juiceOpts || {};
  let cmdm = editor.Commands;
  let viewerEditor = codeViewer.editor;
  let viewerEditorCss = codeViewer.editor;

  //Reset btn
  const btnCancel = document.createElement('button');
  btnCancel.type = 'button';
  btnCancel.innerHTML = 'Reset';
  btnCancel.className = `${pfx}btn-confirm-no ${pfx}btn-prim`;
  btnCancel.onclick = () => {
    const tmpl = editor.getHtml();
    codeViewer.setContent(config.inlineCss ? juice(tmpl, juiceOpts) : tmpl);
    codeViewerCss.setContent(editor.getCss());
  };
  // Init import button
  const btnImp = document.createElement('button');
  btnImp.type = 'button';
  btnImp.innerHTML = 'Apply Change';
  btnImp.className = `${pfx}btn-prim ${pfx}btn-import`;
  btnImp.onclick = () => {
    editor.DomComponents.getWrapper().set('content', '');
    const nVal = viewerEditor.getValue().trim() + `<style>${viewerEditorCss.getValue().trim()}</style>`;
    editor.setComponents(nVal);

    // editor.setStyle(viewerEditor.getValue().trim()); //fix add style when import local html
    modal.close();
  };
  // Init code viewer
  codeViewer.set({
    ...{
      codeName: 'htmlmixed',
      theme: 'hopscotch', //codeViewerTheme: 'material',
      readOnly: 0,
      width: '45%'
    },
    ...config.importViewerOptions
  });
  // Init code viewer
  codeViewerCss.set({
    ...{
      codeName: 'css',
      theme: 'hopscotch', //codeViewerTheme: 'material',
      readOnly: 0,
      lineWrapping: 1,
      style: { width: '45%' }
    },
    ...config.importViewerOptions
  });
  // Set the command which could be used outside
  cmdm.add(cmdExport, {
    run(editor: any, sender: any, opts: any) {
      const tmpl = editor.getHtml() + `<style>${editor.getCss()}</style>`;
      return juice(tmpl, opts);
    }
  });
  console.log('codeViewerCss', codeViewerCss);
  return {
    run(editor: any, sender: any) {
      // Init code viewer if not yet instantiated
      if (!viewerEditor) {
        let txtarea = document.createElement('textarea');
        let txtareaCss = document.createElement('textarea');

        //Parent container
        let codeContainer = document.createElement('div');
        codeContainer.style.display = 'flex';
        // codeContainer.className
        if (config.modalExportLabel) {
          let labelEl = document.createElement('div');
          labelEl.className = pfx + 'export-label';
          labelEl.innerHTML = config.modalExportLabel;
          container.appendChild(labelEl);
        }

        //HTML header
        let htmlHeader = document.createElement('div');
        htmlHeader.className = 'code-mirror-header';
        htmlHeader.innerHTML += 'HTML';
        //CSS header
        let cssHeader = document.createElement('div');
        cssHeader.className = 'code-mirror-header';
        cssHeader.style.textAlign = 'left';

        //HTML container
        let htmlContainer = document.createElement('div');
        htmlContainer.className = 'code-mirror-container';
        htmlContainer.appendChild(htmlHeader);
        htmlContainer.appendChild(txtarea);

        //CSS container
        let cssContainer = document.createElement('div');
        cssContainer.className = 'code-mirror-container';
        cssContainer.appendChild(cssHeader);
        cssContainer.appendChild(txtareaCss);

        //collapse button
        const btnCollapse = document.createElement('button');
        btnCollapse.type = 'button';
        btnCollapse.innerHTML = svgLeftArrow;
        btnCollapse.className = `code-mirror-collapse-btn`;
        btnCollapse.onclick = () => {
          if (htmlContainer.style.width == '50%' || htmlContainer.style.width == '') {
            btnCollapse.innerHTML = svgRightArrow;
            // btnCollapseRight.innerHTML = svgRightArrow;
            htmlContainer.style.width = '15%';
            cssContainer.style.width = '85%';
          } else {
            btnCollapse.innerHTML = svgLeftArrow;
            btnCollapseRight.innerHTML = svgRightArrow;

            htmlContainer.style.width = '50%';
            cssContainer.style.width = '50%';
          }
        };

        const btnCollapseRight = document.createElement('button');
        btnCollapseRight.type = 'button';
        btnCollapseRight.className = `code-mirror-collapse-btn`;
        btnCollapseRight.innerHTML = svgRightArrow;

        btnCollapseRight.onclick = () => {
          console.log('cssContainer.style.width', cssContainer.style.width);
          if (cssContainer.style.width == '50%' || cssContainer.style.width == '') {
            btnCollapseRight.innerHTML = svgLeftArrow;
            // btnCollapse.innerHTML = svgLeftArrow;

            htmlContainer.style.width = '85%';
            cssContainer.style.width = '15%';
          } else {
            btnCollapseRight.innerHTML = svgRightArrow;
            btnCollapse.innerHTML = svgLeftArrow;

            htmlContainer.style.width = '50%';
            cssContainer.style.width = '50%';
          }
        };

        htmlHeader.appendChild(btnCollapse);

        cssHeader.innerHTML += 'CSS';
        cssHeader.appendChild(btnCollapseRight);
        cssHeader.style.flexDirection = 'row-reverse';
        // codeContainer.appendChild(htmlContainer);
        codeContainer.appendChild(htmlContainer);
        // codeContainer.appendChild(btnCollapse);
        codeContainer.appendChild(cssContainer);

        container.appendChild(codeContainer);
        container.appendChild(btnImp);
        container.appendChild(btnCancel);
        console.log('txtarea', txtarea);
        codeViewer.init(txtarea);
        codeViewerCss.init(txtareaCss);

        viewerEditor = codeViewer.editor;
        viewerEditorCss = codeViewerCss.editor;
        viewerEditor.setOption('lineWrapping', 1);
      }

      modal.setTitle(config.modalExportTitle);
      modal.setContent(container);
      const tmpl = editor.getHtml();
      codeViewer.setContent(config.inlineCss ? juice(tmpl, juiceOpts) : tmpl);
      codeViewerCss.setContent(editor.getCss());

      modal
        .open()
        .getModel()
        .once('change:open', () => editor.stopCommand(cmdExport)); //this.id
      viewerEditor.refresh();
      sender && sender.set && sender.set('active', 0);
    },

    stop() {
      modal.close();
    }
  };
};
