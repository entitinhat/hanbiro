import { gql } from 'graphql-request';

export const SETTING_CTA_CREATE = gql`
  mutation q($cta: cta) {
    setting_createCta(cta: $cta) {
      id
    }
  }
`;

export const SETTING_CTA_UPDATE = gql`
  mutation q($cta: cta) {
    setting_updateCta(cta: $cta) {
      id
    }
  }
`;

export const SETTING_CTA_DELETE = gql`
  mutation q($ids: [String!]) {
    setting_deleteCta(ids: $ids) {
      ids
    }
  }
`;

export const SETTING_CTA_QR_CODE_GET = gql`
  query q($id: String!) {
    setting_cta(id: $id) {
      id
      type
      qrCode
      linkType
      externalSiteName
      linkUrl
    }
  }
`;

export const SETTING_CTA_ALL_GET = gql`
  query q($filter: SearchFilter) {
    setting_ctas(filter: $filter) {
      results {
        id
        type
        imgUrl
        imgSize {
          width
          height
        }
        imgAlt
        txtValue
        txtBgColor
        txtColor
        txtFontSize
        txtFontWeight
        txtRounded
        name
        language
        linkType
        externalSiteName
        linkUrl
        openPageInNewWindow

        contentType
        landingPageType
        landingPage {
          id
          name
        }
        landingPageTitle
        siteType
        site {
          id
          name
        }
        siteTitle
        surveyType
        survey {
          id
          name
        }
        surveyTitle
        description
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;
