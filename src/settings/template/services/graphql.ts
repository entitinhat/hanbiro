import { gql } from 'graphql-request';

export const GET_ALL_MENU_TEMPLATE = (query?: string) => {
  if (!query) {
    query = `
      results {
        id
        name
        title
        group
        type
        subType
        html
        thumbnail
        createdAt
        createdBy {
          id
          name
        }
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    `;
  }
  return gql`
    query q($filter: FilterInput) {
      setting_menuTemplates(filter: $filter) {
        ${query}
      }
    }
  `;
};
const GET_TEMPLATE_QUERY = `
    results {
      name
      fields{
        enable
        disabled
        inputType
        label
        layouts
        name
        row
        type
        withCondition
        placeholder
        defaultValue
        alias{
          enable
          inputType
          label
          layouts
          name
          row
          type
          withCondition
          placeholder
          defaultValue
        }
        relatedItems{
          enable
          inputType
          label
          layouts
          name
          row
          type
          withCondition
          placeholder
          defaultValue
        }
        options{
          label
          value
        }
        
      }
    }
    tabs{
      enable
      icon
      layout
      name
      title
      withCondition
    }
    html
    options
`;
export const GET_MENU_TEMPLATE_DETAIL = gql`
  query q($id: String, $templateGroup: String!) {
    setting_menuTemplate(id: $id, templateGroup: $templateGroup) {
      ${GET_TEMPLATE_QUERY}
    }
  }
`;
export const ADD_MENU_TEMPLATE = gql`
  mutation q($menuTemplate: IMenuTemplate) {
    setting_createMenuTemplate(menuTemplate: $menuTemplate) {
      id
    }
  }
`;
export const UPDATE_MENU_TEMPLATE = gql`
  mutation q($menuTemplate: IMenuTemplate) {
    setting_updateMenuTemplate(menuTemplate: $menuTemplate) {
      id
    }
  }
`;
export const DELETE_MENU_TEMPLATE = gql`
  mutation q($id: String) {
    setting_deleteMenuTemplate(id: $id) {
      id
    }
  }
`;

export const DELETE_MENU_TEMPLATES = gql`
  mutation q($ids: [String!]) {
    setting_deleteMenuTemplates(ids: $ids) {
      ids
    }
  }
`;
export const GET_PREVIEW_MENU_TEMPLATE = gql`
  query q($jsonData: String!, $templateGroup: String!) {
    setting_previewMenuTemplate(jsonData: $jsonData, templateGroup: $templateGroup) {
      html
      options
    }
  }
`;

export const CLONE_MENU_TEMPLATE = gql`
  mutation q($id: String) {
    setting_copyTemplate(id: $id) {
     id
  }
  }
`;


