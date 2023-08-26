import { gql } from 'graphql-request';

export const TICKET_FORM_LIST = gql`
  query q($filter: filterInput) {
    setting_surveys(filter: $filter) {
      results {
        id
        name
        title
        bgColor
        description
        isTemplate
        createdBy {
          id
          name
        }
        createdAt
        updatedAt
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const TICKET_FORM_CREATE = gql`
  mutation q($ticketForm: TicketFormData!) {
    setting_createTicketForm(ticketForm: $ticketForm) {
      id
    }
  }
`;

export const TICKET_FORM_DELETE = gql`
  mutation q($ids: String!) {
    setting_deleteTicketForm(ids: $ids) {
      ids
    }
  }
`;

export const TICKET_FORM_UPDATE = gql`
  mutation m($ticketForm: TicketFormData!) {
    setting_updateTicketForm(ticketForm: $ticketForm) {
      id
    }
  }
`;

export const TICKET_FORM_RESPONSE_CREATE = gql`
  mutation q($answer: SurveyResponseInput) {
    setting_createAnswer(answer: $answer) {
      id
    }
  }
`;

export const TICKET_FORM_RESPONSE_GET = gql`
  query q($id: String) {
    setting_answer(id: $id) {
      id
      survey {
        id
        name
      }
      answers
      answerBy {
        id
        name
        fullName
      }
      answerAt
    }
  }
`;

export const TICKET_FORM_RESPONSES_GET_LIST = gql`
  query q($filter: filterInput) {
    setting_answers(filter: $filter) {
      results {
        id
        survey {
          id
          name
        }
        answers
        answerBy {
          id
          name
          fullName
        }
        answerAt
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const TICKET_FORM_RESPONSE_DELETE = gql`
  mutation q($ids: [String]) {
    setting_deleteAnswer(ids: $ids) {
      ids
    }
  }
`;
