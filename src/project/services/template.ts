import { REPORT_SUBJECT } from '@analytic/report/config/keyNames';
import { gql } from 'graphql-request';

export const GET_TASK_TEMPLATES = gql`
  query q($filter: SearchFilter) {
    project_taskTemplates(filter: $filter) {
      results {
        id
        name
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
        estimatedTime
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

export const GET_TASK_TEMPLATE = gql`
  query q($id: String!) {
    project_taskTemplate(id: $id) {
      id
      name
      description
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
      links {
        id
        title
        url
      }
      qa {
        id
        subject
        checklist {
          id
          title
          description
        }
      }
      estimatedTime
    }
  }
`;

export const GET_TEMPLATE_TASKS = gql`
  query q() {
    project_templateTasks() {
      results {
        id
        name
      }
    }
  }
`;

export const CREATE_TASK_TEMPLATE = gql`
  mutation q($task: TaskTemplate!) {
    project_createTaskTemplate(task: $task) {
      id
    }
  }
`;

export const UPDATE_TASK_TEMPLATE = gql`
  mutation q($task: TaskTemplate!) {
    project_updateTaskTemplate(task: $task) {
      id
    }
  }
`;

export const DELETE_TASK_TEMPLATE = gql`
  mutation q($id: String!) {
    project_deleteTaskTemplate(id: $id) {
      id
    }
  }
`;

export const CREATE_TASK_LINK_TEMPLATE = gql`
  mutation q($id: String!, $link: Link!) {
    project_createTaskLinkTemplate(id: $id, link: $link) {
      id
    }
  }
`;

export const UPDATE_TASK_LINK_TEMPLATE = gql`
  mutation q($id: String!, $link: Link!) {
    project_updateTaskLinkTemplate(id: $id, link: $link) {
      id
    }
  }
`;

export const DELETE_TASK_LINK_TEMPLATE = gql`
  mutation q($id: String!, $refId: String!) {
    project_deleteTaskLinkTemplate(id: $id, refId: $refId) {
      id
    }
  }
`;

export const CREATE_TASK_QA_TEMPLATE = gql`
  mutation q($id: String!, $qa: QA!) {
    project_createTaskQaTemplate(id: $id, qa: $qa) {
      id
    }
  }
`;

export const UPDATE_TASK_QA_TEMPLATE = gql`
  mutation q($id: String!, $qa: QA!) {
    project_updateTaskQaTemplate(id: $id, qa: $qa) {
      id
    }
  }
`;

export const DELETE_TASK_QA_TEMPLATE = gql`
  mutation q($id: String!, $refId: String!) {
    project_deleteTaskQaTemplate(id: $id, refId: $refId) {
      id
    }
  }
`;
