import { gql } from 'graphql-request';

// export const getListQuery = (schemas: string) => {
//   return gql`
//     query q($filter: SearchFilter) {
//       setting_landingPages(filter: $filter) {
//         results {
//           ${schemas}
//         }
//       }
//     }
//   `;
// };

export const getListQuery = (menu: string, schemas: string) => {
  return gql`
    query q($filter: SearchFilter) {
      ${menu}(filter: $filter) {
        results {
          ${schemas}
        }
        paging {
          totalPage
          totalItems
          currentPage
        }
      }
    }
  `;
};

export const LANDINGPAGE_GET_LIST = gql`
  query q($filter: SearchFilter) {
    setting_landingPages(filter: $filter) {
      paging {
        totalItems
        totalPage
        currentPage
      }
      results {
        id
        name
        type
        language
        products {
          id
          name
        }
        description
        assignTo {
          id
          name
        }
        title
        createdBy {
          id
          name
          fullName
        }
        createdAt
        updatedBy {
          id
          name
          fullName
        }
        updatedAt
      }
    }
  }
`;

export const LANDINGPAGE_GET_ITEM = gql`
  query q($filter: SearchFilter) {
    setting_landingPage(id: $id) {
      paging {
        totalItems
        totalPage
        currentPage
      }
      results {
        id
        name
        type {
          value
          label
          languageKey
        }
        language
        products {
          id
          name
        }
        description
        assignTo {
          id
          name
        }
        title
        createdBy {
          id
          name
          fullName
        }
        createdAt
        updatedBy {
          id
          name
          fullName
        }
        updatedAt
      }
    }
  }
`;

export const LANDINGPAGE_GET_NOTE = gql`
  query q($filter: SearchFilter, $source: Source) {
    builtin_notes(filter: $filter, source: $source) {
      results {
        id
        content
        createdBy {
          id
          name
        }
        createdAt
      }
      paging {
        totalPage
        totalItems
        currentPage
        itemPerPage
      }
    }
  }
`;

export const LANDINGPAGE_DELETE = gql`
  mutation q($ids: String!) {
    setting_deleteLandingPage(ids: $ids) {
      ids
    }
  }
`;

export const LANDINGPAGE_CREATE = gql`
  mutation q($landingPage: LandingPageData!) {
    setting_createLandingPage(landingPage: $landingPage) {
      id
    }
  }
`;

export const LANDINGPAGE_UPDATE = gql`
  mutation m($data: UpdateData!) {
    setting_updateLandingPage(landingPage: $landingPage) {
      id
    }
  }
`;

export const LANDING_PAGE_SITE_GET = gql`
  query q($id: String) {
    setting_landingPageSite(id: $id) {
      id
      type
      name
      language
      products {
        id
        name
      }
      isAllProducts
      description
      assignTo {
        id
        name
      }
      template
      title
      html
      publish
      publishDate
      stage
      publishDate
      createdBy {
        id
        name
        fullName
      }
      createdAt
      updatedBy {
        id
        name
        fullName
      }
      updatedAt
    }
  }
`;
