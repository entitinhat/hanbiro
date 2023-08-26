import * as keyNames from '@desk/knowledge-base/config/keyNames';
import * as commonConfig from '@base/config/view-field';
import * as components from './components';

import { FieldConfig } from '@base/types/pagelayout';
import { TemplateGroup } from '@base/types/app';
import { useKnowledgeBaseTags } from '@desk/knowledge-base/hooks/useKnowledgeBaseTags';

const viewFieldsConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.KEY_KNOWLEDGE_BASE_CATEGORY]: {
    component: components.CategoryViewField,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    componentProps: {},
    schema: `
      category {
        id
        name
      }
    `
    // getValue: (viewData: any) => {
    //   //// console.log('getValue', viewData);
    //   if (viewData.folder) {
    //     return viewData.folder;
    //   } else if (viewData.category) {
    //     return viewData.category;
    //   } else {
    //     return { id: '', name: '' };
    //   }
    // },
    // getMutationValue: (value: any) => {
    //   return {
    //     category: {
    //       id: value.id,
    //       name: value.name
    //     },
    //     folder: null
    //   };
    // }
  },
  [keyNames.KEY_KNOWLEDGE_BASE_FOLDER]: {
    component: components.FolderViewField,
    schema: `
  folder {
    id
    name
    parent {
      id
      name
    }
    category {
      id
      name
    }
  }, 
`,
    getMutationValue: (value: any) => {
      return {
        category: {
          id: value?.category?.id,
          name: value?.category?.name
        },
        folder: {
          id: value?.id,
          name: value?.name
        }
      };
    }
  },
  [keyNames.KEY_KNOWLEDGE_BASE_ISPUBLISH]: {
    component: components.PublishedView
  },
  [keyNames.KEY_KNOWLEDGE_BASE_TAG]: {
    component: components.Tags,
    componentProps: {
      fetchList: useKnowledgeBaseTags,
      fieldValue: 'id',
      fieldLabel: 'name'
    },
    schema: `tags {
      id
      name
    }`
  },
  [keyNames.KEY_KNOWLEDGE_BASE_CONTENT]: {
    component: components.EditorTemplateResponsive,
    componentProps: {
      templateGroup: TemplateGroup.KNOWLEDGE
    },
    hideFieldLabel: true,
    schema: `
      content
      tpl {
        id
        name
      }
    `,
    getValue: (viewData: any) => {
      return {
        content: viewData.content ? JSON.parse(viewData.content) : { html: '', css: '' },
        tpl: viewData.tpl
      };
    },
    getMutationValue: (value: any) => {
      return {
        content: JSON.stringify(value.content),
        tpl: value.tpl
      };
    }
  }
};
export default viewFieldsConfig;
