import { gql } from 'graphql-request';

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
export const ADD_SITE_TEMPLATE = gql`
  mutation q($siteTemplate: SiteTemplate) {
    setting_createSiteTemplate(siteTemplate: $siteTemplate) {
      id
    }
  }
`;
export const UPDATE_SITE_TEMPLATE = gql`
  mutation q($siteTemplate: SiteTemplate) {
    setting_updateSiteTemplate(siteTemplate: $siteTemplate) {
      id
    }
  }
`;
export const DELETE_SITE_TEMPLATE = gql`
  mutation q($id: String) {
    setting_deleteSiteTemplate(id: $id) {
      id
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
export const UPDATE_DEFAULT_SITE_TEMPLATE = gql`
  mutation q($id: String, $isDefault: boolean) {
    setting_updateDefaultSiteTemplate(id: $id, isDefault: $isDefault) {
      id
    }
  }
`;
