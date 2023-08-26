import { gql } from 'graphql-request';

export const GET_PROJECTS = gql`
  query q($filter: SearchFilter) {
    project_projects(filter: $filter) {
      results {
        id
        name
        description
        createdAt
        startDate
        dueDate
        members {
          id
          role
          fields {
            field {
              id
              name
            }
            assignTo {
              id
              name
            }
          }
        }
        account {
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

export const GET_PROJECT = gql`
  query q($id: String!) {
    project_project(id: $id) {
      id
      name
      description
      startDate
      dueDate
      members {
        id
        role
        fields {
          field {
            id
            name
          }
          assignTo {
            id
            name
          }
        }
      }
      account {
        id
        name
      }
      process {
        id
        name
      }
      createdAt
      createdBy {
        id
        name
      }
    }
  }
`;

export const GET_PROJECT_MEMBERS = gql`
  query q($id: String!) {
    project_project(id: $id) {
      id
      members {
        id
        role
        fields {
          field {
            id
            name
          }
          assignTo {
            id
            name
          }
        }
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation q($project: Project!) {
    project_createProject(project: $project) {
      id
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation q($project: Project!) {
    project_updateProject(project: $project) {
      id
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation q($id: String!) {
    project_deleteProject(id: $id) {
      id
    }
  }
`;
