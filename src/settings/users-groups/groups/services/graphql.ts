import { gql } from 'graphql-request';

// ======= Query ========
export const GROUP_GET_LIST = gql`
  query q($orgId: String!, $maxResults: Int!, $cursor: String, $locale: String) {
    org(id: $orgId) {
      groups(maxResults: $maxResults, cursor: $cursor, locale: $locale) {
        items {
          id
          displayName
          urlName
          description
          numDirectMembers
          memberships {
            memberId
            memberType
            displayOrder
            type
            createdAt
          }
          createdAt
          updatedAt
        }
        nextCursor
      }
    }
  }
`;
export const GROUP_GET_MEMBERSHIP_LIST = gql`
  query q(
    $orgId: String!
    $maxResults: Int!
    $cursor: String
    $groupId: String
    $memberId: String
    $memberType: GroupMemberType
    $type: GroupMembershipType
    $locale: String
  ) {
    org(id: $orgId) {
      groupMemberships(
        maxResults: $maxResults
        cursor: $cursor
        memberId: $memberId
        memberType: $memberType
        groupId: $groupId
        type: $type
        locale: $locale
      ) {
        items {
          memberId
          memberType
          displayOrder
          type
          createdAt
          groupId
        }
        nextCursor
      }
    }
  }
`;
export const GROUP_GET_DETAIL = gql`
  query q($orgId: String!, $id: String!, $locale: String) {
    org(id: $orgId) {
      group(id: $id, locale: $locale) {
        id
        displayName
        urlName
        description
        numDirectMembers
        memberships {
          memberId
          memberType
          displayOrder
          type
          createdAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

// ======= Mutation =====
export const GROUP_CREATE = gql`
  mutation m($input: CreateGroupInput!) {
    createGroup(input: $input)
  }
`;

export const GROUP_UPDATE = gql`
  mutation m($input: UpdateGroupInput!) {
    updateGroup(input: $input)
  }
`;

export const GROUP_DELETE = gql`
  mutation m($input: DeleteGroupInput!) {
    deleteGroup(input: $input)
  }
`;

export const GROUP_ADD_MEMBER = gql`
  mutation m($input: AddOrRemoveGroupMemberInput!) {
    addGroupMember(input: $input)
  }
`;
export const GROUP_REMOVE_MEMBER = gql`
  mutation m($input: AddOrRemoveGroupMemberInput!) {
    removeGroupMember(input: $input)
  }
`;
export const GROUP_UPDATE_MEMBER = gql`
  mutation m($input: UpdateGroupMemberInput!) {
    updateGroupMember(input: $input)
  }
`;

export function deleteGroupsSchema(nItems: number): string {
  let variables = '';
  let subMutations = '';
  const aVariables = [];
  const aSubMutations = [];
  let sNum = 1;
  while (sNum <= nItems) {
    aVariables.push(`$input${sNum}: DeleteGroupInput!`);
    aSubMutations.push(`result${sNum}:deleteGroup(input: $input${sNum})`);
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
