
const layoutConfig = {
  blocks: ['column1', 'column2', 'column3', 'column3-7', 'column7-3', 'section', 'container', 'header', 'footer'],
  flexGrid: 1,
  stylePrefix: 'form-',
  addBasicStyle: true,
  flexboxBlock: {},
  category: 'Layout',
  labelRow: 'Row',
  labelColumn: 'Column',
  labelColumn1: '1 Column',
  labelColumn2: '2 Columns',
  labelColumn3: '3 Columns',
  labelColumn37: '2 Columns 3/7',
  labelColumn73: '2 Columns 7/3',
  labelFlexbox: 'Flexbox',
  labelSection: 'Section',
  labelHeader: 'Header',
  labelFooter: 'Footer',
  labelContainer: 'Container',
  rowHeight: 75
};

/**
 * Get Layout Component from layout type
 * @param layout: column1|comlumn2|comlumn3|column3-7|column7-7
 * @param components: optional if you want pass child components into
 * @returns components
 */
export const getLayOutContent = (layout: string, components?: any) => {
  let { blocks, stylePrefix, flexGrid, rowHeight, labelRow, labelColumn } = layoutConfig;
  const basicStyle = layoutConfig.addBasicStyle;
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
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

  const step = 1;
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
    // 'data-gjs-draggable': `.${clsRow}`,
    // 'data-gjs-resizable': resizerRight,
    // 'data-gjs-name': labelColumn,
    name: labelColumn,
    resizable: resizerRight,
    draggable: `.${clsRow}`,
    components: components ? components : []
    //'data-gjs-custom-name': labelColumn,
  };

  if (flexGrid) {
    colAttr['data-gjs-unstylable'] = ['width'];
    colAttr['data-gjs-stylable-require'] = ['flex-basis'];
  }
  // const attrsToString = (attrs: any) => {
  //   const result = [];

  //   for (let key in attrs) {
  //     let value = attrs[key];
  //     const toParse = value instanceof Array || value instanceof Object;
  //     value = toParse ? JSON.stringify(value) : value;
  //     result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`);
  //   }

  //   return result.length ? ` ${result.join(' ')}` : '';
  // };
  // const attrsRow = attrsToString(rowAttr);
  // const attrsCell = attrsToString(colAttr);

  switch (layout) {
    case 'column1':
      return [
        {
          type: 'default',
          ...colAttr,
          styles: `${styleClm}`,
          attributes: { class: clsCell }
        }
      ];

    case 'column2':
      return [
        { type: 'default', ...colAttr, styles: `${styleClm}`, attributes: { class: clsCell } },
        { type: 'default', ...colAttr, styles: `${styleClm}`, attributes: { class: clsCell } }
      ];

    case 'column3':
      return [
        { type: 'default', ...colAttr, styles: `${styleClm}`, attributes: { class: clsCell } },
        { type: 'default', ...colAttr, styles: `${styleClm}`, attributes: { class: clsCell } },
        { type: 'default', ...colAttr, styles: `${styleClm}`, attributes: { class: clsCell } }
      ];

    case 'column3-7':
      return [
        {
          type: 'default',
          ...colAttr,
          style: flexGrid ? { 'flex-basis': '30%' } : { width: '30%' },
          styles: `${styleClm} ${styleClm30}`,
          attributes: { class: clsCell }
        },
        {
          type: 'default',
          ...colAttr,
          style: flexGrid ? { 'flex-basis': '70%' } : { width: '70%' },
          styles: `${styleClm} ${styleClm70}`,
          attributes: { class: clsCell }
        }
      ];
    case 'column7-3':
      return [
        {
          type: 'default',
          ...colAttr,
          style: flexGrid ? { 'flex-basis': '70%' } : { width: '70%' },
          styles: `${styleClm} ${styleClm30}`,
          attributes: { class: clsCell }
        },
        {
          type: 'default',
          ...colAttr,
          style: flexGrid ? { 'flex-basis': '30%' } : { width: '30%' },
          styles: `${styleClm} ${styleClm70}`,
          attributes: { class: clsCell }
        }
      ];
  }
};
