import {
  typeInput,
  typeTextarea,
  typeSelect,
  typeCheckbox,
  typeRadio,
  typeButton,
  typeLabel,
  typeOption,
  typeRow,
  typeFile,
  typeDate,
  typeMutipleCheckbox,
  typeField,
  typeFormContainer,
  typeColumn
} from './constants';
import { getLayOutContent } from './helper';
import { buttonStyle, checkboxGroupStyle, checkboxStyle, fieldStyle, inputStyle, labelStyle, rowStyle } from './style';
//==========================================Config for Sample Form==========================================================
const getDefaultField = (config: { title: string; type: string; compType: string; column: number; attributes?: any }) => {
  const { title, type, compType, column, attributes } = config;
  const getGridCol = (column: number) => {
    switch (column) {
      case 1:
        return `100%`;
      case 2:
        return `50%`;
      case 3:
        return `33.33%`;
      case 4:
        return `25%`;
      default:
        return `100%`;
    }
  };
  const trailAttributes = { compType: compType, column: `${column}`, placement: 'top', title: title };
  const defaultField = {
    type: typeField,
    style: { ...fieldStyle, width: `${getGridCol(column)}` },
    ...trailAttributes,
    components: [
      { type: typeLabel, removable: false, components: [title] },
      { type: type, removable: false, attributes: { name: title, ...attributes } }
    ]
  };
  return defaultField;
};

