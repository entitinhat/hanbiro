import * as keyNames from '@desk/knowledge-base/config/keyNames';

const deletedColumn = [
  // {
  //   keyName: keyNames.KEY_KNOWLEDGE_BASE_CATEGORY,
  //   languageKey: 'desk_knowledge_field_basic_category',
  //   defaultViewInList: true,
  //   sortable: true,
  //   name: keyNames.KEY_KNOWLEDGE_BASE_CATEGORY,
  //   title: 'desk_knowledge_field_basic_category'
  // },
  {
    keyName: keyNames.KEY_KNOWLEDGE_BASE_SUBJECT,
    languageKey: 'desk_knowledge_field_basic_subject',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_BASE_SUBJECT,
    title: 'desk_knowledge_field_basic_subject'
  },
  {
    keyName: keyNames.KEY_KNOWLEDGE_BASE_DELETED_BY,
    languageKey: 'desk_knowledge_field_basic_deletedby',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_BASE_DELETED_BY,
    title: 'desk_knowledge_field_basic_updatedby'
  },
  {
    keyName: keyNames.KEY_KNOWLEDGE_BASE_DELETED_AT,
    languageKey: 'desk_knowledge_field_basic_deletedat',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_BASE_DELETED_AT,
    title: 'desk_knowledge_field_basic_deletedat'
  }
];
export default deletedColumn;
