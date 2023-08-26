import { SelectStyleString, selectStyle, surveyModule, surveyType } from '@base/components/@hanbiro/GrapeTS/constants';

export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('link');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  console.log('defaultModel:', defaultModel.prototype.defaults);
  domc.addType('survey-url', {
    //modal mode
    //model: defaultModel.extend(),
    extend: 'select',
    isComponent: (el: any) => {
      if (el.classList && el.classList.contains(surveyType)) return { type: 'survey-url' };
    },
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        tagName: 'select',
        attributes: { source: `@${surveyModule}:`, class: surveyType },
        droppable: ':not(form)',
        draggable: ':not(form)',
        components: [],
        style: selectStyle,
        traits: []
      },
      init(this: any) {
        const cmd = editor.Commands;
        console.log('run refresh data', this);

        const options = {
          component: this.ccid
        };
        cmd.run('refresh-data', options);
      }
    },

    //extendFnView: ['render'],
    view: defaultView.extend({
      //modal mode
      // onActive(this: any) {
      //   // alert('onClick');
      //   const cmd = this.em.get('Commands');
      //   console.log('this', this);
      //   console.log('this.el.id', this.el.id);
      //   const options = {
      //     component: this.el.id
      //   };
      //   // cmd.run('click-action:open-custom-modal', options);
      // }

      //select mode

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
          SelectedComponent?.set('attributes', {
            source: `@${surveyModule}:${ev.target.value}`
          });
          this.el.classList.add(surveyType);
          this.el.classList.add(`${ev.target.value}`);
          // this.el.querySelector('')
          //save select data
          const cmd = editor.Commands;
          console.log('all loaded cmd', cmd.getAll());
          const options = {
            component: this.model.ccid
          };
          console.log('options', options, this);
          cmd.run('refresh-data', options);
        }
      }

      // init() {
      //   this.listenTo(this.model, 'change:defaultPrice', this.render);
      // },
      // onRender() {
      //   this.el.innerHTML = this.model.get('defaultPrice');
      // },
      // events: {
      //   click: function () {
      //     if (selecionado && selecionado == this.model) {
      //       selecionado = false;
      //       selecionadoB = false;
      //     } else {
      //       editor.select(this.model);
      //       selecionado = this.model;
      //       selecionadoB = 'link';
      //       let selected = editor.getSelected();
      //       let openSmBtn = editor.Panels.getButton('views', 'opcoesBloco');
      //       openSmBtn.set('active', 1);
      //     }
      //   },
      //   mouseenter: function () {
      //     if (!selecionado) editor.select(this.model);
      //   },
      //   mouseleave: function () {
      //     if (!selecionado) {
      //       editor.select(null);
      //     } else {
      //       editor.select(selecionado);
      //     }
      //   },
      // },
    })
  });
};
