export default (editor: any, opt: any) => {
  const c = opt;
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const burgerType = 'burger-menu';

  // dc.addType(burgerType, {
  //   model: defaultModel.extend(
  //     {
  //       defaults: {
  //         // ...defaultModel.prototype.defaults,
  //         'custom-name': c.labelBurger,
  //         draggable: false,
  //         droppable: false,
  //         copyable: false,
  //         removable: false,
  //         script: function () {
  //           let transEndAdded = 0;
  //           let isAnimating = 0;
  //           let stringCollapse = 'gjs-collapse';
  //           let clickEvent = 'click';
  //           let transitProp = 'max-height';
  //           let transitTiming = 'ease-in-out';
  //           let transitSpeed = 0.25;
  //           // eslint-disable-next-line @typescript-eslint/no-this-alias
  //           const rootThis = this;

  //           let getTransitionEvent = function () {
  //             let t: any;
  //             let el = document.createElement('void');
  //             let transitions: any = {
  //               transition: 'transitionend',
  //               OTransition: 'oTransitionEnd',
  //               MozTransition: 'transitionend',
  //               WebkitTransition: 'webkitTransitionEnd',
  //             };

  //             for (t in transitions) {
  //               if (el.style[t] !== undefined) {
  //                 return transitions[t];
  //               }
  //             }
  //           };

  //           let transitEndEvent = getTransitionEvent();

  //           let getElHeight = function (el: any) {
  //             let style: any = window.getComputedStyle(el);
  //             let elDisplay = style.display;
  //             let elPos = style.position;
  //             let elVis = style.visibility;
  //             let currentHeight = style.height;
  //             let elMaxHeight = parseInt(style[transitProp]);

  //             if (elDisplay !== 'none' && elMaxHeight !== 0) {
  //               return el.offsetHeight;
  //             }

  //             el.style.height = 'auto';
  //             el.style.display = 'block';
  //             el.style.position = 'absolute';
  //             el.style.visibility = 'hidden';
  //             let height = el.offsetHeight;
  //             el.style.height = '';
  //             el.style.display = '';
  //             el.style.position = '';
  //             el.style.visibility = '';

  //             return height;
  //           };

  //           let toggleSlide = function (el: any) {
  //             isAnimating = 1;
  //             let elMaxHeight = getElHeight(el);
  //             let elStyle = el.style;
  //             elStyle.display = 'block';
  //             elStyle.transition = transitProp + ' ' + transitSpeed + 's ' + transitTiming;
  //             elStyle.overflowY = 'hidden';

  //             if (elStyle[transitProp] == '') {
  //               elStyle[transitProp] = 0;
  //             }

  //             if (parseInt(elStyle[transitProp]) == 0) {
  //               elStyle[transitProp] = '0';
  //               setTimeout(function () {
  //                 elStyle[transitProp] = elMaxHeight + 'px';
  //               }, 10);
  //             } else {
  //               elStyle[transitProp] = '0';
  //             }
  //           };

  //           let toggle = function (e: any) {
  //             e.preventDefault();

  //             if (isAnimating) {
  //               return;
  //             }

  //             let navParent = rootThis.closest('[data-gjs=navbar]');
  //             let navItems = navParent.querySelector('[data-gjs=navbar-items]');
  //             toggleSlide(navItems);

  //             if (!transEndAdded) {
  //               navItems.addEventListener(transitEndEvent, function () {
  //                 isAnimating = 0;
  //                 let itemsStyle = navItems.style;
  //                 if (parseInt(itemsStyle[transitProp]) == 0) {
  //                   itemsStyle.display = '';
  //                   itemsStyle[transitProp] = '';
  //                 }
  //               });
  //               transEndAdded = 1;
  //             }
  //           };

  //           if (!(stringCollapse in this)) {
  //             this.addEventListener(clickEvent, toggle);
  //           }

  //           this[stringCollapse] = 1;
  //         },
  //       },
  //     },
  //     {
  //       isComponent(el: any) {
  //         if (el.getAttribute && el.getAttribute('data-gjs-type') == burgerType) {
  //           return { type: burgerType };
  //         }
  //       },
  //     },
  //   ),
  //   view: defaultType.view,
  // });
};
