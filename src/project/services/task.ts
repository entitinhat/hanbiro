import { gql } from 'graphql-request';

export const GET_LIST_TASKS = gql`
  query q($filter: SearchFilter) {
    project_listTasks(filter: $filter) {
      results {
        id
        name
        project {
          id
          name
        }
        startDate
        dueDate
        estimatedTime
        pageType {
          id
          name
        }
        devType {
          id
          name
        }
        devSource {
          id
          name
        }
        devCostType {
          id
          name
        }
        priority {
          id
          keyName
          languageKey
        }
        assignTo {
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

export const GET_TASKS = gql`
  query q($projectId: String!, $planningId: String) {
    project_tasks(projectId: $projectId, planningId: $planningId) {
      results {
        id
        name
        startDate
        dueDate
        estimatedTime
        pageType {
          id
          name
        }
        devType {
          id
          name
        }
        devSource {
          id
          name
        }
        devCostType {
          id
          name
        }
        priority {
          id
          keyName
          languageKey
        }
        assignTo {
          id
          name
        }
        createdAt
      }
    }
  }
`;

export const GET_TASK = gql`
  query q($id: String!) {
    project_project(id: $id) {
      id
      name
      description
      startDate
      dueDate
      createdAt
      createdBy {
        id
        name
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation q($task: Task!) {
    project_createTask(task: $task) {
      id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation q($task: Task!) {
    project_updateTask(task: $task) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation q($id: String!) {
    project_deleteTask(id: $id) {
      id
    }
  }
`;