export const defaultSampleForm = [
  { type: 'text', components: `Sample Form`, style: { 'text-align': 'center', width: '100%' } },
  {
    type: typeRow,
    components: getLayOutContent('column1', getDefaultField({ title: 'Name', type: typeInput, compType: 'text', column: 1 }))
  },
  {
    type: typeRow,
    components: getLayOutContent('column1', getDefaultField({ title: 'Title', type: typeInput, compType: 'text', column: 1 }))
  },
  {
    type: typeRow,
    components: getLayOutContent(
      'column1',
      getDefaultField({ title: 'Description', type: typeTextarea, compType: typeTextarea, column: 1, attributes: { rows: 4 } })
    )
  },
  ,
  {
    type: typeRow,
    style: { ...rowStyle, 'justify-content': 'flex-end', gap: '10px' },
    components: [
      { type: typeButton, styles: buttonStyle, attributes: { type: 'reset', class: 'muiButton-primary' }, text: 'Reset' },
      { type: typeButton, styles: buttonStyle, attributes: { type: 'submit', class: 'muiButton-primary' }, text: 'Submit' }
    ]
  }
];
//====================================================END===================================================================
export default function (editor: any, opt = {}) {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const idTrait = {
    name: 'id'
  };

  const forTrait = {
    name: 'for'
  };

  const nameTrait = {
    name: 'name'
  };

  const placeholderTrait = {
    name: 'placeholder'
  };

  const valueTrait = {
    name: 'value'
  };

  const rowsTrait = {
    name: 'rows'
  };

  const colsTrait = {
    name: 'cols'
  };

  const requiredTrait = {
    type: 'checkbox',
    name: 'required'
  };

  const checkedTrait = {
    type: 'checkbox',
    name: 'checked'
  };
  const defaultComponentCheckbox = {
    type: typeField,
    style: { ...fieldStyle, 'flex-direction': 'row', 'align-items': 'center' },
    components: [
      { type: typeLabel, removable: false },
      { type: typeCheckbox, removable: false }
    ]
  };

  //============================================ADD Component ======================================================================================
  /**
   * Document: https://grapesjs.com/docs/modules/Components.html#define-custom-component-type
   * isComponent:Let's see in detail what we have done so far. The first thing to notice is the isComponent function, we have already mentioned its usage in this section and we need it to make the editor understand <input> during the component recognition step. It receives only the el argument, which is the parsed HTMLElement node and expects a truthy value in case the element satisfies your logic condition. So, if we add this HTML string as component
   * model:The model is probably the one you'll use the most as is what is used for the description of your component and the first thing you can see is its defaults key which just stands for default component properties and it reflects the already described Component Definition. The model defines also what you will see as the resultant HTML (the export code) and you've probably noticed the use of tagName (if not specified the div will be used) and attributes properties on the model.
   * view:when you create a component in GrapesJS you expect to see in the canvas the preview of what you've defined in the model. Indeed, by default, the editor does the exact thing and updates the element in the canvas when something in the model changes (eg. attributes, tag, etc.) to obtain the classic WYSIWYG (What You See Is What You Get) experience. Unfortunately, not always the simplest thing is the right one, by building components for the builder you will notice that sometimes you'll need something more:
   * extend:Sometimes you would need to create a new type by extending another one. Just use extend
   */
  // //FORM
  // FORM CONTAINER
  domc.addType(typeFormContainer, {
    extend: 'default',
    isComponent: (el: any) => {
      // Make the editor understand when to bind `form-container`
      if (el.tagName === 'FORM') return { type: typeFormContainer };
    },
    // Model definition
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Form Container',
        tagName: 'form',
        attributes: { class: 'form-container' },
        droppable: ':not(form)', // not allow form element drop inside
        draggable: ':not(form)', // not allow dropped inside `form` elements

        //resizable Boolean (opens new window)? Indicates if it's possible to resize the component. It's also possible to pass an object as options for the Resizer (opens new window). Default: false
        resizable: true // allow resizing
        // dmode: 'absolute'

        //Components are elements inside the canvas
        // components: defaultSampleForm,
      }
    },
    view: defaultView
  });

  // INPUT
  domc.addType(typeInput, {
    isComponent: (el: any) => {
      if (el.tagName == 'INPUT') return { type: typeInput };
    },
    model: {
      defaults: {
        tagName: 'input',
        style: inputStyle,
        //draggable: 'form, form *',
        droppable: false,
        highlightable: false,
        resizable: true,
        attributes: {
          type: 'text'
        },
        traits: [
          nameTrait,
          placeholderTrait,
          {
            type: 'select',
            name: 'type',
            options: [
              { value: 'text' },
              { value: 'email' },
              { value: 'password' },
              { value: 'number' },
              { value: 'button' },
              { value: 'submit' },
              { value: 'reset' }
            ]
          },
          {
            type: 'select',
            name: 'autocomplete',
            options: [{ value: 'off' }, { value: 'on' }]
          },
          requiredTrait
        ]
      }
    }
  });

  // TEXTAREA
  domc.addType(typeTextarea, {
    // extend: typeInput,
    isComponent: (el: any) => el.tagName == 'TEXTAREA',
    model: {
      defaults: {
        tagName: 'textarea',
        droppable: false,
        attributes: {},
        traits: [nameTrait, placeholderTrait, requiredTrait, rowsTrait, colsTrait]
      }
    }
  });

  // OPTION
  domc.addType(typeOption, {
    isComponent: (el: any) => el.tagName == 'OPTION',

    model: {
      defaults: {
        tagName: 'option',
        layerable: false,
        droppable: false,
        draggable: false,
        highlightable: false
      }
    }
  });

  const createOption = (value: string, name: string) => ({
    type: typeOption,
    components: name,
    attributes: { value }
  });

  // SELECT
  domc.addType(typeSelect, {
    extend: typeInput,
    isComponent: (el: any) => el.tagName == 'SELECT',

    model: {
      defaults: {
        tagName: 'select',
        components: [createOption('opt1', 'Option 1'), createOption('opt2', 'Option 2')],
        traits: [
          nameTrait,
          {
            name: 'options',
            type: 'select-options'
          },
          requiredTrait
        ]
      }
    },

    view: {
      events: {
        //mousedown: (e: any) => e.preventDefault(),
      }
    }
  });

  // FILE
  domc.addType(typeFile, {
    extend: typeInput,
    isComponent: (el: any) => el.tagName == 'INPUT' && el.type == 'file',

    model: {
      defaults: {
        attributes: { type: 'file' }
      }
    }
  });

  // DATE
  domc.addType(typeDate, {
    extend: typeInput,
    isComponent: (el: any) => el.tagName == 'INPUT' && el.type == 'date',

    model: {
      defaults: {
        attributes: { type: 'date', value: new Date().toISOString().slice(0, 10) }
      }
    }
  });

  // CHECKBOX
  domc.addType(typeCheckbox, {
    extend: typeInput,
    isComponent: (el: any) => el.tagName == 'INPUT' && el.type == 'checkbox',

    model: {
      defaults: {
        copyable: false,
        style: checkboxStyle,
        attributes: { type: 'checkbox' },
        traits: [idTrait, nameTrait, valueTrait, requiredTrait, checkedTrait]
      }
    },

    view: {
      events: {
        click: (e: any) => e.preventDefault()
      },

      init: function (this: any) {
        this.listenTo(this.model, 'change:attributes:checked', this.handleChecked);
      },

      handleChecked: function (this: any) {
        this.el.checked = !!this.model.get('attributes').checked;
      }
    }
  });

  // MUTIPLE CHECKBOX
  domc.addType(typeMutipleCheckbox, {
    extend: 'default',
    isComponent: (el: any) => {
      if (el.classList && el.classList.contains('form-checkbox-group')) return { type: typeMutipleCheckbox };
    },

    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Mutiple checkboxes',
        style: checkboxGroupStyle,
        title: 'Choose Your Services',
        droppable: false,
        attributes: { class: 'form-checkbox-group' },
        components: [
          { type: typeLabel, components: ['Choose Your Services'], removable: false },
          {
            type: typeRow,
            droppable: '.form-field',
            draggable: '.form-field',

            components: [defaultComponentCheckbox, defaultComponentCheckbox, defaultComponentCheckbox, defaultComponentCheckbox]
          }
        ],
        traits: [
          {
            name: 'title',
            changeProp: 1
          },
          {
            name: 'name',
            changeProp: 1
          },
          {
            name: 'for',
            changeProp: 1
          }
        ]
      },
      async init(this: any) {
        //call api to get data
        // this.on('change:direction', this.handleDirectionChange);
        this.on('change:title', this.handleTitleChange);
        this.on('change:name', this.handleNameChange);
        this.on('change:for', this.handleForChange);
      },
      handleNameChange(this: any) {
        const name = this.get('name');
        this.get('components').models.forEach((model: any) => {
          if (!(model.get('tagName') == 'label')) {
            // //Row Model--->Field Model ---> Checkbox Model
            model.get('components').models.forEach((fieldComp: any) => {
              // console.log('fieldComp', fieldComp.get('components').models[1]);
              const oldAttributes = fieldComp.get('components').models[1].get('attributes');
              fieldComp.get('components').models[1].set('attributes', { ...oldAttributes, name: name });
            });
          }
        });
      },
      handleTitleChange(this: any) {
        const title = this.get('title');
        // console.log("el.get('components').models", el.get('components').models);
        this.get('components').models.forEach((model: any) => {
          if (model.get('tagName') == 'label') {
            model.components(title);
          }
        });
      },
      handleForChange(this: any) {
        const forLabel = this.get('for');
        // console.log("el.get('components').models", el.get('components').models);
        this.get('components').models.forEach((model: any) => {
          if (model.get('tagName') == 'label') {
            const oldAttributes = model.get('attributes');
            model.set('attributes', { ...oldAttributes, for: forLabel });
            // model.components(title);
          } else {
            // //Row Model--->Field Model ---> Checkbox Model
            model.get('components').models.forEach((fieldComp: any) => {
              console.log('fieldComp', fieldComp.get('components').models[1]);
              const oldAttributes = fieldComp.get('components').models[1].get('attributes');
              fieldComp.get('components').models[1].set('attributes', { ...oldAttributes, name: forLabel });
            });
          }
        });
      }
    },
    view: defaultView
  });

  // RADIO
  domc.addType(typeRadio, {
    extend: typeCheckbox,
    isComponent: (el: any) => el.tagName == 'INPUT' && el.type == 'radio',

    model: {
      defaults: {
        attributes: { type: 'radio' }
      }
    }
  });

  //BUTTON
  domc.addType(typeButton, {
    extend: typeInput,
    isComponent: (el: any) => el.tagName == 'BUTTON',

    model: {
      defaults: {
        tagName: 'button',
        attributes: { type: 'button' },
        styles: {},
        style: {},
        // dmode: 'absolute',
        // draggable: '.form-row',
        text: 'Send',
        components: [],
        // components: `<div style="display:flex,justify-content:"flex-end"">
        //     <button type="button" data-gjs-type="button" value="send" />
        //   </div>`,
        traits: [
          {
            name: 'text',
            changeProp: true
          },
          {
            type: 'select',
            name: 'type',
            options: [{ value: 'button' }, { value: 'submit' }, { value: 'reset' }]
          },
          {
            type: 'select',
            name: 'dmode',
            label: 'Drag mode',
            options: [{ value: 'absolute' }, { value: 'traslate' }],
            changeProp: 1
          }
        ]
      },

      init: function (this: any) {
        const comps = this.components();
        const tChild = comps.length === 1 && comps.models[0];
        const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || '';
        const text = chCnt || this.get('text');
        this.set({ text });
        this.on('change:text', this.__onTextChange);
        this.on('change:dmode', this.handleDModeChange);
        text !== chCnt && this.__onTextChange();
      },

      __onTextChange: function (this: any) {
        this.components(this.get('text'));
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
    view: {
      events: {
        // click: (e: any) => e.preventDefault()
      }
    }
  });

  // LABEL
  domc.addType(typeLabel, {
    extend: 'text',
    isComponent: (el: any) => {
      if (el.tagName == 'LABEL') return { type: typeLabel };
    },
    model: {
      defaults: {
        tagName: 'label',
        content: 'Label',
        traits: [
          forTrait,
          {
            type: 'select',
            name: 'dmode',
            label: 'Drag mode',
            options: [{ value: 'absolute' }, { value: 'traslate' }],
            changeProp: 1
          }
        ]
        // style: labelStyle
      },
      async init(this: any) {
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
    view: {
      ...defaultView,
      init: function () {
        // this.model.set('dmode', 'absolute');
      }
    }
  });

  /**
   * This Row layout is used to  Form design which having layout option for user choosing
   */
  // ROW
  domc.addType(typeRow, {
    extend: 'default',
    isComponent: (el: any) => {
      if (el.classList && el.classList.contains('form-row')) return { type: typeRow };
    },
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Form Row',
        attributes: { class: 'form-row' },
        tagName: 'div',
        droppable: ':not(form)',
        draggable: ':not(.form-row)',
        resizable: true,
        position: 'left',
        // dmode: 'absolute',
        name: 'horizontal',
        layoutColumn: 'column1',
        traits: [
          idTrait,
          {
            type: 'select',
            label: 'Position',
            name: 'position',
            options: [{ value: 'center' }, { value: 'left' }, { value: 'right' }],
            changeProp: 1
          },

          {
            type: 'select',
            label: 'Driection',
            name: 'direction',
            options: [{ value: 'vertical' }, { value: 'horizontal' }],
            changeProp: 1
          },
          {
            type: 'select',
            label: 'Layout',
            // ['column1', 'column2', 'column3', 'column3-7', 'column7-3'
            name: 'layoutColumn',
            options: [{ value: 'column1' }, { value: 'column2' }, { value: 'column3-7' }, { value: 'column7-3' }],
            changeProp: 1
          }
        ],
        style: rowStyle
      },
      async init(this: any) {
        //call api to get data
        this.on('change:position', this.handlePositionChange);
        this.on('change:direction', this.handleDirectionChange);
        this.on('change:layoutColumn', this.handleLayoutColumnChange);
      },
      handleLayoutColumnChange(this: any) {
        const layoutColumn = this.get('layoutColumn');
        // console.log('row element', this.get('components'));
        // console.log('row element', layoutColumn);
        const layoutContent = getLayOutContent(layoutColumn);
        this.components([layoutContent]);
      },
      handleDirectionChange(this: any) {
        const direction = this.get('direction');
        if (direction == 'vertical') {
          this.setStyle({
            ...rowStyle,
            'flex-direction': 'column'
          });
        } else {
          this.setStyle({
            ...rowStyle,
            'flex-direction': 'row'
          });
        }
      },
      handlePositionChange(this: any) {
        const position = this.get('position');
        const direction = this.get('direction');
        const flexDirection = direction === 'vertical' ? 'column' : 'row';
        let flexPosition = '';
        if (flexDirection === 'row') {
          flexPosition = 'justify-content';
        } else {
          flexPosition = 'align-items';
        }
        const oldStyles = this.getStyle();
        switch (position) {
          case 'left':
            // console.log("column:100%")
            this.setStyle({
              ...rowStyle,
              ...oldStyles,
              'flex-direction': flexDirection,
              'flex-wrap': 'wrap',
              [flexPosition]: 'flex-start'
            });
            break;
          case 'center':
            // console.log("column:50%")
            this.setStyle({
              ...rowStyle,
              ...oldStyles,
              'flex-direction': flexDirection,
              'flex-wrap': 'wrap',
              [flexPosition]: 'center'
            });
            break;
          case 'right':
            // console.log("column:50%")
            this.setStyle({
              ...rowStyle,
              ...oldStyles,
              'flex-direction': flexDirection,
              'flex-wrap': 'wrap',
              [flexPosition]: 'flex-end'
            });
            break;
        }
      }
    },
    view: defaultView
  });

  //Column
  domc.addType(typeColumn, {
    extend: 'default',
    isComponent: (el: any) => {
      if (el.classList && el.classList.contains('form-cell')) return { type: typeColumn };
    },
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Column',
        attributes: { class: 'form-cell' },
        tagName: 'div',
        resizable: {
          tl: 0,
          tc: 0,
          tr: 0,
          cr: 0,
          bl: 0,
          br: 0,
          bc: 0,
          currentUnit: 1,
          minDim: 1,
          step: 1,
          keyWidth: 'flex-basis'
        },
        droppable: ':not(form)',
        draggable: '.form-row',
        traits: []
      },
      async init(this: any) {}
    },
    view: defaultView
  });

  //FIELD
  domc.addType(typeField, {
    extend: 'default',
    isComponent: (el: any) => {
      if (el.classList && el.classList.contains('form-field')) return { type: typeField };
    },
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Field',
        // style: fieldStyle,
        attributes: { class: 'form-field' },
        resizable: true,
        // components: [{ type: typeLabel }, `<input type="checkbox" data-gjs-type=${typeCheckbox} />`],
        droppable: false,
        // placement,
        // compType,
        // title,
        // column
        traits: [
          {
            name: 'title',
            changeProp: 1
          },
          {
            name: 'name',
            changeProp: 1
          },
          {
            type: 'select',
            label: 'Position',
            name: 'placement',
            options: [
              { id: 'right', name: 'Right' },
              { id: 'left', name: 'Left' },
              { id: 'top', name: 'Top' },
              { id: 'bottom', name: 'Bottom' }
            ],
            changeProp: 1
          },
          {
            type: 'select',
            label: 'Type',
            name: 'compType',
            options: [
              { value: typeRadio },
              { value: typeCheckbox },
              { value: 'number' },
              { value: 'password' },
              { value: 'text' },
              { value: typeDate },
              { value: typeTextarea },
              { value: typeSelect },
              { value: typeFile },
              { value: 'button' },
              { value: 'submit' },
              { value: 'reset' },
              { value: 'email' }
            ],
            changeProp: 1
          }
        ]
      },

      async init(this: any) {
        //call api to get data
        this.on('change:placement', this.handlePlacementChange);
        this.on('change:compType', this.handleTypeChange);
        this.on('change:title', this.handleTitleChange);
        this.on('change:name', this.handleNameChange);
      },
      handleNameChange(this: any) {
        const name = this.get('name');
        const oldAttributes = this.get('components').models[1].get('attributes');
        this.get('components').models[1].set('attributes', { ...oldAttributes, name: name });
      },
      handleTitleChange(this: any) {
        // console.log('title Change');
        const title = this.get('title');
        this.get('components')?.models[0]?.components(title);
      },
      handlePlacementChange(this: any) {
        const labelPlacement = this.get('placement');
        const oldStyles = this.getStyle();
        switch (labelPlacement) {
          case 'top':
            this.setStyle({
              ...fieldStyle,
              ...oldStyles,
              'flex-direction': 'column',
              'align-items': 'flex-start'
            });
            break;
          case 'bottom':
            this.setStyle({
              ...fieldStyle,
              ...oldStyles,
              'flex-direction': 'column-reverse',
              'align-items': 'flex-start'
            });
            break;
          case 'left':
            this.setStyle({
              ...fieldStyle,
              ...oldStyles,
              'flex-direction': 'row',
              'align-items': 'center'
            });
            break;
          case 'right':
            this.setStyle({
              ...fieldStyle,
              ...oldStyles,
              'flex-direction': 'row-reverse',
              'align-items': 'center'
            });
            break;
        }
      },
      handleTypeChange(this: any) {
        const inputType = this.get('compType');

        switch (inputType) {
          case typeRadio:
            this.get('components').models[1].replaceWith({ type: typeRadio, removable: false });
            break;
          case typeCheckbox:
            this.get('components').models[1].replaceWith({ type: typeCheckbox, removable: false });
            break;
          case typeDate:
            this.get('components').models[1].replaceWith({ type: typeDate, removable: false });
            break;
          case typeTextarea:
            this.get('components').models[1].replaceWith({ type: typeTextarea, removable: false });
            break;
          case typeSelect:
            this.get('components').models[1].replaceWith({ type: typeSelect, removable: false });
            break;
          case typeFile:
            this.get('components').models[1].replaceWith({ type: typeFile, removable: false });
            break;
          default:
            this.get('components').models[1].replaceWith({ type: typeInput, attributes: { type: inputType }, removable: false });
            break;
        }

        // this.view.this.querySelector('input').replaceWith('<input type="checkbox" data-gjs-type="checkbox"/>');
      }
    },
    view: defaultView
  });

  //====================================================================================================================================================
}
