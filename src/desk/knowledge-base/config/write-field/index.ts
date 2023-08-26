import * as keyNames from '@desk/knowledge-base/config/keyNames';
import validators from '@base/utils/validation/fieldValidator';
import * as components from './components';
import { TextField } from '@mui/material';
import { GRAPEJS_TEMPLATE_TYPE_DESK_KB } from '@base/components/@hanbiro/GrapeTS/config/constants';

const writeConfig = {
  [keyNames.KEY_KNOWLEDGE_BASE_SUBJECT]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    defaultValue: '',
    showFullRow: true,
    validate: {
      required: validators.required
    }
  },
  [keyNames.KEY_KNOWLEDGE_BASE_CATEGORY]: {
    component: components.CategoryFolderSelect,
    componentProps: { addFolder: true },
    validate: {
      required: validators.required
    },
    defaultValue: null,
    showFullRow: true,
    parseParam: (value: any) => {
      //check CATEGORY or FOLDER
      return value;
    }
  },
  [keyNames.KEY_KNOWLEDGE_BASE_CONTENT]: {
    component: components.EditorTemplateResponsive,
    componentProps: {
      templateGroup: 'GROUP_KNOWLEDGE',
      templateType: GRAPEJS_TEMPLATE_TYPE_DESK_KB
    },
    validate: {},
    showFullRow: true,
    defaultValue: {
      tpl: null,
      content: ''
    },
    parseParam: (value: any) => {
      return value
        ? value
        : {
            tpl: null,
            content: ''
          };
    }
  },
  [keyNames.KEY_KNOWLEDGE_BASE_TAG]: {
    component: components.Tags,
    componentProps: {
      fieldValue: 'id',
      fieldLabel: 'name'
    },
    validate: {},
    defaultValue: [],
    showFullRow: true,
    parseParam: (value: any) => {
      return value ? value : [];
    }
  },
  [keyNames.KEY_KNOWLEDGE_BASE_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 2
    },
    showFullRow: true
  }
};
export default writeConfig;
