import loadNavbar from './navbar';
import loadTabs from './tabs';
import loadCustomCode from './custom-code';
import loadTooltip from './tooltip';
import loadHeading from './heading';
import loadShapeDivider from './shape-divider';
import loadTable from './table';

import loadNImage from './n-image';
import loadNText from './n-text';
export default (editor: any, opt: any) => {
  console.log('LOAD COMPONENT');
  loadNavbar(editor, opt);
  loadTabs(editor, opt);
  loadCustomCode(editor, opt);
  loadTooltip(editor, opt);
  loadHeading(editor, opt);
  loadShapeDivider(editor, opt);
  loadTable(editor, opt);
  //loadCalendar(editor, opt);
  //loadCtaButton(editor, opt);
  // loadPersonalize(editor, opt);
  loadNImage(editor, opt);
  loadNText(editor, opt);
};
