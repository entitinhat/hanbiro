import { keyCustomCode, commandNameCustomCode, customCodeType } from '../../constants';

export default (editor: any, opts: any) => {
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  console.log('default Model', defaultModel);
  const { toolbarBtnCustomCode } = opts;
  let timedInterval: any;

  dc.addType('script', {
    view: {
      onRender(this: any) {
        const isCC = this.model.closestType(customCodeType);
        isCC && (this.el.innerHTML = '');
      }
    }
  });

  dc.addType(customCodeType, {
    isComponent() {
      return false;
    },
    extend: 'default',
    model: {
      defaults: {
        name: 'Custom Code',
        editable: true,
        ...opts.propsCustomCode
      },

      /**
       * Initilize the component
       */
      init(this: any) {
        this.listenTo(this, `change:${keyCustomCode}`, this.onCustomCodeChange);
        const initialCode = this.get(keyCustomCode) || opts.placeholderContent;
        !this.components().length && this.components(initialCode);
        const toolbar = this.get('toolbar');
        const id = 'custom-code';

        // Add the custom code toolbar button if requested and it's not already in
        if (toolbarBtnCustomCode && !toolbar.filter((tlb: any) => tlb.id === id).length) {
          toolbar.unshift({
            id,
            command: commandNameCustomCode,
            label: `<svg viewBox="0 0 24 24">
                        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
                      </svg>`,
            ...toolbarBtnCustomCode
          });
        }
      },

      /**
       * Callback to launch on keyCustomCode change
       */
      onCustomCodeChange(this: any) {
        this.components(this.get(keyCustomCode));
      }
    },
    view: defaultType.view.extend({
      events: {
        dblclick: 'onActive'
      },

      init() {
        this.listenTo(this.model.components(), 'add remove reset', this.onComponentsChange);
        this.onComponentsChange();
      },

      /**
       * Things to do once inner components of custom code are changed
       */
      onComponentsChange() {
        timedInterval && clearInterval(timedInterval);
        timedInterval = setTimeout(() => {
          const { model } = this;
          const content = model.get(keyCustomCode) || '';
          let droppable = 1;

          // Avoid rendering codes with scripts
          if (content.indexOf('<script') >= 0) {
            this.el.innerHTML = opts.placeholderScript;
            droppable = 0;
          }

          model.set({ droppable });
        }, 0);
      },

      onActive() {
        const target = this.model;
        this.em.get('Commands').run(commandNameCustomCode, { target });
      }
    })
  });
};
