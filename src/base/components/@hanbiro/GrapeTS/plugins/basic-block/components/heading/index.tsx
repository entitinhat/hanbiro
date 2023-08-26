export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const textType = domc.getType('text');
  const textModel = textType.model;
  const textView = textType.view;

  domc.addType('heading', {
    isComponent(el: any) {
      if (el && el.tagName && ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) {
        return { type: 'heading' };
      }
    },
    extend: 'text',
    model: {
      defaults: {
        'custom-name': 'Heading',
        tagName: config.defaultHTagName,
        stylable: [
          'font-family',
          'font-size',
          'font-weight',
          'letter-spacing',
          'color',
          // 'line-height',
          //  'text-decoration', //TODO
          // 'text-shadow',
          'text-align',
          'background-color'
        ],
        traits: [
          {
            type: 'select',
            options: [
              { value: 'h1', name: config.labelHN1 },
              { value: 'h2', name: config.labelHN2 },
              { value: 'h3', name: config.labelHN3 },
              { value: 'h4', name: config.labelHN4 },
              { value: 'h5', name: config.labelHN5 },
              { value: 'h6', name: config.labelHN6 }
            ],
            label: config.labelHTrait,
            name: 'tagName',
            changeProp: 1
          }
        ]
      }
    },
    view: textView.extend({
      handleUpdate() {
        const selectedComponent = editor.getSelected();
        // console.log("'Focusout'------------------------------------>");
        const oldHtml = selectedComponent.getInnerHTML();
        const newHtml = selectedComponent.getEl().innerHTML;
        if (oldHtml !== newHtml) {
          console.log('newHtml', newHtml);
          // console.log('update component');
          //Problem: a text component that t create new components every time I press "Enter" key to create new paragraphs
          //Solution: new components is <div><br></div> which replace by <br>.
          //https://github.com/GrapesJS/grapesjs/issues/761
          let removeSpaceHTML = newHtml.replaceAll('<div><br></div>', '<br>');
          let removeDivElement = removeSpaceHTML.replaceAll('<div>', '<br>');
          removeDivElement = removeDivElement.replaceAll('</div>', '');
          // console.log('Listen component updated inner-----------------------', removeSpaceHTML);
          //Set new collection if components are provided, otherwise the current collection is returned
          selectedComponent.components(removeDivElement);
        }
      },
      events: {
        ...textView.events,
        click: function (event: any) {
          this.el.contentEditable = true;
        },
        focusout: 'handleUpdate'
      }
    })
  });
};
