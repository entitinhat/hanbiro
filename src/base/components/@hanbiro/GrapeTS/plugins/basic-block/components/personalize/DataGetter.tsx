const PersonalizeDataGetter = (editor: any, component: string, data: any) => {
  if (data) {
    console.log('personalize data,', data?.results);
    const selector = `#${component}`;
    const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
    console.log('SelectedComponent', SelectedComponent);
    console.log('SelectedComponent.getClasses()', SelectedComponent?.getAttributes('downloadId'));
    const attr = SelectedComponent.getAttributes();
    console.log('attr.downloadId', attr);
    SelectedComponent.components(`
             <option value="" selected disabled hidden>
              Select a personalize
            </option>
        ${data?.results
          ?.map((tag: any) => {
            return createOption(tag.id, tag.fieldTag, attr.source);
          })
          .join('')}
        `);
    const oldHtmlComponent = SelectedComponent.getInnerHTML();
    SelectedComponent.getEl().innerHTML = oldHtmlComponent;
    // editor.TraitManager.getTraitsViewer().render();
  }
};

export default PersonalizeDataGetter;

//get options/data
const createOption = (value: string, content: string, attr: string) => {
  const nVal = attr ? attr.split(':')[1] : '';
  console.log(' compare', value, nVal);

  return `<option value="${value}" ${value == nVal ? 'selected' : ''} >${content}</option>`;
};
