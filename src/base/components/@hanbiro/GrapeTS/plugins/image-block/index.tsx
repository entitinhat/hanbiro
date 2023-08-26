import grapesjs from 'grapesjs';

import loadBlocks from './blocks';
import loadComponents from './components';

export default grapesjs.plugins.add('gts-blocks-image', (editor: any, opts: any) => {
  const config = {
    blocks: ['image-only', 'image-on-top', 'image-on-bottom', 'image-on-left', 'image-on-right'],
    category: 'Image Type',
    labelImageOnly: 'Image Only',
    labelImageOnTop: 'Image on top',
    labelImageOnBottom: 'Image on bottom',
    labelImageOnLeft: 'Image on left',
    labelImageOnRight: 'Image on right',
    //other options
    ...opts
  };
  if (opts?.blocks.length > 0) {
    config.blocks = opts?.blocks;
  }
  //Add blocks
  loadBlocks(editor, config);
  //add components
  //loadComponents(editor, config);
});
