import grapesjs from 'grapesjs';

import pluginLayout from './layout-block';
import pluginBasic from './basic-block';
import pluginForm from './form-block';
import pluginShortenUrl from './shorten-url-block';
import pluginFilter from './style-filter';
import pluginExport from './export';
import pluginImageEditor from './image-editor';
import pluginImage from './image-block';

import panels from '../panels';
import commands from '../commands';
import styles from '../styles';
import richtext from '../rich-text-editor';
//import components from '../components';

export default grapesjs.plugins.add('gts-form-webpage', (editor: any, opts: {}) => {
  let config: any = opts;
  console.log('plugins opts', opts);

  let defaults: any = {
    // Which blocks to add
    blocks: [],
    // Modal import title
    modalImportTitle: 'Import template',

    // Modal import button text
    modalImportButton: 'Import',

    // Import description inside import modal
    modalImportLabel: 'Paste all your code here below and click import',

    // Default content to setup on import model open.
    // Could also be a function with a dynamic content return (must be a string)
    // eg. modalImportContent: editor => editor.getHtml(),
    modalImportContent: '',

    modalExportTitle: 'Export template',
    modalExportLabel: 'Copy the code and use it wherever you want',

    // Code viewer (eg. CodeMirror) options
    importViewerOptions: {},

    // Confirm text before cleaning the canvas
    textClearTitle: 'Clear content',
    textCleanCanvas: 'Are you sure to clear all content? (You cannot undo for this action)',

    // Show the Style Manager on component change
    showStylesOnChange: 1,

    // Text for General sector in Style Manager
    textGeneral: 'General',

    // Text for Layout sector in Style Manager
    textLayout: 'Layout',

    // Text for Typography sector in Style Manager
    textTypography: 'Typography',

    // Text for Decorations sector in Style Manager
    textDecorations: 'Decorations',

    // Text for Extra sector in Style Manager
    textExtra: 'Extra',

    // Text for Extra sector in Style Manager
    textFlex: 'Flex',

    //panels option
    panelOpts: {
      cmdBtnDesktopLabel: 'Desktop',
      cmdBtnTabletLabel: 'Tablet',
      cmdBtnMobileLabel: 'Mobile',
      cmdBtnViewComLabel: 'View components',
      cmdBtnPreviewLabel: 'Preview',
      cmdBtnFullScreenLabel: 'Fullscreen',
      cmdBtnViewCodeLabel: 'View code',
      cmdBtnUndoLabel: 'Undo',
      cmdBtnRedoLabel: 'Redo',
      cmdBtnExportZipLabel: 'Export zip',
      cmdBtnImportLabel: 'Import template',
      cmdBtnClearLabel: 'Clear content'
    },

    // Use custom set of sectors for the Style Manager
    customStyleManager: [],

    // By setting this option to `false` will avoid loading the plugin
    blocksLayoutOpts: config.config?.plugins?.layout ?? null,

    // By setting this option to `false` will avoid loading the plugin
    blocksBasicOpts: config.config?.plugins?.basic ?? null,

    // By setting this option to `false` will avoid loading the plugin
    formsOpts: true,

    // By setting this option to `false` will avoid loading the plugin
    shortenUrlOpts: config.config?.plugins?.shortenUrl ?? null,

    // By setting this option to `false` will avoid loading the plugin
    imageOpts: config.config?.plugins?.image ?? null,

    // By setting this option to `false` will avoid loading the plugin
    exportOpts: {},

    // By setting this option to `false` will avoid loading the plugin
    imgEditorOpts: {}
  };

  // Load defaults
  for (let name in defaults) {
    if (!(name in config)) config[name] = defaults[name];
  }

  const { blocksLayoutOpts, blocksBasicOpts, formsOpts, shortenUrlOpts, exportOpts, imgEditorOpts, imageOpts } = config;

  // Load plugins
  // console.log('plugins config', blocksBasicOpts);

  blocksLayoutOpts && pluginLayout(editor, blocksLayoutOpts);
  if (config?.templateType == 'full') {
    pluginBasic(editor, { ...blocksBasicOpts, templateType: config?.templateType });
    pluginShortenUrl(editor, { ...shortenUrlOpts, templateType: config?.templateType });
    pluginImage(editor, { ...imageOpts, templateType: config?.templateType });
    pluginForm(editor, { ...formsOpts, templateType: config?.templateType });
    pluginFilter(editor);
    pluginExport(editor, exportOpts);
    pluginImageEditor(editor, imgEditorOpts);
  } else {
    blocksBasicOpts && pluginBasic(editor, { ...blocksBasicOpts, templateType: config?.templateType });
    shortenUrlOpts && pluginShortenUrl(editor, { ...shortenUrlOpts, templateType: config?.templateType });
    imageOpts && pluginImage(editor, { ...imageOpts, templateType: config?.templateType });
    formsOpts && pluginForm(editor, { ...formsOpts, templateType: config?.templateType });
    pluginFilter(editor);
    exportOpts && pluginExport(editor, exportOpts);
    imgEditorOpts && pluginImageEditor(editor, imgEditorOpts);
  }

  // Load commands
  commands(editor, config);

  // Load panels
  panels(editor, config);

  // Load styles
  styles(editor, config);

  //load richtext
  richtext(editor, config);
});
