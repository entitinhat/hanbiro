import loadCustomCode from './custom-code';
import loadTable from './table';

export default (editor: any, opt: any) => {
  loadCustomCode(editor, opt);
  loadTable(editor, opt);
};
