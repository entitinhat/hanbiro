import { gql } from 'graphql-request';

export const GET_TIMELINE_BY_MENU = gql`
  query q($filter: SearchFilter, $source: Source) {
    builtin_timelines(filter: $filter, source: $source) {
      paging {
        totalItems
        totalPage
        currentPage
        itemPerPage
      }
      results {
        id
        menu
        tab
        section
        sectionId
        sourceId
        action
        timezone
        remoteIp
        userAgent
        content {
          field
          value
        }
        createdBy {
          id
          name
        }
        createdAt
      }
    }
  }
`;
