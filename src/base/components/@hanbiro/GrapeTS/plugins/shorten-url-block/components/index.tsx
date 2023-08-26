import loadClickAction from './click-action';
import loadSurveyUrl from './survey-url';

export default (editor: any, opt: any) => {
  loadClickAction(editor, opt);
  loadSurveyUrl(editor, opt);
};
