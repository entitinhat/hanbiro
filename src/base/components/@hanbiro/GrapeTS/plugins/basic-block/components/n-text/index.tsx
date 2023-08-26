import { functions } from 'lodash';
import components from '../../../form-block/components';

export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const textType = domc.getType('text');
  const textModel = textType.model;
  const textView = textType.view;

  domc.addType('text', {
    extend: 'text',
    toolbar: [
      {
        attributes: { class: 'fa fa-arrows' },
        command: 'tlb-move'
      }
    ],
    isComponent(el: any) {
      const textTag = ['TEXT', 'P', 'A', 'TAG', 'SPAN', 'STRONG', 'LABEL'];
      if (textTag.includes(el.tagName)) {
        return { type: 'text', name: 'text', content: el.innerHTML, contenteditable: true };
      }
    },
    model: {
      defaults: {
        // tagName: 'div',
        // contenteditable: true,
        name: 'text',
        draggable: '*',
        // droppable: '[data-gjs-type="personalize"]',
        droppable: false,
        resizable: true,
        attributes: { 'data-mytext': 'MyText' },
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
            name: 'dmode',
            label: 'Drag mode',
            options: [{ value: 'absolute' }, { value: 'traslate' }],
            changeProp: 1
          }
        ]
      },
      async init(this: any) {
        this.el.contentEditable = true;

        //call api to get data
        this.on('change:dmode', this.handleDModeChange);
        //this.on('change:surveyLink', this.handleLinkChange);
      },
      handleDModeChange(this: any) {
        const dragMode = this.get('dmode');
        this.set('dmode', dragMode);
        if (dragMode == 'traslate') {
          const oldStyles = this.getStyle();
          // console.log('old style:', oldStyles, this);
          this.setStyle({ ...oldStyles, position: 'relative', top: '', left: '' });
        }
      }
    },
    //extendFnView: ['render'],
    view: textView.extend({
      // Callback triggered when the element is removed from the canvas
      handleDrag() {
        // console.log('mousemove');

        const selectedComponent = editor.getSelected();
        if (selectedComponent && selectedComponent.props()) {
          selectedComponent.props().draggable = true;
          // button.setAttribute('listener', 'true');
        }
      },
      handleUpdate() {
        const selectedComponent = editor.getSelected();
        // console.log("'Focusout'------------------------------------>");
        const oldHtml = selectedComponent.getInnerHTML();
        const newHtml = selectedComponent.getEl().innerHTML;
        if (oldHtml !== newHtml) {
          // console.log('newHtml', newHtml);
          //Problem: a text component that t create new components every time I press "Enter" key to create new paragraphs
          //Solution: new components is <div><br></div> which replace by <br>.
          //https://github.com/GrapesJS/grapesjs/issues/761
          const removeSpaceHTML = newHtml.replaceAll('<div><br></div>', '<br>');
          let removeDivElement = removeSpaceHTML.replaceAll('<div>', '<br>');
          removeDivElement = removeDivElement.replaceAll('</div>', '');
          // console.log('Listen component updated inner-----------------------', removeSpaceHTML);
          //Set new collection if components are provided, otherwise the current collection is returned
          selectedComponent.components(removeDivElement);
        }
      },
      removed() {
        const button = document.querySelector('.gjs-toolbar');
        if (button) {
          //Remove event of this button
          // console.log('remove event----------');
          // button.setAttribute('listener', 'false');
          button.removeEventListener('mousemove', this.handleDrag);
        }
      },

      events: {
        ...textView.events,
        mousedown: function (event: any) {
          const button = document.querySelector('.gjs-toolbar');

          if (button) {
            button.addEventListener('mousemove', this.handleDrag);
          }
          if (this.el.contentEditable) {
            this.model.set('draggable', false);
          }
          this.el.contentEditable = true;
        },
        focusout: 'handleUpdate'
      }
    })
  });
};
