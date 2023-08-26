import { gql } from 'graphql-request';

export const GET_CURRENT_TENANT = gql`
  query {
    tenant {
      id
      orgId
      productType
    }
  }
`;
export const GET_TENANT_BY_DOMAIN = gql`
  query q($domain: String) {
    tenant(domain: $domain) {
      id
      orgId
      productType
    }
  }
`;

export const USER_PROFILE_ME = gql`
  query q($orgId: String!) {
    org(id: $orgId) {
      user {
        id
        displayName
        fullName
        urlName
        primaryEmail
        primaryPhone
        emails {
          address
          primary
        }
        phones {
          number
          primary
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const ORG_IDENTITY_PROVIDERS_LIST = gql`
  query q($orgId: String, $maxResults: Int!, $cursor: String) {
    org(id: $orgId) {
      identityProviders(maxResults: $maxResults, cursor: $cursor) {
        items {
          id
          displayName
          type
          oauth2 {
            clientId
            clientSecret
            scope
            authorizationUrl
            tokenUrl
            revocationUrl
            introspectionUrl
          }
          createdAt
        }
        nextCursor
      }
    }
  }
`;
