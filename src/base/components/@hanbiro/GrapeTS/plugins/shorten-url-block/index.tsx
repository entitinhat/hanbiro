import grapesjs from 'grapesjs';

import loadBlocks from './blocks';
import loadComponents from './components';
import loadCommands from './commands/index';

export default grapesjs.plugins.add('gts-blocks-shorten-url', (editor: any, opts: any) => {
  const config = {
    blocks: ['click-action', 'survey-url'],
    category: 'Simple URL Shortener',
    labelClickAction: 'Click to Action',
    labelSurvey: 'Survey',
    //other options
    ...opts
  };
  if (opts?.blocks.length > 0) {
    config.blocks = opts?.blocks;
  }
  //Add blocks
  loadBlocks(editor, config);
  //add components
  loadComponents(editor, config);
  //add commands
  loadCommands(editor, config);
});
