import loadImageOnly from './image-only';
import loadImageOnTop from './image-on-top';

export default (editor: any, opt: any) => {
  loadImageOnly(editor, opt);
  loadImageOnTop(editor, opt);
};
