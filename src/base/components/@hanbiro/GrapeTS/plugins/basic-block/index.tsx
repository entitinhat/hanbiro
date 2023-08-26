import grapesjs from 'grapesjs';

import loadBlocks from './blocks';
import loadComponents from './components/index';
import loadFormSelectComponents from './components/FormSelect';

import loadCommands from './commands/index';
import loadListeners from './listeners';
import loadTraits from './traits';

import { hNavbarType, tabsType, customCodeType } from './constants';

import tabOptions from './configs/tab-options';
import basicOptions from './configs/basic-options';
import navOptions from './configs/nav-options';
import codeOptions from './configs/code-options';
import tooltipOptions from './configs/tooltip-options';
import headingOptions from './configs/heading-options';
import dividerOptions from './configs/divider-options';
import tableOptions from './configs/table-options';
import loadFormComponents from '../form-block/components';
// import loadFormBlocks from '../form-block/blocks';

import {
  typeForm,
  typeInput,
  typeTextarea,
  typeSelect,
  typeCheckbox,
  typeRadio,
  typeButton,
  typeLabel,
  typeRow,
  typeFile,
  typeDate,
  typeMutipleCheckbox,
  typeField,
  typeTermOfUse,
  typeFormContainer,
  typeNumber,
  typePrivacyPolicy,
  typeSubmitButton,
  typeResetButton
} from '../form-block/constants';

export default grapesjs.plugins.add('gts-blocks-basic', (editor: any, opts: any) => {
  const config: any = {
    blocks: [
      //'short-text',
      'heading',
      'text-line',
      'paragraph',
      'text-section',
      'divider',
      'shape-divider',
      'link-button',
      'link',
      'image',
      'video',
      'map',
      'link-block',
      'quote',
      'tooltip',
      hNavbarType,
      tabsType,
      customCodeType,
      'table',
      'list-items',
      'grid-items',
      'personalize',
      'form',
      //'calendar',
      'event',
      'survey-form',
      'option-set',
      'social-share',
      'download-link',
      'address',
      'package',
      'coupon',
      'button',
      'space',
      'html',
      'icon',
      typeInput,
      typeTextarea,
      typeSelect,
      typeCheckbox,
      typeMutipleCheckbox,
      typeRadio,
      typeButton,
      typeLabel,
      typeRow,
      typeFile,
      typeDate,
      typeField,
      typeTermOfUse,
      typeFormContainer,
      typeNumber,
      typeSubmitButton,
      typeResetButton,
      typePrivacyPolicy
    ],
    templateBlocks: [],
    category: opts?.category ?? 'Element',
    //basic options
    ...basicOptions,
    //navbar options
    ...navOptions,
    //tab options
    ...tabOptions,
    //custom code options
    ...codeOptions,
    //tooltip options
    ...tooltipOptions,
    //heading options
    ...headingOptions,
    //shape divider options
    ...dividerOptions,
    //table options
    ...tableOptions,
    //other options,  category: 'Form',
    labelForm: 'Form',
    labelInput: 'Input',
    labelNumber: 'Number',
    labelTextarea: 'Textarea',
    labelSelect: 'Select',
    labelCheckbox: 'Checkbox',
    labelMutipleCheckbox: 'Mutiple Checkbox',
    labelField: 'Field',
    labelRadio: 'Radio',
    labelButton: 'Button',
    labelLabel: 'Label',
    labelRow: 'Form Row',
    labelFile: 'File',
    labelDate: 'Date',
    labelTermOfUse: 'Term of Use',
    labelPrivacyPolicy: 'Privacy Policy',
    labelFormContainer: 'Sample Form',
    labelResetButton: 'Reset Button',
    labelSubmitButton: 'Submit Button',
    ...opts
  };
  //// console.log('block config', opts);

  //custom blocks by template type
  // if (opts.templateType === 'full') {
  //   config.templateBlocks = [
  //     'heading',
  //     'text-line',
  //     'line',
  //     //'image',
  //     'n-image',
  //     'link-button',
  //     'divider',
  //     'space',
  //     'list-items',
  //     'table',
  //     'personalize',
  //     'form',
  //     customCodeType, //html
  //     'icon'
  //   ];
  // }
  console.log('opts basic block', opts);
  console.log('whyy ', opts?.blocks.length);
  if (opts?.blocks.length > 0) {
    config.blocks = opts?.blocks;
  }
  // console.log('basic config', config);
  //add listeners
  loadListeners(editor, config);

  //Add blocks
  loadBlocks(editor, config);
  //add form blocks
  // loadFormBlocks(editor, config);

  //add components
  loadComponents(editor, config);
  //  //add form components
  loadFormComponents(editor, config);
  //add formSelect components
  loadFormSelectComponents(editor, config);

  //add commands
  loadCommands(editor, config);
  //add traits
  loadTraits(editor);
});
