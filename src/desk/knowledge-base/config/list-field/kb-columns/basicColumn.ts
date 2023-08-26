import * as keyNames from '@desk/knowledge-base/config/keyNames';

const basicColumn = [
  {
    keyName: keyNames.KEY_KNOWLEDGE_BASE_SUBJECT,
    languageKey: 'desk_knowledge_field_basic_subject',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_BASE_SUBJECT,
    title: 'desk_knowledge_field_basic_subject'
  },
  {
    keyName: keyNames.KEY_KNOWLEDGE_BASE_CATEGORY,
    languageKey: 'desk_knowledge_field_basic_category',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_BASE_CATEGORY,
    title: 'desk_knowledge_field_basic_category'
  },
  {
    keyName: keyNames.KEY_KNOWLEDGE_CREATED_BY,
    languageKey: 'desk_knowledge_field_basic_createdby',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_CREATED_BY,
    title: 'desk_knowledge_field_basic_createdby'
  },
  {
    keyName: keyNames.KEY_KNOWLEDGE_BASE_ISPUBLISH,
    languageKey: 'desk_knowledge_field_basic_ispublish',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_BASE_ISPUBLISH,
    title: 'desk_knowledge_field_basic_ispublish'
  },
  {
    keyName: keyNames.KEY_KNOWLEDGE_CREATED_AT,
    languageKey: 'desk_knowledge_field_basic_createdat',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_CREATED_AT,
    title: 'desk_knowledge_field_basic_createdat'
  },
  {
    keyName: keyNames.KEY_KNOWLEDGE_UPDATED_AT,
    languageKey: 'desk_knowledge_field_basic_updatedat',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_KNOWLEDGE_UPDATED_AT,
    title: 'desk_knowledge_field_basic_updatedat'
  }
];

export default basicColumn;
