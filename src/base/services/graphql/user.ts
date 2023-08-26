import { gql } from 'graphql-request';

export const GET_USER_IN_GROUP = gql`
  query q($groupId: String) {
    setting_groupUsers(groupId: $groupId) {
      results {
        id
        name
        fullName
        urlName
        displayName
      }
    }
  }
`;
