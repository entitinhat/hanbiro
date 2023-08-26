// import { BaseResponse } from '@base/types/interfaces/response';
// import { graphQLApi, s3DownloadObjectApi } from '@base/utils/axios/graphql';
// import {
//   SETTING_CTA_CONTENT_TYPES,
//   SETTING_CTA_TYPES,
// } from '@settings/online-digital-content/cta/config/constants';
// import { SETTING_CTA_LIST } from '@settings/online-digital-content/cta/services/graphql';
// import { url } from 'inspector';

import { personalizeModule, selectStyle, SelectStyleString } from '@base/components/@hanbiro/GrapeTS/constants';

export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('select');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  // INPUT
  // domc.addType('input', {
  //   isComponent: (el: any) => el.tagName == 'INPUT',
  //   model: {
  //     defaults: {
  //       tagName: 'input',
  //       //draggable: 'form, form *',
  //       droppable: false,
  //       highlightable: false,
  //       attributes: {
  //         type: 'text',
  //       },
  //       traits: [
  //         //nameTrait,
  //         //placeholderTrait,
  //         {
  //           type: 'select',
  //           name: 'type',
  //           options: [
  //             { value: 'text' },
  //             { value: 'email' },
  //             { value: 'password' },
  //             { value: 'number' },
  //           ],
  //         },
  //         {
  //           type: 'select',
  //           name: 'autocomplete',
  //           options: [{ value: 'off' }, { value: 'on' }],
  //         },
  //         //requiredTrait,
  //       ],
  //     },
  //   },
  // });

  // OPTION
  // domc.addType('option', {
  //   isComponent: (el: any) => el.tagName == 'OPTION',

  //   model: {
  //     defaults: {
  //       tagName: 'option',
  //       layerable: false,
  //       droppable: false,
  //       draggable: false,
  //       highlightable: false
  //     }
  //   }
  // });

  domc.addType('personalize', {
    extend: 'select',
    isComponent: (el: any) => el.classList && el.classList.contains('personalize-select'),
    model: {
      defaults: {
        tagName: 'select',
        attributes: { source: `@${personalizeModule}:`, class: 'personalize-select' },
        textable: 1,
        droppable: ':not(form)',
        draggable: ':not(form)',
        // components: [createOption('customerName', 'Customer Name')],
        style: { ...selectStyle, display: 'inline-block', width: '200px' },
        stylable: [],
        // resizable: false,

        traits: [
          // {
          //   name: 'options',
          //   type: 'select-options',
          //   label: 'Options',
          //   changeProp: 1,
          // },
          // {
          //   type: 'checkbox',
          //   name: 'required',
          //   label: 'Required',
          //   changeProp: 1,
          // },
        ]
      },
      init: function (this: any) {
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
          }
        },
        change: function (ev: any) {
          console.log('ev', ev);
          // editor.addComponents(`<div form="${ev.target.value}">Form</div>`);
          const selector = `#${this.model.ccid}`;
          const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
          console.log('selector', selector);
          console.log('this', this);
          SelectedComponent?.set('attributes', { source: `@${personalizeModule}:${ev.target.value}` });
          this.el.classList.add(`personalize-select`);
          this.el.classList.add(`@${personalizeModule}:${ev.target.value}`);

          //run command to save select item
          const cmd = editor.Commands;
          const options = {
            component: this.model.ccid
          };
          console.log('run refresh data');
          cmd.run('refresh-data', options);
          // this.el.querySelector('')
        }
      }
    }
  });
};
