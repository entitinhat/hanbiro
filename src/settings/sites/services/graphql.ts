import { gql } from 'graphql-request';

export const GET_ALL_MENU_SITE = (query?: string) => {
  if (!query) {
    query = `
      results {
        id
        name
        siteGroup
        thumbnail
        description
        isDefault
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
      setting_siteTemplates(filter: $filter) {
        ${query}
      }
    }
  `;
};
export const ADD_MENU_SITES = gql`
  mutation q($menuTemplate: IMenuTemplate) {
    setting_createMenuTemplate(menuTemplate: $menuTemplate) {
      id
    }
  }
`;
export const DELETE_MENU_SITES = gql`
  mutation q($ids: [String!]) {
    setting_deleteMenuTemplates(ids: $ids) {
      ids
    }
  }
`;
export const UPDATE_MENU_SITES = gql`
  mutation q($menuTemplate: IMenuTemplate) {
    setting_updateMenuTemplate(menuTemplate: $menuTemplate) {
      id
    }
  }
`;

export const GET_ALL_SITES = gql`
  query q($filter: FilterInput) {
    setting_siteTemplates(filter: $filter) {
      results {
        id
        name
        siteGroup
        thumbnail
        description
        isDefault
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
    }
  }
`;
export const GET_PREVIEW_SITE_TEMPLATE = gql`
  query q($jsonData: String!, $siteGroup: String!) {
    setting_previewSiteTemplate(jsonData: $jsonData, siteGroup: $siteGroup) {
      html
      options
    }
  }
`;
const GET_SITE_QUERY = `
  id
  name
  isDefault
  siteGroup
  description
  thumbnail
  properties
`;

export const GET_SITE_DETAIL = gql`
  query q($id: String) {
    setting_siteTemplate(id: $id) {
      ${GET_SITE_QUERY}
    }
  }
`;
