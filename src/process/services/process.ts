import { gql } from 'graphql-request';

export const CREATE_PROCESS = gql`
  mutation q($process: Process!) {
    process_createProcess(process: $process) {
      id
    }
  }
`;

export const UPDATE_PROCESS = gql`
  mutation q($process: Process!) {
    process_updateProcess(process: $process) {
      id
    }
  }
`;

export const DELETE_PROCESS = gql`
  mutation q($ids: [String]!) {
    process_deleteProcess(ids: $ids) {
      ids
    }
  }
`;

export const GET_BUSINESS_PROCESS = gql`
  query q($id: String!) {
    process_process(id: $id) {
      id
      name
      module
      description
      users {
        id
        name
      }
      products {
        id
        name
      }
      trigger
      sendEmail
      createdAt
    }
  }
`;

export const GET_BUSINESS_PROCESSES = gql`
  query q($filter: SearchFilter) {
    process_processes(filter: $filter) {
      results {
        id
        name
        module
        description
        users {
          id
          name
        }
        products {
          id
          name
        }
        trigger
        sendEmail
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

export const GET_DIAGRAM = gql`
  query q($id: String!) {
    process_diagram(id: $id) {
      name
      stages {
        id
        name
        order
        description
        width
        property
      }
      nodes {
        id
        type
        label
        method
        shape
        sources {
          id
          direction
        }
        targets {
          id
          direction
        }
        axis {
          x
          y
        }
        parent
        property
      }
      edges {
        id
        label
        source
        target
        sourceDirection {
          id
          direction
        }
        targetDirection {
          id
          direction
        }
        property
        multiple
        sequence
        options
      }
    }
  }
`;

export const GET_STEP = gql`
  query q($id: String!, $stepId: String!) {
    process_step(id: $id, stepId: $stepId) {
      id
      definedId {
        id
        name
      }
      name
      type
      action {
        sendEmail
        duration {
          time
          unit
        }
        method
        template {
          id
          name
        }
      }
      site {
        type
        category
        template {
          id
          name
        }
      }
      description
      setting {
        method
        due
        email
        cta
        assign
        auto
        template
      }
      users {
        id
        name
      }
      groups {
        id
        name
      }
      statuses {
        id
        name
        button
        view
        property
        event
        direction
        nextStep {
          id
          name
        }
        sequence
        multiple
        options
        ctaId
        pageName
      }
      automation {
        useSleeping
        sleeping {
          duration {
            time
            unit
          }
          executes {
            changeStep {
              id
              name
            }
            useChangeStep
            notify {
              id
              name
            }
            useNotify
            status {
              id
              name
            }
            useMywork
          }
        }
      }
      wait {
        type
        datetime
        schedule {
          duration {
            time
            unit
          }
          when
          attr
        }
        trigger
        duration {
          time
          unit
        }
      }
      close {
        status
        jump
        view
        property
      }
    }
  }
`;

export const GET_CLOSED_STEP = gql`
  query q($id: String!, $stepId: String!) {
    process_step(id: $id, stepId: $stepId) {
      id
      name
      stage
      type
      description
      meta {
        jump
        view
        property
      }
    }
  }
`;

export const MODULE_PROCESSES = gql`
  query q($module: String!) {
    process_moduleProcesses(module: $module) {
      results {
        id
        name
      }
    }
  }
`;

export const GET_MODULE_PROCESS = gql`
  query q($source: Source!, $processId: String!) {
    process_moduleProcess(source: $source, processId: $processId) {
      process {
        id
        name
      }
      stages {
        id
        name
        property
      }
      closed {
        id
        name
        button
        view
        event
        direction
      }
      steps {
        stageId
        step {
          id
          name
        }
        status {
          id
          name
        }
        property
        type
        sequence
        checklist
        statuses {
          id
          step
          name
          button
          view
          event
          direction
          nextStep {
            id
            name
          }
          sequence
          multiple
          property
          options
          flag
        }
      }
    }
  }
`;

export const GET_NEXT_STEPS = gql`
  query q($id: String!) {
    process_nextSteps(id: $id) {
      steps {
        id
        name
      }
    }
  }
`;

export const CREATE_PROCESS_STEP = gql`
  mutation q($id: String!, $step: Step!, $link: StepLink) {
    process_createStep(id: $id, step: $step, link: $link) {
      id
    }
  }
`;

export const UPDATE_PROCESS_STEP = gql`
  mutation q($id: String!, $step: Step!) {
    process_updateStep(id: $id, step: $step) {
      id
    }
  }
`;

export const DELETE_PROCESS_STEP = gql`
  mutation q($id: String!, $stepId: String!) {
    process_deleteStep(id: $id, stepId: $stepId) {
      id
    }
  }
`;

export const CREATE_STEP_STATUS = gql`
  mutation q($id: String!, $stepId: String!, $status: Status!, $updateY: Int, $addY: Int) {
    process_createStatus(id: $id, stepId: $stepId, status: $status, updateY: $updateY, addY: $addY) {
      id
    }
  }
`;

export const UPDATE_STEP_STATUS = gql`
  mutation q($id: String!, $stepId: String!, $status: Status!) {
    process_updateStatus(id: $id, stepId: $stepId, status: $status) {
      id
    }
  }
`;

export const UPDATE_STEP_STATUSES = gql`
  mutation q($id: String!, $stepId: String!, $statuses: [Status!]!) {
    process_updateStatuses(id: $id, stepId: $stepId, statuses: $statuses) {
      id
    }
  }
`;

export const DELETE_STEP_STATUS = gql`
  mutation q($id: String!, $stepId: String!, $statusId: String!) {
    process_deleteStatus(id: $id, stepId: $stepId, statusId: $statusId) {
      id
    }
  }
`;

export const UPDATE_MODULE_PROCESS = gql`
  mutation q($source: Source!, $processId: String!, $prev: StatusChange!, $next: StatusChange!) {
    process_updateModuleProcess(source: $source, processId: $processId, prev: $prev, next: $next) {
      id
    }
  }
`;

export const CREATE_PROCESS_STAGE = gql`
  mutation q($id: String!, $stage: Stage!, $linkStage: String!) {
    process_createStage(id: $id, stage: $stage, linkStage: $linkStage) {
      id
    }
  }
`;

export const DELETE_PROCESS_STAGE = gql`
  mutation q($id: String!, $stageId: String!) {
    process_deleteStage(id: $id, stageId: $stageId) {
      id
    }
  }
`;

export const RESIZE_PROCESS_STAGE = gql`
  mutation q($id: String!, $resize: ResizeWidth!) {
    process_resizeStage(id: $id, resizeWidth: $resize) {
      id
    }
  }
`;

export const GET_PROCESS_STEPS = (query = '') => {
  return gql`
    query q($processId: String!) {
      process_processSteps(id: $processId) {
        results {
          id
          name
          ${query}
        }
      }
    }
  `;
};
