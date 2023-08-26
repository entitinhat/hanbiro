export default {
  // Object to extend the default table block, eg. `{ label: 'table', attributes: { ... } }`
  tableLabel: 'Table',

  // Pass a falsy value to avoid adding the block
  tableBlock: {},

  // Object to extend the default accordions properties, eg. `{ name: 'Table', droppable: false,row: 3,columns: 3, ... }`
  tableProps: {
    rows: 3,
    columns: 3,
    header: true,
    footer: true,
  },

  // Object to extend the default table body properties, eg. `{ name: 'tbody', ... }`
  bodyProps: {},

  // Object to extend the default table head properties
  headProps: {},

  // Object to extend the default table footer properties
  footerProps: {},

  // Table attribute identifier (main component)
  attrTable: 'data-table',

  // Table Body attribute identifier
  attrTableBody: 'data-tbody',

  // Table Footer content attribute identifier
  attrTableFooter: 'data-tfoot',

  // Table Header container attribute identifier
  attrTableHeader: 'data-thead',

  // Table Cell container attribute identifier
  attrTableCell: 'data-cell',

  // Default class to use on table
  classTable: 'table',

  // Default class to use on table body
  classTableBody: 'table-body',

  // Default class to use on table footer
  classTableFooter: 'table-footer',

  // Default class to use on table header
  classTableHeader: 'table-header',

  // Default class to use on table header
  classTableCell: 'table-cell',

  tableStyle: `
    table {
      width: 100%;
      border: 1px solid #cccccc;
      margin-bottom: 20px;
    }
    table td {
      padding: 8px;
      border: 1px solid #cccccc;
    }
  `,
};
