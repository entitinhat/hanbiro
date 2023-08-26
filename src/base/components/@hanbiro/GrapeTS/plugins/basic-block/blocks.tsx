import { AddGlobalBlocks } from '../../GlobalBlocks';
// import { hNavbarType, navbarRef, navbarItemsRef, menuRef, tabsType, customCodeType } from './constants';

export default function (editor: any, opts: any) {
  const c = opts;
  let bm = editor.BlockManager;
  let { blocks } = c;
  const navbarPfx = c.navbarClsPfx || 'navbar';

  //navbar style
  const style = c.defaultStyle
    ? `
  <style>
    .${navbarPfx}-items-c {
      display: inline-block;
      float: right;
    }

    .${navbarPfx} {
      background-color: #222;
      color: #ddd;
      min-height: 50px;
      width: 100%;
    }

    .${navbarPfx}-container {
      max-width: 950px;
      margin: 0 auto;
      width: 95%;
    }

    .${navbarPfx}-container::after {
      content: "";
      clear: both;
      display: block;
    }

    .${navbarPfx}-brand {
      vertical-align: top;
      display: inline-block;
      padding: 5px;
      min-height: 50px;
      min-width: 50px;
      color: inherit;
      text-decoration: none;
    }

    .${navbarPfx}-menu {
      padding: 10px 0;
      display: block;
      float: right;
      margin: 0;
    }

    .${navbarPfx}-menu-link {
      margin: 0;
      color: inherit;
      text-decoration: none;
      display: inline-block;
      padding: 10px 15px;
    }

    .${navbarPfx}-burger {
      margin: 10px 0;
      width: 45px;
      padding: 5px 10px;
      display: none;
      float: right;
      cursor: pointer;
    }

    .${navbarPfx}-burger-line {
      padding: 1px;
      background-color: white;
      margin: 5px 0;
    }

    @media (max-width: 768px) {
      .${navbarPfx}-burger {
        display: block;
      }

      .${navbarPfx}-items-c {
        display: none;
        width: 100%;
      }

      .${navbarPfx}-menu {
        width: 100%;
      }

      .${navbarPfx}-menu-link {
        display: block;
      }
    }
  </style>
  `
    : '';
  blocks.map((block: string) => {
    // console.log('cur block', block);
    if (block in AddGlobalBlocks) AddGlobalBlocks[block](bm, c);
  });
  // Moved to GlobalBlocks

  // const toAdd = (name: string) => blocks.indexOf(name) >= 0;

  // toAdd('short-text') &&
  //   bm.add('short-text', {
  //     label: c.labelShortText,
  //     category: c.category,
  //     media: `
  //       <svg viewBox="-30 8 130 100" xmlns="http://www.w3.org/2000/svg">
  //         <text x="10" y="100" font-size="8em">t</text>
  //       </svg>
  //     `,
  //     content: '<span class="tx-short">Insert your short text here</span>'
  //   });

  // toAdd('text-line') &&
  //   bm.add('text-line', {
  //     label: c.labelTextLine,
  //     category: c.category,
  //     //attributes: { class: 'gjs-fonts gjs-f-text' },
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -6 34 34" style="fill: none; stroke-width: 1.2;" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
  //   `,
  //     content: {
  //       type: 'text',
  //       content: 'Insert your text here',
  //       style: { padding: '10px' },
  //       activeOnRender: 1
  //     }
  //   });

  // toAdd('paragraph') &&
  //   bm.add('paragraph', {
  //     category: c.category,
  //     label: c.labelParagraph,
  //     attributes: { class: 'fa fa-align-justify' },
  //     // media: `
  //     //   <svg viewBox="-12 -16 60 60" style="stroke-width: 1.2;">
  //     //     <path d="M33.168,5.667H2.5c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5h30.668c1.381,0,2.5,1.119,2.5,2.5
  //     //       S34.549,5.667,33.168,5.667z M18.667,10.501c0-1.381-1.119-2.5-2.5-2.5H2.5c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5h13.667
  //     //       C17.548,13.001,18.667,11.882,18.667,10.501z M35.668,17.833c0-1.381-1.119-2.5-2.5-2.5H2.5c-1.381,0-2.5,1.119-2.5,2.5
  //     //       s1.119,2.5,2.5,2.5h30.668C34.549,20.333,35.668,19.214,35.668,17.833z M18.667,25.167c0-1.381-1.119-2.5-2.5-2.5H2.5
  //     //       c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5h13.667C17.548,27.667,18.667,26.548,18.667,25.167z M35.668,32.501
  //     //       c0-1.381-1.119-2.5-2.5-2.5H2.5c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5h30.668C34.549,35.001,35.668,33.882,35.668,32.501z"
  //     //     />
  //     //   </svg>
  //     //   `,
  //     content: `
  //       <p class="paragraph">
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //       </p>
  //     `
  //   });
  // toAdd('heading') &&
  //   bm.add('heading', {
  //     label: c.labelHeading,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -6 34 34" stroke="currentColor"  style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><path d="M3,20h6 M3,4h6 M6,4v16 M15,20h6 M15,4h6 M18,4v16 M6,12h12"></path></svg>
  //   `,
  //     content: {
  //       type: 'heading',
  //       content: 'Insert your heading text here',
  //       //style: { padding: '10px' },
  //       activeOnRender: 1
  //     }
  //   });
  // toAdd('text-section') &&
  //   bm.add('text-section', {
  //     category: c.category,
  //     label: c.labelTextSection,
  //     //attributes: { class: 'gjs-fonts gjs-f-h1p' },
  //     attributes: { class: 'fa fa-indent' },
  //     content: `
  //     <section class="p-section">
  //       <h1 class="heading">Insert title here</h1>
  //       <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
  //     </section>
  //   `
  //   });

  // toAdd('divider') &&
  //   bm.add('divider', {
  //     label: c.labelDivider,
  //     category: c.category,
  //     // attributes: { class: 'gjs-fonts gjs-f-divider' },
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 30 30" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
  //       <line x1="3" y1="12" x2="21" y2="12"/>
  //       <polyline points="8 8 12 4 16 8"/>
  //       <polyline points="16 16 12 20 8 16"/>
  //     </svg>
  //   `,
  //     content: `
  //     <div style="margin: 20px 0"><hr /></div>
  //   `
  //   });

  // toAdd('line') &&
  //   bm.add('line', {
  //     label: c.labelLine,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -3 26 26" stroke="currentColor"  style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line></svg>
  //   `,
  //     content: `
  //     <div style="width: 100%; margin: 10px 0">
  //       <div class='line'></div>
  //     </div>
  //     <style>
  //       .line {
  //         border: 1px solid rgb(217, 131, 166);
  //       }
  //     </style>
  //   `
  //   });

  // toAdd('space') &&
  //   bm.add('space', {
  //     label: c.labelSpace,
  //     category: c.category,
  //     // attributes: { class: 'gjs-fonts gjs-f-divider' },
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-25 -30 252 252" style="enable-background:new 0 0 202.659 202.659;" xml:space="preserve">
  //       <g>
  //         <g>
  //           <g>
  //             <path d="M171.448,124.71v-0.001c2.152,0,3.897-1.745,3.897-3.897V81.847c0-2.152-1.745-3.897-3.897-3.897H38.966     c-2.152,0-3.897,1.745-3.897,3.897v38.966c0,2.152,1.745,3.897,3.897,3.897H171.448z M42.862,85.743h124.69v31.172H42.862V85.743     z"/>
  //             <rect y="46.778" width="202.659" height="7.793"/>
  //             <rect y="148.088" width="202.659" height="7.793"/>
  //           </g>
  //         </g>
  //       </g>
  //     </svg>
  //   `,
  //     content: `
  //     <div style="padding: 20px 0"></div>
  //   `
  //   });

  // // toAdd('shape-divider') && bm.add('shape-divider', {
  // //   label: c.shapeDividerLabelShapeDvd,
  // //   category: c.category,
  // //   media: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -5 30 30"><path d="M2 2v18h18V2H2zm0-2h18a2 2 0 012 2v18a2 2 0 01-2 2H2a2 2 0 01-2-2V2C0 .9.9 0 2 0zM1 13L2 0h18l1 9-20 4z"></path></svg>',
  // //   content: `
  // //     <div class ="gjs-shape-divider" data-gjs-type="shape-divider"></div>
  // //     ${c.shapeDividerStyle ? `<style>${c.shapeDividerStyle}</style>` : ''}
  // //   `
  // // });

  // toAdd('link-button') &&
  //   bm.add('link-button', {
  //     label: c.LabelButtonBlk,
  //     category: c.category,
  //     media: `
  //     <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"  style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-2 -3 28 28">
  //       <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm8 6h6M7 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
  //     </svg>
  //   `,
  //     content: {
  //       type: 'link',
  //       content: 'Button',
  //       style: {
  //         display: 'inline-block',
  //         'text-decoration': 'none',
  //         cursor: 'pointer',
  //         'font-weight': '400',
  //         width: '160px',
  //         color: 'white',
  //         'text-align': 'center',
  //         'vertical-align': 'middle',
  //         'user-select': 'none',
  //         'background-color': 'rgb(120, 85, 128)',
  //         border: '1px solid transparent',
  //         padding: '0.2rem 0.6rem',
  //         'font-size': '1rem',
  //         'line-height': '1.5',
  //         'border-radius': '0.25rem',
  //         transition: `color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out`
  //       }
  //     }
  //   });

  // toAdd('link') &&
  //   bm.add('link', {
  //     label: c.labelLink,
  //     category: c.category,
  //     attributes: { class: 'fa fa-link' },
  //     content: {
  //       type: 'link',
  //       content: 'Link',
  //       style: { color: '#d983a6' }
  //     }
  //   });

  // toAdd('image') &&
  //   bm.add('image', {
  //     label: c.labelImage,
  //     category: c.category,
  //     //attributes: { class: 'gjs-fonts gjs-f-image' },
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
  //   `,
  //     content: {
  //       type: 'image',
  //       style: { color: 'black' },
  //       activeOnRender: 1
  //     }
  //   });

  // toAdd('n-image') &&
  //   bm.add('n-image', {
  //     label: c.labelImage,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
  //   `,
  //     content: {
  //       type: 'n-image',
  //       style: { color: 'black' },
  //       classes: ['n-img'],
  //       activeOnRender: 1
  //     }
  //   });

  // toAdd('icon') &&
  //   bm.add('icon', {
  //     label: c.labelIcon,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-75 -75 406 406" preserveAspectRatio="xMidYMid">
  //       <g>
  //           <path d="M127.999746,23.06353 C162.177385,23.06353 166.225393,23.1936027 179.722476,23.8094161 C192.20235,24.3789926 198.979853,26.4642218 203.490736,28.2166477 C209.464938,30.5386501 213.729395,33.3128586 218.208268,37.7917319 C222.687141,42.2706052 225.46135,46.5350617 227.782844,52.5092638 C229.535778,57.0201472 231.621007,63.7976504 232.190584,76.277016 C232.806397,89.7746075 232.93647,93.8226147 232.93647,128.000254 C232.93647,162.177893 232.806397,166.225901 232.190584,179.722984 C231.621007,192.202858 229.535778,198.980361 227.782844,203.491244 C225.46135,209.465446 222.687141,213.729903 218.208268,218.208776 C213.729395,222.687649 209.464938,225.461858 203.490736,227.783352 C198.979853,229.536286 192.20235,231.621516 179.722476,232.191092 C166.227425,232.806905 162.179418,232.936978 127.999746,232.936978 C93.8200742,232.936978 89.772067,232.806905 76.277016,232.191092 C63.7971424,231.621516 57.0196391,229.536286 52.5092638,227.783352 C46.5345536,225.461858 42.2700971,222.687649 37.7912238,218.208776 C33.3123505,213.729903 30.538142,209.465446 28.2166477,203.491244 C26.4637138,198.980361 24.3784845,192.202858 23.808908,179.723492 C23.1930946,166.225901 23.0630219,162.177893 23.0630219,128.000254 C23.0630219,93.8226147 23.1930946,89.7746075 23.808908,76.2775241 C24.3784845,63.7976504 26.4637138,57.0201472 28.2166477,52.5092638 C30.538142,46.5350617 33.3123505,42.2706052 37.7912238,37.7917319 C42.2700971,33.3128586 46.5345536,30.5386501 52.5092638,28.2166477 C57.0196391,26.4642218 63.7971424,24.3789926 76.2765079,23.8094161 C89.7740994,23.1936027 93.8221066,23.06353 127.999746,23.06353 M127.999746,0 C93.2367791,0 88.8783247,0.147348072 75.2257637,0.770274749 C61.601148,1.39218523 52.2968794,3.55566141 44.1546281,6.72008828 C35.7374966,9.99121548 28.5992446,14.3679613 21.4833489,21.483857 C14.3674532,28.5997527 9.99070739,35.7380046 6.71958019,44.1551362 C3.55515331,52.2973875 1.39167714,61.6016561 0.769766653,75.2262718 C0.146839975,88.8783247 0,93.2372872 0,128.000254 C0,162.763221 0.146839975,167.122183 0.769766653,180.774236 C1.39167714,194.398852 3.55515331,203.703121 6.71958019,211.845372 C9.99070739,220.261995 14.3674532,227.400755 21.4833489,234.516651 C28.5992446,241.632547 35.7374966,246.009293 44.1546281,249.28042 C52.2968794,252.444847 61.601148,254.608323 75.2257637,255.230233 C88.8783247,255.85316 93.2367791,256 127.999746,256 C162.762713,256 167.121675,255.85316 180.773728,255.230233 C194.398344,254.608323 203.702613,252.444847 211.844864,249.28042 C220.261995,246.009293 227.400247,241.632547 234.516143,234.516651 C241.632039,227.400755 246.008785,220.262503 249.279912,211.845372 C252.444339,203.703121 254.607815,194.398852 255.229725,180.774236 C255.852652,167.122183 256,162.763221 256,128.000254 C256,93.2372872 255.852652,88.8783247 255.229725,75.2262718 C254.607815,61.6016561 252.444339,52.2973875 249.279912,44.1551362 C246.008785,35.7380046 241.632039,28.5997527 234.516143,21.483857 C227.400247,14.3679613 220.261995,9.99121548 211.844864,6.72008828 C203.702613,3.55566141 194.398344,1.39218523 180.773728,0.770274749 C167.121675,0.147348072 162.762713,0 127.999746,0 Z M127.999746,62.2703115 C91.698262,62.2703115 62.2698034,91.69877 62.2698034,128.000254 C62.2698034,164.301738 91.698262,193.730197 127.999746,193.730197 C164.30123,193.730197 193.729689,164.301738 193.729689,128.000254 C193.729689,91.69877 164.30123,62.2703115 127.999746,62.2703115 Z M127.999746,170.667175 C104.435741,170.667175 85.3328252,151.564259 85.3328252,128.000254 C85.3328252,104.436249 104.435741,85.3333333 127.999746,85.3333333 C151.563751,85.3333333 170.666667,104.436249 170.666667,128.000254 C170.666667,151.564259 151.563751,170.667175 127.999746,170.667175 Z M211.686338,59.6734287 C211.686338,68.1566129 204.809755,75.0337031 196.326571,75.0337031 C187.843387,75.0337031 180.966297,68.1566129 180.966297,59.6734287 C180.966297,51.1902445 187.843387,44.3136624 196.326571,44.3136624 C204.809755,44.3136624 211.686338,51.1902445 211.686338,59.6734287 Z" />
  //       </g>
  //     </svg>
  //   `,
  //     content: {
  //       type: 'image',
  //       style: {
  //         position: 'relative',
  //         width: '50px',
  //         height: '50px',
  //         color: 'black',
  //         'border-radius': '100%',
  //         border: '2px solid rgb(255, 255, 255)',
  //         'border-image': 'initial',
  //         'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 1px 1px 0px'
  //       },
  //       activeOnRender: 1
  //     }
  //   });

  // toAdd('video') &&
  //   bm.add('video', {
  //     label: c.labelVideo,
  //     category: c.category,
  //     attributes: { class: 'fa fa-youtube-play' },
  //     content: {
  //       type: 'video',
  //       src: 'img/video2.webm',
  //       style: {
  //         height: '350px',
  //         width: '615px'
  //       }
  //     }
  //   });

  // toAdd('map') &&
  //   bm.add('map', {
  //     label: c.labelMap,
  //     category: c.category,
  //     attributes: { class: 'fa fa-map-o' },
  //     content: {
  //       type: 'map',
  //       style: { height: '350px' }
  //     }
  //   });

  // toAdd('link-block') &&
  //   bm.add('link-block', {
  //     category: c.category,
  //     label: c.labelLinkBLock,
  //     attributes: { class: 'fa fa-link' },
  //     content: {
  //       type: 'link',
  //       editable: false,
  //       droppable: true,
  //       style: {
  //         display: 'inline-block',
  //         padding: '5px',
  //         'min-height': '50px',
  //         'min-width': '50px'
  //       }
  //     }
  //   });

  // toAdd('quote') &&
  //   bm.add('quote', {
  //     label: c.labelQuote,
  //     category: c.category,
  //     attributes: { class: 'fa fa-quote-right' },
  //     content: `<blockquote class="quote">
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
  //     </blockquote>`
  //   });

  // toAdd('tooltip') &&
  //   bm.add('tooltip', {
  //     category: c.category,
  //     label: c.labelTooltip,
  //     media: `
  //     <svg viewBox="-2 -4 28 28" style="stroke-width: 1.2;">
  //       <path d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-4l-4 4-4-4H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m0 2v12h4.83L12 19.17 15.17 16H20V4H4z"></path>
  //     </svg>
  //   `,
  //     select: true,
  //     content: { type: 'tooltip' }
  //   });

  // toAdd(hNavbarType) &&
  //   bm.add(hNavbarType, {
  //     label: c.labelNavbarBlock,
  //     media: `
  //     <svg className="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="stroke-width: 1.2;">
  //       <path className="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fillRule="nonzero"></path><rect className="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect><rect className="gjs-block-svg-path" x="15" y="13" width="5" height="1"></rect><rect className="gjs-block-svg-path" x="15" y="11.5" width="5" height="1"></rect>
  //     </svg>
  //   `,
  //     // label: `
  //     //   <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //     //     <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
  //     //     <rect class="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect>
  //     //     <rect class="gjs-block-svg-path" x="15" y="13" width="5" height="1"></rect>
  //     //     <rect class="gjs-block-svg-path" x="15" y="11.5" width="5" height="1"></rect>
  //     //   </svg>
  //     //   <div class="gjs-block-label">${c.labelNavbarBlock}</div>`,
  //     category: c.category,
  //     content: `
  //       <div class="${navbarPfx}" data-gjs-droppable="false" data-gjs-custom-name="${c.labelNavbar}" data-gjs="${navbarRef}">
  //         <div class="${navbarPfx}-container" data-gjs-droppable="false" data-gjs-draggable="false"
  //           data-gjs-removable="false" data-gjs-copyable="false" data-gjs-highlightable="false"
  //           data-gjs-custom-name="${c.labelNavbarContainer}">

  //           <a href="/" class="${navbarPfx}-brand" data-gjs-droppable="true"></a>

  //           <div class="${navbarPfx}-burger" data-gjs-type="burger-menu">
  //             <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
  //             <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
  //             <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
  //           </div>

  //           <div class="${navbarPfx}-items-c" data-gjs="${navbarItemsRef}">
  //             <nav class="${navbarPfx}-menu" data-gjs="${menuRef}" data-gjs-custom-name="${c.labelMenu}">
  //               <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelHome}</a>
  //               <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelAbout}</a>
  //               <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelContact}</a>
  //             </nav>
  //           </div>

  //         </div>
  //       </div>
  //       ${style}
  //     `
  //   });

  // toAdd(tabsType) &&
  //   bm.add(tabsType, {
  //     label: c.labelTabs,
  //     media: `
  //       <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M22 9.3c0-.8-.5-1.3-1.3-1.3H3.4C2.5 8 2 8.5 2 9.3v7.4c0 .8.5 1.3 1.3 1.3h17.4c.8 0 1.3-.5 1.3-1.3V9.3zM21 17H3V9h18v8z" fill-rule="nonzero"/><rect x="3" y="5" width="4" height="2" rx=".5"/><rect x="8" y="5" width="4" height="2" rx=".5"/><rect x="13" y="5" width="4" height="2" rx=".5"/>
  //       </svg>
  //     `,
  //     category: c.category,
  //     content: { type: tabsType }
  //   });

  // toAdd(customCodeType) &&
  //   bm.add(customCodeType, {
  //     label: c.codeLabel,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-50 -50 632 632" style="enable-background:new 0 0 512 512;" xml:space="preserve">
  //       <g>
  //         <path d="M47.552,200.976l137.904-71.04v20.528L69.248,208.72v0.592l116.208,58.272v20.496L47.552,217.04   C47.552,217.04,47.552,200.976,47.552,200.976z"/>
  //         <path d="M204.72,299.968l82.928-215.504h20.208l-83.232,215.504H204.72z"/>
  //         <path d="M464.448,217.328L326.544,288.08v-20.496l117.12-58.272v-0.592l-117.12-58.256v-20.528   l137.904,70.752V217.328z"/>
  //       </g>
  //       <rect y="411.248" width="512" height="16.288"/>
  //       <g>
  //         <rect x="380.112" y="355.68" width="131.888" height="27.92"/>
  //         <rect x="183.168" y="355.68" width="131.888" height="27.92"/>
  //         <rect y="355.68" width="131.888" height="27.92"/>
  //       </g>
  //     </svg>
  //   `,
  //     category: c.category,
  //     activate: true,
  //     select: true,
  //     content: { type: customCodeType }
  //   });

  // toAdd('personalize') &&
  //   bm.add('personalize', {
  //     label: c.labelPersonalize,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-5 -5 34 34">
  //       <path d="M7 22c-2 0-3-2-3-3v-4c0-1.656-.343-3-2-3 2 0 2-3 2-3V5a3 3 0 0 1 3-3m10 0c2 0 3 2 3 3v4c0 1.656.344 3 2 3-2 0-2 3-2 3v4c0 1.656-1.344 3-3 3M8 12h0m4 0h0m4 0h0"></path>
  //     </svg>
  //   `,
  //     category: c.category,
  //     content: { type: 'personalize' }
  //   });

  // toAdd('form') &&
  //   bm.add('form', {
  //     label: c.labelForm,
  //     media:
  //       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"/><rect width="10" height="3" x="2" y="15" rx=".5"/></svg>',
  //     category: c.category,
  //     content: { type: 'form' }
  //   });

  // toAdd('table') &&
  //   bm.add('table', {
  //     category: c.category,
  //     label: c.tableLabel,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
  //       <path d="M5,3h14 c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M3,9h18 M9,21V9 M15,9v12 M21,15H3"></path>
  //     </svg>
  //   `,
  //     activate: 1,
  //     content: `
  //     <table data-gjs-type="table"></table>
  //     ${c.tableStyle ? `<style>${c.tableStyle}</style>` : ''}
  //   `
  //   });

  // let listItem = `<table class="list-item">
  //     <tr class="list-item-row">
  //       <td class="list-cell-left">
  //         <img class="list-item-image" src="http://placehold.it/150x150/78c5d6/fff/" alt="Image"/>
  //       </td>
  //       <td class="list-cell-right">
  //         <h1 class="list-item-card-title">Title here</h1>
  //         <p class="list-item-card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
  //       </td>
  //     </tr>
  //   </table>`;
  // toAdd('list-items') &&
  //   bm.add('list-items', {
  //     label: c.labelListItemsBlk,
  //     category: c.category,
  //     //attributes: { class: 'fa fa-th-list' },
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-15 -15 86 86" style="enable-background:new 0 0 56 56;" xml:space="preserve">
  //       <g>
  //         <path d="M47.91,47.496l6.484-3.242l-17.638-6.498l6.498,17.638l3.242-6.484l6.797,6.797C53.488,55.902,53.744,56,54,56   s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L47.91,47.496z M40.131,41.131l9.233,3.402l-3.888,1.943l-1.943,3.888   L40.131,41.131z"/>
  //         <path d="M28,14h18c0.553,0,1-0.447,1-1s-0.447-1-1-1H28c-0.553,0-1,0.447-1,1S27.447,14,28,14z"/>
  //         <path d="M28,28h18c0.553,0,1-0.447,1-1s-0.447-1-1-1H28c-0.553,0-1,0.447-1,1S27.447,28,28,28z"/>
  //         <path d="M21.579,7.241c-0.417-0.358-1.051-0.313-1.409,0.108l-6.248,7.288L10.1,11.771c-0.44-0.331-1.067-0.243-1.399,0.2   c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-8   C22.048,8.231,21.999,7.601,21.579,7.241z"/>
  //         <path d="M21.579,21.241c-0.417-0.359-1.051-0.312-1.409,0.108l-6.248,7.288L10.1,25.771c-0.44-0.331-1.067-0.243-1.399,0.2   c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-8   C22.048,22.231,21.999,21.601,21.579,21.241z"/>
  //         <path d="M20.17,36.35l-6.248,7.287L10.1,40.771c-0.44-0.33-1.067-0.243-1.399,0.2c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429   c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-7.999c0.36-0.419,0.312-1.05-0.108-1.409   C21.162,35.883,20.528,35.929,20.17,36.35z"/>
  //         <path d="M42.824,0H13.176C6.462,0,1,5.462,1,12.176v29.648C1,48.538,6.462,54,13.176,54H33c0.553,0,1-0.447,1-1s-0.447-1-1-1   H13.176C7.564,52,3,47.436,3,41.824V12.176C3,6.564,7.564,2,13.176,2h29.648C48.436,2,53,6.564,53,12.176V37c0,0.553,0.447,1,1,1   s1-0.447,1-1V12.176C55,5.462,49.538,0,42.824,0z"/>
  //       </g>
  //     </svg>
  //   `,
  //     content: `
  //     <ul class='list-wrap'>
  //       <li class='list-item'>Text Here 1</li>
  //       <li class='list-item'>Text Here 2</li>
  //     </ul>
  //   `
  //   });

  // let gridItem = `<table class="grid-item-card">
  //       <tr>
  //         <td class="grid-item-card-image">
  //           <img class="grid-item-image" src="http://placehold.it/250x150/78c5d6/fff/" alt="Image"/>
  //         </td>
  //       </tr>
  //       <tr>
  //         <td class="grid-item-card-content">
  //           <h1 class="grid-item-card-title">Title here</h1>
  //           <p class="grid-item-card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
  //         </td>
  //       </tr>
  //     </table>`;
  // toAdd('grid-items') &&
  //   bm.add('grid-items', {
  //     label: c.labelGridItemsBlk,
  //     category: c.category,
  //     content: `<table class="grid-item-row">
  //       <tr>
  //         <td class="grid-item-cell2-l">${gridItem}</td>
  //         <td class="grid-item-cell2-r">${gridItem}</td>
  //       </tr>
  //     </table>`,
  //     attributes: { class: 'fa fa-th' }
  //   });

  // // toAdd('cta') && bm.add('cta', {
  // //   label: c.labelMarketingCta,
  // //   category: c.category,
  // //   media: `
  // //     <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-5 -5 34 34">
  // //       <path d="M15.5 10h0a1.5 1.5 0 0 1 1.5 1.5v2.502M19.5 14v-1.5A1.5 1.5 0 0 0 18 11h0M14.172 14V8.5a1.5 1.5 0 0 0-1.5-1.5h0a1.5 1.5 0 0 0-1.5 1.5v7.625l-1.381-1.197c-.459-.689-1.922-.9-2.384-.389s-.572 1.363-.112 2.053c0 0 1.878 1.405 3.086 3.408s2.955 1.997 2.955 1.997H19s3-.075 3-4.943V14.5a1.5 1.5 0 0 0-1.5-1.5h0M22 9V2H2v9h5"></path>
  // //     </svg>
  // //   `,
  // //   // content: '<a class="cta-button">Cta Button</a>',
  // //   content: {
  // //     type: 'cta-button'
  // //   }
  // // });

  // // toAdd('calendar') && bm.add('calendar', {
  // //   label: c.labelCalendar,
  // //   category: c.category,
  // //   media: `
  // //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-100 -100 780 780">
  // //       <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052
  // //         c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553
  // //         V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"/>
  // //       <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992
  // //         h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"/>
  // //       <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117
  // //         V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818
  // //         c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764
  // //         V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"/>
  // //       <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
  // //         c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"/>
  // //       <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017
  // //         c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"/>
  // //       <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
  // //         c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"/>
  // //       <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017
  // //         c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"/>
  // //       <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
  // //         c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"/>
  // //       <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032
  // //         c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"/>
  // //       <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
  // //         c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"/>
  // //       <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032
  // //         c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"/>
  // //     </svg>
  // //   `,
  // //   content: {
  // //     type: 'calendar',
  // //   }
  // // });

  // let eventItem = `
  //   <div class='event-item'>
  //     <label class='event-title'>Event date:</label>
  //     <input type="date" class='event-date' value='2022-03-28'>
  //   </div>
  // `;
  // toAdd('event') &&
  //   bm.add('event', {
  //     label: c.labelMarketingEvent,
  //     category: c.category,
  //     media: `
  //     <svg class='mar-svg' xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-2 -3 28 28">
  //       <path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm11-2v4M8 2v4m4 3.01 1.468 2.962 3.282.478-2.375 2.305.561 3.255L12 16.472 9.064 18.01l.561-3.255L7.25 12.45l3.282-.478L12 9.01z"></path>
  //     </svg>
  //   `,
  //     content: eventItem
  //   });

  // toAdd('survey-form') &&
  //   bm.add('survey-form', {
  //     label: c.labelMarketingSurvey,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="8" class="st0" width="4" height="13"></rect><rect x="17" y="3" class="st0" width="4" height="18"></rect><rect x="3" y="15" class="st0" width="4" height="6"></rect></svg>
  //   `,
  //     content: {
  //       type: 'form',
  //       components: [
  //         {
  //           type: 'section',
  //           components: [
  //             { type: 'text', components: 'Section 1' },
  //             {
  //               type: 'container',
  //               components: [
  //                 { type: 'text', components: 'Question 1' },
  //                 {
  //                   type: 'form-row',
  //                   components: [{ type: 'radio' }, { type: 'label', components: 'Answer 1' }]
  //                 },
  //                 {
  //                   type: 'form-row',
  //                   components: [{ type: 'radio' }, { type: 'label', components: 'Answer 2' }]
  //                 }
  //               ]
  //             },
  //             {
  //               type: 'container',
  //               components: [
  //                 { type: 'text', components: 'Question 2' },
  //                 {
  //                   type: 'form-row',
  //                   components: [{ type: 'checkbox' }, { type: 'label', components: 'Answer 1' }]
  //                 },
  //                 {
  //                   type: 'form-row',
  //                   components: [{ type: 'checkbox' }, { type: 'label', components: 'Answer 2' }]
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ],
  //       style: {
  //         padding: '10px'
  //       }
  //     }
  //   });

  // let optionItem = `
  //   <ul class='option-list'>
  //     <li class='option-item'>Option 1</li>
  //     <li class='option-item'>Option 2</li>
  //   </ul>
  // `;
  // toAdd('option-set') &&
  //   bm.add('option-set', {
  //     label: c.labelMarketingOptionSet,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><path d="M5,3h14c1.104,0,2,0.896,2,2 v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M17,14H7 M17,17H7 M17,7H7v3h10V7z"></path></svg>
  //   `,
  //     content: optionItem
  //   });

  // let socialItem = `
  //   <div data-gjs-highlightable="true" draggable="true" class="social-container">
  //     <a data-gjs-highlightable="true" href="facebook.com" draggable="true" class="social-item">f</a>
  //     <a data-gjs-highlightable="true" draggable="true" class="social-item">t</a>
  //     <a data-gjs-highlightable="true" draggable="true" class="social-item">in</a>
  //   </div>
  //   <style>
  //     .social-container {
  //       padding: 13px 0;
  //       color:rgb(255, 255, 255);
  //       justify-content:center;
  //       align-items:center;
  //       min-height:auto;
  //       display:flex;
  //       background-color:rgb(162, 144, 165);
  //       width:100%;
  //     }
  //     .social-item {
  //       width:35px;
  //       height:35px;
  //       margin: 0 10px;
  //       font-weight:700;
  //       color:rgb(162, 144, 165);
  //       line-height:35px;
  //       background-color:rgb(255, 255, 255);
  //       border-radius:100%;
  //       text-align: center;
  //     }
  //   </style>
  // `;

  // toAdd('social-share') &&
  //   bm.add('social-share', {
  //     label: c.labelMarketingSocial,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-2 -5 28 28"><path d="M12 22C6.477 22 2 17.522 2 12 2 6.477 6.477 2 12 2c5.522 0 10 4.477 10 10a9.968 9.968 0 0 1-1.742 5.644l-.001-.001L22 22H12zm.996-13.482c0 .801.672 1.449 1.5 1.449s1.5-.648 1.5-1.449-.672-1.45-1.5-1.45-1.5.649-1.5 1.45zM6.067 12.52c0 .801.672 1.448 1.5 1.448s1.5-.647 1.5-1.448c0-.8-.673-1.448-1.5-1.448s-1.5.648-1.5 1.448zm6.929 3.064c0 .801.672 1.449 1.5 1.449s1.5-.648 1.5-1.449-.672-1.45-1.5-1.45-1.5.649-1.5 1.45zM8.84 13.236l4.388 1.631m-.005-5.632L8.84 11.802"></path></svg>
  //   `,
  //     content: socialItem
  //   });

  // toAdd('download-link') &&
  //   bm.add('download-link', {
  //     label: c.labelDownloadLink,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
  //       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
  //       <polyline points="7 10 12 15 17 10"></polyline>
  //       <line x1="12" y1="15" x2="12" y2="3"></line>
  //     </svg>
  //   `,
  //     content: {
  //       type: 'link',
  //       content: 'Link',
  //       style: { color: '#d983a6' }
  //     }
  //   });

  // toAdd('address') &&
  //   bm.add('address', {
  //     label: c.labelAddress,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
  //       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
  //       <circle cx="12" cy="10" r="3"></circle>
  //     </svg>
  //   `,
  //     content: {
  //       type: 'map',
  //       style: { height: '350px' }
  //     }
  //   });

  // let packageItem = `<table class="package-content">
  //     <tr class="package-row">
  //       <td class="package-cell-left">
  //         <img class="package-item-image" src="http://placehold.it/150x150/78c5d6/fff/" alt="Image"/>
  //       </td>
  //       <td class="package-cell-right">
  //         <h1 class="package-card-title">Package title</h1>
  //         <p class="package-card-text">Package description Package description Package description</p>
  //       </td>
  //     </tr>
  //   </table>`;
  // toAdd('package') &&
  //   bm.add('package', {
  //     label: c.labelPackage,
  //     category: c.category,
  //     media: `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
  //       <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
  //       <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  //     </svg>
  //   `,
  //     content: packageItem
  //   });

  // // let couponItem = `
  // //   <div class='coupon-item'>
  // //     <div class='coupon-item-image'>
  // //       <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="150px" viewBox="0 0 330 165" enable-background="new 0 0 330 165"><path fill="#233DC5" d="M329.667,159.459c0.112,0,0.222,0.01,0.332,0.016v-5.236c-0.014,0-0.027,0.002-0.041,0.002 c-3.079,0-5.575-2.496-5.575-5.576c0-3.078,2.496-5.574,5.575-5.574c0.014,0,0.027,0.002,0.041,0.002v-5.375 c-0.11,0.006-0.22,0.018-0.332,0.018c-3.079,0-5.575-2.496-5.575-5.576c0-3.078,2.496-5.574,5.575-5.574 c0.112,0,0.222,0.01,0.332,0.016v-5.758c-0.11,0.006-0.22,0.018-0.332,0.018c-3.079,0-5.575-2.496-5.575-5.576 c0-3.078,2.496-5.574,5.575-5.574c0.112,0,0.222,0.01,0.332,0.016v-5.236c-0.014,0-0.027,0.002-0.041,0.002 c-3.079,0-5.575-2.496-5.575-5.576c0-3.078,2.496-5.574,5.575-5.574c0.014,0,0.027,0.002,0.041,0.002v-5.375 c-0.11,0.006-0.22,0.018-0.332,0.018c-3.079,0-5.575-2.496-5.575-5.576c0-3.079,2.496-5.575,5.575-5.575 c0.112,0,0.222,0.01,0.332,0.017v-5.237c-0.014,0-0.027,0.002-0.041,0.002c-3.079,0-5.575-2.496-5.575-5.575 s2.496-5.575,5.575-5.575c0.014,0,0.027,0.002,0.041,0.002v-5.499c-0.11,0.006-0.22,0.017-0.332,0.017 c-3.079,0-5.575-2.496-5.575-5.575s2.496-5.575,5.575-5.575c0.112,0,0.222,0.01,0.332,0.017v-5.237 c-0.014,0-0.027,0.002-0.041,0.002c-3.079,0-5.575-2.496-5.575-5.575s2.496-5.575,5.575-5.575c0.014,0,0.027,0.002,0.041,0.002 v-5.374c-0.11,0.006-0.22,0.017-0.332,0.017c-3.079,0-5.575-2.496-5.575-5.575s2.496-5.575,5.575-5.575 c0.112,0,0.222,0.01,0.332,0.017V5.737c-0.014,0-0.027,0.002-0.041,0.002c-3.079,0-5.575-2.496-5.575-5.575 c0-0.056,0.007-0.109,0.009-0.164h-324.4v164.988h324.103C324.12,161.93,326.604,159.459,329.667,159.459z"></path><g><path fill="#FFFFFF" d="M0.527,164.618V0.499h294.35v61.386c-0.993-0.128-2-0.193-3-0.193c-12.78,0-23.178,10.397-23.178,23.178 s10.397,23.178,23.178,23.178c1,0,2.007-0.065,3-0.193v56.765H0.527z"></path><path fill="#BDBEC6" d="M294.376,0.999v60.324c-0.831-0.087-1.668-0.131-2.5-0.131c-13.056,0-23.678,10.622-23.678,23.678 c0,13.056,10.622,23.678,23.678,23.678c0.832,0,1.67-0.044,2.5-0.132v55.703H1.027V0.999H294.376 M295.376-0.001H0.027v165.12 h295.35v-57.841c-1.141,0.177-2.31,0.27-3.5,0.27c-12.524,0-22.678-10.153-22.678-22.678s10.153-22.678,22.678-22.678 c1.19,0,2.359,0.093,3.5,0.27V-0.001L295.376-0.001z"></path></g><g><g><path fill="#233DC5" d="M120.612,29.907l-1.339,1.276c-0.911-0.962-1.935-1.444-3.073-1.444c-0.961,0-1.77,0.329-2.428,0.985 c-0.658,0.657-0.987,1.467-0.987,2.429c0,0.67,0.146,1.266,0.437,1.786s0.704,0.928,1.236,1.225s1.125,0.445,1.776,0.445 c0.555,0,1.063-0.104,1.523-0.312c0.46-0.208,0.965-0.585,1.516-1.132l1.298,1.354c-0.743,0.725-1.445,1.228-2.105,1.508 c-0.661,0.28-1.415,0.42-2.263,0.42c-1.563,0-2.843-0.496-3.838-1.487s-1.494-2.262-1.494-3.811c0-1.002,0.227-1.894,0.68-2.673 s1.103-1.406,1.948-1.88s1.756-0.711,2.731-0.711c0.83,0,1.628,0.175,2.396,0.525C119.394,28.763,120.056,29.261,120.612,29.907z"></path><path fill="#233DC5" d="M128.714,27.887c1.423,0,2.646,0.515,3.67,1.545s1.536,2.286,1.536,3.767c0,1.467-0.505,2.709-1.515,3.726 s-2.236,1.524-3.677,1.524c-1.509,0-2.764-0.522-3.762-1.565s-1.498-2.283-1.498-3.719c0-0.961,0.232-1.846,0.698-2.652 s1.104-1.446,1.919-1.917C126.898,28.123,127.775,27.887,128.714,27.887z M128.694,29.76c-0.931,0-1.713,0.324-2.347,0.971 c-0.634,0.647-0.951,1.47-0.951,2.468c0,1.112,0.399,1.992,1.198,2.639c0.62,0.506,1.332,0.759,2.135,0.759 c0.908,0,1.681-0.328,2.32-0.984s0.958-1.465,0.958-2.427c0-0.957-0.322-1.767-0.965-2.43S129.615,29.76,128.694,29.76z"></path><path fill="#233DC5" d="M137.336,28.14h1.921v6.502c0,0.56,0.049,0.957,0.147,1.188c0.098,0.232,0.26,0.418,0.485,0.557 c0.226,0.139,0.498,0.208,0.817,0.208c0.337,0,0.628-0.077,0.872-0.232c0.244-0.155,0.413-0.352,0.506-0.59 c0.093-0.239,0.14-0.696,0.14-1.37V28.14h1.921v5.995c0,1.012-0.057,1.713-0.171,2.105s-0.332,0.77-0.653,1.135 s-0.691,0.635-1.111,0.81s-0.907,0.263-1.463,0.263c-0.729,0-1.364-0.167-1.904-0.502c-0.54-0.335-0.926-0.754-1.159-1.258 s-0.349-1.354-0.349-2.553V28.14z"></path><path fill="#233DC5" d="M148.04,28.14h2.03c1.098,0,1.89,0.102,2.375,0.304s0.868,0.531,1.148,0.984s0.42,0.997,0.42,1.63 c0,0.702-0.184,1.285-0.55,1.75s-0.865,0.789-1.494,0.971c-0.369,0.105-1.042,0.157-2.017,0.157v4.259h-1.914V28.14z M149.954,32.071h0.608c0.479,0,0.811-0.034,0.998-0.103c0.187-0.068,0.334-0.182,0.441-0.339s0.161-0.349,0.161-0.573 c0-0.389-0.15-0.672-0.451-0.851c-0.219-0.132-0.625-0.199-1.217-0.199h-0.54V32.071z"></path><path fill="#233DC5" d="M162.315,27.887c1.423,0,2.646,0.515,3.67,1.545s1.536,2.286,1.536,3.767c0,1.467-0.506,2.709-1.516,3.726 s-2.236,1.524-3.677,1.524c-1.509,0-2.764-0.522-3.762-1.565s-1.498-2.283-1.498-3.719c0-0.961,0.232-1.846,0.698-2.652 s1.104-1.446,1.919-1.917C160.499,28.123,161.375,27.887,162.315,27.887z M162.294,29.76c-0.931,0-1.713,0.324-2.347,0.971 c-0.634,0.647-0.951,1.47-0.951,2.468c0,1.112,0.399,1.992,1.198,2.639c0.62,0.506,1.332,0.759,2.135,0.759 c0.908,0,1.681-0.328,2.319-0.984c0.639-0.656,0.959-1.465,0.959-2.427c0-0.957-0.322-1.767-0.966-2.43 C163.999,30.092,163.216,29.76,162.294,29.76z"></path><path fill="#233DC5" d="M171.012,28.14h1.836l4.303,6.617V28.14h1.914v10.056h-1.842l-4.297-6.597v6.597h-1.914V28.14z"></path></g></g></svg>
  // //     </div>
  // //     <div class='coupon-item-amount'>
  // //       $2,000
  // //     </div>
  // //     <div class='coupon-item-date'>
  // //       2022/03/28
  // //     </div>
  // //   </div>
  // //   <style>
  // //     .coupon-item {
  // //       position:relative;
  // //     }
  // //     .coupon-item-amount {
  // //       position:absolute;
  // //       top:32%;
  // //       left:84px;
  // //       font-size:30px;
  // //       font-weight:500;
  // //       letter-spacing:3px;
  // //     }
  // //     .coupon-item-date {
  // //       position:absolute;
  // //       top:60%;
  // //       left:78px;
  // //       font-size:20px;
  // //       letter-spacing:2px;
  // //     }
  // //   </style>
  // // `;
  // // toAdd('coupon') && bm.add('coupon', {
  // //   label: c.labelCoupon,
  // //   category: c.category,
  // //   media: `
  // //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
  // //       <path d="M1,20c0,1.104,0.896,2,2,2h18c1.104,0,2-0.896,2-2v-4.979V15c-1.657,0-3-1.344-3-3.001C20,10.343,21.343,9,23,9 v0.021V4c0-1.104-0.896-2-2-2H3C1.896,2,1,2.896,1,4v5c1.657,0,3,1.343,3,2.999C4,13.656,2.657,15,1,15V20z M15,15.465 C14.412,15.805,13.729,16,13,16c-2.209,0-4-1.791-4-4s1.791-4,4-4c0.729,0,1.413,0.195,2.002,0.536"></path>
  // //     </svg>
  // //   `,
  // //   content: couponItem,
  // // });
}
