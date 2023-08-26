import { gql } from 'graphql-request';

export const GET_USER = gql`
  query q($id: Int!, $lang: String) {
    directory_user(id: $id, lang: $lang) {
      id
      displayName
      urlName
      fullName
    }
  }
`;

export const GET_ME = gql`
  query q($lang: String) {
    directory_me {
      id
      displayName
      urlName
      fullName
      identities {
        identifier
      }
    }
  }
`;

export const GET_ALL = gql`
  query q() {
    directory_users {
      nodes {
        id
        displayName
        identities {
          identifier
        }
        fullName
        urlName
        properties
      }
    }
  }
`;
