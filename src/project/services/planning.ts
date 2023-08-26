import { gql } from 'graphql-request';

export const GET_PLANNINGS = gql`
  query q($filter: SearchFilter) {
    project_plannings(filter: $filter) {
      results {
        id
        name
        pageType {
          id
          name
        }
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
      }
    }
  }
`;

export const GET_PLANNING = gql`
  query q($id: String!) {
    project_planning(id: $id) {
      id
      name
      link
      sequence
      projectId
      description
      instruction
      pageType {
        id
        name
      }
    }
  }
`;

export const GET_PLANNING_QA = gql`
  query q($id: String!) {
    project_planning(id: $id) {
      id
      qa {
        id
        subject
        checklist {
          id
          title
          done
          description
          doneAt
          doneBy
        }
      }
    }
  }
`;


export const CREATE_PLANNING = gql`
  mutation q($planning: Planning!) {
    project_createPlanning(planning: $planning) {
      id
    }
  }
`;

export const UPDATE_PLANNING = gql`
  mutation q($planning: Planning!) {
    project_updatePlanning(planning: $planning) {
      id
    }
  }
`;

export const DELETE_PLANNING = gql`
  mutation q($id: String!) {
    project_deletePlanning(id: $id) {
      id
    }
  }
`;
