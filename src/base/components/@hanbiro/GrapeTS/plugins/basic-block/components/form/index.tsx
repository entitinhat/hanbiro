// import { BaseResponse } from '@base/types/interfaces/response';
// import { graphQLApi, s3DownloadObjectApi } from '@base/utils/axios/graphql';
// import {
//   SETTING_CTA_CONTENT_TYPES,
//   SETTING_CTA_TYPES,
// } from '@settings/online-digital-content/cta/config/constants';
// import { SETTING_CTA_LIST } from '@settings/online-digital-content/cta/services/graphql';
// import { url } from 'inspector';

import { formModule, formType, selectStyle, SelectStyleString } from '@base/components/@hanbiro/GrapeTS/constants';

export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('select');
  const defaultView = defaultType.view;
  const defaultModel = defaultType.model;

  //Select-form

  domc.addType('form', {
    extend: 'select',
    isComponent: (el: any) => {
      // console.log('ellllllllllllllll', el);
      if (el.classList && el.classList.contains(formType)) return { type: 'form' };
    },
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        tagName: 'select',
        attributes: { source: `@${formModule}:`, class: formType },
        droppable: ':not(form)',
        draggable: ':not(form)',
        components: [],
        style: selectStyle,
        // styles: SelectStyleString,
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
          SelectedComponent?.set('attributes', {
            source: `@${formModule}:${ev.target.value}`
          });
          this.el.classList.add(formType);
          this.el.classList.add(`@${formModule}:${ev.target.value}`);
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
