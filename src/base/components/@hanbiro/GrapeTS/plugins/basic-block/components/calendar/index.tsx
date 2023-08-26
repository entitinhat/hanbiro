// import Calendar from 'tui-calendar';

// export default (editor: any, opts: any) => {
//   const domc = editor.DomComponents;
//   const defaultType = domc.getType('default');
//   const defaultModel = defaultType.model;
//   const defaultView = defaultType.view;
//   //const { canvas } = editor;

//   domc.addType('calendar', {
//     model: defaultModel.extend(
//       {
//         defaults: {
//           ...defaultModel.prototype.defaults,
//           ccid: '',
//           name: 'Calendar',
//           tagName: 'div',
//           resizable: true,
//           script: function () {
//             const id = '{[ ccid ]}';
//             let calendarEl = document.getElementById(id) as HTMLElement;

//             let calendar = new Calendar(calendarEl, {
//               defaultView: 'month',
//               taskView: true,
//             });
//             calendar.render();
//           },
//         },
//       },
//       // {
//       //   isComponent() {
//       //     return false;
//       //   },
//       // },
//     ),
//     view: defaultView.extend({
//       init(this: any) {
//         //// console.log('ccid => ', this.model.ccid);
//         this.model.set('ccid', this.model.ccid);
//       },
//       onRender: function (this: any) {
//         //// console.log('Calendar Component.js this.el => ', this.el);
//         //// console.log('Inside Render Hello!');

//         let calendar = new Calendar(this.el, {
//           defaultView: 'month',
//           taskView: true,
//         });

//         setTimeout(function () {
//           calendar.render();
//         }, 500);

//         return this;
//       },
//     }),
//   });
// };
