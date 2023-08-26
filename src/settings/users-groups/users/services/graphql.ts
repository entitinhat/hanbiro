import { gql } from 'graphql-request';

// // ======= Query ========
export const USER_GET_LIST = gql`
  query q($orgId: String!, $maxResults: Int!, $cursor: String, $locale: String) {
    org(id: $orgId) {
      users(maxResults: $maxResults, cursor: $cursor, locale: $locale) {
        items {
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
        nextCursor
      }
    }
  }
`;

export const USER_GET_DETAIL = gql`
  query q($orgId: String!, $id: String!) {
    org(id: $orgId) {
      user(id: $id) {
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
export const USER_GET_DETAIL_BY_EMAIL = gql`
  query q($orgId: String!, $emails: [String]!) {
    org(id: $orgId) {
      user(emails: $emails) {
        id
        displayName
        fullName
        urlName
        primaryEmail
        primaryPhone
      }
    }
  }
`;
// export const USER_PROFILE_ME = gql`
//   query q($orgId: String!) {
//     org(id: $orgId) {
//       user {
//         id
//         displayName
//         fullName
//         urlName
//         primaryEmail
//         primaryPhone
//         emails {
//           address
//           primary
//         }
//         phones {
//           number
//           primary
//         }
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `;

// // ======= Mutation =====
export const USER_CREATE = gql`
  mutation m($input: CreateUserInput!) {
    createUser(input: $input)
  }
`;

export const USER_UPDATE = gql`
  mutation m($input: UpdateUserInput!) {
    updateUser(input: $input)
  }
`;

export const USER_DELETE = gql`
  mutation m($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`;

export const USER_ADD_EMAIL = gql`
  mutation m($input: AddOrRemoveUserEmailInput!) {
    addUserEmail(input: $input)
  }
`;
export const USER_REMOVE_EMAIL = gql`
  mutation m($input: AddOrRemoveUserEmailInput!) {
    removeUserEmail(input: $input)
  }
`;

export const USER_ADD_PHONE = gql`
  mutation m($input: AddOrRemoveUserPhoneInput!) {
    addUserPhone(input: $input)
  }
`;
export const USER_REMOVE_PHONE = gql`
  mutation m($input: AddOrRemoveUserPhoneInput!) {
    removeUserPhone(input: $input)
  }
`;

export function deleteUsersSchema(nItems: number): string {
  let variables = '';
  let subMutations = '';
  const aVariables = [];
  const aSubMutations = [];
  let sNum = 1;
  while (sNum <= nItems) {
    aVariables.push(`$input${sNum}: DeleteUserInput!`);
    aSubMutations.push(`result${sNum}:deleteUser(input: $input${sNum})`);
    sNum++;
  }
  variables = aVariables.join(',');
  subMutations = aSubMutations.join(`\n`);
  const schema = gql`
    mutation m(${variables}) {
      ${subMutations}
    }
  `;
  return schema;
}
