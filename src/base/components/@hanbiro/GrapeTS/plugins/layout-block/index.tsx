import grapesjs from 'grapesjs';
import loadBlocks from './blocks';
import loadComponents from './components';

export default grapesjs.plugins.add('gts-blocks-layout', (editor: any, opts: any) => {
  const config = {
    blocks: ['column1', 'column2', 'column3', 'column3-7', 'column7-3', 'section', 'container', 'header', 'footer'], //'flexbox'
    flexGrid: 1,
    stylePrefix: 'lout-',
    addBasicStyle: true,
    // Use this to extend the default flexbox block
    flexboxBlock: {},
    category: 'Layout',
    labelRow: 'Row',
    labelColumn: 'Column',
    labelColumn1: '1 Column',
    labelColumn2: '2 Columns',
    labelColumn3: '3 Columns',
    labelColumn37: '2 Columns 3/7',
    labelColumn73: '2 Columns 7/3',
    labelFlexbox: 'Flexbox',
    labelSection: 'Section',
    labelHeader: 'Header',
    labelFooter: 'Footer',
    labelContainer: 'Container',
    rowHeight: 75,
    ...opts
  };
  if (opts?.blocks.length > 0) {
    config.blocks = opts?.blocks;
  }
  // add components
  loadComponents(editor, config);
  // Add blocks
  loadBlocks(editor, config);
});
