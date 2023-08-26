import Table from './table';
import TableBody from './table-body';
import TableHead from './table-head';
import TableFooter from './table-footer';
import TableCell from './table-cell';

export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  config.modal = editor.Modal;

  TableFooter(domc, config);
  TableHead(domc, config);
  TableBody(domc, config);
  Table(domc, config);
  TableCell(domc, config);
};
