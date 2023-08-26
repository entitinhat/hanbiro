
import loadPersonalize from './personalize';
import loadForm from './form';

export default (editor: any, opt: any) => {
  loadForm(editor, opt);
  loadPersonalize(editor, opt);
};
