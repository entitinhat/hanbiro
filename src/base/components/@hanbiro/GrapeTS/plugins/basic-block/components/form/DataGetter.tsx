import { DatasPromise } from '@base/types/response';
const FormDataGetter = (editor: any, component: string, data: any) => {
  console.log('component id in formDataGetter', component);
  if (component !== '' && component !== null) {
    const selector = `#${component}`;
    const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
    console.log('SelectedComponent', SelectedComponent);
    console.log('SelectedComponent.getClasses()', SelectedComponent?.getAttributes('source'));
    const attr = SelectedComponent.getAttributes();
    console.log('attr.downloadId', attr.source);
    const fileId = attr?.source ? attr?.source?.split(':')[1] : '';
    console.log('fileId', fileId);
    // if (!attr.downloadId) {
    //   SelectedComponent?.set('tagName', `div`);
    //   SelectedComponent?.set('attributes', { class: 'form-select' });
    // }
    SelectedComponent.components(` ${
      fileId == ''
        ? `<option value="" selected disabled hidden>
      Select a form
    </option>`
        : ''
    }
${data?.data
  ?.map((tag: any) => {
    return createOption(tag.id, tag.name, attr.source);
  })
  .join('')}
  `);
    const oldHtmlComponent = SelectedComponent.getInnerHTML();
    SelectedComponent.getEl().innerHTML = oldHtmlComponent;
  }
};
//get options/data
const createOption = (value: string, content: string, attr: string) => {
  const nVal = attr ? attr.split(':')[1] : '';
  console.log(' compare', value, nVal);

  return `<option value="${value}" ${value == nVal ? 'selected' : ''} >${content}</option>`;
};
export default FormDataGetter;
