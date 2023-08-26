// bm: Grapes Editor BlockManager
// c: object container a block properties

import { GRAPEJS_TEMPLATE_TYPE_FORM } from './config/constants';
import { customCodeType, hNavbarType, menuRef, navbarItemsRef, navbarRef, tabsType, typeSelect } from './plugins/basic-block/constants';
import { defaultSampleForm } from './plugins/form-block/components';
import {
  typeButton,
  typeCheckbox,
  typeDate,
  typeField,
  typeFile,
  typeForm,
  typeFormContainer,
  typeInput,
  typeLabel,
  typeMutipleCheckbox,
  typeNumber,
  typePrivacyPolicy,
  typeRadio,
  typeResetButton,
  typeRow,
  typeSubmitButton,
  typeTermOfUse,
  typeTextarea
} from './plugins/form-block/constants';
import { getLayOutContent } from './plugins/form-block/helper';
import { buttonStyle, checkboxGroupStyle, fieldStyle, labelStyle, rowStyle } from './plugins/form-block/style';

export const AddGlobalBlocks: { [key in string]: (bm: any, c: any) => void } = {
  'short-text'(bm: any, c: any) {
    bm.add('short-text', {
      label: c.labelShortText,
      category: c.category,
      media: `
          <svg viewBox="-30 8 130 100" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="100" font-size="8em">t</text>
          </svg>
        `,
      content: '<span class="tx-short">Insert your short text here</span>'
    });
  },
  'text-line'(bm: any, c: any) {
    bm.add('text-line', {
      label: c.labelTextLine,
      category: c.category,
      //attributes: { class: 'gjs-fonts gjs-f-text' },
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -6 34 34" style="fill: none; stroke-width: 1.2;" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
      `,
      content: {
        type: 'text',
        content: 'Insert your text here',
        style: { padding: '10px' },
        activeOnRender: 1
      }
    });
  },
  paragraph(bm: any, c: any) {
    bm.add('paragraph', {
      category: c.category,
      label: c.labelParagraph,
      attributes: { class: 'fa fa-align-justify' },
      content: `
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        `
    });
  },
  heading(bm: any, c: any) {
    bm.add('heading', {
      label: c.labelHeading,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -6 34 34" stroke="currentColor"  style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><path d="M3,20h6 M3,4h6 M6,4v16 M15,20h6 M15,4h6 M18,4v16 M6,12h12"></path></svg>
      `,
      content: {
        type: 'heading',
        content: 'Insert your heading text here',
        //style: { padding: '10px' },
        activeOnRender: 1
      }
    });
  },
  'text-section'(bm: any, c: any) {
    bm.add('text-section', {
      category: c.category,
      label: c.labelTextSection,
      //attributes: { class: 'gjs-fonts gjs-f-h1p' },
      attributes: { class: 'fa fa-indent' },
      content: `
        <section class="p-section">
          <h1 class="heading">Insert title here</h1>
          <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </section>
      `
    });
  },
  divider(bm: any, c: any) {
    bm.add('divider', {
      label: c.labelDivider,
      category: c.category,
      // attributes: { class: 'gjs-fonts gjs-f-divider' },
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -3 30 30" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"/>
          <polyline points="8 8 12 4 16 8"/>
          <polyline points="16 16 12 20 8 16"/>
        </svg>
      `,
      content: `
        <div style="margin: 20px 0"><hr /></div>
      `
    });
  },
  line(bm: any, c: any) {
    bm.add('line', {
      label: c.labelLine,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -3 26 26" stroke="currentColor"  style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line></svg>
      `,
      content: `
        <div style="width: 100%; margin: 10px 0">
          <div class='line'></div>
        </div>
        <style>
          .line {
            border: 1px solid rgb(217, 131, 166);
          }
        </style>
      `
    });
  },
  space(bm: any, c: any) {
    bm.add('space', {
      label: c.labelSpace,
      category: c.category,
      // attributes: { class: 'gjs-fonts gjs-f-divider' },
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-25 -30 252 252" style="enable-background:new 0 0 202.659 202.659;" xml:space="preserve">
          <g>
            <g>
              <g>
                <path d="M171.448,124.71v-0.001c2.152,0,3.897-1.745,3.897-3.897V81.847c0-2.152-1.745-3.897-3.897-3.897H38.966     c-2.152,0-3.897,1.745-3.897,3.897v38.966c0,2.152,1.745,3.897,3.897,3.897H171.448z M42.862,85.743h124.69v31.172H42.862V85.743     z"/>
                <rect y="46.778" width="202.659" height="7.793"/>
                <rect y="148.088" width="202.659" height="7.793"/>
              </g>
            </g>
          </g>
        </svg>
      `,
      content: `
        <div style="padding: 20px 0"></div>
      `
    });
  },
  'link-button'(bm: any, c: any) {
    bm.add('link-button', {
      label: c.LabelButtonBlk,
      category: c.category,
      media: `
        <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"  style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-2 -3 28 28">
          <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm8 6h6M7 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
        </svg>
      `,
      content: {
        type: 'link',
        content: 'Button',
        style: {
          display: 'inline-block',
          'text-decoration': 'none',
          cursor: 'pointer',
          'font-weight': '400',
          width: '160px',
          color: 'white',
          'text-align': 'center',
          'vertical-align': 'middle',
          'user-select': 'none',
          'background-color': 'rgb(120, 85, 128)',
          border: '1px solid transparent',
          padding: '0.2rem 0.6rem',
          'font-size': '1rem',
          'line-height': '1.5',
          'border-radius': '0.25rem',
          transition: `color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out`
        }
      }
    });
  },
  link(bm: any, c: any) {
    bm.add('link', {
      label: c.labelLink,
      category: c.category,
      attributes: { class: 'fa fa-link' },
      content: {
        type: 'link',
        content: 'Link',
        style: { color: '#d983a6' }
      }
    });
  },
  image(bm: any, c: any) {
    bm.add('image', {
      label: c.labelImage,
      category: c.category,
      //attributes: { class: 'gjs-fonts gjs-f-image' },
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
      `,
      content: {
        type: 'image',
        style: { color: 'black' },
        activeOnRender: 1
      }
    });
  },
  'n-image'(bm: any, c: any) {
    bm.add('n-image', {
      label: c.labelImage,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
      `,
      content: {
        type: 'n-image',
        style: { color: 'black' },
        classes: ['n-img'],
        activeOnRender: 1
      }
    });
  },
  icon(bm: any, c: any) {
    bm.add('icon', {
      label: c.labelIcon,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-75 -75 406 406" preserveAspectRatio="xMidYMid">
          <g>
              <path d="M127.999746,23.06353 C162.177385,23.06353 166.225393,23.1936027 179.722476,23.8094161 C192.20235,24.3789926 198.979853,26.4642218 203.490736,28.2166477 C209.464938,30.5386501 213.729395,33.3128586 218.208268,37.7917319 C222.687141,42.2706052 225.46135,46.5350617 227.782844,52.5092638 C229.535778,57.0201472 231.621007,63.7976504 232.190584,76.277016 C232.806397,89.7746075 232.93647,93.8226147 232.93647,128.000254 C232.93647,162.177893 232.806397,166.225901 232.190584,179.722984 C231.621007,192.202858 229.535778,198.980361 227.782844,203.491244 C225.46135,209.465446 222.687141,213.729903 218.208268,218.208776 C213.729395,222.687649 209.464938,225.461858 203.490736,227.783352 C198.979853,229.536286 192.20235,231.621516 179.722476,232.191092 C166.227425,232.806905 162.179418,232.936978 127.999746,232.936978 C93.8200742,232.936978 89.772067,232.806905 76.277016,232.191092 C63.7971424,231.621516 57.0196391,229.536286 52.5092638,227.783352 C46.5345536,225.461858 42.2700971,222.687649 37.7912238,218.208776 C33.3123505,213.729903 30.538142,209.465446 28.2166477,203.491244 C26.4637138,198.980361 24.3784845,192.202858 23.808908,179.723492 C23.1930946,166.225901 23.0630219,162.177893 23.0630219,128.000254 C23.0630219,93.8226147 23.1930946,89.7746075 23.808908,76.2775241 C24.3784845,63.7976504 26.4637138,57.0201472 28.2166477,52.5092638 C30.538142,46.5350617 33.3123505,42.2706052 37.7912238,37.7917319 C42.2700971,33.3128586 46.5345536,30.5386501 52.5092638,28.2166477 C57.0196391,26.4642218 63.7971424,24.3789926 76.2765079,23.8094161 C89.7740994,23.1936027 93.8221066,23.06353 127.999746,23.06353 M127.999746,0 C93.2367791,0 88.8783247,0.147348072 75.2257637,0.770274749 C61.601148,1.39218523 52.2968794,3.55566141 44.1546281,6.72008828 C35.7374966,9.99121548 28.5992446,14.3679613 21.4833489,21.483857 C14.3674532,28.5997527 9.99070739,35.7380046 6.71958019,44.1551362 C3.55515331,52.2973875 1.39167714,61.6016561 0.769766653,75.2262718 C0.146839975,88.8783247 0,93.2372872 0,128.000254 C0,162.763221 0.146839975,167.122183 0.769766653,180.774236 C1.39167714,194.398852 3.55515331,203.703121 6.71958019,211.845372 C9.99070739,220.261995 14.3674532,227.400755 21.4833489,234.516651 C28.5992446,241.632547 35.7374966,246.009293 44.1546281,249.28042 C52.2968794,252.444847 61.601148,254.608323 75.2257637,255.230233 C88.8783247,255.85316 93.2367791,256 127.999746,256 C162.762713,256 167.121675,255.85316 180.773728,255.230233 C194.398344,254.608323 203.702613,252.444847 211.844864,249.28042 C220.261995,246.009293 227.400247,241.632547 234.516143,234.516651 C241.632039,227.400755 246.008785,220.262503 249.279912,211.845372 C252.444339,203.703121 254.607815,194.398852 255.229725,180.774236 C255.852652,167.122183 256,162.763221 256,128.000254 C256,93.2372872 255.852652,88.8783247 255.229725,75.2262718 C254.607815,61.6016561 252.444339,52.2973875 249.279912,44.1551362 C246.008785,35.7380046 241.632039,28.5997527 234.516143,21.483857 C227.400247,14.3679613 220.261995,9.99121548 211.844864,6.72008828 C203.702613,3.55566141 194.398344,1.39218523 180.773728,0.770274749 C167.121675,0.147348072 162.762713,0 127.999746,0 Z M127.999746,62.2703115 C91.698262,62.2703115 62.2698034,91.69877 62.2698034,128.000254 C62.2698034,164.301738 91.698262,193.730197 127.999746,193.730197 C164.30123,193.730197 193.729689,164.301738 193.729689,128.000254 C193.729689,91.69877 164.30123,62.2703115 127.999746,62.2703115 Z M127.999746,170.667175 C104.435741,170.667175 85.3328252,151.564259 85.3328252,128.000254 C85.3328252,104.436249 104.435741,85.3333333 127.999746,85.3333333 C151.563751,85.3333333 170.666667,104.436249 170.666667,128.000254 C170.666667,151.564259 151.563751,170.667175 127.999746,170.667175 Z M211.686338,59.6734287 C211.686338,68.1566129 204.809755,75.0337031 196.326571,75.0337031 C187.843387,75.0337031 180.966297,68.1566129 180.966297,59.6734287 C180.966297,51.1902445 187.843387,44.3136624 196.326571,44.3136624 C204.809755,44.3136624 211.686338,51.1902445 211.686338,59.6734287 Z" />
          </g>
        </svg>
      `,
      content: {
        type: 'n-image',
        style: {
          position: 'relative',
          width: '50px',
          height: '50px',
          'border-radius': '100%',
          border: '2px solid rgb(255, 255, 255)',
          'border-image': 'initial',
          'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 1px 1px 0px'
        },
        activeOnRender: 1
      }
    });
  },
  video(bm: any, c: any) {
    bm.add('video', {
      label: c.labelVideo,
      category: c.category,
      attributes: { class: 'fa fa-youtube-play' },
      content: {
        type: 'video',
        src: 'img/video2.webm',
        style: {
          height: '350px',
          width: '615px'
        }
      }
    });
  },
  map(bm: any, c: any) {
    bm.add('map', {
      label: c.labelMap,
      category: c.category,
      attributes: { class: 'fa fa-map-o' },
      content: {
        type: 'map',
        style: { height: '350px' }
      }
    });
  },
  'link-block'(bm: any, c: any) {
    bm.add('link-block', {
      category: c.category,
      label: c.labelLinkBLock,
      attributes: { class: 'fa fa-link' },
      content: {
        type: 'link',
        editable: false,
        droppable: true,
        style: {
          display: 'inline-block',
          padding: '5px',
          'min-height': '50px',
          'min-width': '50px'
        }
      }
    });
  },
  quote(bm: any, c: any) {
    bm.add('quote', {
      label: c.labelQuote,
      category: c.category,
      attributes: { class: 'fa fa-quote-right' },
      content: `<blockquote class="quote">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
        </blockquote>`
    });
  },
  tooltip(bm: any, c: any) {
    bm.add('tooltip', {
      category: c.category,
      label: c.labelTooltip,
      media: `
        <svg viewBox="-2 -4 28 28" style="stroke-width: 1.2;">
          <path d="M4 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-4l-4 4-4-4H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2m0 2v12h4.83L12 19.17 15.17 16H20V4H4z"></path>
        </svg>
      `,
      select: true,
      content: { type: 'tooltip' }
    });
  },
  'h-navbar'(bm: any, c: any) {
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
    bm.add(hNavbarType, {
      label: c.labelNavbarBlock,
      media: `
        <svg className="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="stroke-width: 1.2;">
          <path className="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fillRule="nonzero"></path><rect className="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect><rect className="gjs-block-svg-path" x="15" y="13" width="5" height="1"></rect><rect className="gjs-block-svg-path" x="15" y="11.5" width="5" height="1"></rect>
        </svg>
      `,
      // label: `
      //   <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      //     <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
      //     <rect class="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect>
      //     <rect class="gjs-block-svg-path" x="15" y="13" width="5" height="1"></rect>
      //     <rect class="gjs-block-svg-path" x="15" y="11.5" width="5" height="1"></rect>
      //   </svg>
      //   <div class="gjs-block-label">${c.labelNavbarBlock}</div>`,
      category: c.category,
      content: `
          <div class="${navbarPfx}" data-gjs-droppable="false" data-gjs-custom-name="${c.labelNavbar}" data-gjs="${navbarRef}">
            <div class="${navbarPfx}-container" data-gjs-droppable="false" data-gjs-draggable="false"
              data-gjs-removable="false" data-gjs-copyable="false" data-gjs-highlightable="false"
              data-gjs-custom-name="${c.labelNavbarContainer}">
  
              <a href="/" class="${navbarPfx}-brand" data-gjs-droppable="true"></a>
  
              <div class="${navbarPfx}-burger" data-gjs-type="burger-menu">
                <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
                <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
                <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${c.labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
              </div>
  
              <div class="${navbarPfx}-items-c" data-gjs="${navbarItemsRef}">
                <nav class="${navbarPfx}-menu" data-gjs="${menuRef}" data-gjs-custom-name="${c.labelMenu}">
                  <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelHome}</a>
                  <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelAbout}</a>
                  <a href="#" class="${navbarPfx}-menu-link" data-gjs-custom-name="${c.labelMenuLink}" data-gjs-draggable="[data-gjs=${menuRef}]">${c.labelContact}</a>
                </nav>
              </div>
  
            </div>
          </div>
          ${style}
        `
    });
  },
  tabs(bm: any, c: any) {
    bm.add(tabsType, {
      label: c.labelTabs,
      media: `
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 9.3c0-.8-.5-1.3-1.3-1.3H3.4C2.5 8 2 8.5 2 9.3v7.4c0 .8.5 1.3 1.3 1.3h17.4c.8 0 1.3-.5 1.3-1.3V9.3zM21 17H3V9h18v8z" fill-rule="nonzero"/><rect x="3" y="5" width="4" height="2" rx=".5"/><rect x="8" y="5" width="4" height="2" rx=".5"/><rect x="13" y="5" width="4" height="2" rx=".5"/>
          </svg>
        `,
      category: c.category,
      content: { type: tabsType }
    });
  },
  [customCodeType](bm: any, c: any) {
    bm.add(customCodeType, {
      label: c.codeLabel,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-50 -50 632 632" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <g>
            <path d="M47.552,200.976l137.904-71.04v20.528L69.248,208.72v0.592l116.208,58.272v20.496L47.552,217.04   C47.552,217.04,47.552,200.976,47.552,200.976z"/>
            <path d="M204.72,299.968l82.928-215.504h20.208l-83.232,215.504H204.72z"/>
            <path d="M464.448,217.328L326.544,288.08v-20.496l117.12-58.272v-0.592l-117.12-58.256v-20.528   l137.904,70.752V217.328z"/>
          </g>
          <rect y="411.248" width="512" height="16.288"/>
          <g>
            <rect x="380.112" y="355.68" width="131.888" height="27.92"/>
            <rect x="183.168" y="355.68" width="131.888" height="27.92"/>
            <rect y="355.68" width="131.888" height="27.92"/>
          </g>
        </svg>
      `,
      category: c.category,
      activate: true,
      select: true,
      content: { type: customCodeType }
    });
  },
  personalize(bm: any, c: any) {
    bm.add('personalize', {
      label: c.labelPersonalize,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-5 -5 34 34">
          <path d="M7 22c-2 0-3-2-3-3v-4c0-1.656-.343-3-2-3 2 0 2-3 2-3V5a3 3 0 0 1 3-3m10 0c2 0 3 2 3 3v4c0 1.656.344 3 2 3-2 0-2 3-2 3v4c0 1.656-1.344 3-3 3M8 12h0m4 0h0m4 0h0"></path>
        </svg>
      `,
      category: c.category,
      content: { type: 'personalize' }
    });
  },
  form(bm: any, c: any) {
    bm.add('form', {
      label: c.labelForm,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"/><rect width="10" height="3" x="2" y="15" rx=".5"/></svg>',
      category: c.category,
      content: { type: 'form' }
    });
  },
  table(bm: any, c: any) {
    bm.add('table', {
      category: c.category,
      label: c.tableLabel,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5,3h14 c1.104,0,2,0.896,2,2v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M3,9h18 M9,21V9 M15,9v12 M21,15H3"></path>
        </svg>
      `,
      activate: 1,
      content: `
        <table data-gjs-type="table"></table>
        ${c.tableStyle ? `<style>${c.tableStyle}</style>` : ''}
      `
    });
  },
  'list-items'(bm: any, c: any) {
    bm.add('list-items', {
      label: c.labelListItemsBlk,
      category: c.category,
      //attributes: { class: 'fa fa-th-list' },
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-15 -15 86 86" style="enable-background:new 0 0 56 56;" xml:space="preserve">
          <g>
            <path d="M47.91,47.496l6.484-3.242l-17.638-6.498l6.498,17.638l3.242-6.484l6.797,6.797C53.488,55.902,53.744,56,54,56   s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L47.91,47.496z M40.131,41.131l9.233,3.402l-3.888,1.943l-1.943,3.888   L40.131,41.131z"/>
            <path d="M28,14h18c0.553,0,1-0.447,1-1s-0.447-1-1-1H28c-0.553,0-1,0.447-1,1S27.447,14,28,14z"/>
            <path d="M28,28h18c0.553,0,1-0.447,1-1s-0.447-1-1-1H28c-0.553,0-1,0.447-1,1S27.447,28,28,28z"/>
            <path d="M21.579,7.241c-0.417-0.358-1.051-0.313-1.409,0.108l-6.248,7.288L10.1,11.771c-0.44-0.331-1.067-0.243-1.399,0.2   c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-8   C22.048,8.231,21.999,7.601,21.579,7.241z"/>
            <path d="M21.579,21.241c-0.417-0.359-1.051-0.312-1.409,0.108l-6.248,7.288L10.1,25.771c-0.44-0.331-1.067-0.243-1.399,0.2   c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-8   C22.048,22.231,21.999,21.601,21.579,21.241z"/>
            <path d="M20.17,36.35l-6.248,7.287L10.1,40.771c-0.44-0.33-1.067-0.243-1.399,0.2c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429   c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-7.999c0.36-0.419,0.312-1.05-0.108-1.409   C21.162,35.883,20.528,35.929,20.17,36.35z"/>
            <path d="M42.824,0H13.176C6.462,0,1,5.462,1,12.176v29.648C1,48.538,6.462,54,13.176,54H33c0.553,0,1-0.447,1-1s-0.447-1-1-1   H13.176C7.564,52,3,47.436,3,41.824V12.176C3,6.564,7.564,2,13.176,2h29.648C48.436,2,53,6.564,53,12.176V37c0,0.553,0.447,1,1,1   s1-0.447,1-1V12.176C55,5.462,49.538,0,42.824,0z"/>
          </g>
        </svg>
      `,
      content: `
        <ul class='list-wrap'>
          <li class='list-item'>Text Here 1</li>
          <li class='list-item'>Text Here 2</li>
        </ul>
      `
    });
  },
  'grid-items'(bm: any, c: any) {
    let gridItem = `<table class="grid-item-card">
        <tr>
          <td class="grid-item-card-image">
            <img class="grid-item-image" src="http://placehold.it/250x150/78c5d6/fff/" alt="Image"/>
          </td>
        </tr>
        <tr>
          <td class="grid-item-card-content">
            <h1 class="grid-item-card-title">Title here</h1>
            <p class="grid-item-card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
          </td>
        </tr>
      </table>`;
    bm.add('grid-items', {
      label: c.labelGridItemsBlk,
      category: c.category,
      content: `<table class="grid-item-row">
          <tr>
            <td class="grid-item-cell2-l">${gridItem}</td>
            <td class="grid-item-cell2-r">${gridItem}</td>
          </tr>
        </table>`,
      attributes: { class: 'fa fa-th' }
    });
  },
  event(bm: any, c: any) {
    let eventItem = `
    <div class='event-item'>
      <label class='event-title'>Event date:</label>
      <input type="date" class='event-date' value='2022-03-28'>
    </div>
  `;
    bm.add('event', {
      label: c.labelMarketingEvent,
      category: c.category,
      media: `
        <svg class='mar-svg' xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-2 -3 28 28">
          <path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm11-2v4M8 2v4m4 3.01 1.468 2.962 3.282.478-2.375 2.305.561 3.255L12 16.472 9.064 18.01l.561-3.255L7.25 12.45l3.282-.478L12 9.01z"></path>
        </svg>
      `,
      content: eventItem
    });
  },
  'survey-form'(bm: any, c: any) {
    bm.add('survey-form', {
      label: c.labelMarketingSurvey,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="8" class="st0" width="4" height="13"></rect><rect x="17" y="3" class="st0" width="4" height="18"></rect><rect x="3" y="15" class="st0" width="4" height="6"></rect></svg>
      `,
      content: {
        type: 'form',
        components: [
          {
            type: 'section',
            components: [
              { type: 'text', components: 'Section 1' },
              {
                type: 'container',
                components: [
                  { type: 'text', components: 'Question 1' },
                  {
                    type: 'form-row',
                    components: [{ type: 'radio' }, { type: 'label', components: 'Answer 1' }]
                  },
                  {
                    type: 'form-row',
                    components: [{ type: 'radio' }, { type: 'label', components: 'Answer 2' }]
                  }
                ]
              },
              {
                type: 'container',
                components: [
                  { type: 'text', components: 'Question 2' },
                  {
                    type: 'form-row',
                    components: [{ type: 'checkbox' }, { type: 'label', components: 'Answer 1' }]
                  },
                  {
                    type: 'form-row',
                    components: [{ type: 'checkbox' }, { type: 'label', components: 'Answer 2' }]
                  }
                ]
              }
            ]
          }
        ],
        style: {
          padding: '10px'
        }
      }
    });
  },
  'option-set'(bm: any, c: any) {
    const optionItem = `
    <ul class='option-list'>
      <li class='option-item'>Option 1</li>
      <li class='option-item'>Option 2</li>
    </ul>
  `;
    bm.add('option-set', {
      label: c.labelMarketingOptionSet,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><path d="M5,3h14c1.104,0,2,0.896,2,2 v14c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V5C3,3.896,3.896,3,5,3z M17,14H7 M17,17H7 M17,7H7v3h10V7z"></path></svg>
      `,
      content: optionItem
    });
  },
  'social-share'(bm: any, c: any) {
    const socialItem = `
    <div data-gjs-highlightable="true" draggable="true" class="social-container">
      <a data-gjs-highlightable="true" href="facebook.com" draggable="true" class="social-item">f</a>
      <a data-gjs-highlightable="true" draggable="true" class="social-item">t</a>
      <a data-gjs-highlightable="true" draggable="true" class="social-item">in</a>
    </div>
    <style>
      .social-container {
        padding: 13px 0;
        color:rgb(255, 255, 255);
        justify-content:center;
        align-items:center;
        min-height:auto;
        display:flex;
        background-color:rgb(162, 144, 165);
        width:100%;
      }
      .social-item {
        width:35px;
        height:35px;
        margin: 0 10px;
        font-weight:700;
        color:rgb(162, 144, 165);
        line-height:35px;
        background-color:rgb(255, 255, 255);
        border-radius:100%;
        text-align: center;
      }
    </style>
  `;
    bm.add('social-share', {
      label: c.labelMarketingSocial,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" viewBox="-2 -5 28 28"><path d="M12 22C6.477 22 2 17.522 2 12 2 6.477 6.477 2 12 2c5.522 0 10 4.477 10 10a9.968 9.968 0 0 1-1.742 5.644l-.001-.001L22 22H12zm.996-13.482c0 .801.672 1.449 1.5 1.449s1.5-.648 1.5-1.449-.672-1.45-1.5-1.45-1.5.649-1.5 1.45zM6.067 12.52c0 .801.672 1.448 1.5 1.448s1.5-.647 1.5-1.448c0-.8-.673-1.448-1.5-1.448s-1.5.648-1.5 1.448zm6.929 3.064c0 .801.672 1.449 1.5 1.449s1.5-.648 1.5-1.449-.672-1.45-1.5-1.45-1.5.649-1.5 1.45zM8.84 13.236l4.388 1.631m-.005-5.632L8.84 11.802"></path></svg>
      `,
      content: socialItem
    });
  },
  'download-link'(bm: any, c: any) {
    bm.add('download-link', {
      label: c.labelDownloadLink,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      `,
      content: {
        type: 'link',
        content: 'Link',
        style: { color: '#d983a6' }
      }
    });
  },
  address(bm: any, c: any) {
    bm.add('address', {
      label: c.labelAddress,
      category: c.category,
      media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `,
      content: {
        type: 'map',
        style: { height: '350px' }
      }
    });
  },
  package(bm: any, c: any) {
    const packageItem = `<table class="package-content">
    <tr class="package-row">
      <td class="package-cell-left">
        <img class="package-item-image" src="http://placehold.it/150x150/78c5d6/fff/" alt="Image"/>
      </td>
      <td class="package-cell-right">
        <h1 class="package-card-title">Package title</h1>
        <p class="package-card-text">Package description Package description Package description</p>
      </td>
    </tr>
  </table>`;
    bm.add('package', {
      label: c.labelPackage,
      category: c.category,
      media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    `,
      content: packageItem
    });
  },

  [typeFormContainer](bm: any, c: any) {
    bm.add(typeFormContainer, {
      label: c.labelFormContainer,
      category: c.category,
      media:
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 38 32" enable-background="new 0 0 38 32" xml:space="preserve" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path  d="M36.5,0h-35C0.673,0,0,0.673,0,1.5v29C0,31.327,0.673,32,1.5,32h35c0.827,0,1.5-0.673,1.5-1.5v-29 C38,0.673,37.327,0,36.5,0z M37,30.5c0,0.275-0.225,0.5-0.5,0.5h-35C1.225,31,1,30.775,1,30.5v-29C1,1.225,1.225,1,1.5,1h35 C36.775,1,37,1.225,37,1.5V30.5z"></path> <path  d="M31.5,14h-25C5.673,14,5,14.673,5,15.5v10C5,26.327,5.673,27,6.5,27h25c0.827,0,1.5-0.673,1.5-1.5v-10 C33,14.673,32.327,14,31.5,14z M32,25.5c0,0.275-0.225,0.5-0.5,0.5h-25C6.225,26,6,25.775,6,25.5v-10C6,15.225,6.225,15,6.5,15h25 c0.275,0,0.5,0.225,0.5,0.5V25.5z"></path> <path  d="M31.5,5h-25C5.673,5,5,5.673,5,6.5v3C5,10.327,5.673,11,6.5,11h25c0.827,0,1.5-0.673,1.5-1.5v-3 C33,5.673,32.327,5,31.5,5z M32,9.5c0,0.275-0.225,0.5-0.5,0.5h-25C6.225,10,6,9.775,6,9.5v-3C6,6.225,6.225,6,6.5,6h25 C31.775,6,32,6.225,32,6.5V9.5z"></path></g></g></svg>',
      // content: [{ type: typeFormContainer, components: defaultSampleForm, style: { padding: '8px', display: 'flex', 'flex-wrap': 'wrap' } }]
      //disable form wrapper 29-03-2023
      content:
        c?.templateType == GRAPEJS_TEMPLATE_TYPE_FORM
          ? defaultSampleForm
          : [{ type: typeFormContainer, components: defaultSampleForm, style: { padding: '8px' } }]
    });
  },
  [typeRow](bm: any, c: any) {
    bm.add(typeRow, {
      category: c.category,
      label: c.labelRow,
      media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M494.029,178.04H109.116c-4.366,0-7.903,3.537-7.903,7.903c0,4.366,3.537,7.903,7.903,7.903h384.912 c1.194,0,2.165,0.972,2.165,2.165v119.978c0,1.194-0.972,2.165-2.165,2.165h-60.21c-4.366,0-7.903,3.537-7.903,7.903 s3.537,7.903,7.903,7.903h60.21c9.909,0,17.971-8.062,17.971-17.971V196.011C512,186.101,503.938,178.04,494.029,178.04z" />
        <path d="M402.207,318.155H17.971c-1.194,0-2.165-0.972-2.165-2.165V196.011c0-1.194,0.971-2.165,2.165-2.165h59.533 c4.366,0,7.903-3.537,7.903-7.903c0-4.366-3.537-7.903-7.903-7.903H17.971C8.061,178.04,0,186.102,0,196.011v119.978 c0,9.909,8.061,17.971,17.971,17.971h384.236c4.366,0,7.903-3.537,7.903-7.903C410.11,321.692,406.573,318.155,402.207,318.155z" />
        <path d="M316.09,212.084H195.91c-4.366,0-7.903,3.537-7.903,7.903v72.023c0,4.366,3.537,7.903,7.903,7.903H316.09 c4.365,0,7.903-3.537,7.903-7.903v-72.023C323.993,215.622,320.456,212.084,316.09,212.084z M308.187,284.108H203.813h0V227.89h104.375V284.108z"/>
        <path d="M161.758,212.084H41.578c-4.366,0-7.903,3.537-7.903,7.903v72.023c0,4.366,3.537,7.903,7.903,7.903h120.181 c4.365,0,7.903-3.537,7.903-7.903v-72.023C169.661,215.622,166.124,212.084,161.758,212.084z M153.856,284.108H49.481V227.89 h104.375V284.108z"/>
        <path d="M470.422,212.084H350.242c-4.366,0-7.903,3.537-7.903,7.903v72.023c0,4.366,3.537,7.903,7.903,7.903h120.181 c4.365,0,7.903-3.537,7.903-7.903v-72.023C478.325,215.622,474.788,212.084,470.422,212.084z M462.519,284.108H358.144V227.89 h104.375V284.108z"/>
      </svg>
    `,
      content: { type: typeRow, components: getLayOutContent('column1') }
    });
  },
  [typeInput](bm: any, c: any) {
    bm.add(typeInput, {
      label: c.labelInput,
      category: c.category,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
      content: [{ type: typeInput }]
    });
  },
  [typeTextarea](bm: any, c: any) {
    bm.add(typeTextarea, {
      label: c.labelTextarea,
      category: c.category,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .9.5 1.5 1.3 1.5h17.4c.8 0 1.3-.6 1.3-1.5v-9zM21 17H3V7h18v10z"/><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"/></svg>',
      content: [{ type: typeTextarea }]
    });
  },
  [typeSelect](bm: any, c: any) {
    bm.add(typeSelect, {
      label: c.labelSelect,
      category: c.category,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"/></svg>',
      content: [{ type: typeSelect }]
    });
  },

  [typeButton](bm: any, c: any) {
    bm.add(typeButton, {
      label: c.labelButton,
      category: c.category,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
      content: [{ type: typeButton, styles: buttonStyle, attributes: { type: 'button', class: 'muiButton-primary' }, text: 'Button' }]
    });
  },
  [typeSubmitButton](bm: any, c: any) {
    bm.add(typeSubmitButton, {
      label: c.labelSubmitButton,
      category: c.category,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
      content: [{ type: typeButton, styles: buttonStyle, attributes: { type: 'submit', class: 'muiButton-primary' }, text: 'Submit' }]
    });
  },
  [typeResetButton](bm: any, c: any) {
    bm.add(typeResetButton, {
      label: c.labelResetButton,
      category: c.category,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 11.5h16v1H4z"/></svg>',
      content: [{ type: typeButton, styles: buttonStyle, attributes: { type: 'reset', class: 'muiButton-primary' }, text: 'Reset' }]
    });
  },

  [typeLabel](bm: any, c: any) {
    bm.add(typeLabel, {
      category: c.category,
      label: c.labelLabel,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 11.9c0-.6-.5-.9-1.3-.9H3.4c-.8 0-1.3.3-1.3.9V17c0 .5.5.9 1.3.9h17.4c.8 0 1.3-.4 1.3-.9V12zM21 17H3v-5h18v5z"/><rect width="14" height="5" x="2" y="5" rx=".5"/><path d="M4 13h1v3H4z"/></svg>',
      content: { type: typeLabel, style: labelStyle }
    });
  },
  [typeMutipleCheckbox](bm: any, c: any) {
    bm.add(typeMutipleCheckbox, {
      label: c.labelMutipleCheckbox,
      category: c.category,
      media:
        '<svg style="fill:none;stroke:currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Select_Multiple"> <path id="Vector" d="M3 9V19.4C3 19.9601 3 20.2399 3.10899 20.4538C3.20487 20.642 3.35774 20.7952 3.5459 20.8911C3.7596 21 4.0395 21 4.59846 21H15.0001M17 8L13 12L11 10M7 13.8002V6.2002C7 5.08009 7 4.51962 7.21799 4.0918C7.40973 3.71547 7.71547 3.40973 8.0918 3.21799C8.51962 3 9.08009 3 10.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07969 21.0002 6.19978L21.0002 13.7998C21.0002 14.9199 21.0002 15.48 20.7822 15.9078C20.5905 16.2841 20.2842 16.5905 19.9079 16.7822C19.4805 17 18.9215 17 17.8036 17H10.1969C9.07899 17 8.5192 17 8.0918 16.7822C7.71547 16.5905 7.40973 16.2842 7.21799 15.9079C7 15.4801 7 14.9203 7 13.8002Z" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>',

      content: [{ type: typeMutipleCheckbox }]
    });
  },
  [typeTermOfUse](bm: any, c: any) {
    bm.add(typeTermOfUse, {
      label: c.labelTermOfUse,
      category: c.category,
      media:
        '<svg style="fill:none;stroke:currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / List_Check"> <path id="Vector" d="M4 17H11M20 14L16 18L14 16M4 12H15M4 7H15"  stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>',
      content: `
      <p>By clicking below, you agree to the Atlassian Cloud <a href="#"> Terms of Use.</a></p>
    `
    });
  },
  [typePrivacyPolicy](bm: any, c: any) {
    bm.add(typePrivacyPolicy, {
      label: c.labelPrivacyPolicy,
      category: c.category,
      media:
        '<svg  fill="#000000" viewBox="0 0 512 512" enable-background="new 0 0 512 512" id="Insurance" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#000000" stroke-width="0.00512"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <rect height="16.306" width="10" x="27.855" y="200.771"></rect> <polygon points="37.855,231.931 27.855,231.931 27.855,488.396 320.771,488.396 320.771,478.396 37.855,478.396 "></polygon> <polygon points="384.066,478.396 337.137,478.396 337.137,488.396 394.066,488.396 394.066,255.836 384.066,255.836 "></polygon> <path d="M27.856,185.816h10v-41.42h135.107v156.502h75.991V144.396h35.92c2.388,5.538,5.002,10.984,7.856,16.32 c15.079,28.188,37.411,53.368,64.581,72.815l15.34,10.979l15.43-11.044c25.871-18.518,47.414-42.293,62.3-68.757 c11.31-20.106,19.275-41.784,23.673-64.429l5.106-26.283l-24.994-2.892c-27.312-3.16-52.6-16.047-71.206-36.288l-10.309-11.214 l-10.31,11.214c-18.606,20.241-43.895,33.128-71.206,36.288l-24.993,2.892l5.105,26.283c2.262,11.645,5.478,23.047,9.604,34.116 h-31.898h-75.991H27.856V185.816z M292.286,81.039c29.694-3.436,57.188-17.447,77.419-39.454l2.947-3.206l2.947,3.206 c20.229,22.007,47.724,36.019,77.418,39.454l14.268,1.651l-3.046,15.684c-4.194,21.592-11.789,42.262-22.573,61.434 c-14.174,25.197-34.715,47.856-59.404,65.527l-9.609,6.878l-9.52-6.813c-25.929-18.56-47.225-42.558-61.584-69.4 c-9.679-18.094-16.57-37.482-20.483-57.625l-3.047-15.684L292.286,81.039z M238.955,144.396v146.502h-55.991V144.396H238.955z"></path> <path d="M372.652,189.593c31.741,0,57.564-25.823,57.564-57.564s-25.823-57.565-57.564-57.565s-57.564,25.824-57.564,57.565 S340.911,189.593,372.652,189.593z M372.652,84.463c16.098,0,30.343,8.046,38.953,20.319l-45.746,45.747l-19.025-19.026 l-7.071,7.071l26.097,26.097l50.763-50.763c2.312,5.588,3.595,11.706,3.595,18.12c0,26.227-21.338,47.564-47.564,47.564 c-26.228,0-47.564-21.337-47.564-47.564C325.088,105.801,346.425,84.463,372.652,84.463z"></path> <path d="M413.004,227.949l6.047,7.965c5.537-4.204,11.072-9.187,16.451-14.81l-7.227-6.912 C423.261,219.435,418.123,224.063,413.004,227.949z"></path> <path d="M436.192,205.297l7.689,6.394c25.368-30.51,39.667-66.15,40.263-67.652l-9.295-3.69 C474.709,140.702,460.512,176.05,436.192,205.297z"></path> </g> <g> <path d="M152.951,159.036H54.035v98.916h98.916V159.036z M142.951,247.952H64.035v-78.916h78.916V247.952z"></path> <path d="M205.959,458.414h157.372v-58.497H205.959V458.414z M215.959,409.917h137.372v38.497H215.959V409.917z"></path> <rect height="10" width="12" x="243.955" y="424.166"></rect> <rect height="10" width="12" x="267.955" y="424.166"></rect> <rect height="10" width="12" x="315.955" y="424.166"></rect> <rect height="10" width="12" x="291.955" y="424.166"></rect> <rect height="10" width="44.458" x="59.035" y="272.979"></rect> <rect height="10" width="44.458" x="59.035" y="290.999"></rect> <rect height="10" width="48.811" x="79.088" y="183.797"></rect> <rect height="10" width="48.811" x="79.088" y="203.494"></rect> </g> </g> </g> </g></svg>',
      content: `
        <p>By clicking below, you agree to the Vora Cloud Terms of <a href="#"> Service and Privacy Policy.</a></p>
       
      `
    });
  },

  [typeField](bm: any, c: any) {
    bm.add(typeField, {
      label: c.labelField,
      category: c.category,
      media:
        '<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="text--input_1_" d="M30,29.36H2c-0.199,0-0.36-0.161-0.36-0.36v-4c0-0.199,0.161-0.36,0.36-0.36h28 c0.199,0,0.36,0.161,0.36,0.36v4C30.36,29.199,30.199,29.36,30,29.36z M2.36,28.64h27.28v-3.28H2.36V28.64z M14,23.36H2v-0.72h12 V23.36z M30,19.36H2c-0.199,0-0.36-0.161-0.36-0.36v-4c0-0.199,0.161-0.36,0.36-0.36h28c0.199,0,0.36,0.161,0.36,0.36v4 C30.36,19.199,30.199,19.36,30,19.36z M2.36,18.64h27.28v-3.28H2.36V18.64z M14,13.36H2v-0.72h12V13.36z M30,9.36H2 C1.801,9.36,1.64,9.199,1.64,9V5c0-0.199,0.161-0.36,0.36-0.36h28c0.199,0,0.36,0.161,0.36,0.36v4C30.36,9.199,30.199,9.36,30,9.36z M2.36,8.64h27.28V5.36H2.36V8.64z M14,3.36H2V2.64h12V3.36z"></path> <rect id="_Transparent_Rectangle" style="fill:none;" width="32" height="32"></rect> </g></svg> ',
      content: [
        {
          type: typeField,
          style: { ...fieldStyle, width: '100%' },
          components: [
            { type: typeLabel, removable: false, draggable: false },
            { type: typeInput, removable: false, draggable: false }
          ]
        }
      ]
    });
  },
  [typeRadio](bm: any, c: any) {
    bm.add(typeRadio, {
      category: c.category,
      label: c.labelRadio,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"></path></svg>',
      content: { type: typeRadio }
    });
  },
  [typeFile](bm: any, c: any) {
    bm.add(typeFile, {
      label: c.labelFile,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
        </svg>
      `,
      content: { type: typeFile }
    });
  },
  [typeDate](bm: any, c: any) {
    bm.add(typeDate, {
      label: c.labelDate,
      category: c.category,
      media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      `,
      content: { type: typeDate }
    });
  },
  [typeCheckbox](bm: any, c: any) {
    bm.add(typeCheckbox, {
      label: c.labelCheckbox,
      category: c.category,
      media:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2z"></path></svg>',
      content: { type: typeCheckbox }
    });
  },
  [typeNumber](bm: any, c: any) {
    bm.add(typeNumber, {
      label: c.labelNumber,
      category: c.category,
      media:
        '<svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0165 17.6336H3.83636V16.4336H21.0165V17.6336Z" ></path> <path d="M7.09808 13.3967V7.50803H5.74066L3.83636 8.78244V10.091L5.65277 8.88498H5.74066V13.3967H3.84125V14.5539H8.89984V13.3967H7.09808Z" ></path> <path d="M9.81781 9.63205V9.66135H11.1069V9.62717C11.1069 8.95334 11.5756 8.49435 12.2739 8.49435C12.9575 8.49435 13.4018 8.89474 13.4018 9.5051C13.4018 9.97873 13.1528 10.3498 12.1909 11.3117L9.89594 13.5822V14.5539H14.8618V13.3869H11.7807V13.299L13.1577 11.9856C14.3491 10.843 14.7543 10.1838 14.7543 9.41232C14.7543 8.19162 13.7729 7.36642 12.3178 7.36642C10.8383 7.36642 9.81781 8.28439 9.81781 9.63205Z" ></path> <path d="M17.6694 11.4631H18.5092C19.3198 11.4631 19.8422 11.8684 19.8422 12.4983C19.8422 13.1184 19.3295 13.5139 18.5239 13.5139C17.767 13.5139 17.2592 13.133 17.2104 12.5324H15.9262C15.9897 13.8508 17.0248 14.6955 18.5629 14.6955C20.1401 14.6955 21.2192 13.841 21.2192 12.591C21.2192 11.6584 20.6528 11.0334 19.7006 10.9211V10.8332C20.4721 10.677 20.9457 10.0666 20.9457 9.23654C20.9457 8.12326 19.9741 7.36642 18.5434 7.36642C17.0541 7.36642 16.1118 8.17697 16.0629 9.50021H17.2983C17.3422 8.8801 17.8061 8.48459 18.4995 8.48459C19.2075 8.48459 19.6567 8.85568 19.6567 9.44162C19.6567 10.0324 19.1977 10.4182 18.4946 10.4182H17.6694V11.4631Z" ></path> </g></svg>',
      content: [{ type: typeInput, attributes: { type: 'number' } }]
    });
  },

  'image-only'(bm: any, c: any) {
    bm.add('image-only', {
      label: c.labelImageOnly,
      category: c.category,
      media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    `,
      // content: '<a class="cta-button">Cta Button</a>',
      content: [
        `<img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholder1col.png" width="100%" class="n-img" />`
      ]
      // content: {
      //   type: 'image-only'
      // }
    });
  },
  'image-on-top'(bm: any, c: any) {
    bm.add('image-on-top', {
      label: c.labelImageOnTop,
      category: c.category,
      media: `
      <svg viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="3" width="18" height="10.37" rx="2" ry="2" style=""/>
  <circle cx="8.5" cy="6.5" r="1.5"/>
  <polyline points="21 10.017 18.203 7.723 12.052 12.771" style=""/>
  <polyline points="21.066 16.363 21.069 16.363 3 16.418" style=""/>
  <polyline points="21.033 19.386 21.036 19.386 2.967 19.441" style=""/>
</svg>
    `,
      //activate: true,
      content: [
        `<div style="margin: 10px;">
          <img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholder1col.png" width="100%" class="n-img" />
          <div> Another year is nearly over and we want to thank you for the trust and loyalty you place upon us. We hope you and your family have a great Christmas and a very Happy New Year.</div>
        </div>`
      ]
      // content: '<a class="cta-button">Cta Button</a>',
      // content: {
      //   type: 'image-on-top'
      // }
    });
  },
  'image-on-bottom'(bm: any, c: any) {
    bm.add('image-on-bottom', {
      label: c.labelImageOnBottom,
      category: c.category,
      media: `
      <svg viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <rect x="3" y="9" width="18" height="10.37" rx="2" ry="2" style=""/>
  <circle cx="8.5" cy="12.5" r="1.5"/>
  <polyline points="21 16.017 18.203 13.723 12.052 18.771" style=""/>
  <polyline points="21.066 3.363 21.069 3.363 3 3.418" style=""/>
  <polyline points="21.033 6.386 21.036 6.386 2.967 6.441" style=""/>
</svg>
    `,
      content: [
        `<div style="margin: 10px;">
          <div> Another year is nearly over and we want to thank you for the trust and loyalty you place upon us. We hope you and your family have a great Christmas and a very Happy New Year.</div>
          <img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholder1col.png" width="100%" class="n-img" />
        </div>`
      ]
    });
  },
  'image-on-left'(bm: any, c: any) {
    bm.add('image-on-left', {
      label: c.labelImageOnLeft,
      category: c.category,
      media: `
      <svg viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <rect x="3.296" y="8" width="8.704" height="11.406" rx="2" ry="2" style=""/>
  <circle cx="7.5" cy="11.5" r="1.5"/>
  <polyline points="12 16.499 9.477 15 3.928 18.297" style=""/>
  <polyline points="20.578 9.919 20.579 9.919 14.47 9.949" style=""/>
  <polyline points="20.578 12.919 20.579 12.919 14.47 12.949" style=""/>
  <polyline points="20.578 15.919 20.579 15.919 14.47 15.949" style=""/>
  <polyline points="20.613 18.946 20.614 18.946 14.505 18.976" style=""/>
</svg>
    `,
      content: [
        `<div style="margin: 10px;">
        <table style="width:100%">
          <tr>
            <td width="50%"><img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholdercol3.png" width="100%" class="n-img" /></td>
            <td><div>Another year is nearly over and we want to thank you for the trust and loyalty you place upon us. We hope you and your family have a great Christmas and a very Happy New Year.</div></td>
          </tr>
        </table>
      </div>`
      ]
    });
  },
  'image-on-right'(bm: any, c: any) {
    bm.add('image-on-right', {
      label: c.labelImageOnRight,
      category: c.category,
      media: `
      <svg viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <rect x="12.296" y="8" width="8.704" height="11.406" rx="2" ry="2" style=""/>
  <circle cx="16.5" cy="11.5" r="1.5"/>
  <polyline points="21 16.499 18.477 15 12.928 18.297" style=""/>
  <polyline points="9.578 9.919 9.579 9.919 3.47 9.949" style=""/>
  <polyline points="9.578 12.919 9.579 12.919 3.47 12.949" style=""/>
  <polyline points="9.578 15.919 9.579 15.919 3.47 15.949" style=""/>
  <polyline points="9.613 18.946 9.614 18.946 3.505 18.976" style=""/>
</svg>
    `,
      content: [
        `<div style="margin: 10px;">
        <table style="width:100%">
          <tr>
            <td width="50%"><div>Another year is nearly over and we want to thank you for the trust and loyalty you place upon us. We hope you and your family have a great Christmas and a very Happy New Year.</div></td>
            <td><img data-gjs-type="n-image"  src="https://app-rsrc.getbee.io/public/resources/defaultrows/placeholdercol3.png" width="100%" class="n-img" /></td>
          </tr>
        </table>
      </div>`
      ]
    });
  },
  'click-action'(bm: any, c: any) {
    bm.add('click-action', {
      label: c.labelClickAction,
      category: c.category,
      media: `
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" style="fill: none; stroke-width: 1.2;" viewBox="-5 -5 34 34"><path d="M15.5 10h0a1.5 1.5 0 0 1 1.5 1.5v2.502M19.5 14v-1.5A1.5 1.5 0 0 0 18 11h0M14.172 14V8.5a1.5 1.5 0 0 0-1.5-1.5h0a1.5 1.5 0 0 0-1.5 1.5v7.625l-1.381-1.197c-.459-.689-1.922-.9-2.384-.389s-.572 1.363-.112 2.053c0 0 1.878 1.405 3.086 3.408s2.955 1.997 2.955 1.997H19s3-.075 3-4.943V14.5a1.5 1.5 0 0 0-1.5-1.5h0M22 9V2H2v9h5"></path></svg>
      `,
      // content: '<a>placeHolder</a>'
      content: {
        type: 'click-action'
      }
    });
  },
  'survey-url'(bm: any, c: any) {
    bm.add('survey-url', {
      label: c.labelSurvey,
      category: c.category,
      media: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 34 34" stroke="currentColor" style="fill: none; stroke-width: 1.2;"><path d="M16 3h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2m1-1h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm-1.998 9 .923 1L11 9m3 8h3m-3-6h3m-9.667 4h2.335c.184 0 .332.149.332.334v2.332a.332.332 0 0 1-.333.334H7.333A.332.332 0 0 1 7 17.666v-2.332c0-.185.148-.334.333-.334z"></path></svg>
      `,
      // content: '<a class="cta-button">Cta Button</a>',
      content: {
        type: 'survey-url'
      }
    });
  }
};
