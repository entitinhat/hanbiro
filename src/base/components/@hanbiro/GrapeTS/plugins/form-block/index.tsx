import grapesjs from 'grapesjs';

// import {
//   typeForm,
//   typeInput,
//   typeTextarea,
//   typeSelect,
//   typeCheckbox,
//   typeRadio,
//   typeButton,
//   typeLabel,
//   typeRow,
//   typeFile,
//   typeDate,
//   typeMutipleCheckbox,
//   typeField,
//   typeTermOfUse,
//   typeFormContainer,
//   typeResetButton,
//   typeSubmitButton,
//   typeNumber
// } from './constants';
// import loadComponents from './components';
import loadTraits from './traits';
// import loadBlocks from './blocks';

export default grapesjs.plugins.add('gts-blocks-form', (editor: any, opts = {}) => {
  // const config = {
  //   blocks: [
  //     // typeForm,
  //     typeInput,
  //     typeNumber,
  //     typeTextarea,
  //     typeSelect,
  //     typeCheckbox,
  //     typeMutipleCheckbox,
  //     typeRadio,
  //     typeButton,
  //     typeLabel,
  //     typeRow,
  //     typeFile,
  //     typeDate,
  //     typeField,
  //     typeTermOfUse,
  //     typeFormContainer,
  //     typeResetButton,
  //     typeSubmitButton
  //   ],
  //   category: 'Form',
  //   labelForm: 'Form',
  //   labelInput: 'Input',
  //   labelNumber: 'Number',
  //   labelTextarea: 'Textarea',
  //   labelSelect: 'Select',
  //   labelCheckbox: 'Checkbox',
  //   labelMutipleCheckbox: 'Mutiple Checkbox',
  //   labelField: 'Field',
  //   labelRadio: 'Radio',
  //   labelButton: 'Button',
  //   labelResetButton: 'Reset Button',
  //   labelSubmitButton: 'Submit Button',
  //   labelLabel: 'Label',
  //   labelRow: 'Form Row',
  //   labelFile: 'File',
  //   labelDate: 'Date',
  //   labelTermOfUse: 'Term of Use',
  //   labelPrivacyPolicy: 'Privacy Policy',
  //   labelFormContainer: 'Form Container',
  //   ...opts
  // };

  // //add components
  // loadComponents(editor, config);
  //add traits
  loadTraits(editor);
  //add blocks
  // loadBlocks(editor, config);
});
