import Tab from './tab';
import Tabs from './tabs';
import TabContent from './tab-content';
import TabContents from './tab-contents';
import TabContainer from './tab-container';

export default (editor: any, config: any) => {
  const dc = editor.DomComponents;
  const opts = {
    ...config,
    defaultModel: dc.getType('default').model,
    editor,
  };
  [Tab, Tabs, TabContent, TabContents, TabContainer].map((c) => c(dc, opts));
};
