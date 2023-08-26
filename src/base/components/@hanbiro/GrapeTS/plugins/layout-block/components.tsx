export default function (editor: any, opt: any) {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const idTrait = {
    name: 'id'
  };

  // SECTION
  domc.addType('section', {
    isComponent: (el: any) => el.tagName == 'SECTION',
    extend: 'default',
    model: {
      defaults: {
        // ...defaultModel.prototype.defaults,
        'custom-name': 'Section',
        tagName: 'section',
        attributes: { class: 'survey-section' },
        traits: [idTrait],
        styles: `
            .survey-section {
              min-height: 150px;
            }
          `
      }
    },
    view: defaultView
  });

  // CONTAINER
  domc.addType('container', {
    isComponent: (el: any) => {
      return false;
    },
    extend: 'default',
    model: 
      {
        defaults: {
          ...defaultModel.prototype.defaults,
          'custom-name': 'Container',
          tagName: 'div',
          attributes: { class: 'survey-container' },
          traits: [idTrait],
          styles: `
            .survey-container {
              min-height: 100px;
              margin: 5px 10px;
            }
          `
        }
      }
    ,
    view: defaultView
  });
}
