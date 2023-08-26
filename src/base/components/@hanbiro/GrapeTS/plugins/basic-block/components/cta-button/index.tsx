export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('link');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType('cta-button', {
    extend: 'link',
    isComponent(el: any) {
      // if (el.tagName == 'A' && el.hasAttribute('class="cta-button"')) {
      //   return { type: 'cta-button' };
      // }
      return false;
    },
    model: {
      defaults: {
        'custom-name': 'CTA',
        content: 'CTA Button',
        //defaultPrice: 0,
        attributes: { class: 'cta-button' },
        traits: [
          {
            type: 'select',
            name: 'ctas',
            label: 'Click to Action',
            options: [],
            changeProp: 1
          },
          {
            name: 'name',
            label: 'Name',
            changeProp: 0
          },
          {
            name: 'type',
            label: 'Type',
            changeProp: 0
          },
          {
            name: 'href',
            label: 'Landing Page/Site',
            changeProp: 0
          },
          {
            name: 'contentType',
            label: 'Content Type',
            changeProp: 0
          },
          {
            name: 'pageTitle',
            label: 'Page Title',
            changeProp: 0
          }
        ]
      },

      async init(this: any) {
        //fet cta options
        //const data = await fetApi();
        //add options to cta
        let ctasTrait = this.get('traits').where({ name: 'ctas' })[0];
        ctasTrait.set('options', [
          { value: 'cta1', name: 'CTA 1' },
          { value: 'cta2', name: 'CTA 2' }
        ]);
        //call api to get data
        this.on('change:ctas', this.handleCTAChange);
      },

      handleCTAChange(this: any) {
        // // console.log('all props > ', this.props());
        // // console.log('a prop value > ', this.get('ctatype'));
        // // console.log('this.el > ', el.getAttributes());
        //set content
        this.components(this.get('ctas').trim());
      }

      // toHTML() {
      //   const tagName = this.get('tagName');
      //   const price = this.get('defaultPrice');
      //   return `<${tagName}>${price}</{tagName}>`;
      // },
    },
    //extendFnView: ['render'],
    view: defaultView.extend({
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
