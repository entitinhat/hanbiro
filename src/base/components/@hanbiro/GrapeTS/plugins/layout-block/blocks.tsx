// interface IPluginOption {
//   blocks: string[];
//   flexGrid: number;
//   stylePrefix: string;
//   addBasicStyle: boolean;
//   category: string;
//   labelColumn1: string;
//   labelColumn2: string;
//   labelColumn3: string;
//   labelColumn37: string;
//   labelColumn73: string;
//   rowHeight?: number;
// }

export default function (editor: any, opts: any) {
  const c = opts;
  let bm = editor.BlockManager;
  let { blocks, stylePrefix, flexGrid, rowHeight, labelRow, labelColumn } = c;
  const basicStyle = c.addBasicStyle;
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
  const clsSection = `${stylePrefix}section`;
  const clsHeader = `${stylePrefix}header`;
  const clsFooter = `${stylePrefix}footer`;
  const clsContainer = `${stylePrefix}container`;

  const styleRow = flexGrid
    ? `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
      overflow: auto;
    }
    @media (max-width: 768px) {
      .${clsRow} {
        flex-wrap: wrap;
      }
    }`
    : `
    .${clsRow} {
      display: table;
      padding: 10px;
      width: 100%;
    }
    @media (max-width: 768px) {
      .${stylePrefix}cell, .${stylePrefix}cell30, .${stylePrefix}cell70 {
        width: 100%;
        display: block;
      }
    }`;

  const styleClm = flexGrid
    ? `
    .${clsCell} {
      min-height: ${rowHeight}px;
      flex-grow: 1;
      flex-basis: 100%;
    }`
    : `
    .${clsCell} {
      width: 8%;
      display: table-cell;
      height: ${rowHeight}px;
    }`;

  const styleClm30 = `
    .${stylePrefix}cell30 {
      width: 30%;
    }`;

  const styleClm70 = `
    .${stylePrefix}cell70 {
      width: 70%;
    }`;

  const sectionHeight = rowHeight * 2; //background-color:#fafafa;
  const styleSection = `
    .${clsSection} {
      min-height: ${sectionHeight}px;
    }`;

  const styleHeader = `
    .${clsHeader} {
      min-height: ${sectionHeight}px;
    }`;

  const styleFooter = `
    .${clsFooter} {
      min-height: ${sectionHeight}px;
    }`;

  const styleContainer = `
    .${clsContainer} {
      min-height: ${50}px;
    }`;

  const step = 0.2;
  const minDim = 1;
  const currentUnit = 1;
  const resizerBtm = {
    tl: 0,
    tc: 0,
    tr: 0,
    cl: 0,
    cr: 0,
    bl: 0,
    br: 0,
    minDim
  };

  const resizerRight: any = {
    ...resizerBtm,
    cr: 1,
    bc: 0,
    currentUnit,
    minDim,
    step
  };

  // Flex elements do not react on width style change therefore I use
  // 'flex-basis' as keyWidth for the resizer on columns
  if (flexGrid) {
    resizerRight.keyWidth = 'flex-basis';
  }

  const rowAttr: any = {
    class: clsRow,
    'data-gjs-droppable': `.${clsCell}`,
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': labelRow
    //'data-gjs-custom-name': labelRow,
  };

  const colAttr: any = {
    class: clsCell,
    'data-gjs-draggable': `.${clsRow}`,
    'data-gjs-resizable': resizerRight,
    'data-gjs-name': labelColumn
    //'data-gjs-custom-name': labelColumn,
  };

  if (flexGrid) {
    colAttr['data-gjs-unstylable'] = ['width'];
    colAttr['data-gjs-stylable-require'] = ['flex-basis'];
  }

  const sectionAttr: any = {
    class: clsSection,
    'data-gjs-type': 'default',
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': c.labelSection
    //'data-gjs-custom-name': 'Section',
  };

  const headerAttr: any = {
    class: clsHeader,
    'data-gjs-type': 'default',
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': c.labelHeader
  };

  const footerAttr: any = {
    class: clsFooter,
    'data-gjs-type': 'default',
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': c.labelFooter
  };

  const containerAttr: any = {
    class: clsContainer,
    'data-gjs-type': 'default',
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': c.labelContainer
  };

  // Make row and column classes private
  const privateCls = [`.${clsRow}`, `.${clsCell}`, `.${clsSection}`, `.${clsHeader}`, `.${clsFooter}`, `.${containerAttr}`];

  editor.on('selector:add', (selector: any) => privateCls.indexOf(selector.getFullName()) >= 0 && selector.set('private', 1));

  const attrsToString = (attrs: any) => {
    const result = [];

    for (let key in attrs) {
      let value = attrs[key];
      const toParse = value instanceof Array || value instanceof Object;
      value = toParse ? JSON.stringify(value) : value;
      result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`);
    }

    return result.length ? ` ${result.join(' ')}` : '';
  };

  const toAdd = (name: string) => blocks.indexOf(name) >= 0;
  const attrsRow = attrsToString(rowAttr);
  const attrsCell = attrsToString(colAttr);
  const attrsSection = attrsToString(sectionAttr);
  const attrsHeader = attrsToString(headerAttr);
  const attrsFooter = attrsToString(footerAttr);
  const attrsContainer = attrsToString(containerAttr);

//===================================================Column layout================================================

  toAdd('column1') &&
    bm.add('column1', {
      label: c.labelColumn1,
      category: c.category,
      //attributes: { class: 'gjs-fonts gjs-f-b1' },
      media: `
      <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 28 28" style="fill: none; stroke-width: 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22,20H2V4h20V20z"></path>
      </svg>
    `,
      content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
          : ''
      }`
    });

  toAdd('column2') &&
    bm.add('column2', {
      label: c.labelColumn2,
      //attributes: { class: 'gjs-fonts gjs-f-b2' },
      category: c.category,
      media: `
      <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 28 28" stroke="currentColor" style="fill: none; stroke-width: 1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10,20H2V4h8V20z M22,4h-8v16h8V4z"></path>
      </svg>
    `,
      content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
          : ''
      }`
    });

  toAdd('column3') &&
    bm.add('column3', {
      label: c.labelColumn3,
      category: c.category,
      //attributes: { class: 'gjs-fonts gjs-f-b3' },
      media: `
      <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 28 28" stroke="currentColor" style="fill: none; stroke-width: 1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6,20H2V4h4V20z M14,4h-4v16h4V4z M22,4h-4v16h4V4z"></path>
      </svg>
    `,
      content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
        </style>`
          : ''
      }`
    });

  toAdd('column3-7') &&
    bm.add('column3-7', {
      label: c.labelColumn37,
      category: c.category,
      //attributes: { class: 'gjs-fonts gjs-f-b37' },
      media: `
      <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 28 28" stroke="currentColor" style="fill: none; stroke-width: 1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8,20H2V4h6V20z M22,4H12v16h10V4z"></path>
      </svg>
    `,
      content: `<div ${attrsRow}>
        <div ${attrsCell} style='${flexGrid ? 'flex-basis' : 'width'}: 30%;'></div>
        <div ${attrsCell} style='${flexGrid ? 'flex-basis' : 'width'}: 70%;'></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm30}
          ${styleClm70}
        </style>`
          : ''
      }`
    });

  toAdd('column7-3') &&
    bm.add('column7-3', {
      label: c.labelColumn73,
      category: c.category,
      media: `
      <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 28 28" stroke="currentColor" style="fill: none; stroke-width: 1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16,4h6v16h-6V4z M2,20h10V4 H2V20z"></path>
      </svg>
    `,
      content: `<div ${attrsRow}>
        <div ${attrsCell} style='${flexGrid ? 'flex-basis' : 'width'}: 70%;'></div>
        <div ${attrsCell} style='${flexGrid ? 'flex-basis' : 'width'}: 30%;'></div>
      </div>
      ${
        basicStyle
          ? `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm30}
          ${styleClm70}
        </style>`
          : ''
      }`
    });



    ///==============================================================================================================
  toAdd('header') &&
    bm.add('header', {
      label: c.labelHeader,
      category: c.category,
      media: `
      <svg viewBox="-2 -3 28 28" xmlns="http://www.w3.org/2000/svg" style="stroke-width: 1">
        <path d="M17.7446 1.99582C18.9355 1.99582 19.9103 2.92098 19.9894 4.09177L19.9946 4.24582V19.7439C19.9946 20.9347 19.0695 21.9095 17.8987 21.9887L17.7446 21.9939H6.24475C5.05389 21.9939 4.07911 21.0687 3.99994 19.8979L3.99475 19.7439V4.24582C3.99475 3.05495 4.91991 2.08017 6.0907 2.00101L6.24475 1.99582H17.7446ZM17.7446 3.49582H6.24475C5.86506 3.49582 5.55126 3.77797 5.5016 4.14405L5.49475 4.24582V19.7439C5.49475 20.1236 5.77691 20.4374 6.14298 20.487L6.24475 20.4939H17.7446C18.1243 20.4939 18.4381 20.2117 18.4878 19.8457L18.4946 19.7439V4.24582C18.4946 3.86612 18.2125 3.55233 17.8464 3.50267L17.7446 3.49582Z" />
        <path d="M7 6.75001C7 5.78351 7.7835 5.00001 8.75 5.00001H15.25C16.2165 5.00001 17 5.78351 17 6.75001V8.25001C17 9.2165 16.2165 10 15.25 10H8.75C7.7835 10 7 9.2165 7 8.25001V6.75001ZM8.75 6.50001C8.61193 6.50001 8.5 6.61193 8.5 6.75001V8.25001C8.5 8.38808 8.61193 8.50001 8.75 8.50001H15.25C15.3881 8.50001 15.5 8.38808 15.5 8.25001V6.75001C15.5 6.61193 15.3881 6.50001 15.25 6.50001H8.75Z" />
      </svg>
    `,
      content: `
      <header ${attrsHeader}>
      </header>
      <style>
        ${styleHeader}
      </style>
    `
    });

  toAdd('section') &&
    bm.add('section', {
      label: c.labelSection,
      category: c.category,
      media: `
      <svg viewBox="-2 -3 20 20" xmlns="http://www.w3.org/2000/svg" style="fill: none; stroke-width: 1">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 1.5C2 1.77614 1.77614 2 1.5 2C1.22386 2 1 1.77614 1 1.5C1 1.22386 1.22386 1 1.5 1C1.77614 1 2 1.22386 2 1.5ZM2 5L2 10H13V5H2ZM2 4C1.44772 4 1 4.44772 1 5V10C1 10.5523 1.44772 11 2 11H13C13.5523 11 14 10.5523 14 10V5C14 4.44772 13.5523 4 13 4H2ZM1.5 14C1.77614 14 2 13.7761 2 13.5C2 13.2239 1.77614 13 1.5 13C1.22386 13 1 13.2239 1 13.5C1 13.7761 1.22386 14 1.5 14ZM4 1.5C4 1.77614 3.77614 2 3.5 2C3.22386 2 3 1.77614 3 1.5C3 1.22386 3.22386 1 3.5 1C3.77614 1 4 1.22386 4 1.5ZM3.5 14C3.77614 14 4 13.7761 4 13.5C4 13.2239 3.77614 13 3.5 13C3.22386 13 3 13.2239 3 13.5C3 13.7761 3.22386 14 3.5 14ZM6 1.5C6 1.77614 5.77614 2 5.5 2C5.22386 2 5 1.77614 5 1.5C5 1.22386 5.22386 1 5.5 1C5.77614 1 6 1.22386 6 1.5ZM5.5 14C5.77614 14 6 13.7761 6 13.5C6 13.2239 5.77614 13 5.5 13C5.22386 13 5 13.2239 5 13.5C5 13.7761 5.22386 14 5.5 14ZM8 1.5C8 1.77614 7.77614 2 7.5 2C7.22386 2 7 1.77614 7 1.5C7 1.22386 7.22386 1 7.5 1C7.77614 1 8 1.22386 8 1.5ZM7.5 14C7.77614 14 8 13.7761 8 13.5C8 13.2239 7.77614 13 7.5 13C7.22386 13 7 13.2239 7 13.5C7 13.7761 7.22386 14 7.5 14ZM10 1.5C10 1.77614 9.77614 2 9.5 2C9.22386 2 9 1.77614 9 1.5C9 1.22386 9.22386 1 9.5 1C9.77614 1 10 1.22386 10 1.5ZM9.5 14C9.77614 14 10 13.7761 10 13.5C10 13.2239 9.77614 13 9.5 13C9.22386 13 9 13.2239 9 13.5C9 13.7761 9.22386 14 9.5 14ZM12 1.5C12 1.77614 11.7761 2 11.5 2C11.2239 2 11 1.77614 11 1.5C11 1.22386 11.2239 1 11.5 1C11.7761 1 12 1.22386 12 1.5ZM11.5 14C11.7761 14 12 13.7761 12 13.5C12 13.2239 11.7761 13 11.5 13C11.2239 13 11 13.2239 11 13.5C11 13.7761 11.2239 14 11.5 14ZM14 1.5C14 1.77614 13.7761 2 13.5 2C13.2239 2 13 1.77614 13 1.5C13 1.22386 13.2239 1 13.5 1C13.7761 1 14 1.22386 14 1.5ZM13.5 14C13.7761 14 14 13.7761 14 13.5C14 13.2239 13.7761 13 13.5 13C13.2239 13 13 13.2239 13 13.5C13 13.7761 13.2239 14 13.5 14Z"
          fill="currentColor"
        />
    </svg>
    `,
      content: `
      <section ${attrsSection}>
      </section>
      <style>
        ${styleSection}
      </style>
    `
    });

  toAdd('footer') &&
    bm.add('footer', {
      label: c.labelFooter,
      category: c.category,
      media: `
      <svg viewBox="-2 -3 28 28" xmlns="http://www.w3.org/2000/svg" style="stroke-width: 1">
        <path d="M17.7446 1.99581C18.9355 1.99581 19.9103 2.92097 19.9894 4.09176L19.9946 4.24581V19.7439C19.9946 20.9347 19.0695 21.9095 17.8987 21.9887L17.7446 21.9939H6.24475C5.05389 21.9939 4.07911 21.0687 3.99994 19.8979L3.99475 19.7439V4.24581C3.99475 3.05495 4.91991 2.08017 6.0907 2.001L6.24475 1.99581H17.7446ZM17.7446 3.49581H6.24475C5.86506 3.49581 5.55126 3.77797 5.5016 4.14404L5.49475 4.24581V19.7439C5.49475 20.1236 5.77691 20.4374 6.14298 20.487L6.24475 20.4939H17.7446C18.1243 20.4939 18.4381 20.2117 18.4878 19.8456L18.4946 19.7439V4.24581C18.4946 3.86612 18.2125 3.55232 17.8464 3.50266L17.7446 3.49581Z"/>
        <path d="M7 15.75V17.25C7 18.2165 7.7835 19 8.75 19H15.25C16.2165 19 17 18.2165 17 17.25V15.75C17 14.7835 16.2165 14 15.25 14H8.75C7.7835 14 7 14.7835 7 15.75ZM8.75 15.5H15.25C15.3881 15.5 15.5 15.6119 15.5 15.75V17.25C15.5 17.3881 15.3881 17.5 15.25 17.5H8.75C8.61193 17.5 8.5 17.3881 8.5 17.25V15.75C8.5 15.6119 8.61193 15.5 8.75 15.5Z"/>
      </svg>
    `,
      content: `
      <footer ${attrsFooter}>
      </footer>
      <style>
        ${styleFooter}
      </style>
    `
    });

  toAdd('container') &&
    bm.add('container', {
      label: c.labelContainer,
      category: c.category,
      media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -9 50 50" style="stroke-width: 1">
        <path d="M0,0v35h35V0H0z M33,33H2V2h31V33z"/>
        <rect x="10" y="9.5" width="15" height="15"/>
      </svg>
    `,
      content: `
      <div ${attrsContainer}>
      </div>
      <style>
        ${styleContainer}
      </style>
    `
    });

  // toAdd('flexbox') &&
  //   bm.add('flexbox', {
  //     label: c.labelFlexbox,
  //     category: c.category,
  //     attributes: { class: 'gjs-fonts gjs-f-b2' },
  //     content: `
  //       <div ${attrsRow}>
  //         <div ${attrsCell}></div>
  //         <div ${attrsCell}></div>
  //       </div>
  //       <style>
  //         ${styleRow}
  //         ${styleClm}
  //       </style>
  //       `,
  //   });
}
