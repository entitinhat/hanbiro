import { ctaModule, ctaType, selectStyle } from '@base/components/@hanbiro/GrapeTS/constants';

export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('select');
  const defaultView = defaultType.view;
  const defaultModel = defaultType.model;

  domc.addType('click-action', {
    //extend: 'link',
    extend: 'select',
    isComponent: (el: any) => {
      if (el.classList && el.classList.contains(ctaType)) return { type: ctaType };
    },
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        tagName: 'select',
        attributes: { source: `@${ctaModule}:`, class: ctaType, ctaType: 'all' },
        droppable: ':not(form)',
        draggable: ':not(form)',
        components: [],
        style: selectStyle,
        traits: [
          {
            type: 'select',
            label: 'CTA Type',
            name: 'ctaType',
            options: [
              { value: 'all', label: 'All' },
              { value: 'img', label: 'Image' },
              { value: 'qrCode', label: 'QR code' },
              { value: 'text', label: 'Text' },
              { value: 'url', label: 'URL' }
            ],
            changeProp: 1
          }
        ]
      },
      init(this: any) {
        const cmd = editor.Commands;
        console.log('run refresh data', this);
        this.on('change:ctaType', this.handleTypeChange);

        const options = {
          component: this.ccid
        };
        cmd.run('refresh-data', options);
      },
      handleTypeChange(this: any) {
        const type = this.get('ctaType');
        const cmd = editor.Commands;
        // const selector = `#${this.model.ccid}`;
        // const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
        // console.log('selector', selector);
        // console.log('this', this);
        // const oldAttributes = SelectedComponent?.get('attributes');
        // console.log('~~~~oldAttributes', oldAttributes);
        // SelectedComponent?.set('attributes', {
        //   ...oldAttributes,
        //   ctaType: type
        // });
        const options = {
          component: this.ccid,
          groupBy: type
        };
        cmd.run('refresh-data', options);
      }
    },
    view: {
      events: {
        ...defaultView.events,

        mousedown: (ev: any) => {
          if (!editor.Commands.isActive('preview')) {
            // ev.preventDefault();
            // alert('mousedown');
            // editor.addComponents('<div class="cls">New component</div>');
          }
        },
        change: function (ev: any) {
          console.log('ev', ev);
          // editor.addComponents(`<div form="${ev.target.value}">Form</div>`);
          const selector = `#${this.model.ccid}`;
          const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
          console.log('selector', selector);
          console.log('this', this);
          const oldAttributes = SelectedComponent?.get('attributes');
          console.log('~~~~oldAttributes', oldAttributes);
          SelectedComponent?.set('attributes', {
            ...oldAttributes,
            source: `@${ctaModule}:${ev.target.value}`
          });
          this.el.classList.add(ctaType);
          this.el.classList.add(`@${ctaModule}:${ev.target.value}`);
          // this.el.querySelector('')
          //run command to update select value
          const cmd = editor.Commands;
          console.log('all loaded cmd', cmd.getAll());
          const options = {
            component: this.model.ccid
          };
          console.log('run refresh data', this);
          cmd.run('refresh-data', options);
        }
      }
    }
  });
};
